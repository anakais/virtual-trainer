<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Header -->
    <header class="text-center py-16 px-4">
      <h1 class="text-6xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
        Virtual Trainer
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 font-light">
        Seu personal trainer digital
      </p>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Welcome Section -->
        <div class="text-center mb-16">
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-sm border border-gray-100 dark:border-gray-700 mb-12">
            <h2 class="text-3xl font-light text-gray-900 dark:text-white mb-6">
              Bem-vindo ao seu treino
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Escolha o tipo de treino que deseja realizar hoje. 
              Cada sessão é personalizada para maximizar seus resultados.
            </p>
          </div>

          <!-- Workout Options -->
          <div class="grid md:grid-cols-2 gap-8 mb-16">
            <!-- Upper Body Card -->
            <NuxtLink 
              to="/workout/upper"
              class="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 block"
            >
              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                  <span class="text-3xl text-white">💪</span>
                </div>
                <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3">
                  Treino Superior
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Foque nos músculos do tronco, braços e ombros
                </p>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 font-medium">
                  Pull-ups • Push-ups • Bíceps • Ombros
                </div>
              </div>
            </NuxtLink>

            <!-- Lower Body Card -->
            <NuxtLink 
              to="/workout/lower"
              class="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 block"
            >
              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                  <span class="text-3xl text-white">🦵</span>
                </div>
                <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3">
                  Treino Inferior
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Fortaleça pernas, glúteos e core
                </p>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 font-medium">
                  Squats • Flexor • Extensor • Panturrilhas • Abs
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Additional Info -->
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-12">
            <h4 class="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <span class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                💡
              </span>
              Dica do Personal
            </h4>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Alternar entre treinos superiores e inferiores permite que cada grupo muscular se recupere adequadamente, 
              maximizando seus ganhos e evitando lesões.
            </p>
          </div>

          <!-- History Link -->
          <div class="text-center">
            <NuxtLink 
              to="/history"
              class="inline-flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-2xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              <span class="mr-2">📊</span>
              Ver Histórico de Treinos
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template> 