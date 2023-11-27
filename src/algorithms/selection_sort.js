import { sortDelay, setIgnoredItemsState } from '@/utils'

export default async function selectionSort(n, arr, getDelay) {
  let min
  for (let i = 0; i < n - 1; i++) {
    min = i
    arr[min].picked = true
    for (let j = i + 1; j < n; j++) {
      arr[j].current = true
      if (arr[j].value < arr[min].value) {
        arr[min].picked = false
        min = j
        arr[min].picked = true
      }
      await sortDelay(getDelay())
      arr[j].current = false
    }
    await sortDelay(10)
    arr[min].picked = false
    arr[i].sorted = true
    ;[arr[min].value, arr[i].value] = [arr[i].value, arr[min].value]
  }

  setIgnoredItemsState(arr)
}
