<template>
  <div class="shop-page container">
    <div class="shop-header">
      <h1>All Products</h1>
      <p>Explore our full collection of premium essentials.</p>
    </div>

    <div class="shop-controls">
      <div class="filters">
        <button class="filter-btn active">All</button>
        <button class="filter-btn">New Arrivals</button>
        <button class="filter-btn">Accessories</button>
      </div>
      <div class="sort">
        <select v-model="sortBy">
          <option value="featured">Sort by: Featured</option>
          <option value="newest">Sort by: Newest</option>
          <option value="price-low">Sort by: Price Low to High</option>
          <option value="price-high">Sort by: Price High to Low</option>
        </select>
      </div>
    </div>

    <div v-if="pending" class="loading">Loading our collection...</div>
    <div v-else-if="error" class="error">Error loading products.</div>
    <div v-else>
      <ProductGrid :products="paginatedProducts" />
      
      <div class="pagination" v-if="totalPages > 1">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="page-btn"
        >&laquo; Previous</button>
        
        <div class="page-numbers" style="display: flex; gap: 8px;">
          <button 
            v-for="p in totalPages" 
            :key="p"
            @click="changePage(p)"
            :class="['num-btn', { active: currentPage === p }]"
            style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; border: 1px solid var(--color-border);"
          >{{ p }}</button>
        </div>

        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage >= totalPages"
          class="page-btn"
        >Next &raquo;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getProducts } = useSupabase()
const sortBy = ref('featured')
const currentPage = ref(1)

const { data: allProducts, pending, error } = useAsyncData('all-products', () => getProducts())

// Reset page to 1 whenever sort criteria is modified
watch(sortBy, () => {
  currentPage.value = 1
})

const sortedProducts = computed(() => {
  if (!allProducts.value) return []
  const list = [...allProducts.value]
  
  if (sortBy.value === 'newest') {
    return list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
  }
  if (sortBy.value === 'price-low') {
    return list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
  }
  if (sortBy.value === 'price-high') {
    return list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
  }
  return list // default featured
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(sortedProducts.value.length / 8))
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * 8
  return sortedProducts.value.slice(start, start + 8)
})

const changePage = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    currentPage.value = p
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.shop-page {
  padding-top: 120px;
}

.shop-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.shop-header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.shop-header p {
  color: var(--color-text-muted);
}

.shop-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-sm);
}

.filters {
  display: flex;
  gap: var(--spacing-sm);
}

.filter-btn {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: var(--color-text-muted);
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
}

.filter-btn.active {
  color: var(--color-text);
  border-bottom-color: var(--color-text);
  font-weight: 600;
}

.sort select {
  padding: 0.5rem;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  outline: none;
  cursor: pointer;
}

.pagination {
  margin-top: var(--spacing-lg);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
}

.pagination .page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  font-size: 0.85rem;
}

.pagination .page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.num-btn.active {
  background-color: var(--color-text);
  color: white;
  border-color: var(--color-text) !important;
  font-weight: 600;
}

@media (max-width: 640px) {
  .shop-controls {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: flex-start;
  }
}
</style>
