export const sortDelay = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

export const setIgnoredItemsState = (arr) => {
  const items = arr.filter((data) => !data.sorted)
  items.forEach((item) => (item.sorted = true))
}
