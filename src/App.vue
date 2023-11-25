<template>
  <div class="flex flex-col gap-4 items-center h-screen">
    <div
      class="lg:w-auto w-full bg-slate-700 p-6 lg:rounded-lg flex flex-row overflow-x-auto mx-5 gap-4 md:mt-10 drop-shadow-md"
    >
      <template v-for="algorithm in algorithms" :key="algorithm">
        <button
          type="button"
          :disabled="algorithm.disabled"
          @click="sortNumbers(algorithm.label.toLowerCase())"
          :class="[
            'w-36 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-150',
            algorithm.disabled
              ? 'border border-gray-600 bg-gray-400 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800'
              : 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 text-white'
          ]"
        >
          {{ algorithm.label }} Sort
        </button>
      </template>
    </div>
    <div class="h-96 flex items-end justify-center">
      <div>
        <div
          v-for="(num, index) in nums"
          :key="index"
          :class="[
            'inline-block md:mx-1 mx-[3px] transition-all duration-150 bg-gradient-to-r',
            num.current
              ? 'from-indigo-400 via-indigo-500 to-indigo-600 shadow-2xl shadow-indigo-500/75'
              : 'from-gray-200 via-3ray-600 to-gray-300'
          ]"
          :style="[`height: ${num.value + 10}px; width: ${barWidth}`]"
        ></div>
      </div>
    </div>
    <transition>
      <div
        v-if="showOptions"
        class="bg-slate-700 p-6 rounded-lg flex flex-col flex-wrap mx-5 gap-4 mt-10 drop-shadow-md absolute bottom-10"
      >
        <button
          type="button"
          @click="generateRandomNumber"
          class="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 transition-all duration-150"
        >
          Generate Numbers
        </button>
        <div class="flex flex-row gap-4 w-auto md:w-96 flex-wrap md:flex-nowrap">
          <div class="w-full">
            <label for="number_items" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Number of items</label
            >
            <input
              id="number_items"
              type="range"
              min="6"
              max="50"
              @change="generateRandomNumber"
              v-model="items"
              class="range range-xs range-primary"
            />
          </div>
          <div class="w-full">
            <label for="speed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Speed</label>
            <input id="speed" type="range" min="10" max="1000" v-model="delay" class="range range-xs range-primary" />
          </div>
        </div>
        <div class="flex align-middle justify-center mt-4">
          <button
            @click="showOptions = false"
            class="bg-slate-600 h-8 w-20 rounded-lg hover:bg-slate-500 transition-all duration-150"
          >
            <Icon icon="ep:arrow-down" class="mx-auto" width="25" height="25" />
          </button>
        </div>
      </div>
      <div v-else class="absolute bottom-10">
        <button
          class="bg-slate-600/75 h-8 w-20 rounded-lg hover:bg-slate-500 transition-all duration-150 drop-shadow-md"
          @click="showOptions = true"
        >
          <Icon icon="ep:arrow-up" class="mx-auto" width="25" height="25" />
        </button>
      </div>
    </transition>
  </div>
</template>
<script setup>
  import { computed, onMounted, ref } from 'vue'

  const nums = ref([])
  const items = ref(30)
  const delay = ref(300)
  const sorted = ref(false)
  const showOptions = ref(window.innerWidth > 500)
  const showSortAlgos = ref(window.innerWidth > 500)
  const algorithms = [
    {
      label: 'Bubble',
      disabled: false
    },
    {
      label: 'Selection',
      disabled: true
    },
    {
      label: 'Merge',
      disabled: true
    },
    {
      label: 'Quick',
      disabled: true
    },
    {
      label: 'Insertion',
      disabled: true
    },
    {
      label: 'Heap',
      disabled: true
    }
  ]

  const barWidth = computed(() => {
    const maxWidth = window.innerWidth / nums.value.length - 15
    const minWidth = 40
    const width = Math.max(Math.min(maxWidth, minWidth), 1)
    return `${width}px`
  })

  onMounted(() => {
    generateRandomNumber()
  })

  const generateRandomNumber = () => {
    sorted.value = false
    nums.value = []
    for (let i = 0; i < items.value; i++) {
      const rand = Math.floor(Math.random() * 200)
      nums.value.push({
        value: rand,
        current: false
      })
    }
  }

  const sortNumbers = async (type) => {
    if (sorted.value) return
    let n = nums.value.length

    if (type === 'bubble') {
      bubbleSort(n)
    }
    sorted.value = true
  }

  const bubbleSort = async (n) => {
    let swapped
    do {
      swapped = false
      for (let i = 0; i < n - 1; i++) {
        nums.value[i].current = true
        nums.value[i + 1].current = true
        if (nums.value[i].value > nums.value[i + 1].value) {
          ;[nums.value[i].value, nums.value[i + 1].value] = [nums.value[i + 1].value, nums.value[i].value]
          swapped = true
          await sortDelay(delay.value)
        }
        await sortDelay(Math.min(delay.value - 300, 100))
        nums.value[i].current = false
        nums.value[i + 1].current = false
      }
    } while (swapped)
  }

  const sortDelay = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
</script>
<style scoped>
  .v-enter-active {
    transition: all 0.3s ease-out;
  }

  .v-leave-active {
    transition: all 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
</style>
