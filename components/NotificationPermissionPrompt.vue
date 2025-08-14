<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
  >
    <div
      class="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800"
    >
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
        >Ouvir sinal sonoro?</h2
      >
      <p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
        Para tocar um som no final do descanso, precisamos que você ative as
        notificações do sistema.
      </p>
      <ul
        class="mb-4 list-disc space-y-1 pl-5 text-xs text-gray-600 dark:text-gray-300"
      >
        <li
          >Se aceitar, o sistema mostrará um prompt para permitir
          notificações.</li
        >
        <li
          >Se recusar, não enviaremos mais o sinal sonoro após os
          exercícios.</li
        >
      </ul>
      <div class="flex gap-3">
        <button
          @click="$emit('cancel')"
          class="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Agora não
        </button>
        <button
          @click="$emit('accept')"
          class="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          Ativar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ open: { type: Boolean, default: false } });
defineEmits(['accept', 'cancel']);
</script>
