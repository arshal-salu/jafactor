<template>
  <section class="bg-zinc-950 py-20 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 relative overflow-hidden">
    <!-- Subtle Golden Glow Background Effect -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-3xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <span class="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-3">
          Bespoke Concierge
        </span>
        <h2 class="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight mb-4 font-serif">
          Have a Custom Enquiry?
        </h2>
        <div class="w-12 h-[1px] bg-amber-500/40 mx-auto mb-4"></div>
        <p class="text-zinc-400 text-sm md:text-base max-w-md mx-auto font-light leading-relaxed">
          Commission bulk orders, tailored alterations, or request detailed product provenance directly with our dedicated client consultants.
        </p>
      </div>

      <!-- Luxury Form Wrapper -->
      <div class="bg-zinc-900/80 backdrop-blur-md p-8 md:p-14 rounded-xl border border-zinc-800/80 shadow-2xl">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Name Input -->
            <div class="relative">
              <label class="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                Client Name
              </label>
              <input 
                v-model="form.name" 
                type="text" 
                required 
                placeholder="Lord / Lady Sterling"
                class="w-full px-4 py-3 bg-zinc-950/60 rounded-none border-b border-zinc-800 text-zinc-100 placeholder-zinc-700 focus:border-amber-400 focus:outline-none transition-colors text-sm font-light"
              >
            </div>
            
            <!-- Phone Input -->
            <div class="relative">
              <label class="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                Direct Contact
              </label>
              <input 
                v-model="form.phone" 
                type="tel" 
                required 
                placeholder="+91 98959 19742"
                class="w-full px-4 py-3 bg-zinc-950/60 rounded-none border-b border-zinc-800 text-zinc-100 placeholder-zinc-700 focus:border-amber-400 focus:outline-none transition-colors text-sm font-light"
              >
            </div>
          </div>

          <!-- Message Input -->
          <div class="relative">
            <label class="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
              Commission Outline
            </label>
            <textarea 
              v-model="form.message" 
              rows="4" 
              required 
              placeholder="Detail your exact material selections, sizing parameters, or delivery timetables..."
              class="w-full px-4 py-3 bg-zinc-950/60 rounded-none border-b border-zinc-800 text-zinc-100 placeholder-zinc-700 focus:border-amber-400 focus:outline-none transition-colors text-sm font-light resize-none"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="pt-4 text-center">
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="group relative inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 tracking-[0.15em] uppercase text-xs transition-all duration-300 w-full md:w-auto min-w-[280px] disabled:opacity-50 disabled:cursor-wait"
            >
              <!-- Elegant Golden Shimmer Line Effect -->
              <span class="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              
              <!-- Refined WhatsApp Icon -->
              <svg v-if="!isSubmitting" class="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.882-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span v-if="!isSubmitting">Dispatch via Consultant</span>
              <span v-else>Transmitting Commission...</span>
            </button>
          </div>
        </form>
      </div>
      
      <!-- Footer Confidence Note -->
      <p class="text-center text-zinc-600 text-xs tracking-wider uppercase mt-6 font-light">
        Encrypted direct peer-to-peer transmission
      </p>
    </div>
  </section>
</template>

<script setup>
const supabase = useSupabaseClient()
const isSubmitting = ref(false)

const form = reactive({
  name: '',
  phone: '',
  message: ''
})

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Simultaneously record into 'enquiries' table in Supabase
    await supabase.from('enquiries').insert([{
      name: form.name,
      phone: form.phone,
      message: form.message,
      created_at: new Date().toISOString()
    }])
  } catch (err) {
    console.error('Non-blocking DB archive log failed:', err.message)
  }

  // Format the message content beautifully for WhatsApp
  const text = `*✦ Jafactor Bespoke Commission ✦*%0A%0A*Patron:* ${form.name}%0A*Contact:* ${form.phone}%0A*Directives:* ${form.message}`
  const whatsappUrl = `https://wa.me/919895919742?text=${text}`
  
  // Open WhatsApp instantly
  window.open(whatsappUrl, '_blank')
  
  // Reset
  form.message = ''
  isSubmitting.value = false
}
</script>
