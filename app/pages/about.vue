<template>
  <div class="min-h-screen bg-white pt-32 pb-24">
    <!-- Header Hero Banner -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
      <span class="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold block mb-3">
        Global Master Curation
      </span>
      <h1 class="text-4xl md:text-6xl font-serif font-light text-gray-900 tracking-tight mb-6">
        The Jafactor Standard
      </h1>
      <div class="w-16 h-[1px] bg-amber-600 mx-auto mb-6"></div>
      <p class="text-gray-600 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
        We bridge the gap between global manufacturing innovation and direct consumer reach. Jafactor curates definitive lifestyle essentials, state-of-the-art smart technology, and premium household aesthetics into one unified storefront.
      </p>
    </div>

    <!-- Image Grid Split Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Modern Lifestyle / Multi-Category Conceptual Image -->
        <div class="aspect-[4/5] bg-gray-100 overflow-hidden rounded-xl shadow-lg relative group">
          <img 
            src="/images/about_premium.png" 
            alt="Curated premium product indexing" 
            class="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-all duration-1000"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
        
        <div class="space-y-8 lg:pl-8">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-1">01 / Indexing</span>
            <h2 class="text-2xl md:text-3xl font-serif text-gray-900">Universal Catalog Reach</h2>
            <p class="text-gray-600 text-sm md:text-base font-light leading-relaxed mt-3">
              Our scouting frameworks monitor global lifestyle indices daily. From intelligent home electronics and cutting-edge gadgetry to everyday personal care enhancements, we source elite products directly from highly rated Tier-1 manufacturing facilities.
            </p>
          </div>

          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-1">02 / Logistics</span>
            <h2 class="text-2xl md:text-3xl font-serif text-gray-900">Direct-to-Door Fulfillment</h2>
            <p class="text-gray-600 text-sm md:text-base font-light leading-relaxed mt-3">
              Operating on an optimized international dropshipping model, we eliminate excessive regional storage timelines and wholesale middleman layers. Orders flow immediately from source origin directly to your localized destination address with fully insured handling.
            </p>
          </div>

          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-1">03 / Standards</span>
            <h2 class="text-2xl md:text-3xl font-serif text-gray-900">Verified Quality Parameters</h2>
            <p class="text-gray-600 text-sm md:text-base font-light leading-relaxed mt-3">
              A diverse catalog demands structured vetting. Every registered partner factory in our direct fulfillment loop is systematically checked for sustained component quality, secure transport packaging compliance, and consistent delivery speed metrics.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats / Trust Banner -->
    <div class="bg-gray-50 py-16 border-y border-gray-100 mb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <span class="text-3xl md:text-4xl font-serif font-bold text-gray-900 block mb-1">Tier-1</span>
          <span class="text-xs uppercase tracking-wider text-gray-500">Source Ateliers</span>
        </div>
        <div>
          <span class="text-3xl md:text-4xl font-serif font-bold text-gray-900 block mb-1">Direct</span>
          <span class="text-xs uppercase tracking-wider text-gray-500">Global Dispatch Loop</span>
        </div>
        <div>
          <span class="text-3xl md:text-4xl font-serif font-bold text-gray-900 block mb-1">24 hr</span>
          <span class="text-xs uppercase tracking-wider text-gray-500">Care Availability</span>
        </div>
        <div>
          <span class="text-3xl md:text-4xl font-serif font-bold text-gray-900 block mb-1">Infinite</span>
          <span class="text-xs uppercase tracking-wider text-gray-500">Category Access</span>
        </div>
      </div>
    </div>

    <!-- Direct Contact Outro -->
    <div class="max-w-3xl mx-auto text-center px-4">
      <h3 class="text-xl md:text-2xl font-serif text-gray-900 mb-2">Request Unlisted Offerings</h3>
      <p class="text-gray-600 text-sm font-light mb-6">
        Looking for a highly specific global item or seeking dropshipping partnerships?
      </p>
      <NuxtLink 
        to="/#enquiry" 
        @click="scrollToEnquiry"
        class="inline-block bg-gray-900 hover:bg-black text-white font-medium text-xs uppercase tracking-widest py-3 px-8 rounded-none transition-colors"
      >
        Liaise With Consultation Desk
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const scrollToEnquiry = () => {
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight - 1400, behavior: 'smooth' })
  }, 100)
}
</script>
