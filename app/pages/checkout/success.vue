<template>
  <div class="success-page container">
    <div v-if="processing" class="loading-state">
      <div class="spinner"></div>
      <h1>Securing Your Order...</h1>
      <p>Please do not close this window while we finalize your purchase.</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <h1>Something went wrong</h1>
      <p>{{ error }}</p>
      <NuxtLink to="/checkout" class="btn-primary">Back to Checkout</NuxtLink>
    </div>

    <div v-else class="success-state reveal">
      <div class="success-icon">✓</div>
      <h1>Thank You for Your Order</h1>
      <p>Order #{{ orderId }} has been placed successfully.</p>
      <p>We've sent a confirmation email to your account.</p>
      <div class="actions">
        <NuxtLink to="/account" class="btn-primary">View Order History</NuxtLink>
        <NuxtLink to="/products" class="btn-outline">Continue Shopping</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { items, subtotal, items: cartItems } = useCart()
const { client, user } = useSupabase()

const processing = ref(true)
const error = ref('')
const orderId = ref('')

onMounted(async () => {
  const sessionId = route.query.session_id
  if (!sessionId) {
    error.value = "Missing session information."
    processing.value = false
    return
  }

  try {
    // 1. Save Order to Database
    const { data: order, error: orderErr } = await client
      .from('orders')
      .insert([{
        user_id: user.value?.id || null,
        total_price: subtotal.value,
        status: 'Paid',
        shipping_city: 'Check details in Stripe', // In a real app, get from Stripe session
        order_at: new Date()
      }])
      .select()
      .single()

    if (orderErr) throw orderErr
    orderId.value = order.id.slice(0, 8)

    // 2. Save Order Items
    const orderItemsData = cartItems.value.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price
    }))

    const { error: itemsErr } = await client
      .from('order_items')
      .insert(orderItemsData)

    if (itemsErr) throw itemsErr

    // 3. Clear Cart
    cartItems.value = []
    
  } catch (err) {
    console.error(err)
    error.value = "Failed to finalize order in our records, but your payment was successful. Please contact support."
  } finally {
    processing.value = false
  }
})
</script>

<style scoped>
.success-page {
  padding-top: 150px;
  text-align: center;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  background-color: #2e7d32;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto var(--spacing-md);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
}

p {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-md);
}

.actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-text);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--spacing-md);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
