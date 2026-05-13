<template>
  <div class="checkout-page container">
    <h1 class="page-title">Checkout</h1>
    
    <div v-if="items.length === 0" class="empty-state">
      <p>Your cart is empty. Please add items to your cart before checking out.</p>
      <NuxtLink to="/products" class="btn-primary">Go to Shop</NuxtLink>
    </div>

    <div v-else class="checkout-layout">
      <!-- Shipping Form -->
      <form @submit.prevent="handlePlaceOrder" class="shipping-form">
        <section class="form-section">
          <h2>Shipping Information</h2>
          <div class="form-grid">
            <div class="input-group full">
              <label>Full Name</label>
              <input v-model="form.fullName" type="text" required placeholder="John Doe">
            </div>
            <div class="input-group full">
              <label>Address Line 1</label>
              <input v-model="form.address" type="text" required placeholder="123 Luxury Ave">
            </div>
            <div class="input-group">
              <label>City</label>
              <input v-model="form.city" type="text" required placeholder="New York">
            </div>
            <div class="input-group">
              <label>Postal Code</label>
              <input v-model="form.postalCode" type="text" required placeholder="10001">
            </div>
            <div class="input-group full">
              <label>Country</label>
              <input v-model="form.country" type="text" required placeholder="United States">
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2>Payment Method</h2>
          <p class="payment-notice">Secured client commission billing gateway.</p>
          <div class="payment-options" style="display: flex; flex-direction: column; gap: 10px;">
            <label class="radio-group" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="radio" name="payment" value="stripe" v-model="paymentMethod">
              <span style="font-weight: 600;">💳 Credit Card / Debit Card (Stripe Gateway)</span>
            </label>
            <label class="radio-group" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="radio" name="payment" value="paypal" v-model="paymentMethod">
              <span style="font-weight: 600; color: #003087;">🅿️ PayPal Express Checkout</span>
            </label>
          </div>
        </section>

        <button type="submit" class="btn-primary place-order-btn" :disabled="isPlacing">
          {{ isPlacing ? 'Processing...' : 'Place Order' }}
        </button>
      </form>

      <!-- Order Summary -->
      <aside class="order-summary">
        <div class="summary-card">
          <h3>Order Summary</h3>
          <div class="summary-items">
            <div v-for="item in items" :key="item.id" class="summary-item">
              <div class="item-main">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-qty">x {{ item.quantity }}</span>
              </div>
              <span class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="summary-footer">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
const { items, subtotal } = useCart()
const isPlacing = ref(false)
const paymentMethod = ref('stripe')

const form = reactive({
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
  country: ''
})

const handlePlaceOrder = async () => {
  isPlacing.value = true
  
  try {
    if (paymentMethod.value === 'paypal') {
      // Simulate direct peer secure PayPal gateway handshake demo
      await new Promise(r => setTimeout(r, 600))
      window.location.href = `${window.location.origin}/checkout/success?session_id=paypal_demo_checkout_999`
      return
    }

    const { data, error } = await useFetch('/api/stripe/create-session', {
      method: 'POST',
      body: {
        items: items.value,
        success_url: `${window.location.origin}/checkout/success`,
        cancel_url: `${window.location.origin}/checkout`,
      }
    })

    if (error.value) throw error.value
    
    if (data.value?.url) {
      window.location.href = data.value.url
    }
  } catch (err) {
    alert(`Error: ${err.message}`)
  } finally {
    isPlacing.value = false
  }
}
</script>

<style scoped>
.checkout-page {
  padding-top: 120px;
}

.page-title {
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--spacing-lg);
  align-items: start;
}

.form-section {
  background-color: var(--color-bg-soft);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.form-section h2 {
  font-size: 1.2rem;
  margin-bottom: var(--spacing-sm);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm);
}

.input-group.full {
  grid-column: span 2;
}

.input-group label {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  color: var(--color-text-muted);
}

.input-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  background: white;
  outline: none;
}

.input-group input:focus {
  border-color: var(--color-text);
}

.payment-notice {
  font-size: 0.85rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.place-order-btn {
  width: 100%;
  margin-top: var(--spacing-md);
}

/* Summary */
.summary-card {
  background-color: var(--color-bg-soft);
  padding: var(--spacing-md);
  position: sticky;
  top: 100px;
}

.summary-card h3 {
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: var(--spacing-md);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.item-main {
  display: flex;
  gap: 0.5rem;
}

.item-qty {
  color: var(--color-text-muted);
}

.summary-footer {
  border-top: 1px solid var(--color-border);
  padding-top: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.summary-row.total {
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  color: var(--color-text);
}

@media (max-width: 992px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
}
</style>
