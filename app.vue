<template>
  <div>
    <!-- Theme Toggle Button -->
    <button 
      @click="toggleTheme"
      class="fixed top-4 right-4 z-50 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-xl transition-all duration-300"
      :title="isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'"
    >
      <!-- Sun Icon (Light Mode) -->
      <svg 
        v-if="isDark" 
        class="w-6 h-6 text-yellow-500" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
      <!-- Moon Icon (Dark Mode) -->
      <svg 
        v-else 
        class="w-6 h-6 text-gray-700" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
      </svg>
    </button>

    <NuxtPage />
  </div>
</template>

<script setup>
const { isDark, toggleTheme, initTheme, watchSystemTheme } = useTheme()

onMounted(() => {
  initTheme()
  watchSystemTheme()
})
</script> 