<!-- components/WorkoutCard.vue -->
<template>
  <NuxtLink
    :to="to"
    class="group block rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
  >
    <div class="text-left">
      <div class="flex h-full justify-start gap-4">
        <div
          :class="[
            'mb-2 flex h-24 w-12 flex-none items-center justify-center rounded-lg bg-gradient-to-br transition-transform group-hover:scale-105',
            gradient,
          ]"
        >
          <span class="text-xl text-white">{{ icon }}</span>
        </div>
        <div>
          <h3 class="mb-1 text-lg font-medium text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
            {{ description }}
          </p>
        </div>
      </div>
      <div
        class="rounded-lg bg-gray-50 p-2 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
      >
        {{ tags }}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  gradient: { type: String, required: true }, // ex: "from-blue-500 to-indigo-600"
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: String, required: true },
});
</script>
