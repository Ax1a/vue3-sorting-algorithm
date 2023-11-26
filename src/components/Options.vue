<template lang="">
  <transition>
    <div
      v-if="showOptions"
      class="bg-slate-700 p-6 rounded-lg flex flex-col flex-wrap mx-5 gap-4 mt-10 drop-shadow-md absolute bottom-10"
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
          <input id="speed" type="range" min="10" max="1000" value="300" @change="props.speedMethod" class="range range-xs range-primary" />
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
</template>
<script setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  const props = defineProps(['method', 'speedMethod', 'itemsMethod'])
  const showOptions = ref(window.innerWidth > 500)
  
  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  const handleResize = () => {
    showOptions.value = window.innerWidth > 500
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
</style>
