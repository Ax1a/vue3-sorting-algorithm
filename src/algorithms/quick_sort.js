import { sortDelay, setIgnoredItemsState, isSorted } from '@/utils'

async function partition(arr, low, high) {
  if (!isSorted()) return
  let pivot = arr[high].value
  let i = low - 1

  for (let j = low; j <= high - 1; j++) {
    if (!isSorted()) break
    arr[j].current = true
    await sortDelay()
    if (arr[j].value < pivot) {
      i++
      if (i >= 0) arr[i].current = true
      await sortDelay()
      ;[arr[i].value, arr[j].value] = [arr[j].value, arr[i].value]
    }
    if (i >= 0) arr[i].current = false
    arr[j].current = false
  }
  ;[arr[i + 1].value, arr[high].value] = [arr[high].value, arr[i + 1].value]
  return i + 1
}

async function quickSortRecursion(arr, low, high) {
  if (!isSorted()) return
  if (low < high) {
    arr[high].picked = true
    let pi = await partition(arr, low, high)
    arr[high].picked = false
    const pLeft = quickSortRecursion(arr, low, pi - 1)
    const pRight = quickSortRecursion(arr, pi + 1, high)

    await Promise.all([pLeft, pRight])
  }
}

export default async function quickSort(arr, low, high) {
  await quickSortRecursion(arr, low, high)
  if (!isSorted()) return
  setIgnoredItemsState(arr)
}
