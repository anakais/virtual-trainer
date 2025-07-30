<template>
  <div class="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900">
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
        🦵 Treino Inferior
      </h1>
      <p class="text-lg text-green-200">
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
                <p class="text-green-200 text-sm">{{ exercise.description }}</p>
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
                class="bg-white/20 text-white rounded-lg px-3 py-2 w-20 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="0"
              >
              <span class="text-green-200">repetições</span>
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
          <div class="mt-4 p-3 bg-green-500/20 rounded-lg">
            <p class="text-green-100 text-sm">
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
              <div class="text-green-200 text-sm">Séries Concluídas</div>
            </div>
            <div class="bg-white/10 rounded-lg p-4">
              <div class="text-2xl font-bold text-white">{{ totalSets }}</div>
              <div class="text-green-200 text-sm">Total de Séries</div>
            </div>
          </div>
          <div class="mt-4 bg-white/10 rounded-full h-3">
            <div 
              class="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-300"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
          <p class="text-center text-green-200 mt-2">
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
            class="flex-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl py-3 text-white font-semibold hover:from-green-600 hover:to-teal-600 transition-colors"
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
    name: 'Squats',
    emoji: '🏋️',
    description: 'Agachamento - quadríceps e glúteos',
    tip: 'Mantenha os pés na largura dos ombros e desça como se fosse sentar',
    sets: [
      { reps: 15, completed: false },
      { reps: 15, completed: false },
      { reps: 15, completed: false }
    ]
  },
  {
    name: 'Flexor',
    emoji: '🦵',
    description: 'Curl de perna - posterior da coxa',
    tip: 'Mantenha o quadril estável e foque no movimento do joelho',
    sets: [
      { reps: 12, completed: false },
      { reps: 12, completed: false },
      { reps: 12, completed: false }
    ]
  },
  {
    name: 'Extensor',
    emoji: '💪',
    description: 'Extensão de perna - quadríceps',
    tip: 'Controle o movimento e não trave os joelhos no final',
    sets: [
      { reps: 15, completed: false },
      { reps: 15, completed: false },
      { reps: 15, completed: false }
    ]
  },
  {
    name: 'Calves',
    emoji: '🦶',
    description: 'Elevação de panturrilha - gastrocnêmio',
    tip: 'Faça o movimento completo, subindo e descendo lentamente',
    sets: [
      { reps: 20, completed: false },
      { reps: 20, completed: false },
      { reps: 20, completed: false }
    ]
  },
  {
    name: 'Abs',
    emoji: '🔥',
    description: 'Abdominal - core e reto abdominal',
    tip: 'Mantenha o pescoço relaxado e foque em levantar os ombros',
    sets: [
      { reps: 20, completed: false },
      { reps: 20, completed: false },
      { reps: 20, completed: false }
    ]
  }
]

// Load saved data or use default
const exercises = ref(defaultExercises)

// Load saved workout data on mount
onMounted(() => {
  const savedData = loadWorkoutData('lower')
  if (savedData && savedData.exercises) {
    exercises.value = savedData.exercises
  }
})

// Check if there's saved data
const hasSavedData = computed(() => hasWorkoutData('lower'))

// Auto-save when exercises change
watch(exercises, (newExercises) => {
  saveWorkoutData('lower', newExercises)
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
  const success = saveWorkoutData('lower', exercises.value)
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