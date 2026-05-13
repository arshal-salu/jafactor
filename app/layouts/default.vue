<template>
  <div class="layout-wrapper">
    <TheHeader />
    <main>
      <slot />
    </main>
    <TheFooter />
    <CartDrawer />
  </div>
</template>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
