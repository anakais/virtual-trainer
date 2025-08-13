<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <!-- Header -->
    <header class="px-4 py-12 text-center">
      <div class="mx-auto mb-8 flex max-w-4xl items-center justify-between">
        <NuxtLink
          to="/"
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
          to="/history"
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
        class="mb-4 text-5xl font-light tracking-tight text-gray-900 dark:text-white"
      >
        Treino Superior
      </h1>
      <p class="text-lg font-light text-gray-600 dark:text-gray-300">
        5 exercícios • 3 séries cada
      </p>
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
    </header>

    <!-- Workout List -->
    <main class="container mx-auto px-6 py-8">
      <div class="mx-auto max-w-4xl space-y-8">
        <!-- Exercise Cards -->
        <div
          v-for="(exercise, index) in exercises"
          :key="exercise.name"
          class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600"
              >
                <span class="text-2xl text-white">{{ exercise.emoji }}</span>
              </div>
              <div>
                <h3
                  class="text-2xl font-medium text-gray-900 dark:text-white"
                  >{{ exercise.name }}</h3
                >
                <p class="text-gray-600 dark:text-gray-300">{{
                  exercise.description
                }}</p>
              </div>
            </div>
            <div class="text-3xl font-light text-gray-400 dark:text-gray-500"
              >#{{ index + 1 }}</div
            >
          </div>

          <!-- Sets Configuration -->
          <ExerciseSets
            :sets="exercise.sets"
            @toggle-completed="
              (setIndex) =>
                (exercise.sets[setIndex].completed =
                  !exercise.sets[setIndex].completed)
            "
          />

          <!-- Exercise Tips -->
          <div class="mt-6 rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/30">
            <p
              class="flex items-start text-sm text-blue-800 dark:text-blue-200"
            >
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

        <!-- Progress Summary -->
        <div
          class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
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
            <div
              class="rounded-2xl bg-gray-50 p-6 text-center dark:bg-gray-700"
            >
              <div
                class="mb-2 text-3xl font-light text-gray-900 dark:text-white"
                >{{ completedSets }}</div
              >
              <div class="text-sm text-gray-600 dark:text-gray-300"
                >Séries Concluídas</div
              >
            </div>
            <div
              class="rounded-2xl bg-gray-50 p-6 text-center dark:bg-gray-700"
            >
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
              class="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
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
            class="flex-1 rounded-2xl border border-gray-200 bg-white py-4 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Reiniciar Treino
          </button>
          <button
            @click="saveWorkout"
            class="flex-1 rounded-2xl bg-gray-900 py-4 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Salvar Progresso
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import ExerciseSets from '~/components/ExerciseSets.vue';
const {
  loadWorkoutData,
  saveWorkoutData,
  hasWorkoutData,
  getExercisesWithSaved,
} = useWorkout();

// Load saved data if exists, otherwise defaults
const exercises = ref(getExercisesWithSaved('upper'));

// Load saved workout data on mount
onMounted(() => {
  // refresh in case storage changed after mount
  exercises.value = getExercisesWithSaved('upper');
});

// Check if there's saved data
const hasSavedData = computed(() => hasWorkoutData('upper'));

// Auto-save when exercises change
watch(
  exercises,
  (newExercises) => {
    saveWorkoutData('upper', newExercises);
  },
  { deep: true },
);

const completedSets = computed(() => {
  return exercises.value.reduce((total, exercise) => {
    return total + exercise.sets.filter((set) => set.completed).length;
  }, 0);
});

const totalSets = computed(() => {
  return exercises.value.reduce((total, exercise) => {
    return total + exercise.sets.length;
  }, 0);
});

const progressPercentage = computed(() => {
  return totalSets.value > 0
    ? Math.round((completedSets.value / totalSets.value) * 100)
    : 0;
});

const resetWorkout = () => {
  exercises.value.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      set.completed = false;
    });
  });
};

const saveWorkout = () => {
  const success = saveWorkoutData('upper', exercises.value);
  if (success) {
    // Show success message
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
