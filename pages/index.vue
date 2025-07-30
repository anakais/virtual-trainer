<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
    <!-- Header -->
    <header class="text-center py-8">
      <h1 class="text-5xl font-bold text-white mb-2">
        💪 Virtual Trainer
      </h1>
      <p class="text-xl text-blue-200">
        Seu personal trainer digital
      </p>
    </header>

    <!-- Welcome Section -->
    <main class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto text-center mb-12">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h2 class="text-3xl font-bold text-white mb-4">
            Bem-vindo ao seu treino! 🎯
          </h2>
          <p class="text-lg text-blue-100 leading-relaxed">
            Escolha o tipo de treino que deseja realizar hoje. 
            Cada sessão é personalizada para maximizar seus resultados.
          </p>
        </div>

        <!-- Workout Options -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Upper Body Card -->
          <NuxtLink 
            to="/workout/upper"
            class="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 block"
          >
            <div class="text-center">
              <div class="text-6xl mb-4">💪</div>
              <h3 class="text-2xl font-bold text-white mb-3">
                Treino Superior
              </h3>
              <p class="text-orange-100 mb-4">
                Foque nos músculos do tronco, braços e ombros
              </p>
              <div class="bg-white/20 rounded-full px-4 py-2 text-white font-semibold">
                Inclui: Pull-ups, Push-ups, Bíceps, Ombros
              </div>
            </div>
          </NuxtLink>

          <!-- Lower Body Card -->
          <NuxtLink 
            to="/workout/lower"
            class="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 block"
          >
            <div class="text-center">
              <div class="text-6xl mb-4">🦵</div>
              <h3 class="text-2xl font-bold text-white mb-3">
                Treino Inferior
              </h3>
              <p class="text-green-100 mb-4">
                Fortaleça pernas, glúteos e core
              </p>
              <div class="bg-white/20 rounded-full px-4 py-2 text-white font-semibold">
                Inclui: Squats, Flexor, Extensor, Panturrilhas, Abs
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Additional Info -->
        <div class="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <h4 class="text-xl font-semibold text-white mb-3">
            💡 Dica do Personal
          </h4>
          <p class="text-blue-100">
            Alternar entre treinos superiores e inferiores permite que cada grupo muscular se recupere adequadamente, 
            maximizando seus ganhos e evitando lesões.
          </p>
        </div>

        <!-- History Link -->
        <div class="mt-6 text-center">
          <NuxtLink 
            to="/history"
            class="inline-block bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 text-white font-semibold hover:bg-white/20 transition-colors"
          >
            📊 Ver Histórico de Treinos
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template> 