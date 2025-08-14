import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
      ],
      meta: [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        { name: 'theme-color', content: '#111827' },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/eslint', '@vite-pwa/nuxt'],
  // @ts-ignore - provided by @vite-pwa/nuxt
  pwa: {
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    manifest: {
      name: 'Gym',
      short_name: 'Gym',
      description: 'Uma aplicação web moderna para acompanhamento de treinos',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      display_override: ['standalone'],
      background_color: '#000000',
      theme_color: '#111827',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      screenshots: [
        {
          src: '/screenshot-narrow.png',
          sizes: '540x991',
          type: 'image/png',
          form_factor: 'narrow',
        },
        {
          src: '/screenshot-wide.png',
          sizes: '1440x1111',
          type: 'image/png',
          form_factor: 'wide',
        },
      ],
    },
    workbox: {
      clientsClaim: true,
      skipWaiting: true,
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
