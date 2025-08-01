<template>
  <div class="space-y-3">
    <div
      v-for="(set, setIndex) in sets"
      :key="setIndex"
      class="flex flex-wrap items-center space-x-2 sm:space-x-4 bg-gray-50 dark:bg-gray-700 rounded-2xl p-3 sm:p-4"
    >
      <span class="text-gray-700 dark:text-gray-200 font-medium sm:min-w-[80px] text-xs sm:text-base">
        #{{ setIndex + 1 }}
      </span>
      <input
        v-model="set.reps"
        type="number"
        min="1"
        class="bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-900 dark:text-white rounded-xl px-2 sm:px-4 py-2 sm:py-3 w-12 sm:w-24 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-base"
        placeholder="0"
      >
      <span class="text-gray-600 dark:text-gray-300 text-xs sm:text-base">reps</span>
      <input
        v-model="set.kilos"
        type="number"
        min="0"
        step="0.5"
        class="bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-900 dark:text-white rounded-xl px-2 sm:px-4 py-2 sm:py-3 w-12 sm:w-24 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-base"
        placeholder="kg"
      >
      <span class="text-gray-600 dark:text-gray-300 text-xs sm:text-base">kg</span>
      <div class="flex space-x-1 sm:space-x-2 ml-auto">
        <button
          @click="$emit('toggle-completed', setIndex)"
          :class="[
            'px-2 py-1 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200',
            set.completed
              ? 'bg-green-500 text-white shadow-sm'
              : 'bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500'
          ]"
        >
          {{ set.completed ? 'Feito' : 'Marcar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  sets: Array
})
defineEmits(['toggle-completed'])
</script> 