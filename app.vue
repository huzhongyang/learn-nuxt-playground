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
  body {
  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.8);
}

.dark body {
  background-color: #091a28;
  color: #ebf4f1;
}

.sepia body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
