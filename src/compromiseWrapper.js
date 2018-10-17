const nlp = require('compromise')

const Wrapper = {
  nouns: (text, outType) => {
    return nlp(text)
      .nouns()
      .out(outType)
  },

  verbs: (text, outType) => {
    return nlp(text)
      .verbs()
      .out(outType)
  },

  values: (text, outType) => {
    return nlp(text)
      .values()
      .out(outType)
  },

  sentences: (text, outType) => {
    return nlp(text)
      .sentences()
      .out(outType)
  },

  match: (text, expression) => {
    return nlp(text)
      .match(expression)
      .out('array')
  },

  contractions: (text, outType) => {
    return nlp(text)
      .contractions()
      .out(outType)
  },

  people: (text, outType) => {
    return nlp(text)
      .people()
      .out(outType)
  },

  places: (text, outType) => {
    return nlp(text)
      .places()
      .out(outType)
  },

  organizations: (text, outType) => {
    return nlp(text)
      .organizations()
      .out(outType)
  },

  normalize: (text, options) => {
    let opts = {}
    options.forEach(option => {
      opts[option] = true
    })

    return nlp(text)
      .normalize(options)
      .out('text')
  }
}

module.exports = { ...Wrapper }
