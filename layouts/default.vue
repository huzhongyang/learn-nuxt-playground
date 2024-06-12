<script setup lang="ts">
import TheNav from '~/components/TheNav.vue'
</script>

<template>
  <div class="h-screen w-screen of-hidden h-dvh" grid="~ rows-[max-content_1fr]">
    <TheNav />
    <slot />
  </div>
</template>

<style scoped>

</style>
