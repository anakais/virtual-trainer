<template>
  <transition name="slide-up">
    <div
      v-if="isVisible"
      class="fixed inset-x-0 bottom-4 z-50 px-3"
    >
      <div
        class="relative mx-auto max-w-md rounded-xl border border-gray-200 bg-white/95 px-2 py-4 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gradient-to-bl dark:from-emerald-500 dark:to-blue-900"
      >
        <!-- Close button for iOS -->
        <button
          v-if="isIOS()"
          @click="dismiss"
          class="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div class="flex items-start gap-3">
          <div class="text-2xl">📲</div>
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              {{
                isIOS()
                  ? 'Adicione à tela inicial e use o app offline'
                  : 'Instale o app'
              }}
            </h3>
            <p class="mt-1 text-xs text-gray-600 dark:text-gray-300">
              <span v-if="isIOS()">
                Toque no botão compartilhar
                <img
                  src="/assets/icons/share-ios.svg"
                  alt="Botão compartilhar"
                  class="mb-1.5 inline-block h-4 w-4"
                />
                no canto superior direito (barra de endereço) e depois
                "Adicionar à Tela Inicial".
              </span>
              <span v-else> Acesse mais rápido pela tela inicial. </span>
            </p>
            <div class="mt-3 flex items-center gap-2">
              <button
                v-if="!isIOS()"
                @click="install"
                class="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 focus:outline-none dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                Instalar
              </button>
              <button
                v-if="!isIOS()"
                @click="dismiss"
                class="text-xs text-gray-600 underline hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const isVisible = ref(false);
const canInstall = ref(false);
const deferredPrompt = ref(null);

const STORAGE_KEY = 'installPromptLastShownAt';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function isStandalone() {
  // iOS Safari uses navigator.standalone
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function shouldShowNow() {
  try {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return true;
    const ts = parseInt(last, 10);
    if (Number.isNaN(ts)) return true;
    return Date.now() - ts >= ONE_DAY_MS;
  } catch (e) {
    return true;
  }
}

function markShownNow() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch (e) {
    // ignore
  }
}

function handleBeforeInstallPrompt(e) {
  // Prevent the mini-infobar on mobile
  e.preventDefault();
  deferredPrompt.value = e;
  canInstall.value = true;
  if (!isStandalone() && shouldShowNow()) {
    isVisible.value = true;
  }
}

function handleAppInstalled() {
  isVisible.value = false;
  deferredPrompt.value = null;
}

async function install() {
  const prompt = deferredPrompt.value;
  if (!prompt) return;
  prompt.prompt();
  try {
    await prompt.userChoice;
  } finally {
    isVisible.value = false;
    markShownNow();
    deferredPrompt.value = null;
  }
}

function dismiss() {
  isVisible.value = false;
  markShownNow();
}

function showInstallPrompt() {
  if (!isStandalone() && shouldShowNow() && (canInstall.value || isMobile())) {
    isVisible.value = true;
  }
}

function showIOSInstructions() {
  if (!isStandalone() && shouldShowNow() && isIOS()) {
    isVisible.value = true;
  }
}

onMounted(() => {
  if (isStandalone()) return;

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.addEventListener('appinstalled', handleAppInstalled);

  // For mobile devices, show prompt after a delay even without beforeinstallprompt
  if (isMobile()) {
    setTimeout(() => {
      if (isIOS()) {
        showIOSInstructions();
      } else {
        showInstallPrompt();
      }
    }, 2000); // Show after 2 seconds on mobile
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.removeEventListener('appinstalled', handleAppInstalled);
});
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
