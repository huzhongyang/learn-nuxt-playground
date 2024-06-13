<script setup lang="ts">
import { useWebContainer } from '~/componsables/webContainer'

const iframeRef = ref<HTMLIFrameElement>()
const wcUrl = ref('')

type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'
const status = ref<Status>('init')
const error = shallowRef<{ message: string }>()

const stream = ref<ReadableStream>()

async function startDevServer() {
  const wc = await useWebContainer()
  wc.on('server-ready', (port, url) => {
    status.value = 'ready'
    wcUrl.value = url
  })

  wc.on('error', (err) => {
    status.value = 'error'
    error.value = err
  })

  status.value = 'mount'

  await wc.mount({
    'package.json': {
      file: {
        contents: JSON.stringify({
          private: true,
          scripts: {
            dev: 'nuxt dev',
          },
          dependencies: {
            nuxt: 'latest',
          },
        }, null, 2),
      },
    },
  })

  status.value = 'install'

  const installProcess = await wc.spawn('pnpm', ['i'])

  stream.value = installProcess.output

  const installExitCode = await installProcess.exit

  if (installExitCode !== 0) {
    status.value = 'error'
    error.value = { message: `Unable to run pnpm install, exit code: ${installExitCode}` }
    throw new Error('Unable to run pnpm install')
  }

  status.value = 'start'

  const devProcess = await wc.spawn('pnpm', ['run', 'dev'])
  stream.value = devProcess.output
}

watchEffect(() => {
  if (iframeRef.value && wcUrl.value)
    iframeRef.value.src = wcUrl.value
})

onMounted(async () => {
  await startDevServer()
})
</script>

<template>
  <div grid="~ rows-[2fr_1fr]">
    <div>
      <iframe v-if="status === 'ready'" ref="iframeRef" h-full w-full />
      <div v-else grid="~ content-center justify-center justify-items-center" h-full w-full capitalize>
        <div class="i-svg-spinners-blocks-wave" text-lg />
        {{ status }}ing...
      </div>
    </div>
    <the-terminal :stream h-full w-full />
  </div>
</template>

<style scoped>

</style>
