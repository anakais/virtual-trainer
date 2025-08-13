<!-- components/AppHeader.vue -->
<template>
  <header class="px-4 pb-4 pt-16 text-center">
    <div
      v-if="showBack || showHistory"
      class="mx-auto mb-8 flex max-w-4xl items-center justify-between"
    >
      <NuxtLink
        v-if="showBack"
        :to="backTo"
        class="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        <svg
          class="mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Voltar
      </NuxtLink>

      <NuxtLink
        v-if="showHistory"
        :to="historyTo"
        class="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        <svg
          class="mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
        Histórico
      </NuxtLink>
    </div>

    <h1
      class="mb-2 text-4xl font-light tracking-tight text-gray-900 dark:text-white lg:text-6xl"
    >
      {{ title }}
    </h1>
    <p
      v-if="subtitle"
      class="text-base font-light text-gray-600 dark:text-gray-300 lg:text-xl"
    >
      {{ subtitle }}
    </p>

    <slot />
  </header>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  showBack: { type: Boolean, default: false },
  backTo: { type: String, default: '/' },
  showHistory: { type: Boolean, default: false },
  historyTo: { type: String, default: '/history' },
});
</script>
