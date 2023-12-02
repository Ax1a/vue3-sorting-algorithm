<template lang="">
  <transition>
    <div
      id="options"
      v-show="showOptions"
      class="bg-slate-700 p-6 rounded-lg flex flex-col flex-wrap mx-5 gap-4 mt-10 drop-shadow-md absolute bottom-24"
    >
      <button
        type="button"
        @click="props.method"
        class="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 transition-all duration-150"
      >
        Generate Items
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
            @change="props.itemsMethod"
            value="30"
            class="range range-xs range-primary"
          />
        </div>
        <div class="w-full">
          <label for="speed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Speed</label>
          <input
            dir="rtl"
            id="speed"
            type="range"
            min="5"
            max="1000"
            value="300"
            @input="props.speedMethod"
            class="range range-xs range-primary"
          />
        </div>
      </div>
    </div>
  </transition>
  <div :class="['absolute bottom-10 transition-all duration-100 ease-in-out', showOptions || windowWidth > 500 ? '' : 'up-down-animation']">
    <button
      id="options"
      class="bg-slate-600/75 h-8 w-20 rounded-lg hover:bg-slate-500 transition-all duration-150 drop-shadow-md"
      @click="showOptions = !showOptions"
    >
      <Icon
        icon="ep:arrow-down"
        :class="['mx-auto transition-all ease-in-out duration-300', showOptions ? 'rotate-0' : 'rotate-180']"
        width="25"
        height="25"
      />
    </button>
  </div>
</template>
<script setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  const props = defineProps(['method', 'speedMethod', 'itemsMethod'])
  const showOptions = ref(window.innerWidth > 500)
  const windowWidth = window.innerWidth

  onMounted(() => {
    if (window.innerWidth < 500) window.addEventListener('click', closeOptions)
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    if (window.innerWidth < 500) window.removeEventListener('click', closeOptions)
    window.removeEventListener('resize', handleResize)
  })

  const handleResize = () => {
    showOptions.value = window.innerWidth > 500
  }

  const closeOptions = (event) => {
    if (!event.target.closest('#options') && showOptions.value) {
      showOptions.value = false
    }
  }
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

  .up-down-animation {
    animation: MoveUpDown 2s infinite;
  }

  @keyframes MoveUpDown {
    0%,
    100% {
      bottom: 2.5rem;
    }
    50% {
      bottom: 1.5rem;
    }
  }
</style>
