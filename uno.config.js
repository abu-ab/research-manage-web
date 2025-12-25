import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      }
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'JetBrains Mono:400,500,600'
      }
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#409EFF',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      },
      success: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#67C23A',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e'
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#E6A23C',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f'
      },
      danger: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#F56C6C',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d'
      }
    },
    boxShadow: {
      'soft': '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
      'medium': '0 4px 20px 0 rgba(0, 0, 0, 0.15)',
      'strong': '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      'colored': '0 4px 12px rgba(64, 158, 255, 0.3)'
    },
    borderRadius: {
      'soft': '6px',
      'medium': '8px',
      'large': '12px',
      'xl': '16px'
    }
  },
  shortcuts: {
    'card-base': 'bg-white rounded-large shadow-soft border-none',
    'card-hover': 'hover:shadow-medium hover:transform hover:translate-y--2px transition-all duration-300',
    'btn-primary': 'bg-gradient-to-r from-primary-500 to-primary-600 text-white border-none rounded-soft shadow-colored',
    'btn-hover': 'hover:shadow-lg hover:transform hover:translate-y--1px transition-all duration-300',
    'text-gradient': 'bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent',
    'glass-effect': 'backdrop-blur-10 bg-white bg-opacity-80 border border-white border-opacity-20'
  },
  rules: [
    ['backdrop-blur-10', { 'backdrop-filter': 'blur(10px)' }],
    ['bg-opacity-80', { 'background-color': 'rgba(255, 255, 255, 0.8)' }],
    ['border-opacity-20', { 'border-color': 'rgba(255, 255, 255, 0.2)' }]
  ]
})
