<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <!-- Header -->
    <header class="px-4 py-12 text-center">
      <NuxtLink
        to="/"
        class="mb-8 inline-flex items-center text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
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
      <h1
        class="mb-4 text-5xl font-light tracking-tight text-gray-900 dark:text-white"
      >
        Histórico de Treinos
      </h1>
      <p class="text-lg font-light text-gray-600 dark:text-gray-300">
        Acompanhe seu progresso e desempenho
      </p>
    </header>

    <!-- Statistics -->
    <main class="container mx-auto px-6 py-8">
      <div class="mx-auto max-w-6xl space-y-8">
        <!-- Overall Stats -->
        <div
          class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <h2
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
            Estatísticas Gerais
          </h2>
          <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div
              class="rounded-2xl bg-gray-50 p-6 text-center dark:bg-gray-700"
            >
              <div
                class="mb-2 text-3xl font-light text-gray-900 dark:text-white"
                >{{ stats.totalWorkouts }}</div
              >
              <div class="text-sm text-gray-600 dark:text-gray-300"
                >Treinos Realizados</div
              >
            </div>
            <div
              class="rounded-2xl bg-gray-50 p-6 text-center dark:bg-gray-700"
            >
              <div
                class="mb-2 text-3xl font-light text-gray-900 dark:text-white"
                >{{ stats.totalCompletedSets }}</div
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
                >{{ stats.totalSets }}</div
              >
              <div class="text-sm text-gray-600 dark:text-gray-300"
                >Total de Séries</div
              >
            </div>
            <div
              class="rounded-2xl bg-gray-50 p-6 text-center dark:bg-gray-700"
            >
              <div
                class="mb-2 text-3xl font-light text-gray-900 dark:text-white"
                >{{ completionRate }}%</div
              >
              <div class="text-sm text-gray-600 dark:text-gray-300"
                >Taxa de Conclusão</div
              >
            </div>
          </div>
          <div
            v-if="stats.lastWorkout"
            class="mt-6 text-center"
          >
            <p class="text-gray-600 dark:text-gray-300">
              Último treino: {{ formatDate(stats.lastWorkout) }}
            </p>
          </div>
        </div>

        <!-- Volume Records -->
        <div
          class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <h2
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            Records de Volume
          </h2>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="section in volumeRecords"
              :key="section.type"
              class="rounded-2xl bg-gray-50 p-6 dark:bg-gray-700"
            >
              <div class="mb-4 flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{
                    section.type === 'upper'
                      ? 'Treino Superior'
                      : 'Treino Inferior'
                  }}
                </h3>
              </div>
              <div class="space-y-3">
                <button
                  v-for="item in section.items"
                  :key="item.name"
                  class="w-full rounded-xl bg-white p-4 dark:bg-gray-600"
                  @click="toggleRecord(section.type, item.name)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <span class="text-lg">{{ item.emoji }}</span>
                      <span class="font-medium text-gray-900 dark:text-white">{{
                        item.name
                      }}</span>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="text-sm text-gray-700 dark:text-gray-200">
                        {{ item.volume || 0 }} kg·reps
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="isRecordExpanded(section.type, item.name)"
                    class="mt-3 grid grid-cols-3 gap-2"
                  >
                    <div
                      v-for="(set, idx) in item.sets"
                      :key="idx"
                      class="rounded-lg bg-gray-50 p-2 text-center dark:bg-gray-700"
                    >
                      <div class="mb-1 text-xs text-gray-500 dark:text-gray-400"
                        >Série {{ idx + 1 }}</div
                      >
                      <div
                        class="font-medium"
                        :class="
                          set.completed
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-400 dark:text-gray-500'
                        "
                      >
                        {{ Number(set.kilos) || 0 }}kg
                        <br />
                        {{ Number(set.reps) || 0 }}×
                      </div>
                      <div
                        class="text-xs"
                        :class="
                          set.completed
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-400 dark:text-gray-500'
                        "
                      >
                        {{ set.completed ? '✓' : '○' }}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Workout History -->
        <div
          class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="mb-6 flex items-center justify-between">
            <h2
              class="flex items-center text-2xl font-medium text-gray-900 dark:text-white"
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Histórico por Dia
            </h2>
            <button
              @click="clearAllData"
              class="inline-flex items-center rounded-xl bg-red-50 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              Limpar Tudo
            </button>
          </div>

          <div
            v-if="Object.keys(groupedWorkouts).length === 0"
            class="py-12 text-center"
          >
            <div
              class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700"
            >
              <svg
                class="h-12 w-12 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <p class="mb-2 text-lg text-gray-600 dark:text-gray-300"
              >Nenhum treino salvo ainda</p
            >
            <p class="text-sm text-gray-500 dark:text-gray-400"
              >Complete alguns treinos para ver seu histórico aqui</p
            >
          </div>

          <div
            v-else
            class="space-y-6"
          >
            <div
              v-for="(dayWorkouts, date) in groupedWorkouts"
              :key="date"
              class="rounded-2xl bg-gray-50 p-6 dark:bg-gray-700"
            >
              <!-- Day Header -->
              <div class="mb-6 flex items-center justify-between">
                <div>
                  <h3
                    class="text-xl font-medium text-gray-900 dark:text-white"
                    >{{ formatDateHeader(date) }}</h3
                  >
                  <p class="text-sm text-gray-600 dark:text-gray-300"
                    >{{ dayWorkouts.length }} treino(s) neste dia</p
                  >
                </div>
                <button
                  @click="toggleDayExpansion(date)"
                  class="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  {{ expandedDays.includes(date) ? 'Ocultar' : 'Ver Detalhes' }}
                </button>
              </div>

              <!-- Day Summary -->
              <div class="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div
                  class="rounded-xl bg-white p-4 text-center dark:bg-gray-600"
                >
                  <div
                    class="mb-1 text-2xl font-light text-gray-900 dark:text-white"
                    >{{ getDayCompletedSets(dayWorkouts) }}</div
                  >
                  <div class="text-xs text-gray-600 dark:text-gray-300"
                    >Séries Concluídas</div
                  >
                </div>
                <div
                  class="rounded-xl bg-white p-4 text-center dark:bg-gray-600"
                >
                  <div
                    class="mb-1 text-2xl font-light text-gray-900 dark:text-white"
                    >{{ getDayTotalSets(dayWorkouts) }}</div
                  >
                  <div class="text-xs text-gray-600 dark:text-gray-300"
                    >Total de Séries</div
                  >
                </div>
                <div
                  class="rounded-xl bg-white p-4 text-center dark:bg-gray-600"
                >
                  <div
                    class="mb-1 text-2xl font-light text-gray-900 dark:text-white"
                    >{{ getDayCompletionRate(dayWorkouts) }}%</div
                  >
                  <div class="text-xs text-gray-600 dark:text-gray-300"
                    >Taxa de Conclusão</div
                  >
                </div>
                <div
                  class="rounded-xl bg-white p-4 text-center dark:bg-gray-600"
                >
                  <div
                    class="mb-1 text-2xl font-light text-gray-900 dark:text-white"
                    >{{ dayWorkouts.length }}</div
                  >
                  <div class="text-xs text-gray-600 dark:text-gray-300"
                    >Treinos</div
                  >
                </div>
              </div>

              <!-- Expanded Details -->
              <div
                v-if="expandedDays.includes(date)"
                class="space-y-4 border-t border-gray-200 pt-6 dark:border-gray-600"
              >
                <div
                  v-for="(workout, index) in dayWorkouts"
                  :key="`${date}-${index}`"
                  class="rounded-xl bg-white p-6 dark:bg-gray-600"
                >
                  <div class="mb-4 flex items-center justify-between">
                    <h4
                      class="flex items-center text-lg font-medium text-gray-900 dark:text-white"
                    >
                      <div
                        class="mr-3 flex h-8 w-8 items-center justify-center rounded-lg"
                        :class="
                          workout.type === 'upper'
                            ? 'bg-blue-100 dark:bg-blue-900'
                            : 'bg-emerald-100 dark:bg-emerald-900'
                        "
                      >
                        <span class="text-sm">{{
                          workout.type === 'upper' ? '💪' : '🦵'
                        }}</span>
                      </div>
                      {{
                        workout.type === 'upper'
                          ? 'Treino Superior'
                          : 'Treino Inferior'
                      }}
                    </h4>
                    <div class="flex space-x-2">
                      <button
                        @click="editWorkout(workout)"
                        class="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                      >
                        <svg
                          class="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </svg>
                        Editar
                      </button>
                      <button
                        @click="deleteWorkout(workout)"
                        class="inline-flex items-center rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                      >
                        <svg
                          class="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                        Apagar
                      </button>
                    </div>
                  </div>

                  <!-- Exercise Details -->
                  <div class="space-y-3">
                    <div
                      v-for="exercise in getWorkoutExercisesWithMeta(workout)"
                      :key="exercise.name"
                      class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
                    >
                      <div class="mb-3 flex items-center justify-between">
                        <span class="font-medium text-gray-900 dark:text-white"
                          >{{ exercise.emoji }} {{ exercise.name }}</span
                        >
                        <span class="text-sm text-gray-600 dark:text-gray-300">
                          {{
                            exercise.sets.filter((s) => s.completed).length
                          }}/{{ exercise.sets.length }} séries
                        </span>
                      </div>
                      <div class="grid grid-cols-3 gap-2">
                        <div
                          v-for="(set, setIndex) in exercise.sets"
                          :key="setIndex"
                          class="rounded-lg bg-white p-2 text-center dark:bg-gray-600"
                        >
                          <div
                            class="mb-1 text-xs text-gray-500 dark:text-gray-400"
                            >Série {{ setIndex + 1 }}</div
                          >
                          <div
                            :class="
                              set.completed
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-gray-400 dark:text-gray-500'
                            "
                            class="font-medium"
                          >
                            {{ set.reps }} reps
                          </div>
                          <div
                            :class="
                              set.completed
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-gray-400 dark:text-gray-500'
                            "
                            class="text-xs"
                          >
                            {{ set.completed ? '✓' : '○' }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div
          class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <h2
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            Ações Rápidas
          </h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NuxtLink
              to="/workout/upper"
              class="rounded-2xl bg-gray-900 p-6 text-center font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Continuar Treino Superior
            </NuxtLink>
            <NuxtLink
              to="/workout/lower"
              class="rounded-2xl bg-gray-900 p-6 text-center font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Continuar Treino Inferior
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const {
  getWorkoutHistory,
  getWorkoutStats,
  clearAllWorkoutData,
  saveWorkoutData,
  getDefaultExercisesMeta,
} = useWorkout();

const workoutHistory = ref({});
const stats = ref({
  totalWorkouts: 0,
  lastWorkout: null,
  totalCompletedSets: 0,
  totalSets: 0,
});

const expandedDays = ref([]);

const completionRate = computed(() => {
  if (stats.value.totalSets === 0) return 0;
  return Math.round(
    (stats.value.totalCompletedSets / stats.value.totalSets) * 100,
  );
});

// Group workouts by date
const groupedWorkouts = computed(() => {
  const grouped = {};
  Object.entries(workoutHistory.value).forEach(([type, workout]) => {
    const date = new Date(workout.lastUpdated).toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push({
      ...workout,
      type,
    });
  });

  // Sort by date (newest first)
  return Object.fromEntries(
    Object.entries(grouped).sort(([a], [b]) => new Date(b) - new Date(a)),
  );
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatDateHeader = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Hoje';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Ontem';
  } else {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
};

const toggleDayExpansion = (date) => {
  const index = expandedDays.value.indexOf(date);
  if (index > -1) {
    expandedDays.value.splice(index, 1);
  } else {
    expandedDays.value.push(date);
  }
};

const getWorkoutExercisesWithMeta = (workout) => {
  const meta = getDefaultExercisesMeta(workout.type);
  const savedByName = Object.fromEntries(
    (workout.exercises || [])
      .filter((e) => e && e.name)
      .map((e) => [e.name, e]),
  );
  return meta.map((m) => {
    const saved = savedByName[m.name];
    return { ...m, sets: saved && saved.sets ? saved.sets : [] };
  });
};

const getDayCompletedSets = (dayWorkouts) => {
  return dayWorkouts.reduce(
    (total, workout) => total + (workout.completedSets || 0),
    0,
  );
};

const getDayTotalSets = (dayWorkouts) => {
  return dayWorkouts.reduce(
    (total, workout) => total + (workout.totalSets || 0),
    0,
  );
};

const getDayCompletionRate = (dayWorkouts) => {
  const completed = getDayCompletedSets(dayWorkouts);
  const total = getDayTotalSets(dayWorkouts);
  return total > 0 ? Math.round((completed / total) * 100) : 0;
};

const editWorkout = (workout) => {
  // Navigate to the workout page with the saved data
  const route = workout.type === 'upper' ? '/workout/upper' : '/workout/lower';
  navigateTo(route);
};

const deleteWorkout = (workout) => {
  if (
    confirm(
      `Tem certeza que deseja apagar o ${workout.type === 'upper' ? 'treino superior' : 'treino inferior'} de ${formatDate(workout.lastUpdated)}?`,
    )
  ) {
    // Remove from localStorage
    if (process.client) {
      localStorage.removeItem(`workout_${workout.type}`);
      loadData();
    }
  }
};

const clearAllData = () => {
  if (confirm('Tem certeza que deseja apagar todo o histórico de treinos?')) {
    clearAllWorkoutData();
    loadData();
  }
};

const loadData = () => {
  workoutHistory.value = getWorkoutHistory();
  stats.value = getWorkoutStats();
};

onMounted(() => {
  loadData();
});

// Build volume records view model
const computeSectionRecords = (type) => {
  const workout = workoutHistory.value[type];
  if (!workout || !workout.recordsVolume) return [];
  const meta = getDefaultExercisesMeta(type);
  const byName = Object.fromEntries(meta.map((m) => [m.name, m]));
  return Object.entries(workout.recordsVolume)
    .map(([name, record]) => {
      const sets = Array.isArray(record.sets) ? record.sets : [];
      const volume = sets.reduce((sum, s) => {
        const reps = Number(s.reps);
        const kilos = Number(s.kilos);
        if (!s.completed || !Number.isFinite(reps) || !Number.isFinite(kilos)) {
          return sum;
        }
        return sum + reps * kilos;
      }, 0);
      return {
        name,
        emoji: byName[name]?.emoji || '🏋️',
        volume,
        sets,
      };
    })
    .sort((a, b) => b.volume - a.volume);
};

const volumeRecords = computed(() => {
  return [
    { type: 'upper', items: computeSectionRecords('upper') },
    { type: 'lower', items: computeSectionRecords('lower') },
  ].filter((s) => s.items.length > 0);
});

// expand/collapse state for records
const expandedRecords = ref({});
const recordKey = (type, name) => `${type}::${name}`;
const isRecordExpanded = (type, name) => {
  return !!expandedRecords.value[recordKey(type, name)];
};
const toggleRecord = (type, name) => {
  const key = recordKey(type, name);
  expandedRecords.value[key] = !expandedRecords.value[key];
};
</script>
