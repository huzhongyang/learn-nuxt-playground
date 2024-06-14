<script setup lang="ts">
const _ = useColorMode()
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full">
    <article class="border-base prose border-r p4">
      <ContentDoc />
    </article>
    <the-playground h-full w-full />
  </div>
</template>

<style scoped>

</style>
