import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-base': 'border-gray:40 dark:border-red:40',
    'bg-active': 'bg-gray/10',
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
