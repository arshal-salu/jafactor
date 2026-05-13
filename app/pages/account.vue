<template>
  <div class="account-page container">
    <div class="account-header">
      <h1>My Account</h1>
      <button @click="handleSignOut" class="btn-outline">Sign Out</button>
    </div>

    <div class="account-layout" v-if="user">
      <!-- Profile Sidebar -->
      <aside class="profile-sidebar">
        <div class="profile-card">
          <div class="avatar">{{ user.email.slice(0, 2).toUpperCase() }}</div>
          <div class="profile-info">
            <h3>{{ user.user_metadata?.full_name || 'Valued Member' }}</h3>
            <p>{{ user.email }}</p>
          </div>
          <div class="profile-nav">
            <button class="active">Order History</button>
            <button>Settings</button>
            <button>Saved Addresses</button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="account-content">
        <section class="orders-section">
          <h2>Order History</h2>
          
          <div v-if="orders.length === 0" class="empty-orders">
            <p>You haven't placed any orders yet.</p>
            <NuxtLink to="/products" class="btn-primary">Start Shopping</NuxtLink>
          </div>

          <div v-else class="orders-list">
            <div v-for="order in orders" :key="order.id" class="order-card">
              <div class="order-header">
                <div class="order-meta">
                  <span class="order-id">Order #{{ order.id.slice(0, 8) }}</span>
                  <span class="order-date">{{ new Date(order.order_at).toLocaleDateString() }}</span>
                </div>
                <div class="order-status" :class="order.status.toLowerCase()">
                  {{ order.status }}
                </div>
              </div>
              
              <div class="order-details">
                <p><strong>Shipping to:</strong> {{ order.shipping_city }}, {{ order.shipping_country }}</p>
                <p class="order-total">Total: ${{ order.total_price }}</p>
              </div>
              
              <button class="btn-outline view-details-btn">View Details</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
const { user, signOut, client } = useSupabase()

const { data: orders, pending } = useAsyncData('user-orders', async () => {
  if (!user.value) return []
  const { data, error } = await client
    .from('orders')
    .select('*')
    .eq('user_id', user.value.id)
    .order('order_at', { ascending: false })
  if (error) throw error
  return data
})

const handleSignOut = async () => {
  await signOut()
  navigateTo('/login')
}
</script>

<style scoped>
.account-page {
  padding-top: 120px;
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.account-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-lg);
}

.profile-card {
  background-color: var(--color-bg-soft);
  padding: var(--spacing-md);
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  background-color: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto var(--spacing-sm);
}

.profile-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.profile-info p {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.profile-nav {
  margin-top: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-nav button {
  text-align: left;
  padding: 0.75rem;
  font-size: 0.9rem;
  border-left: 2px solid transparent;
}

.profile-nav button.active {
  background-color: white;
  border-left-color: var(--color-text);
  font-weight: 600;
}

.orders-section h2 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.order-card {
  border: 1px solid var(--color-border);
  padding: var(--spacing-md);
  background-color: white;
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
}

.order-meta {
  display: flex;
  flex-direction: column;
}

.order-id {
  font-weight: 600;
  font-size: 0.9rem;
}

.order-date {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.order-status {
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 700;
  height: fit-content;
}

.order-status.delivered { background-color: #e8f5e9; color: #2e7d32; }
.order-status.shipped { background-color: #e3f2fd; color: #1565c0; }
.order-status.pending { background-color: #fff3e0; color: #ef6c00; }

.order-details {
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
}

.order-total {
  margin-top: 0.5rem;
  font-weight: 600;
}

.view-details-btn {
  width: 100%;
}

@media (max-width: 768px) {
  .account-layout {
    grid-template-columns: 1fr;
  }
}
</style>
