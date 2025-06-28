import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ultra-Professional Blue Palette
        'primary': '#0066CC',        // IBM Blue - 信頼と安定
        'primary-dark': '#003D7A',   // Deep Professional Blue
        'primary-light': '#E6F2FF',  // Very Light Blue for backgrounds
        
        // Neutral Colors
        'neutral-50': '#F8FAFC',     // Almost White
        'neutral-100': '#F1F5F9',    // Light Gray
        'neutral-200': '#E2E8F0',    // Border Gray
        'neutral-500': '#64748B',    // Text Secondary
        'neutral-900': '#0F172A',    // Text Primary
        
        // Legacy mappings for compatibility
        'primary-blue': '#0066CC',
        'accent-blue': '#0066CC',
        'light-blue': '#E6F2FF',
        'light-gray': '#F8FAFC',
        'medium-gray': '#E2E8F0',
        'dark-gray': '#64748B',
        'clean-white': '#FFFFFF',
        'soft-gray': '#F1F5F9',
      },
      animation: {
        'text-slide': 'text-slide 12s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'text-slide': {
          '0%, 20%': {
            transform: 'translateY(0%)',
          },
          '25%, 45%': {
            transform: 'translateY(-20%)',
          },
          '50%, 70%': {
            transform: 'translateY(-40%)',
          },
          '75%, 95%': {
            transform: 'translateY(-60%)',
          },
          '100%': {
            transform: 'translateY(-80%)',
          },
        },
        'pulse-neon': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '.5',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'glow': {
          'from': {
            textShadow: '0 0 5px rgba(14, 165, 233, 0.5)',
          },
          'to': {
            textShadow: '0 0 10px rgba(14, 165, 233, 0.5)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config