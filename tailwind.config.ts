import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      screens: {
        sm: { min: '600px', max: '959.98px' },
        md: { min: '960px', max: '1279.98px' },
        lg: { min: '1280px', max: '1919.98px' },
        xl: { min: '1920px' },
        handset: {
          raw: '(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)',
        },
        tablet: {
          raw: '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
        },
        web: {
          raw: '(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)',
        },
        'handset-portrait': {
          raw: '(max-width: 599.98px) and (orientation: portrait)',
        },
        'tablet-portrait': {
          raw: '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)',
        },
        'web-portrait': {
          raw: '(min-width: 840px) and (orientation: portrait)',
        },
        'handset-landscape': {
          raw: '(max-width: 959.98px) and (orientation: landscape)',
        },
        'tablet-landscape': {
          raw: '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
        },
        'web-landscape': {
          raw: '(min-width: 1280px) and (orientation: landscape)',
        },
      },
    },
  },
  plugins: [],
}

export default config
