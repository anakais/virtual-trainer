<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Header -->
    <header class="text-center py-12 px-4">
      <div class="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <NuxtLink to="/" class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Voltar
        </NuxtLink>
        <NuxtLink to="/history" class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Histórico
        </NuxtLink>
      </div>
      <h1 class="text-5xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
        Treino Superior
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 font-light">
        5 exercícios • 3 séries cada
      </p>
      <div v-if="hasSavedData" class="mt-4">
        <span class="inline-flex items-center bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Progresso salvo automaticamente
        </span>
      </div>
    </header>

    <!-- Workout List -->
    <main class="container mx-auto px-6 py-8">
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Exercise Cards -->
        <div 
          v-for="(exercise, index) in exercises" 
          :key="exercise.name"
          class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <span class="text-2xl text-white">{{ exercise.emoji }}</span>
              </div>
              <div>
                <h3 class="text-2xl font-medium text-gray-900 dark:text-white">{{ exercise.name }}</h3>
                <p class="text-gray-600 dark:text-gray-300">{{ exercise.description }}</p>
              </div>
            </div>
            <div class="text-3xl font-light text-gray-400 dark:text-gray-500">#{{ index + 1 }}</div>
          </div>

          <!-- Sets Configuration -->
          <div class="space-y-4">
            <div 
              v-for="(set, setIndex) in exercise.sets" 
              :key="setIndex"
              class="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 rounded-2xl p-4"
            >
              <span class="text-gray-700 dark:text-gray-200 font-medium min-w-[80px]">Série {{ setIndex + 1 }}</span>
              <input 
                v-model="set.reps"
                type="number" 
                min="1"
                class="bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-900 dark:text-white rounded-xl px-4 py-3 w-24 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              >
              <span class="text-gray-600 dark:text-gray-300">repetições</span>
              <div class="flex space-x-2 ml-auto">
                <button 
                  @click="set.completed = !set.completed"
                  :class="[
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    set.completed 
                      ? 'bg-green-500 text-white shadow-sm' 
                      : 'bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500'
                  ]"
                >
                  {{ set.completed ? 'Concluído' : 'Marcar' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Exercise Tips -->
          <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
            <p class="text-blue-800 dark:text-blue-200 text-sm flex items-start">
              <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ exercise.tip }}
            </p>
          </div>
        </div>

        <!-- Progress Summary -->
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="w-6 h-6 mr-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Progresso do Treino
          </h3>
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center">
              <div class="text-3xl font-light text-gray-900 dark:text-white mb-2">{{ completedSets }}</div>
              <div class="text-gray-600 dark:text-gray-300 text-sm">Séries Concluídas</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center">
              <div class="text-3xl font-light text-gray-900 dark:text-white mb-2">{{ totalSets }}</div>
              <div class="text-gray-600 dark:text-gray-300 text-sm">Total de Séries</div>
            </div>
          </div>
          <div class="bg-gray-100 dark:bg-gray-600 rounded-full h-3 mb-4">
            <div 
              class="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
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
            class="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-2xl py-4 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Reiniciar Treino
          </button>
          <button 
            @click="saveWorkout"
            class="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl py-4 font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Salvar Progresso
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { loadWorkoutData, saveWorkoutData, hasWorkoutData } = useWorkout()

// Default exercises structure
const defaultExercises = [
  {
    name: 'Pull-ups',
    emoji: '🏋️',
    description: 'Barra fixa - força de tração',
    tip: 'Mantenha o corpo reto e controle o movimento na descida',
    sets: [
      { reps: 8, completed: false },
      { reps: 8, completed: false },
      { reps: 8, completed: false }
    ]
  },
  {
    name: 'Australian Pull-ups',
    emoji: '🤸',
    description: 'Barra baixa - variação mais fácil',
    tip: 'Mantenha o corpo alinhado e puxe até o peito tocar a barra',
    sets: [
      { reps: 12, completed: false },
      { reps: 12, completed: false },
      { reps: 12, completed: false }
    ]
  },
  {
    name: 'Bíceps',
    emoji: '💪',
    description: 'Flexão de cotovelo - isolamento',
    tip: 'Mantenha os cotovelos fixos e controle o movimento',
    sets: [
      { reps: 15, completed: false },
      { reps: 15, completed: false },
      { reps: 15, completed: false }
    ]
  },
  {
    name: 'Push-ups',
    emoji: '🔄',
    description: 'Flexão de braço - peito e tríceps',
    tip: 'Mantenha o corpo reto e desça até quase tocar o chão',
    sets: [
      { reps: 10, completed: false },
      { reps: 10, completed: false },
      { reps: 10, completed: false }
    ]
  },
  {
    name: 'Shoulders',
    emoji: '🏋️',
    description: 'Desenvolvimento - ombros',
    tip: 'Mantenha a postura ereta e controle o movimento',
    sets: [
      { reps: 12, completed: false },
      { reps: 12, completed: false },
      { reps: 12, completed: false }
    ]
  }
]

// Load saved data or use default
const exercises = ref(defaultExercises)

// Load saved workout data on mount
onMounted(() => {
  const savedData = loadWorkoutData('upper')
  if (savedData && savedData.exercises) {
    exercises.value = savedData.exercises
  }
})

// Check if there's saved data
const hasSavedData = computed(() => hasWorkoutData('upper'))

// Auto-save when exercises change
watch(exercises, (newExercises) => {
  saveWorkoutData('upper', newExercises)
}, { deep: true })

const completedSets = computed(() => {
  return exercises.value.reduce((total, exercise) => {
    return total + exercise.sets.filter(set => set.completed).length
  }, 0)
})

const totalSets = computed(() => {
  return exercises.value.reduce((total, exercise) => {
    return total + exercise.sets.length
  }, 0)
})

const progressPercentage = computed(() => {
  return totalSets.value > 0 ? Math.round((completedSets.value / totalSets.value) * 100) : 0
})

const resetWorkout = () => {
  exercises.value.forEach(exercise => {
    exercise.sets.forEach(set => {
      set.completed = false
    })
  })
}

const saveWorkout = () => {
  const success = saveWorkoutData('upper', exercises.value)
  if (success) {
    // Show success message
    const button = event.target
    const originalText = button.textContent
    button.textContent = '✅ Salvo!'
    button.disabled = true
    setTimeout(() => {
      button.textContent = originalText
      button.disabled = false
    }, 2000)
  }
}
</script> 