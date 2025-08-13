<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <!-- Header -->
    <AppHeader
      showBack
      showHistory
      title="Treino Inferior"
      subtitle="5 exercícios • 3 séries cada"
    >
      <div
        v-if="hasSavedData"
        class="mt-4"
      >
        <span
          class="inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300"
        >
          <svg
            class="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          Progresso salvo automaticamente
        </span>
      </div>
    </AppHeader>

    <!-- Workout List -->
    <main class="container mx-auto px-6 py-8">
      <div class="mx-auto max-w-4xl space-y-8">
        <!-- Exercise Cards -->
        <ExerciseCard
          v-for="(exercise, index) in exercises"
          :key="exercise.name"
          :exercise="exercise"
          :index="index"
          variant="emerald"
          @toggle-completed="
            (setIndex) =>
              (exercise.sets[setIndex].completed =
                !exercise.sets[setIndex].completed)
          "
        />

        <!-- Progress Summary -->
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
              <div
                class="mb-2 text-3xl font-light text-gray-900 dark:text-white"
                >{{ completedSets }}</div
              >
              <div class="text-sm text-gray-600 dark:text-gray-300"
                >Séries Concluídas</div
              >
            </div>
            <div class="rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-700">
              <div
                class="mb-2 text-3xl font-light text-gray-900 dark:text-white"
                >{{ totalSets }}</div
              >
              <div class="text-sm text-gray-600 dark:text-gray-300"
                >Total de Séries</div
              >
            </div>
          </div>
          <div class="mb-4 h-3 rounded-full bg-gray-100 dark:bg-gray-600">
            <div
              class="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
          <p class="text-center text-gray-600 dark:text-gray-300">
            {{ progressPercentage }}% concluído
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-4">
          <button
            @click="resetWorkout"
            class="flex-1 rounded-lg border border-gray-200 bg-white py-4 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Reiniciar Treino
          </button>
          <button
            @click="saveWorkout"
            class="flex-1 rounded-lg bg-gray-900 py-4 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Salvar Progresso
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import ExerciseCard from '~/components/ExerciseCard.vue';
const { useWorkoutSession } = useWorkout();
const {
  exercises,
  hasSavedData,
  completedSets,
  totalSets,
  progressPercentage,
  resetWorkout,
  saveProgress,
} = useWorkoutSession('lower');

const saveWorkout = () => {
  const success = saveProgress();
  if (success) {
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '✅ Salvo!';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  }
};
</script>
