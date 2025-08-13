<template>
  <div
    class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
  >
    <h3
      class="mb-6 flex items-center text-2xl font-medium text-gray-900 dark:text-white"
    >
      <svg
        class="mr-3 h-6 w-6 text-gray-600 dark:text-gray-400"
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
      Progresso do Treino
    </h3>
    <div class="mb-6 grid grid-cols-2 gap-6">
      <div class="rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-700">
        <div class="mb-2 text-3xl font-light text-gray-900 dark:text-white">
          {{ completedSets }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-300"
          >Séries Concluídas</div
        >
      </div>
      <div class="rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-700">
        <div class="mb-2 text-3xl font-light text-gray-900 dark:text-white">
          {{ totalSets }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-300"
          >Total de Séries</div
        >
      </div>
    </div>
    <div class="mb-4 h-3 rounded-full bg-gray-100 dark:bg-gray-600">
      <div
        :class="[
          'h-3 rounded-full bg-gradient-to-r transition-all duration-300',
          progressGradient,
        ]"
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>
    <p class="text-center text-gray-600 dark:text-gray-300">
      {{ progressPercentage }}% concluído
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  completedSets: { type: Number, required: true },
  totalSets: { type: Number, required: true },
  progressPercentage: { type: Number, required: true },
  variant: { type: String, default: 'emerald' }, // 'emerald' | 'blue'
});

const progressGradient = computed(() => {
  if (props.variant === 'blue') return 'from-blue-500 to-indigo-600';
  return 'from-emerald-500 to-teal-600';
});
</script>
