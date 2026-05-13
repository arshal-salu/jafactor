<template>
  <footer class="footer">

    <div class="container footer-grid">
      <div class="footer-brand">
        <h3 class="logo">JAFACTOR</h3>
        <p>Curating excellence in every detail.</p>
      </div>
      <div class="footer-links">
        <h4>Shop</h4>
        <NuxtLink to="/products">All Products</NuxtLink>
        <NuxtLink to="/products?category=new">New Arrivals</NuxtLink>
        <NuxtLink to="/admin/dashboard" style="margin-top: 10px; color: var(--color-primary); font-weight: 700;">Admin Dashboard</NuxtLink>
      </div>
      <div class="footer-links">
        <h4>Support</h4>
        <NuxtLink to="/shipping">Shipping</NuxtLink>
        <NuxtLink to="/returns">Returns</NuxtLink>
        <NuxtLink to="/track" style="color: var(--color-primary); font-weight: 600;">Track Order</NuxtLink>
      </div>
      <div class="footer-newsletter">
        <h4>Newsletter</h4>
        <div class="input-group">
          <input type="email" placeholder="Your email">
          <button>→</button>
        </div>
      </div>
    </div>
    <div class="footer-bottom container">
      <p>&copy; 2026 JAFACTOR. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-bg-soft);
  padding: var(--spacing-lg) 0 var(--spacing-md);
  border-top: 1px solid var(--color-border);
  margin-top: 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: var(--spacing-lg);
}

.footer h4 {
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: var(--spacing-sm);
  letter-spacing: 0.1rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.footer-links a:hover {
  color: var(--color-text);
}

.input-group {
  display: flex;
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 0.5rem;
}

.input-group input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
}

.footer-bottom {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
