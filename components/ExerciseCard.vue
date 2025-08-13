<template>
  <div
    class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div
          :class="[
            'flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br',
            emojiGradient,
          ]"
        >
          <span class="text-2xl text-white">{{ exercise.emoji }}</span>
        </div>
        <div>
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            {{ exercise.name }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ exercise.description }}
          </p>
        </div>
      </div>
      <div class="text-2xl font-light text-gray-400 dark:text-gray-500"
        >#{{ index + 1 }}</div
      >
    </div>

    <ExerciseSets
      :sets="exercise.sets"
      @toggle-completed="onToggleCompleted"
    />

    <div :class="['mt-6 rounded-lg p-4', tipContainerBg]">
      <p :class="['flex items-start text-xs', tipTextColor]">
        <svg
          class="mr-2 mt-0.5 h-5 w-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        {{ exercise.tip }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  exercise: { type: Object, required: true },
  index: { type: Number, required: true },
  variant: { type: String, default: 'emerald' }, // 'emerald' | 'blue'
});

const emit = defineEmits(['toggle-completed']);

import ExerciseSets from '~/components/ExerciseSets.vue';

const emojiGradient = computed(() => {
  if (props.variant === 'blue') return 'from-blue-500 to-indigo-600';
  return 'from-emerald-500 to-teal-600';
});

const tipContainerBg = computed(() => {
  if (props.variant === 'blue') return 'bg-blue-50 dark:bg-blue-900/30';
  return 'bg-emerald-50 dark:bg-emerald-900/30';
});

const tipTextColor = computed(() => {
  if (props.variant === 'blue') return 'text-blue-800 dark:text-blue-200';
  return 'text-emerald-800 dark:text-emerald-200';
});

function onToggleCompleted(setIndex) {
  emit('toggle-completed', setIndex);
}
</script>
