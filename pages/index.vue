<script setup lang="ts">
const { x, y } = useMouse()
const colorMode = useColorMode()
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full">
    <div class="border-base border-r p4">
      Content
      <div text-red>
        hello world {{ x }} - {{ y }}
      </div>
      <select v-model="colorMode.preference">
        <option value="system">
          System
        </option>
        <option value="light">
          Light
        </option>
        <option value="dark">
          Dark
        </option>
        <option value="sepia">
          sepia
        </option>
      </select>
    </div>
    <the-playground h-full w-full />
  </div>
</template>

<style scoped>

</style>
