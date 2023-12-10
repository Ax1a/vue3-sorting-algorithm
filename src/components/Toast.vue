<template lang="">
  <transition>
    <div
      v-if="visible"
      id="toast-default"
      :class="[
        'absolute drop-shadow-lg flex items-center max-w-xs p-4 text-gray-300 rounded-md bg-slate-700',
        windowWidth > 950 ? 'bottom-10 right-10' : 'top-28 right-3'
      ]"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-800 text-indigo-200"
      >
        <Icon icon="charm:github" width="20" height="20" />
      </div>
      <a href="https://github.com/Ax1a" target="_blank" class="ms-3 text-sm font-normal mr-3"
        >Made by: <span class="font-bold underline text-indigo-400">Axia</span></a
      >
      <button
        type="button"
        @click="visible = false"
        class="transition-all duration-150 ms-auto -mx-1.5 -my-1.5 text-gray-100 rounded-lg p-1.5 hover:bg-gray-500 inline-flex items-center justify-center h-8 w-8 bg-slate-600/75"
      >
        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  </transition>
</template>
<script setup>
  import { ref } from 'vue'

  const visible = ref(true)
  const windowWidth = window.innerWidth
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
    transform: translateX(20px);
    opacity: 0;
  }
</style>
