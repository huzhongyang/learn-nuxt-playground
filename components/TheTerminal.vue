<script setup lang="ts">
import '@xterm/xterm/css/xterm.css'
import { Terminal } from '@xterm/xterm'

const props = defineProps<{
  stream?: ReadableStream
}>()

const terminalTef = ref<HTMLDivElement>()
const terminal = new Terminal()

watch(
  () => props.stream,
  (s) => {
    if (!s)
      return
    const reader = s.getReader()
    function pump() {
      reader.read().then(({ done, value }) => {
        if (done)
          return
        terminal.write(value)
        pump()
      })
    }
    pump()
  },
  { immediate: true },
)

onMounted(() => {
  terminal.open(terminalTef.value!)
})
</script>

<template>
  <div ref="terminalTef" />
</template>

<style scoped>

</style>
