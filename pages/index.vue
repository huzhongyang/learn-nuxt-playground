<script setup lang="ts">
const {x,y} = useMouse()
const colorMode  = useColorMode()
</script>

<template>
  <div text-red>
    hello world {{ x }} - {{ y }}
  </div>
  <select v-model="colorMode.preference">
     <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="sepia">sepia</option>
  </select>
</template>

<style scoped>

</style>
