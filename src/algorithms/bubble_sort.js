import { sortDelay, setIgnoredItemsState, isSorted } from '@/utils'

export default async function bubbleSort(n, arr) {
  let swapped
  for (let i = 0; i < n - 1; i++) {
    if (!isSorted()) break
    swapped = false
    for (let j = 0; j < n - i - 1; j++) {
      if (!isSorted()) break
      arr[j].current2 = true
      arr[j + 1].current = true
      if (arr[j].value > arr[j + 1].value) {
        await sortDelay()
        arr[j].current2 = false
        arr[j + 1].current = false
        arr[j].current = true
        arr[j + 1].current2 = true
        ;[arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value]
        swapped = true
      }
      await sortDelay()
      arr[j].current2 = false
      arr[j + 1].current = false
      arr[j].current = false
      arr[j + 1].current2 = false
    }
    arr[n - 1 - i].sorted = true
    if (!swapped) break
  }
  if (!isSorted()) return

  // To make sure all bar colors are green
  setIgnoredItemsState(arr)
}
