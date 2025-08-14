import { ref, onMounted, onUnmounted } from 'vue';

export function useWakeLock() {
  const isSupported =
    typeof navigator !== 'undefined' && 'wakeLock' in navigator;
  const isActive = ref(false);
  let sentinel = null;

  async function acquire() {
    if (!isSupported || isActive.value) return;
    try {
      // @ts-ignore - Wake Lock is experimental
      sentinel = await navigator.wakeLock.request('screen');
      isActive.value = true;
      sentinel.addEventListener?.('release', () => {
        isActive.value = false;
        sentinel = null;
      });
    } catch (_) {
      // ignored
    }
  }

  async function release() {
    try {
      if (sentinel && isActive.value) {
        await sentinel.release?.();
      }
    } catch (_) {
    } finally {
      isActive.value = false;
      sentinel = null;
    }
  }

  async function reAcquireOnFocus() {
    if (document.visibilityState === 'visible' && isActive.value) {
      // If lost on background, try to reacquire when visible again
      await acquire();
    }
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', reAcquireOnFocus, false);
  });

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', reAcquireOnFocus, false);
    release();
  });

  return { isSupported, isActive, acquire, release };
}
