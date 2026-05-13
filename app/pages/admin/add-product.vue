<template>
  <div class="admin-page container">
    <h1 class="page-title">Add New Product</h1>
    
    <form @submit.prevent="handleSubmit" class="admin-form">
      <div class="form-grid">
        <div class="input-group full">
          <label>Product Name</label>
          <input v-model="form.name" type="text" required placeholder="Luxury Watch">
        </div>
        
        <div class="input-group">
          <label>Price ($)</label>
          <input v-model.number="form.price" type="number" step="0.01" required>
        </div>
        
        <div class="input-group">
          <label>Stock Quantity</label>
          <input v-model.number="form.stock_quantity" type="number" required>
        </div>
        
        <div class="input-group full">
          <label>Description</label>
          <textarea v-model="form.description" rows="4" required></textarea>
        </div>
        
        <div class="input-group full">
          <label>Main Image URL</label>
          <input v-model="form.image_url" type="url" required placeholder="https://...">
        </div>
        
        <div class="input-group">
          <label>Secondary Image URL</label>
          <input v-model="form.image_url2" type="url" placeholder="https://...">
        </div>
        
        <div class="input-group">
          <label>Third Image URL</label>
          <input v-model="form.image_url3" type="url" placeholder="https://...">
        </div>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Adding...' : 'Add Product' }}
        </button>
      </div>
    </form>
    
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
const { client } = useSupabase()
const isSubmitting = ref(false)
const message = ref('')
const messageType = ref('')

const form = reactive({
  name: '',
  price: 0,
  stock_quantity: 0,
  description: '',
  image_url: '',
  image_url2: '',
  image_url3: ''
})

const handleSubmit = async () => {
  isSubmitting.value = true
  message.value = ''
  
  try {
    const { error } = await client
      .from('products')
      .insert([form])
    
    if (error) throw error
    
    message.value = 'Product added successfully!'
    messageType.value = 'success'
    
    // Reset form
    Object.assign(form, {
      name: '',
      price: 0,
      stock_quantity: 0,
      description: '',
      image_url: '',
      image_url2: '',
      image_url3: ''
    })
  } catch (err) {
    message.value = `Error: ${err.message}`
    messageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.admin-page {
  padding-top: 120px;
  max-width: 800px;
}

.page-title {
  margin-bottom: var(--spacing-lg);
}

.admin-form {
  background-color: var(--color-bg-soft);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.input-group.full {
  grid-column: span 2;
}

.input-group label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.input-group input, .input-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  outline: none;
}

.input-group input:focus, .input-group textarea:focus {
  border-color: var(--color-text);
}

.form-actions {
  margin-top: var(--spacing-md);
}

.message {
  margin-top: var(--spacing-md);
  padding: 1rem;
  text-align: center;
  font-weight: 600;
}

.message.success {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.message.error {
  background-color: #ffebee;
  color: #c62828;
}
</style>
