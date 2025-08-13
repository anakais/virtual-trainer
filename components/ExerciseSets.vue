<template>
  <div class="space-y-3">
    <div
      v-for="(set, setIndex) in sets"
      :key="setIndex"
      class="flex flex-wrap items-center space-x-2 rounded-2xl bg-gray-50 p-3 dark:bg-gray-700 sm:space-x-4 sm:p-4"
    >
      <span
        class="text-xs font-medium text-gray-700 dark:text-gray-200 sm:min-w-[80px] sm:text-base"
      >
        #{{ setIndex + 1 }}
      </span>
      <input
        v-model="set.reps"
        type="number"
        min="1"
        class="w-14 rounded-xl border border-gray-200 bg-white px-2 py-2 text-center text-base text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white sm:w-24 sm:px-4 sm:py-3"
        placeholder="0"
      />
      <span class="text-xs text-gray-600 dark:text-gray-300 sm:text-base"
        >reps</span
      >
      <input
        v-model="set.kilos"
        type="number"
        min="0"
        step="0.5"
        class="w-14 rounded-xl border border-gray-200 bg-white px-2 py-2 text-center text-base text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white sm:w-24 sm:px-4 sm:py-3"
        placeholder="kg"
      />
      <span class="text-xs text-gray-600 dark:text-gray-300 sm:text-base"
        >kg</span
      >
      <div class="ml-auto flex items-center space-x-1 sm:space-x-2">
        <button
          @click="handleButtonClick(setIndex)"
          :class="[
            'rounded-xl px-2 py-1 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm',
            set.completed
              ? 'bg-green-500 text-white shadow-sm'
              : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500',
          ]"
        >
          <span
            v-if="timers[setIndex] && timers[setIndex].running"
            class="text-xs text-yellow-500 dark:text-yellow-400 sm:text-sm"
          >
            {{ timers[setIndex].remaining }}s
          </span>
          <template v-else>
            {{ set.completed ? 'Feito' : 'Marcar' }}
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onUnmounted } from 'vue';

const props = defineProps({
  sets: Array,
});
const emit = defineEmits(['toggle-completed']);

// Timer state for each set
const timers = reactive([]);
let timerIntervals = [];

function handleButtonClick(setIndex) {
  // Emit original event
  emit('toggle-completed', setIndex);
  // Start timer if not already running
  if (
    (!timers[setIndex] || !timers[setIndex].running) &&
    props.sets[setIndex].completed
  ) {
    startTimer(setIndex);
  }
}

function startTimer(setIndex) {
  timers[setIndex] = { running: true, remaining: 45 };
  if (timerIntervals[setIndex]) clearInterval(timerIntervals[setIndex]);
  timerIntervals[setIndex] = setInterval(() => {
    if (timers[setIndex].remaining > 0) {
      timers[setIndex].remaining--;
    } else {
      timers[setIndex].running = false;
      clearInterval(timerIntervals[setIndex]);
      beep();
    }
  }, 1000);
}

function beep() {
  // Simple beep using Web Audio API
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 432;
    oscillator.connect(ctx.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      ctx.close();
    }, 300);
  } catch (e) {}
}

onUnmounted(() => {
  timerIntervals.forEach((i) => clearInterval(i));
});
</script>
