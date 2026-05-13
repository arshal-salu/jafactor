<template>
  <section class="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12 md:mb-16">
        Why Jafactor?
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        <!-- Feature 1: Premium Quality -->
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-4 shadow-sm">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
          <p class="text-gray-600 leading-relaxed text-sm max-w-xs">
            Handpicked products.<br>
            Top-notch materials.<br>
            Built to last.
          </p>
        </div>

        <!-- Feature 2: 24*7 Support -->
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">24*7 Support</h3>
          <p class="text-gray-600 leading-relaxed text-sm max-w-xs mb-3">
            WhatsApp chat anytime.<br>
            Call us day or night.
          </p>
          <a href="https://wa.me/919895919742" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-150">
            Chat Now
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>

        <!-- Feature 3: 7-Day Easy Returns -->
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 shadow-sm">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">7-Day Easy Returns</h3>
          <p class="text-gray-600 leading-relaxed text-sm max-w-xs">
            Try at home for 7 days.<br>
            If you don't love it, return it.<br>
            No questions asked.
          </p>
        </div>

        <!-- Feature 4: Free Delivery -->
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 shadow-sm">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Free Delivery</h3>
          <p class="text-gray-600 leading-relaxed text-sm max-w-xs mb-3">
            Free shipping on all orders.<br>
            Kerala-wide delivery.
          </p>
          <button @click="handleCheckPincode" class="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors duration-150">
            Check Pincode
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const handleCheckPincode = () => {
  const pincode = prompt('Enter your 6-digit Pincode:')
  if (pincode) {
    if (/^\d{6}$/.test(pincode)) {
      alert(`Great news! Delivery is available to Kerala Pincode ${pincode} within 2-3 business days.`)
    } else {
      alert('Please enter a valid 6-digit numeric pincode.')
    }
  }
}
</script>
