<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
    <!-- Header -->
    <header class="text-center py-6">
      <NuxtLink to="/" class="inline-block mb-4">
        <button class="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white hover:bg-white/30 transition-colors">
          ← Voltar
        </button>
      </NuxtLink>
      <h1 class="text-4xl font-bold text-white mb-2">
        📊 Histórico de Treinos
      </h1>
      <p class="text-lg text-purple-200">
        Acompanhe seu progresso e desempenho
      </p>
    </header>

    <!-- Statistics -->
    <main class="container mx-auto px-4 py-6">
      <div class="max-w-4xl mx-auto space-y-6">
        <!-- Overall Stats -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-4">📈 Estatísticas Gerais</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white/10 rounded-lg p-4 text-center">
              <div class="text-3xl font-bold text-white">{{ stats.totalWorkouts }}</div>
              <div class="text-purple-200 text-sm">Treinos Realizados</div>
            </div>
            <div class="bg-white/10 rounded-lg p-4 text-center">
              <div class="text-3xl font-bold text-white">{{ stats.totalCompletedSets }}</div>
              <div class="text-purple-200 text-sm">Séries Concluídas</div>
            </div>
            <div class="bg-white/10 rounded-lg p-4 text-center">
              <div class="text-3xl font-bold text-white">{{ stats.totalSets }}</div>
              <div class="text-purple-200 text-sm">Total de Séries</div>
            </div>
            <div class="bg-white/10 rounded-lg p-4 text-center">
              <div class="text-3xl font-bold text-white">{{ completionRate }}%</div>
              <div class="text-purple-200 text-sm">Taxa de Conclusão</div>
            </div>
          </div>
          <div v-if="stats.lastWorkout" class="mt-4 text-center">
            <p class="text-purple-200">
              Último treino: {{ formatDate(stats.lastWorkout) }}
            </p>
          </div>
        </div>

        <!-- Workout History -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-white">📋 Histórico por Dia</h2>
            <button 
              @click="clearAllData"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🗑️ Limpar Tudo
            </button>
          </div>
          
          <div v-if="Object.keys(groupedWorkouts).length === 0" class="text-center py-8">
            <div class="text-6xl mb-4">📝</div>
            <p class="text-purple-200 text-lg">Nenhum treino salvo ainda</p>
            <p class="text-purple-300 text-sm">Complete alguns treinos para ver seu histórico aqui</p>
          </div>

          <div v-else class="space-y-4">
            <div 
              v-for="(dayWorkouts, date) in groupedWorkouts" 
              :key="date"
              class="bg-white/5 rounded-lg p-4"
            >
              <!-- Day Header -->
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-xl font-bold text-white">{{ formatDateHeader(date) }}</h3>
                  <p class="text-purple-200 text-sm">{{ dayWorkouts.length }} treino(s) neste dia</p>
                </div>
                <button 
                  @click="toggleDayExpansion(date)"
                  class="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg transition-colors"
                >
                  {{ expandedDays.includes(date) ? '👁️ Ocultar' : '👁️ Ver Detalhes' }}
                </button>
              </div>

              <!-- Day Summary -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">{{ getDayCompletedSets(dayWorkouts) }}</div>
                  <div class="text-purple-200 text-sm">Séries Concluídas</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">{{ getDayTotalSets(dayWorkouts) }}</div>
                  <div class="text-purple-200 text-sm">Total de Séries</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">{{ getDayCompletionRate(dayWorkouts) }}%</div>
                  <div class="text-purple-200 text-sm">Taxa de Conclusão</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">{{ dayWorkouts.length }}</div>
                  <div class="text-purple-200 text-sm">Treinos</div>
                </div>
              </div>

              <!-- Expanded Details -->
              <div v-if="expandedDays.includes(date)" class="space-y-4 border-t border-white/10 pt-4">
                <div 
                  v-for="(workout, index) in dayWorkouts" 
                  :key="`${date}-${index}`"
                  class="bg-white/5 rounded-lg p-4"
                >
                  <div class="flex justify-between items-center mb-3">
                    <h4 class="text-lg font-bold text-white">
                      {{ workout.type === 'upper' ? '💪 Treino Superior' : '🦵 Treino Inferior' }}
                    </h4>
                    <div class="flex space-x-2">
                      <button 
                        @click="editWorkout(workout)"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        @click="deleteWorkout(workout)"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        🗑️ Apagar
                      </button>
                    </div>
                  </div>

                  <!-- Exercise Details -->
                  <div class="space-y-3">
                    <div 
                      v-for="exercise in workout.exercises" 
                      :key="exercise.name"
                      class="bg-white/5 rounded p-3"
                    >
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-white font-semibold">{{ exercise.emoji }} {{ exercise.name }}</span>
                        <span class="text-purple-200 text-sm">
                          {{ exercise.sets.filter(s => s.completed).length }}/{{ exercise.sets.length }} séries
                        </span>
                      </div>
                      <div class="grid grid-cols-3 gap-2">
                        <div 
                          v-for="(set, setIndex) in exercise.sets" 
                          :key="setIndex"
                          class="text-center"
                        >
                          <div class="text-sm text-purple-200">Série {{ setIndex + 1 }}</div>
                          <div :class="set.completed ? 'text-green-400' : 'text-red-400'" class="font-semibold">
                            {{ set.reps }} reps
                          </div>
                          <div :class="set.completed ? 'text-green-400' : 'text-red-400'" class="text-xs">
                            {{ set.completed ? '✓' : '✗' }}
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
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-4">⚡ Ações Rápidas</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink 
              to="/workout/upper"
              class="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-center text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-colors"
            >
              💪 Continuar Treino Superior
            </NuxtLink>
            <NuxtLink 
              to="/workout/lower"
              class="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-4 text-center text-white font-semibold hover:from-green-600 hover:to-teal-600 transition-colors"
            >
              🦵 Continuar Treino Inferior
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