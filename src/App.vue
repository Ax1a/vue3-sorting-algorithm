<template>
  <div class="flex flex-col gap-4 items-center h-screen">
    <div
      class="lg:w-auto w-full bg-slate-700 p-6 lg:rounded-lg flex flex-row overflow-x-auto mx-5 gap-4 md:mt-10 drop-shadow-md"
    >
      <template v-for="(algoFunction, label) in algorithms" :key="label">
        <button
          type="button"
          @click="executeAlgorithms(algoFunction)"
          :class="[
            'w-36 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-150 whitespace-nowrap',
            sorted
              ? 'border border-gray-600 bg-gray-400 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
              : 'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white'
          ]"
        >
          {{
            label
              ?.split('_')
              ?.map((l) => l.charAt(0).toUpperCase() + l.slice(1))
              ?.join(' ')
          }}
        </button>
      </template>
    </div>
    <div class="h-96 flex items-end justify-center w-full">
      <div class="overflow-x-auto w-full whitespace-nowrap flex justify-center items-baseline">
        <div
          v-for="(num, index) in nums"
          :key="index"
          :class="[
            'md:mx-1 mx-[3px] transition-all duration-150 bg-gradient-to-r',
            num.current
              ? 'from-indigo-400 via-indigo-500 to-indigo-600 shadow-2xl shadow-indigo-500/75'
              : 'from-gray-200 via-3ray-600 to-gray-300',
            num.picked
              ? 'from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl shadow-yellow-500/75'
              : 'from-gray-200 via-3ray-600 to-gray-300',
            num.sorted
              ? 'from-green-400 via-green-500 to-green-600 shadow-2xl shadow-green-500/75'
              : 'from-gray-200 via-3ray-600 to-gray-300'
          ]"
          :style="[`height: ${num.value + 10}px; width: ${barWidth}`]"
        ></div>
      </div>
    </div>
    <Options :method="generateRandomNumber" :speed-method="changeSpeedOfSorting" :items-method="changeNumberOfItems" />
    <Toast />
  </div>
</template>
<script setup>
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
  import { algorithmFunctions } from './algorithms'
  import Options from './components/Options.vue'
  import Toast from './components/Toast.vue'

  const nums = ref([])
  const windowWidth = ref(window.innerWidth)
  const items = ref(30)
  const delay = ref(300)
  const sorted = ref(false)
  const showSortAlgos = ref(window.innerWidth > 500)
  const algorithms = algorithmFunctions

  const executeAlgorithms = (algorithm) => {
    if (sorted.value) return

    sorted.value = true
    const algorithmFunction = algorithm
    let n = nums.value.length

    algorithmFunction(n, nums.value, () => delay.value)
  }

  const generateRandomNumber = () => {
    sorted.value = false
    nums.value = []
    for (let i = 0; i < items.value; i++) {
      const rand = Math.floor(Math.random() * 200)
      nums.value.push({
        value: rand,
        current: false,
        sorted: false,
        picked: false
      })
    }
  }

  const changeNumberOfItems = (data) => {
    items.value = data.target.value
    generateRandomNumber()
  }

  const changeSpeedOfSorting = (data) => {
    delay.value = data.target.value
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
    generateRandomNumber()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  const handleResize = () => {
    windowWidth.value = window.innerWidth
    showSortAlgos.value = window.innerWidth > 500
  }

  const barWidth = computed(() => {
    const maxWidth = windowWidth.value / nums.value.length - 15
    const minWidth = 40
    const width = Math.max(Math.min(maxWidth, minWidth), 1)
    return `${width}px`
  })
</script>
