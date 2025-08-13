// @ts-ignore - virtual module provided by Vite PWA at build time
import { useRegisterSW } from 'virtual:pwa-register/vue';

export default defineNuxtPlugin((nuxtApp) => {
  const { needRefresh, updateServiceWorker } = useRegisterSW({
    immediate: true,
  });
  nuxtApp.provide('pwaUpdate', { needRefresh, updateServiceWorker });
});
