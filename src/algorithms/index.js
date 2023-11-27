const algorithmContext = import.meta.glob('./*.js')

const algorithmFunctions = {}

const importAlgorithms = async () => {
  for (const key of Object.keys(algorithmContext)) {
    const algorithmName = key.replace(/\.\/|\.js/g, '')
    const module = await algorithmContext[key]()
    algorithmFunctions[algorithmName] = module.default
  }
}

await importAlgorithms()

export { algorithmFunctions }
