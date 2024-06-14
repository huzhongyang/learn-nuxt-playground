<script setup lang="ts">
import { useWebContainer } from '~/componsables/webContainer'

const iframeRef = ref<HTMLIFrameElement>()
const wcUrl = ref('')

type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'
const status = ref<Status>('init')
const error = shallowRef<{ message: string }>()

const stream = ref<ReadableStream>()

async function startDevServer() {
  const rawFiles = import.meta.glob([
    '../templates/basic/*.*',
    '!**/node_modules/**',
  ], {
    as: 'raw',
    eager: true,
  })
  const files = Object.fromEntries(Object.entries(rawFiles).map(([path, content]) => {
    return [path.replace('../templates/basic/', ''), {
      file: {
        contents: content,
      },
    }]
  }))

  const wc = await useWebContainer()
  wc.on('server-ready', (_, url) => {
    status.value = 'ready'
    wcUrl.value = url
  })

  wc.on('error', (err) => {
    status.value = 'error'
    error.value = err
  })

  status.value = 'mount'

  await wc.mount(files)

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

  // In dev, when doing HMR, we kill the previous process while reusing the same webContainer
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      devProcess.kill()
    })
  }
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
