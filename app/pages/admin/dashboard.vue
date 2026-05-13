<template>
  <div class="admin-dashboard container">
    <header class="admin-header">
      <h1>Admin Dashboard</h1>
      <NuxtLink to="/" class="btn-outline">Back to Store</NuxtLink>
    </header>

    <div class="admin-stats">
      <div class="stat-card">
        <h3>Total Products</h3>
        <p class="stat-value">{{ products?.length || 0 }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Orders</h3>
        <p class="stat-value">{{ orders?.length || 0 }}</p>
      </div>
      <div class="stat-card">
        <h3>Pending Reviews</h3>
        <p class="stat-value">{{ pendingReviewsCount }}</p>
      </div>
    </div>

    <div class="admin-actions">
      <NuxtLink to="/admin/add-product" class="btn-primary">Add New Product</NuxtLink>
    </div>

    <section class="admin-section">
      <h2>Recent Orders</h2>
      <div v-if="ordersPending">Loading orders...</div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>#{{ order.id.slice(0, 8) }}</td>
            <td>User {{ order.user_id?.slice(0, 5) || 'Guest' }}</td>
            <td>${{ order.total_price }}</td>
            <td><span :class="['status-tag', order.status.toLowerCase()]">{{ order.status }}</span></td>
            <td>{{ new Date(order.order_at).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="admin-section">
      <h2>Product Inventory</h2>
      <div v-if="productsPending">Loading products...</div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>${{ product.price }}</td>
            <td :class="{ 'low-stock': product.stock_quantity < 10 }">
              {{ product.stock_quantity }}
            </td>
            <td>
              <button class="edit-btn" @click="openEditModal(product)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Edit Product Modal -->
    <div v-if="editingProduct" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-content admin-form">
        <h3>Edit Product</h3>
        <form @submit.prevent="submitEdit">
          <div class="form-group">
            <label>Name</label>
            <input v-model="editForm.name" type="text" required>
          </div>
          <div class="form-group">
            <label>Price ($)</label>
            <input v-model.number="editForm.price" type="number" step="0.01" required>
          </div>
          <div class="form-group">
            <label>Stock Quantity</label>
            <input v-model.number="editForm.stock_quantity" type="number" required>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-outline" @click="closeEditModal">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="isUpdating">
              {{ isUpdating ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { client } = useSupabase()

const { data: products, pending: productsPending } = useAsyncData('admin-products', async () => {
  const { data } = await client.from('products').select('*')
  return data
})

const { data: orders, pending: ordersPending } = useAsyncData('admin-orders', async () => {
  const { data } = await client.from('orders').select('*').order('order_at', { ascending: false })
  return data
})

const { data: reviews } = useAsyncData('admin-reviews', async () => {
  const { data } = await client.from('reviews').select('*')
  return data
})

const pendingReviewsCount = computed(() => {
  return reviews.value?.filter(r => !r.verified).length || 0
})

// Edit Logic
const editingProduct = ref(null)
const isUpdating = ref(false)
const editForm = reactive({
  name: '',
  price: 0,
  stock_quantity: 0
})

const openEditModal = (product) => {
  editingProduct.value = product
  Object.assign(editForm, {
    name: product.name,
    price: product.price,
    stock_quantity: product.stock_quantity
  })
}

const closeEditModal = () => {
  editingProduct.value = null
}

const submitEdit = async () => {
  if (!editingProduct.value) return
  isUpdating.value = true
  try {
    const { error } = await client.from('products')
      .update(editForm)
      .eq('id', editingProduct.value.id)
      
    if (error) throw error
    alert('Product updated successfully!')
    refreshNuxtData('admin-products')
    closeEditModal()
  } catch (err) {
    alert(err.message)
  } finally {
    isUpdating.value = false
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding-top: 120px;
  padding-bottom: var(--spacing-xl);
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.admin-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.stat-card {
  background-color: var(--color-bg-soft);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.admin-actions {
  margin-bottom: var(--spacing-lg);
}

.admin-section {
  margin-bottom: var(--spacing-xl);
}

.admin-section h2 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th, .admin-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.admin-table th {
  background-color: var(--color-bg-soft);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.status-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 700;
}

.status-tag.paid { background-color: #e8f5e9; color: #2e7d32; }
.status-tag.pending { background-color: #fff3e0; color: #ef6c00; }

.low-stock {
  color: #c62828;
  font-weight: 700;
}

.edit-btn {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.85rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.modal-content {
  background-color: var(--color-bg);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  width: 400px;
  max-width: 90vw;
}

.modal-content h3 {
  margin-bottom: var(--spacing-md);
}

.form-group {
  margin-bottom: var(--spacing-sm);
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  outline: none;
}

.modal-content .form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: var(--spacing-md);
}

@media (max-width: 768px) {
  .admin-stats {
    grid-template-columns: 1fr;
  }
  .admin-table {
    display: block;
    overflow-x: auto;
  }
}
</style>
