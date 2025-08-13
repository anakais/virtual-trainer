import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/eslint', '@vite-pwa/nuxt'],
  // @ts-ignore - provided by @vite-pwa/nuxt
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Gym',
      short_name: 'Gym',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#111827',
      icons: [
        {
          src: '/favicon.ico',
          sizes: '64x64 32x32 24x24 16x16',
          type: 'image/x-icon',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      navigateFallback: '/',
      runtimeCaching: [
        {
          urlPattern: ({ request }: any) => request.destination === 'document',
          handler: 'NetworkFirst',
          options: { cacheName: 'pages' },
        },
        {
          urlPattern: ({ request }: any) =>
            ['style', 'script', 'worker'].includes(request.destination),
          handler: 'StaleWhileRevalidate',
          options: { cacheName: 'assets' },
        },
        {
          urlPattern: ({ url }: any) => url.pathname.startsWith('/_nuxt/'),
          handler: 'StaleWhileRevalidate',
          options: { cacheName: 'nuxt-build' },
        },
      ],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 24 * 60 * 60 * 1000,
    },
  },
  eslint: {
    // options here
  },
});
