<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <!-- Header -->
    <header class="px-4 py-16 text-center">
      <h1
        class="mb-4 text-6xl font-light tracking-tight text-gray-900 dark:text-white"
      >
        Virtual Trainer
      </h1>
      <p class="text-xl font-light text-gray-600 dark:text-gray-300">
        Seu personal trainer digital
      </p>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
      <div class="mx-auto max-w-4xl">
        <!-- Welcome Section -->
        <div class="mb-16 text-center">
          <div
            class="mb-12 rounded-3xl border border-gray-100 bg-white p-12 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 class="mb-6 text-3xl font-light text-gray-900 dark:text-white">
              Bem-vindo ao seu treino
            </h2>
            <p
              class="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300"
            >
              Escolha o tipo de treino que deseja realizar hoje. Cada sessão é
              personalizada para maximizar seus resultados.
            </p>
          </div>

          <!-- Workout Options -->
          <div class="mb-16 grid gap-8 md:grid-cols-2">
            <!-- Upper Body Card -->
            <NuxtLink
              to="/workout/upper"
              class="group block rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
            >
              <div class="text-center">
                <div
                  class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 transition-transform group-hover:scale-105"
                >
                  <span class="text-3xl text-white">💪</span>
                </div>
                <h3
                  class="mb-3 text-2xl font-medium text-gray-900 dark:text-white"
                >
                  Treino Superior
                </h3>
                <p
                  class="mb-6 leading-relaxed text-gray-600 dark:text-gray-300"
                >
                  Foque nos músculos do tronco, braços e ombros
                </p>
                <div
                  class="rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                >
                  Pull-ups • Push-ups • Bíceps • Ombros
                </div>
              </div>
            </NuxtLink>

            <!-- Lower Body Card -->
            <NuxtLink
              to="/workout/lower"
              class="group block rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
            >
              <div class="text-center">
                <div
                  class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 transition-transform group-hover:scale-105"
                >
                  <span class="text-3xl text-white">🦵</span>
                </div>
                <h3
                  class="mb-3 text-2xl font-medium text-gray-900 dark:text-white"
                >
                  Treino Inferior
                </h3>
                <p
                  class="mb-6 leading-relaxed text-gray-600 dark:text-gray-300"
                >
                  Fortaleça pernas, glúteos e core
                </p>
                <div
                  class="rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                >
                  Squats • Flexor • Extensor • Panturrilhas • Abs
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Additional Info -->
          <div
            class="mb-12 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <h4
              class="mb-4 flex items-center justify-center text-xl font-medium text-gray-900 dark:text-white"
            >
              <span
                class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900"
              >
                💡
              </span>
              Dica do Personal
            </h4>
            <p
              class="mx-auto max-w-3xl leading-relaxed text-gray-600 dark:text-gray-300"
            >
              Alternar entre treinos superiores e inferiores permite que cada
              grupo muscular se recupere adequadamente, maximizando seus ganhos
              e evitando lesões.
            </p>
          </div>

          <!-- History Link -->
          <div class="text-center">
            <NuxtLink
              to="/history"
              class="inline-flex items-center rounded-2xl bg-gray-900 px-8 py-4 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
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
