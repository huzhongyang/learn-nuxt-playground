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
    background-color: #FFFFFF;
    color: rgba(0, 0, 0, 0.8);
  }
  
  .dark body {
    background-color: #091A28;
    color: #EBF4F1;
  }
  
  .sepia body {
    background-color: #F1E7D0;
    color: #433422;
  }
</style>
