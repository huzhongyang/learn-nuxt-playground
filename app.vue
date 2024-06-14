<script setup lang="ts">
import '@unocss/reset/tailwind.css'
</script>

<template>
  <div>
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </div>
</template>

<style>
html,
body {
  height: 100vh;
  overflow: hidden;
  --uno: bg-base font-sans;
}

.dark {
  color-scheme: dark;
}
</style>
