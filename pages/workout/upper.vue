<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900">
    <!-- Header -->
    <header class="text-center py-6">
      <div class="flex justify-between items-center mb-4">
        <NuxtLink to="/" class="inline-block">
          <button class="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white hover:bg-white/30 transition-colors">
            ← Voltar
          </button>
        </NuxtLink>
        <NuxtLink to="/history" class="inline-block">
          <button class="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white hover:bg-white/30 transition-colors">
            📊 Histórico
          </button>
        </NuxtLink>
      </div>
      <h1 class="text-4xl font-bold text-white mb-2">
        💪 Treino Superior
      </h1>
      <p class="text-lg text-orange-200">
        5 exercícios • 3 séries cada
      </p>
      <div v-if="hasSavedData" class="mt-2">
        <span class="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
          💾 Progresso salvo automaticamente
        </span>
      </div>
    </header>

    <!-- Workout List -->
    <main class="container mx-auto px-4 py-6">
      <div class="max-w-3xl mx-auto space-y-6">
        <!-- Exercise Cards -->
        <div 
          v-for="(exercise, index) in exercises" 
          :key="exercise.name"
          class="bg-white/10 backdrop-blur-sm rounded-xl p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <div class="text-3xl">{{ exercise.emoji }}</div>
              <div>
                <h3 class="text-xl font-bold text-white">{{ exercise.name }}</h3>
                <p class="text-orange-200 text-sm">{{ exercise.description }}</p>
              </div>
            </div>
            <div class="text-2xl font-bold text-white">#{{ index + 1 }}</div>
          </div>

          <!-- Sets Configuration -->
          <div class="space-y-3">
            <div 
              v-for="(set, setIndex) in exercise.sets" 
              :key="setIndex"
              class="flex items-center space-x-4 bg-white/5 rounded-lg p-3"
            >
              <span class="text-white font-semibold min-w-[60px]">Série {{ setIndex + 1 }}:</span>
              <input 
                v-model="set.reps"
                type="number" 
                min="1"
                class="bg-white/20 text-white rounded-lg px-3 py-2 w-20 text-center focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="0"
              >
              <span class="text-orange-200">repetições</span>
              <div class="flex space-x-2 ml-auto">
                <button 
                  @click="set.completed = !set.completed"
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-semibold transition-colors',
                    set.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  ]"
                >
                  {{ set.completed ? '✓ Feito' : 'Marcar' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Exercise Tips -->
          <div class="mt-4 p-3 bg-orange-500/20 rounded-lg">
            <p class="text-orange-100 text-sm">
              💡 <strong>Dica:</strong> {{ exercise.tip }}
            </p>
          </div>
        </div>

        <!-- Progress Summary -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-4">📊 Progresso do Treino</h3>
          <div class="grid grid-cols-2 gap-4 text-center">
            <div class="bg-white/10 rounded-lg p-4">
              <div class="text-2xl font-bold text-white">{{ completedSets }}</div>
              <div class="text-orange-200 text-sm">Séries Concluídas</div>
            </div>
            <div class="bg-white/10 rounded-lg p-4">
              <div class="text-2xl font-bold text-white">{{ totalSets }}</div>
              <div class="text-orange-200 text-sm">Total de Séries</div>
            </div>
          </div>
          <div class="mt-4 bg-white/10 rounded-full h-3">
            <div 
              class="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-300"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
          <p class="text-center text-orange-200 mt-2">
            {{ progressPercentage }}% concluído
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-4">
          <button 
            @click="resetWorkout"
            class="flex-1 bg-white/20 backdrop-blur-sm rounded-xl py-3 text-white font-semibold hover:bg-white/30 transition-colors"
          >
            🔄 Reiniciar Treino
          </button>
          <button 
            @click="saveWorkout"
            class="flex-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl py-3 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-colors"
          >
            💾 Salvar Progresso
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