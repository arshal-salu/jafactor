export const useCart = () => {
  const items = useState('cart-items', () => [])
  const isDrawerOpen = useState('cart-drawer-open', () => false)

  const cartCount = computed(() => {
    return items.value.reduce((acc, item) => acc + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  })

  const openDrawer = () => {
    isDrawerOpen.value = true
  }

  const closeDrawer = () => {
    isDrawerOpen.value = false
  }

  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  const addItem = (product, quantity = 1) => {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        quantity: quantity
      })
    }
    openDrawer()
  }

  const removeItem = (id) => {
    items.value = items.value.filter(i => i.id !== id)
  }

  const updateQuantity = (id, quantity) => {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  return {
    items,
    isDrawerOpen,
    cartCount,
    subtotal,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    addItem,
    removeItem,
    updateQuantity
  }
}
