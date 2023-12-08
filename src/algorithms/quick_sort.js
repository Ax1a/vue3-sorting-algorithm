import { sortDelay, setIgnoredItemsState } from '@/utils'

async function partition(arr, low, high, getDelay) {
  let pivot = arr[high].value
  let i = low - 1

  for (let j = low; j <= high - 1; j++) {
    arr[j].current = true
    await sortDelay(getDelay())
    if (arr[j].value < pivot) {
      i++
      if (i >= 0) arr[i].current = true
      await sortDelay(getDelay())
      ;[arr[i].value, arr[j].value] = [arr[j].value, arr[i].value]
    }
    if (i >= 0) arr[i].current = false
    arr[j].current = false
  }
  ;[arr[i + 1].value, arr[high].value] = [arr[high].value, arr[i + 1].value]
  return i + 1
}

async function quickSortRecursion(arr, low, high, getDelay) {
  if (low < high) {
    arr[high].picked = true
    let pi = await partition(arr, low, high, getDelay)
    arr[high].picked = false
    await quickSortRecursion(arr, low, pi - 1, getDelay)
    await quickSortRecursion(arr, pi + 1, high, getDelay)
  }
}

export default async function quickSort(arr, low, high, getDelay) {
  await quickSortRecursion(arr, low, high, getDelay)
  setIgnoredItemsState(arr)
}
