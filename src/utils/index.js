import { useStateStore } from './stores'

const stateStore = useStateStore()

export const isSorted = () => stateStore.isSorted
export const sortDelay = (delay = stateStore.getDelay) => new Promise((resolve) => setTimeout(resolve, delay))

export const setIgnoredItemsState = async (arr) => {
  const items = arr.filter((data) => !data.sorted)
  for (let i = 0; i < items.length; i++) {
    items[i].sorted = true
    await sortDelay(10)
  }
}
