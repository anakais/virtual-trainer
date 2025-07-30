<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Header -->
    <header class="text-center py-12 px-4">
      <NuxtLink to="/" class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Voltar
      </NuxtLink>
      <h1 class="text-5xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
        Histórico de Treinos
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 font-light">
        Acompanhe seu progresso e desempenho
      </p>
    </header>

    <!-- Statistics -->
    <main class="container mx-auto px-6 py-8">
      <div class="max-w-6xl mx-auto space-y-8">
        <!-- Overall Stats -->
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 class="text-2xl font-medium text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="w-6 h-6 mr-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Estatísticas Gerais
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center">
              <div class="text-3xl font-light text-gray-900 dark:text-white mb-2">{{ stats.totalWorkouts }}</div>
              <div class="text-gray-600 dark:text-gray-300 text-sm">Treinos Realizados</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center">
              <div class="text-3xl font-light text-gray-900 dark:text-white mb-2">{{ stats.totalCompletedSets }}</div>
              <div class="text-gray-600 dark:text-gray-300 text-sm">Séries Concluídas</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center">
              <div class="text-3xl font-light text-gray-900 dark:text-white mb-2">{{ stats.totalSets }}</div>
              <div class="text-gray-600 dark:text-gray-300 text-sm">Total de Séries</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center">
              <div class="text-3xl font-light text-gray-900 dark:text-white mb-2">{{ completionRate }}%</div>
              <div class="text-gray-600 dark:text-gray-300 text-sm">Taxa de Conclusão</div>
            </div>
          </div>
          <div v-if="stats.lastWorkout" class="mt-6 text-center">
            <p class="text-gray-600 dark:text-gray-300">
              Último treino: {{ formatDate(stats.lastWorkout) }}
            </p>
          </div>
        </div>

        <!-- Workout History -->
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-medium text-gray-900 dark:text-white flex items-center">
              <svg class="w-6 h-6 mr-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Histórico por Dia
            </h2>
            <button 
              @click="clearAllData"
              class="inline-flex items-center bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Limpar Tudo
            </button>
          </div>
          
          <div v-if="Object.keys(groupedWorkouts).length === 0" class="text-center py-12">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-lg mb-2">Nenhum treino salvo ainda</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Complete alguns treinos para ver seu histórico aqui</p>
          </div>

          <div v-else class="space-y-6">
            <div 
              v-for="(dayWorkouts, date) in groupedWorkouts" 
              :key="date"
              class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6"
            >
              <!-- Day Header -->
              <div class="flex justify-between items-center mb-6">
                <div>
                  <h3 class="text-xl font-medium text-gray-900 dark:text-white">{{ formatDateHeader(date) }}</h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">{{ dayWorkouts.length }} treino(s) neste dia</p>
                </div>
                <button 
                  @click="toggleDayExpansion(date)"
                  class="inline-flex items-center bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  {{ expandedDays.includes(date) ? 'Ocultar' : 'Ver Detalhes' }}
                </button>
              </div>

              <!-- Day Summary -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white dark:bg-gray-600 rounded-xl p-4 text-center">
                  <div class="text-2xl font-light text-gray-900 dark:text-white mb-1">{{ getDayCompletedSets(dayWorkouts) }}</div>
                  <div class="text-gray-600 dark:text-gray-300 text-xs">Séries Concluídas</div>
                </div>
                <div class="bg-white dark:bg-gray-600 rounded-xl p-4 text-center">
                  <div class="text-2xl font-light text-gray-900 dark:text-white mb-1">{{ getDayTotalSets(dayWorkouts) }}</div>
                  <div class="text-gray-600 dark:text-gray-300 text-xs">Total de Séries</div>
                </div>
                <div class="bg-white dark:bg-gray-600 rounded-xl p-4 text-center">
                  <div class="text-2xl font-light text-gray-900 dark:text-white mb-1">{{ getDayCompletionRate(dayWorkouts) }}%</div>
                  <div class="text-gray-600 dark:text-gray-300 text-xs">Taxa de Conclusão</div>
                </div>
                <div class="bg-white dark:bg-gray-600 rounded-xl p-4 text-center">
                  <div class="text-2xl font-light text-gray-900 dark:text-white mb-1">{{ dayWorkouts.length }}</div>
                  <div class="text-gray-600 dark:text-gray-300 text-xs">Treinos</div>
                </div>
              </div>

              <!-- Expanded Details -->
              <div v-if="expandedDays.includes(date)" class="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-6">
                <div 
                  v-for="(workout, index) in dayWorkouts" 
                  :key="`${date}-${index}`"
                  class="bg-white dark:bg-gray-600 rounded-xl p-6"
                >
                  <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                      <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3" 
                           :class="workout.type === 'upper' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-emerald-100 dark:bg-emerald-900'">
                        <span class="text-sm">{{ workout.type === 'upper' ? '💪' : '🦵' }}</span>
                      </div>
                      {{ workout.type === 'upper' ? 'Treino Superior' : 'Treino Inferior' }}
                    </h4>
                    <div class="flex space-x-2">
                      <button 
                        @click="editWorkout(workout)"
                        class="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Editar
                      </button>
                      <button 
                        @click="deleteWorkout(workout)"
                        class="inline-flex items-center bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Apagar
                      </button>
                    </div>
                  </div>

                  <!-- Exercise Details -->
                  <div class="space-y-3">
                    <div 
                      v-for="exercise in workout.exercises" 
                      :key="exercise.name"
                      class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                    >
                      <div class="flex justify-between items-center mb-3">
                        <span class="text-gray-900 dark:text-white font-medium">{{ exercise.emoji }} {{ exercise.name }}</span>
                        <span class="text-gray-600 dark:text-gray-300 text-sm">
                          {{ exercise.sets.filter(s => s.completed).length }}/{{ exercise.sets.length }} séries
                        </span>
                      </div>
                      <div class="grid grid-cols-3 gap-2">
                        <div 
                          v-for="(set, setIndex) in exercise.sets" 
                          :key="setIndex"
                          class="text-center bg-white dark:bg-gray-600 rounded-lg p-2"
                        >
                          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Série {{ setIndex + 1 }}</div>
                          <div :class="set.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'" class="font-medium">
                            {{ set.reps }} reps
                          </div>
                          <div :class="set.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'" class="text-xs">
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
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 class="text-2xl font-medium text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="w-6 h-6 mr-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Ações Rápidas
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink 
              to="/workout/upper"
              class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl p-6 text-center font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Continuar Treino Superior
            </NuxtLink>
            <NuxtLink 
              to="/workout/lower"
              class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl p-6 text-center font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
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
const { getWorkoutHistory, getWorkoutStats, clearAllWorkoutData, saveWorkoutData } = useWorkout()

