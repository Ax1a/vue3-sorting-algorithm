<template>
  <div class="flex flex-col gap-4 items-center h-screen">
    <div
      class="lg:w-auto w-full bg-slate-700 p-6 lg:rounded-lg flex flex-row overflow-x-auto mx-5 gap-4 md:mt-10 drop-shadow-md"
    >
      <template v-for="(algoFunction, label) in algorithms" :key="label">
        <button
          type="button"
          @click="executeAlgorithms(algoFunction, label)"
          :class="[
            'w-36 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-150 whitespace-nowrap',
            stateStore.isSorted
              ? 'border border-gray-600 bg-gray-700 hover:bg-gray-600'
              : 'border border-gray-700 bg-green-600 hover:bg-green-700 text-white'
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
    <div class="h-1/2 flex items-end justify-center w-full pb-0 md:pb-20">
      <div class="overflow-x-auto h-full overflow-y-hidden w-full whitespace-nowrap flex justify-center items-end">
        <div v-for="(num, index) in nums" :key="index" class="flex flex-col text-center">
          <div
            v-if="(windowWidth > 750 && nums.length <= 50) || (windowWidth <= 750 && nums.length < 25)"
            :class="['italic font-medium text-gray-300']"
            :style="[`font-size: ${windowWidth > 1000 || (windowWidth < 1200 && nums.length < 10) ? 12 : 8}px`]"
          >
            {{ num.value }}
          </div>
          <div
            :class="[
              'transition-all duration-75 ease-in-out bg-gradient-to-r',
              num.sorted
                ? 'from-green-400 via-green-500 to-green-600 shadow-2xl shadow-green-500/75'
                : num.current
                ? 'from-indigo-400 via-indigo-500 to-indigo-600 shadow-2xl shadow-indigo-500/75'
                : num.current2
                ? 'from-fuchsia-400 via-fuchsia-500 to-fuchsia-600 shadow-2xl shadow-fuchsia-500/75'
                : num.picked
                ? 'from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl shadow-yellow-500/75'
                : num.picked2
                ? 'from-orange-200 to-orange-300 shadow-2xl shadow-orange-500/75'
                : 'from-gray-100 to-gray-300'
            ]"
            :style="[`height: ${num.value + 10}px; width: ${barWidth}`]"
          ></div>
        </div>
      </div>
    </div>
    <Options :method="generateRandomNumber" :speed-method="changeSpeedOfSorting" :items-method="changeNumberOfItems" />
    <Toast />
  </div>
</template>
<script setup>
  import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
  import { getAlgorithms } from './algorithms'
  import Options from './components/Options.vue'
  import Toast from './components/Toast.vue'
  import { useStateStore } from './utils/stores'

  const stateStore = useStateStore()
  const nums = ref([])
  const items = ref(30)
  const algorithms = reactive({})
  const windowWidth = ref(window.innerWidth)
  const showSortAlgos = ref(window.innerWidth > 500)

  const executeAlgorithms = async (algorithm, label) => {
    if (stateStore.isSorted) return

    stateStore.setSortState(true)
    const algorithmFunction = algorithm
    let n = nums.value.length
    switch (label) {
      case 'quick_sort':
      case 'merge_sort':
        await algorithmFunction(nums.value, 0, n - 1)
        break
      default:
        await algorithmFunction(n, nums.value)
        break
    }
  }

  const generateRandomNumber = () => {
    stateStore.setSortState(false)
    nums.value = []
    for (let i = 0; i < items.value; i++) {
      const rand = Math.floor(Math.random() * 200)
      nums.value.push({
        value: rand,
        current: false,
        current2: false,
        sorted: false,
        picked: false,
        picked2: false
      })
    }
  }

  const changeNumberOfItems = (data) => {
    items.value = data.target.value
    generateRandomNumber()
  }

  const changeSpeedOfSorting = (data) => {
    stateStore.setDelay(data.target.value)
  }

  onMounted(async () => {
    const _algorithms = await getAlgorithms()
    Object.assign(algorithms, _algorithms)
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
    const maxWidth = windowWidth.value / nums.value.length - 3
    const minWidth = 40
    const width = Math.max(Math.min(maxWidth, minWidth), 1.5)
    return `${width}px`
  })
</script>
