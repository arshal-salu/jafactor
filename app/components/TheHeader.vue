<template>
  <header :class="{ 'is-scrolled': isScrolled }">
    <div class="container header-inner">
      <NuxtLink to="/" class="logo">
        JAFACTOR
      </NuxtLink>
      
      <nav class="nav-links">
        <NuxtLink to="/products">Shop</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink v-if="user" to="/account">Account</NuxtLink>
        <NuxtLink v-else to="/login">Login</NuxtLink>
      </nav>
      
      <div class="header-actions">
        <button class="icon-btn search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <button class="icon-btn cart-btn" @click="toggleDrawer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const { cartCount, toggleDrawer } = useCart()
const { user, initUser } = useSupabase()
const isScrolled = ref(false)

onMounted(async () => {
  await initUser()
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 1000;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  background-color: transparent;
}

header.is-scrolled {
  height: 70px;
  background-color: var(--glass-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
  color: var(--color-text);
}

.nav-links {
  display: flex;
  gap: var(--spacing-md);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 500;
}

.nav-links a:hover {
  color: var(--color-primary);
}

.header-actions {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.icon-btn {
  position: relative;
  color: var(--color-text);
  padding: 0.5rem;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--color-primary);
  color: white;
  font-size: 0.7rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>
