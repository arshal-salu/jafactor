<template>
  <div class="product-card">
    <NuxtLink :to="`/products/${product.id}`" :class="['image-wrapper', { 'has-alt-hover': (product.image_url2 || product.image_url_2) && (product.image_url2 || product.image_url_2) !== product.image_url }]">
      <img :src="product.image_url" :alt="product.name" class="main-img">
      <img v-if="(product.image_url2 || product.image_url_2) && (product.image_url2 || product.image_url_2) !== product.image_url" :src="product.image_url2 || product.image_url_2" :alt="product.name" class="hover-img">
      <div class="card-overlay">
        <button @click.prevent="addToCart" class="quick-add">Quick Add</button>
      </div>
    </NuxtLink>
    
    <div class="product-info">
      <NuxtLink :to="`/products/${product.id}`">
        <h3 class="product-name">{{ product.name }}</h3>
      </NuxtLink>
      <p class="product-price">${{ product.price }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addItem } = useCart()

const addToCart = () => {
  addItem(props.product)
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeIn 0.8s var(--transition-smooth) forwards;
}

.image-wrapper {
  display: block;
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: var(--color-bg-soft);
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

.main-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hover-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.image-wrapper:hover .main-img {
  transform: scale(1.05);
}

.image-wrapper.has-alt-hover:hover .main-img {
  opacity: 0;
  transform: none;
}

.image-wrapper.has-alt-hover:hover .hover-img {
  opacity: 1;
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  transform: translateY(100%);
  transition: var(--transition-smooth);
  display: flex;
  justify-content: center;
  z-index: 10;
}

.image-wrapper:hover .card-overlay {
  transform: translateY(0);
}

.quick-add {
  background-color: white;
  color: black;
  padding: 0.8rem 1.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.1rem;
  width: 100%;
}

.product-info {
  text-align: center;
}

.product-name {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.product-price {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}
</style>
