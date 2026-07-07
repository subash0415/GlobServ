/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Chivo', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          accent: '#166534',
          'accent-hover': '#14532D',
          'accent-muted': '#DCFCE7',
          ink: '#111827',
          'ink-2': '#4B5563',
          'ink-3': '#6B7280',
          border: '#E5E7EB',
          'border-dark': '#D1D5DB',
          bg: '#FFFFFF',
          'bg-2': '#F9FAFB',
          'bg-3': '#F3F4F6',
        },
      },
    },
  },
  plugins: [],
};