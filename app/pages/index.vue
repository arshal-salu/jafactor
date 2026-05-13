<template>
  <div class="home-page">
    <!-- Hero Carousel Section -->
    <section class="hero-carousel reveal">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="slide"
        :class="{ active: currentSlide === index }"
        :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${slide.image})` }"
      >
        <div class="container hero-content">
          <h1 class="hero-title">{{ slide.title }}</h1>
          <p class="hero-subtitle">{{ slide.subtitle }}</p>
          <NuxtLink to="/products" class="btn-primary">Shop Collection</NuxtLink>
        </div>
      </div>
      
      <!-- Slide Indicators -->
      <div class="indicators">
        <button 
          v-for="(slide, index) in slides" 
          :key="'ind-'+index"
          class="indicator"
          :class="{ active: currentSlide === index }"
          @click="setSlide(index)"
        ></button>
      </div>
    </section>


    <!-- Featured Products -->
    <section class="featured-products container">
      <div class="section-header">
        <h2 class="section-title">Latest Arrivals</h2>
        <NuxtLink to="/products" class="view-all">View All</NuxtLink>
      </div>
      
      <div v-if="pending" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Error loading products.</div>
      <ProductGrid v-else :products="featuredProducts" />
    </section>

    <!-- Features & Enquiry Sections -->
    <WhyJafactor />
    <EnquirySection />

    <!-- Brand Philosophy -->
    <section class="philosophy">
      <div class="container philosophy-content reveal">
        <h2>Quality Over Quantity</h2>
        <p>We believe in the beauty of simplicity and the longevity of high-quality materials. Every piece in our collection is thoughtfully sourced and meticulously crafted.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
const { getProducts } = useSupabase()

const { data: products, pending, error } = useAsyncData('featured-products', () => getProducts())

const featuredProducts = computed(() => {
  return products.value ? products.value.slice(0, 8) : []
})

// Carousel Logic
const slides = [
  {
    title: 'Azure Coastal Luxury',
    subtitle: 'Editorial silhouettes crafted from fluid silk. Experience the absolute freedom of coastal wind.',
    image: '/images/editorial.png'
  },
  {
    title: 'Quiet Luxury',
    subtitle: 'Elevate your everyday with understated pieces crafted from the finest materials.',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=1974'
  },
  {
    title: 'New Horizons',
    subtitle: 'Embrace the season with our latest arrivals in premium accessories and apparel.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1962'
  }
]

const currentSlide = ref(0)
let slideInterval

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const setSlide = (index) => {
  currentSlide.value = index
  resetInterval()
}

const resetInterval = () => {
  clearInterval(slideInterval)
  slideInterval = setInterval(nextSlide, 5000)
}

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(slideInterval)
})
</script>

<style scoped>
.hero-carousel {
  position: relative;
  height: 90vh;
  margin-bottom: var(--spacing-xl);
  overflow: hidden;
  background-color: var(--color-bg-soft);
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 1.5s ease-in-out, visibility 1.5s;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
}

.slide.active {
  opacity: 1;
  visibility: visible;
}

.hero-content {
  max-width: 800px;
  position: relative;
  z-index: 2;
  transform: translateY(20px);
  opacity: 0;
  transition: transform 1s ease-out 0.5s, opacity 1s ease-out 0.5s;
}

.slide.active .hero-content {
  transform: translateY(0);
  opacity: 1;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  margin-bottom: var(--spacing-sm);
  color: white;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 500px;
  margin-bottom: var(--spacing-md);
}

.indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.indicator {
  width: 40px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: var(--transition-smooth);
}

.indicator.active {
  background-color: white;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--spacing-md);
}

.section-title {
  font-size: 2.5rem;
}

.view-all {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
}

.philosophy {
  padding: var(--spacing-lg) 0;
  background-color: var(--color-text);
  color: white;
  text-align: center;
  margin-top: 0;
}

.philosophy-content {
  max-width: 700px;
  margin: 0 auto;
}

.philosophy h2 {
  font-size: 3rem;
  margin-bottom: var(--spacing-sm);
}

.philosophy p {
  font-size: 1.1rem;
  opacity: 0.8;
}

.loading, .error {
  padding: var(--spacing-xl);
  text-align: center;
}
</style>