const workoutHistory = ref({})
const stats = ref({
  totalWorkouts: 0,
  lastWorkout: null,
  totalCompletedSets: 0,
  totalSets: 0
})

const expandedDays = ref([])

const completionRate = computed(() => {
  if (stats.value.totalSets === 0) return 0
  return Math.round((stats.value.totalCompletedSets / stats.value.totalSets) * 100)
})

// Group workouts by date
const groupedWorkouts = computed(() => {
  const grouped = {}
  Object.entries(workoutHistory.value).forEach(([type, workout]) => {
    const date = new Date(workout.lastUpdated).toDateString()
    if (!grouped[date]) {
      grouped[date] = []
    }
    grouped[date].push({
      ...workout,
      type
    })
  })
  
  // Sort by date (newest first)
  return Object.fromEntries(
    Object.entries(grouped).sort(([a], [b]) => new Date(b) - new Date(a))
  )
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDateHeader = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Hoje'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Ontem'
  } else {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
}

const toggleDayExpansion = (date) => {
  const index = expandedDays.value.indexOf(date)
  if (index > -1) {
    expandedDays.value.splice(index, 1)
  } else {
    expandedDays.value.push(date)
  }
}

const getDayCompletedSets = (dayWorkouts) => {
  return dayWorkouts.reduce((total, workout) => total + (workout.completedSets || 0), 0)
}

const getDayTotalSets = (dayWorkouts) => {
  return dayWorkouts.reduce((total, workout) => total + (workout.totalSets || 0), 0)
}

const getDayCompletionRate = (dayWorkouts) => {
  const completed = getDayCompletedSets(dayWorkouts)
  const total = getDayTotalSets(dayWorkouts)
  return total > 0 ? Math.round((completed / total) * 100) : 0
}

const editWorkout = (workout) => {
  // Navigate to the workout page with the saved data
  const route = workout.type === 'upper' ? '/workout/upper' : '/workout/lower'
  navigateTo(route)
}

const deleteWorkout = (workout) => {
  if (confirm(`Tem certeza que deseja apagar o ${workout.type === 'upper' ? 'treino superior' : 'treino inferior'} de ${formatDate(workout.lastUpdated)}?`)) {
    // Remove from localStorage
    if (process.client) {
      localStorage.removeItem(`workout_${workout.type}`)
      loadData()
    }
  }
}

const clearAllData = () => {
  if (confirm('Tem certeza que deseja apagar todo o histórico de treinos?')) {
    clearAllWorkoutData()
    loadData()
  }
}

const loadData = () => {
  workoutHistory.value = getWorkoutHistory()
  stats.value = getWorkoutStats()
}

onMounted(() => {
  loadData()
})
</script> 