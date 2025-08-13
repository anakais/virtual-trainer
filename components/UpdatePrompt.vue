<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
  >
    <div
      class="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800"
    >
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Atualização disponível
      </h2>
      <p class="mb-6 text-sm text-gray-700 dark:text-gray-300">
        Uma nova versão do app está pronta. Deseja atualizar agora?
      </p>
      <div class="flex gap-3">
        <button
          @click="dismissUpdate"
          class="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Depois
        </button>
        <button
          @click="confirmUpdate"
          class="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          Atualizar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const open = ref(false);
let updateServiceWorker = null;

const { $pwaUpdate } = useNuxtApp();

watch(
  () => $pwaUpdate?.needRefresh?.value,
  (val) => {
    if (val) {
      updateServiceWorker = $pwaUpdate.updateServiceWorker;
      open.value = true;
    }
  },
  { immediate: true },
);

function confirmUpdate() {
  if (updateServiceWorker) updateServiceWorker(true);
  open.value = false;
}

function dismissUpdate() {
  open.value = false;
}
</script>
