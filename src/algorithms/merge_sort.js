import { sortDelay, setIgnoredItemsState } from '@/utils'

async function merge(arr, l, m, r, getDelay) {
  var n1 = m - l + 1
  var n2 = r - m

  var L = new Array(n1)
  var R = new Array(n2)

  for (var i = 0; i < n1; i++) {
    L[i] = arr[l + i].value
  }
  for (var j = 0; j < n2; j++) {
    R[j] = arr[m + 1 + j].value
  }

  var i = 0,
    j = 0
  var k = l

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k].value = L[i]
      i++
    } else {
      arr[k].value = R[j]
      j++
    }
    k++
  }

  while (i < n1) {
    arr[k].value = L[i]
    await sortDelay(getDelay())
    i++
    k++
  }

  while (j < n2) {
    arr[k].value = R[j]
    await sortDelay(getDelay())
    j++
    k++
  }
}

async function mergeSortRecursion(arr, l, r, getDelay) {
  if (l >= r) {
    return
  }
  var m = l + parseInt((r - l) / 2)
  await mergeSortRecursion(arr, l, m, getDelay)
  await mergeSortRecursion(arr, m + 1, r, getDelay)
  await merge(arr, l, m, r, getDelay)
}

export default async function mergeSort(arr, l, r, getDelay) {
  await mergeSortRecursion(arr, l, r, getDelay)
}
