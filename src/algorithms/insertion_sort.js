import { sortDelay, setIgnoredItemsState } from '@/utils'

export default async function insertionSort(n, arr, getDelay) {
  let j, item
  for (let i = 1; i < n; i++) {
    item = arr[i].value
    arr[i].current = true
    for (j = i - 1; j >= 0 && arr[j].value > item; j--) {
      arr[j].picked = true
      arr[j + 1].value = arr[j].value
      await sortDelay(getDelay())
      arr[j].picked = false
    }
    await sortDelay(getDelay())
    arr[j + 1].value = item
    arr[i].current = false
  }

  setIgnoredItemsState(arr)
}
