import { sortDelay, setIgnoredItemsState, isSorted } from '@/utils'

async function merge(arr, l, m, r) {
  if (!isSorted()) return
  var n1 = m - l + 1
  var n2 = r - m

  var L = new Array(n1)
  var R = new Array(n2)

  for (var i = 0; i < n1; i++) {
    if (!isSorted()) break
    L[i] = arr[l + i].value
  }
  for (var j = 0; j < n2; j++) {
    if (!isSorted()) break
    R[j] = arr[m + 1 + j].value
  }

  
  var i = 0,
    j = 0
  var k = l

  while (i < n1 && j < n2) {
    if (!isSorted()) break

    if (L[i] <= R[j]) {
      arr[k].value = L[i]
      arr[k].current = true
      arr[k].current2 = false
      i++
    } else {
      arr[k].value = R[j]
      arr[k].current = false
      arr[k].current2 = true
      j++
    }
    await sortDelay()
    arr[k].current = false
    arr[k].current2 = false
    k++
  }

  while (i < n1) {
    if (!isSorted()) break
    arr[k].value = L[i]
    arr[k].current = true
    arr[k].current2 = false
    await sortDelay()
    arr[k].current = false
    i++
    k++
  }

  while (j < n2) {
    if (!isSorted()) break
    arr[k].value = R[j]
    arr[k].current = false
    arr[k].current2 = true
    await sortDelay()
    arr[k].current2 = false
    j++
    k++
  }
}

async function mergeSortRecursion(arr, l, r) {
  if (l >= r || !isSorted()) return

  const m = l + parseInt((r - l) / 2)

  const pLeft = mergeSortRecursion(arr, l, m)
  const pRight = mergeSortRecursion(arr, m + 1, r)

  await Promise.all([pLeft, pRight])

  await merge(arr, l, m, r)

  if (!isSorted()) return
}

export default async function mergeSort(arr, l, r) {
  await mergeSortRecursion(arr, l, r)
  if (!isSorted()) return
  setIgnoredItemsState(arr)
}
