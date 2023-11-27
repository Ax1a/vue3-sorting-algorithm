import { sortDelay } from '@/utils'

export async function bubbleSort(n, arr, getDelay) {
  let swapped
  for (let i = 0; i < n - 1; i++) {
    swapped = false
    for (let j = 0; j < n - i - 1; j++) {
      arr[j].current = true
      arr[j + 1].current = true
      if (arr[j].value > arr[j + 1].value) {
        ;[arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value]
        swapped = true
        await sortDelay(getDelay())
      }
      await sortDelay(5)
      arr[j].current = false
      arr[j + 1].current = false
    }
    arr[n - 1 - i].sorted = true
    if (!swapped) break
  }

  // To make sure all bar colors are green
  const ignoredItemsState = arr.filter(data => !data.sorted)
  ignoredItemsState.forEach(item => {
    item.sorted = true
  })
}
