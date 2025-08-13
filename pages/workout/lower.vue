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
        <ProgressSummary
          :completed-sets="completedSets"
          :total-sets="totalSets"
          :progress-percentage="progressPercentage"
          variant="emerald"
        />

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
import ProgressSummary from '~/components/ProgressSummary.vue';
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
