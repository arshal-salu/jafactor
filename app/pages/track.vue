<template>
  <div class="min-h-screen bg-gray-50 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Title Area -->
      <div class="text-center mb-12">
        <span class="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold block mb-2">
          Concierge Fulfillments
        </span>
        <h1 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
          Track Your Commission
        </h1>
        <p class="text-gray-600 text-sm max-w-md mx-auto">
          Enter your secure order reference number below to trace real-time artisan handling and shipping progression.
        </p>
      </div>

      <!-- Search Box Wrapper -->
      <div class="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <form @submit.prevent="handleTrack" class="flex flex-col sm:flex-row gap-4">
          <div class="relative flex-1">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input 
              v-model="orderId" 
              type="text" 
              required 
              placeholder="e.g. ord_999 or DEMO123"
              class="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 focus:bg-white outline-none transition text-sm font-medium"
            >
          </div>
          <button 
            type="submit" 
            :disabled="isLoading"
            class="bg-gray-900 hover:bg-black text-white font-medium px-8 py-3 rounded-xl transition-colors duration-150 text-sm tracking-wide disabled:opacity-70 flex items-center justify-center min-w-[140px]"
          >
            <span v-if="!isLoading">Trace Order</span>
            <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </form>
        <div class="mt-3 flex items-center justify-between text-xs text-gray-400 px-1">
          <span>Tip: Use reference <strong>DEMO123</strong> to simulate full tracking</span>
          <span>Encrypted Gateway</span>
        </div>
      </div>

      <!-- Tracking Results Card -->
      <div v-if="searched && !orderData" class="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
        <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">Commission Not Found</h3>
        <p class="text-gray-500 text-sm max-w-sm mx-auto">
          We couldn't trace an active consignment matching reference "{{ lastSearchedId }}". Please verify the code and try again.
        </p>
      </div>

      <div v-else-if="orderData" class="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 transition-all">
        <!-- Order Header Overview -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-6 mb-8 gap-4">
          <div>
            <span class="text-xs text-gray-400 uppercase tracking-wider block">Consignment Reference</span>
            <span class="text-lg font-bold text-gray-900 font-mono">#{{ orderData.id }}</span>
          </div>
          <div class="sm:text-right">
            <span class="text-xs text-gray-400 uppercase tracking-wider block sm:hidden">Date Recorded</span>
            <span class="text-sm font-medium text-gray-600">Ordered on {{ formatDate(orderData.order_at) }}</span>
            <span class="block mt-1">
              <span :class="['inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider', getStatusBg(orderData.status)]">
                {{ orderData.status }}
              </span>
            </span>
          </div>
        </div>

        <!-- Timeline Steps Wrapper -->
        <div class="relative pl-6 sm:pl-0">
          <!-- Desktop Background Grid Trace Line -->
          <div class="hidden sm:block absolute top-[28px] left-[10%] right-[10%] h-1 bg-gray-100 z-0"></div>
          <!-- Desktop Filled Trace Line -->
          <div 
            class="hidden sm:block absolute top-[28px] left-[10%] h-1 bg-amber-600 transition-all duration-1000 z-0" 
            :style="{ width: getProgressLineWidth(orderData.status) }"
          ></div>

          <!-- Mobile Vertical Line -->
          <div class="block sm:hidden absolute top-4 left-[15px] bottom-4 w-0.5 bg-gray-100 z-0"></div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-8 relative z-10">
            <!-- Step 1: Confirmed -->
            <div class="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-4 sm:gap-0">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all flex-shrink-0 sm:mb-3 bg-amber-600 text-white border-white shadow-md">
                ✓
              </div>
              <div>
                <h4 class="text-xs uppercase tracking-wider font-bold text-gray-900 mb-1">Commission Placed</h4>
                <p class="text-xs text-gray-400">Order successfully recorded in internal logs.</p>
              </div>
            </div>

            <!-- Step 2: Processing -->
            <div class="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-4 sm:gap-0">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all flex-shrink-0 sm:mb-3 shadow-md', stepActive(orderData.status, 2) ? 'bg-amber-600 text-white border-white' : 'bg-white text-gray-300 border-gray-200']">
                {{ stepActive(orderData.status, 2) ? '✓' : '2' }}
              </div>
              <div>
                <h4 class="text-xs uppercase tracking-wider font-bold text-gray-900 mb-1">Bespoke Handling</h4>
                <p class="text-xs text-gray-400">Artisans curating packaging and material prep.</p>
              </div>
            </div>

            <!-- Step 3: Shipped -->
            <div class="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-4 sm:gap-0">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all flex-shrink-0 sm:mb-3 shadow-md', stepActive(orderData.status, 3) ? 'bg-amber-600 text-white border-white' : 'bg-white text-gray-300 border-gray-200']">
                {{ stepActive(orderData.status, 3) ? '✓' : '3' }}
              </div>
              <div>
                <h4 class="text-xs uppercase tracking-wider font-bold text-gray-900 mb-1">Dispatched</h4>
                <p class="text-xs text-gray-400">In transit via securely insured logistics.</p>
              </div>
            </div>

            <!-- Step 4: Delivered -->
            <div class="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-4 sm:gap-0">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all flex-shrink-0 sm:mb-3 shadow-md', stepActive(orderData.status, 4) ? 'bg-emerald-600 text-white border-white' : 'bg-white text-gray-300 border-gray-200']">
                {{ stepActive(orderData.status, 4) ? '✓' : '4' }}
              </div>
              <div>
                <h4 class="text-xs uppercase tracking-wider font-bold text-gray-900 mb-1">Delivered</h4>
                <p class="text-xs text-gray-400">Consignment handed off to recipient address.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Estimated Delivery Highlight Strip -->
        <div class="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-amber-600 text-xl">🚚</span>
            <div>
              <span class="text-xs text-gray-500 block">Expected Arrival Window</span>
              <span class="text-sm font-semibold text-gray-900">Within 3-5 business days via standard courier</span>
            </div>
          </div>
          <button @click="contactSupport" class="text-xs text-gray-500 hover:text-gray-900 underline font-medium">
            Report Fulfillment Exception
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const orderId = ref('')
const lastSearchedId = ref('')
const isLoading = ref(false)
const searched = ref(false)
const orderData = ref(null)

