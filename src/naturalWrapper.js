const natural = require('natural')

let load = path => {
  return new Promise((resolve, reject) => {
    natural.BayesClassifier.load(path, null, (err, classifier) => {
      resolve(classifier)
    })
  })
}

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
  },

  createClassifier: async name => {
    let classifier = new natural.BayesClassifier()
    let saved

    try {
      saved = await classifier.save(`./classifiers/${name}.json`)
    } catch (e) {
      console.log('error creating classifer', e)
    }

    return JSON.stringify(classifier)
  },

  addLabeledDocumentToClassifier: async (classifierName, text, label) => {
    let classifier = await load(`./classifiers/${classifierName}.json`)
    classifier.addDocument(text, label)
    await classifier.train()
    return await classifier.save(`./classifiers/${classifierName}.json`)
  },

  classify: async (classifierName, text) => {
    let classifier = await load(`./classifiers/${classifierName}.json`)
    return classifier.getClassifications(text)
  }
}

module.exports = { ...Wrapper }
