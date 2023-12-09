import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
  state: () => ({
    delay: 300,
    sorted: false
  }),
  getters: {
    getDelay: (state) => state.delay,
    isSorted: (state) => state.sorted
  },
  actions: {
    setSortState(state) {
      this.sorted = state
    },
    setDelay(delay) {
      this.delay = delay
    }
  }
})