const handleTrack = async () => {
  const query = orderId.value.trim()
  if (!query) return

  isLoading.value = true
  searched.value = false
  lastSearchedId.value = query

  try {
    // Demonstration Simulation Mapping
    if (query.toUpperCase() === 'DEMO123') {
      await new Promise(r => setTimeout(r, 600)); // Natural look
      orderData.value = {
        id: 'DEMO-9992026',
        status: 'Shipped',
        order_at: new Date().toISOString()
      }
      searched.value = true
      return
    }

    // Actual DB Lookup Check
    let searchField = query
    // Strip '#' if passed
    if (searchField.startsWith('#')) searchField = searchField.slice(1)

    // Lookup order directly using custom IDs or pattern matching
    const { data, error } = await supabase.from('orders')
      .select('*')
      .ilike('id', `%${searchField}%`)
      .limit(1)
      .single()

    if (data) {
      orderData.value = data
    } else {
      orderData.value = null
    }
  } catch (err) {
    orderData.value = null
  } finally {
    searched.value = true
    isLoading.value = false
  }
}

// Logic Helpers
const formatDate = (isoString) => {
  if (!isoString) return 'recently'
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getStatusBg = (status) => {
  const s = (status || '').toLowerCase()
  if (s.includes('deliver')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
  if (s.includes('ship')) return 'bg-blue-50 text-blue-700 border border-blue-200'
  if (s.includes('paid')) return 'bg-amber-50 text-amber-700 border border-amber-200'
  return 'bg-gray-100 text-gray-700 border border-gray-200'
}

const stepActive = (status, step) => {
  const s = (status || '').toLowerCase()
  if (step === 1) return true
  if (step === 2) return s.includes('paid') || s.includes('ship') || s.includes('deliver')
  if (step === 3) return s.includes('ship') || s.includes('deliver')
  if (step === 4) return s.includes('deliver')
  return false
}

const getProgressLineWidth = (status) => {
  const s = (status || '').toLowerCase()
  if (s.includes('deliver')) return '80%'
  if (s.includes('ship')) return '53%'
  if (s.includes('paid')) return '26%'
  return '0%'
}

const contactSupport = () => {
  const text = `*Fulfillment Exception Request*%0A%0AReference: #${orderData.value?.id || lastSearchedId.value}`
  window.open(`https://wa.me/919895919742?text=${text}`, '_blank')
}
</script>
