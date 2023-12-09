import { sortDelay, setIgnoredItemsState, isSorted } from '@/utils'

export default async function insertionSort(n, arr) {
  let j, item
  for (let i = 1; i < n; i++) {
    if (!isSorted()) break
    item = arr[i].value
    arr[i].current = true
    await sortDelay()
    for (j = i - 1; j >= 0 && arr[j].value > item; j--) {
      if (!isSorted()) break
      arr[j + 1].value = arr[j].value
      arr[j].picked = true
      await sortDelay()
      arr[j].picked = false
    }
    arr[j + 1].value = item
    arr[i].current = false
  }

  if (!isSorted()) return

  setIgnoredItemsState(arr)
}
