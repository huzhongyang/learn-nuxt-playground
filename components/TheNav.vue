<script setup lang="ts">
import NuxtLogo from '~/components/NuxtLogo.vue'
</script>

<template>
  <nav border="base b" flex="~ items-center gap-2" px6 py3 text-lg>
    <NuxtLogo mt--2 h-1.3em />
    <span text-xl>Playground</span>
    <div flex-auto />
    <nuxt-link rounded p2 hover="bg-active" to="https://github.com/nuxt/learn.nuxt.com" target="_blank">
      <div class="i-carbon-logo-github" text-4xl />
    </nuxt-link>
  </nav>
</template>

<style scoped>

</style>
