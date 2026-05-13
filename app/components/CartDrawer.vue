<template>
  <div :class="['cart-drawer-overlay', { 'is-open': isDrawerOpen }]" @click.self="closeDrawer">
    <div class="cart-drawer">
      <div class="drawer-header">
        <h3>Your Cart</h3>
        <button @click="closeDrawer" class="close-btn">&times;</button>
      </div>
      
      <div class="drawer-content">
        <div v-if="items.length === 0" class="empty-cart">
          <p>Your cart is empty.</p>
          <NuxtLink to="/products" class="btn-outline" @click="closeDrawer">Start Shopping</NuxtLink>
        </div>
        
        <div v-else class="cart-items">
          <div v-for="item in items" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name">
            <div class="item-info">
              <h4>{{ item.name }}</h4>
              <p>${{ item.price }}</p>
              <div class="qty-controls">
                <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>
            </div>
            <button class="remove-btn" @click="removeItem(item.id)">&times;</button>
          </div>
        </div>
      </div>
      
      <div class="offers-section" v-if="items.length > 0">
        <h5>Available Offers</h5>
        <div class="offer-item">
          <span class="offer-code">LUXE20</span>
          <span class="offer-desc">Get $20 off on orders over $200</span>
        </div>
        <div class="offer-item">
          <span class="offer-code">FREESHIP</span>
          <span class="offer-desc">Free shipping on all orders</span>
        </div>
      </div>

      <div class="drawer-footer" v-if="items.length > 0">
        <div class="total">
          <span>Subtotal</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <NuxtLink to="/checkout" class="btn-primary w-full text-center" @click="closeDrawer">
          Checkout
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { items, isDrawerOpen, subtotal, closeDrawer, removeItem, updateQuantity } = useCart()
</script>

<style scoped>
.cart-drawer-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-smooth);
}

.cart-drawer-overlay.is-open {
  opacity: 1;
  visibility: visible;
}

.cart-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 450px;
  max-width: 90vw;
  background-color: var(--color-bg);
  transform: translateX(100%);
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
}

.cart-drawer-overlay.is-open .cart-drawer {
  transform: translateX(0);
}

.drawer-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.cart-item {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.cart-item img {
  width: 80px;
  height: 100px;
  object-fit: cover;
  background-color: var(--color-bg-soft);
}

.item-info {
  flex: 1;
}

.item-info h4 {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

.qty-controls button {
  width: 24px;
  height: 24px;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn {
  font-size: 1.2rem;
  color: var(--color-text-muted);
}

.text-center {
  text-align: center;
}

.empty-cart {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  color: var(--color-text-muted);
}

.drawer-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.total {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
}

.w-full {
  width: 100%;
}

.close-btn {
  font-size: 2rem;
  line-height: 1;
}

.offers-section {
  padding: var(--spacing-md);
  background-color: var(--color-bg-soft);
  border-top: 1px solid var(--color-border);
}

.offers-section h5 {
  font-size: 0.85rem;
  text-transform: uppercase;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-muted);
}

.offer-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.offer-code {
  background-color: var(--color-text);
  color: white;
  padding: 0.2rem 0.5rem;
  font-weight: 700;
  border-radius: 4px;
}
</style>
