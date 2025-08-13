<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <!-- Header -->
    <AppHeader
      title="Virtual Trainer"
      subtitle="Seu personal trainer digital"
    />

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
      <div class="mx-auto max-w-4xl">
        <!-- Welcome Section -->
        <div class="mb-16 text-center">
          <div
            class="mb-8 rounded-xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 class="mb-4 text-2xl font-light text-gray-900 dark:text-white">
              Bem-vindo ao seu treino
            </h2>
            <p
              class="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300"
            >
              Escolha o tipo de treino que deseja realizar hoje. Cada sessão é
              personalizada para maximizar seus resultados.
            </p>
          </div>

          <!-- Workout Options -->
          <div class="mb-12 grid gap-4 md:grid-cols-2">
            <WorkoutCard
              to="/workout/upper"
              icon="💪"
              gradient="from-blue-500 to-indigo-600"
              title="Treino Superior"
              description="Foque nos músculos do tronco, braços e ombros"
              tags="Pull-ups • Push-ups • Bíceps • Ombros"
            />
            <WorkoutCard
              to="/workout/lower"
              icon="🦵"
              gradient="from-emerald-500 to-teal-600"
              title="Treino Inferior"
              description="Fortaleça pernas, glúteos e core"
              tags="Squats • Flexor • Extensor • Panturrilhas • Abs"
            />
          </div>

          <!-- Additional Info -->
          <div
            class="mb-12 rounded-xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
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
              class="mx-auto max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-300"
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
              class="inline-flex items-center rounded-lg bg-gray-900 px-8 py-4 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
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
