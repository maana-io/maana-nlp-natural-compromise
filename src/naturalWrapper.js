const natural = require('natural')

const Wrapper = {
  tokenize: (text, tokenizerType) => {
    let tokenizer = new natural[tokenizerType]()
    return tokenizer.tokenize(text)
  },

  hammingDistance: (source, target) => {
    return natural.HammingDistance(source, target)
  },
  jaroWinklerDistance: (source, target) => {
    return natural.JaroWinklerDistance(source, target)
  },
  levenshteinDistance: (
    source,
    target,
    insertionCost = 1,
    deletionCost = 0,
    substitutionCost = 0
  ) => {
    return natural.LevenshteinDistance(
      source,
      target,
      insertionCost,
      deletionCost,
      substitutionCost
    )
  },
  damerauLevenshteinDistance: (
    source,
    target,
    transportationCost = 0,
    restricted = false
  ) => {
    return natural.DamerauLevenshteinDistance(
      source,
      target,
      transportationCost,
      restricted
    )
  },
  diceCoefficient: (source, target) => {
    return natural.DiceCoefficient(source, target)
  }
}

module.exports = { ...Wrapper }
