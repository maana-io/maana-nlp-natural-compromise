const { getUserId } = require('../utils')

const {
  nouns,
  verbs,
  sentences,
  match,
  contractions,
  values,
  people,
  places,
  organizations,
  topics,
  normalize
} = require('../compromiseWrapper')

const {
  tokenize,
  hammingDistance,
  jaroWinklerDistance,
  levenshteinDistance,
  damerauLevenshteinDistance,
  diceCoefficient,
  classify
} = require('../naturalWrapper')

const Sentiment = require('sentiment')
let sentiment = new Sentiment()

const retext = require('retext')
const keywords = require('retext-keywords')
const toString = require('nlcst-to-string')
const _ = require('lodash')
let tm = require('text-miner')

const documentMatrixFromArray = text => {
  let corpus = new tm.Corpus([])
  let upperCasedStopWords = tm.STOPWORDS.EN.map(lower => {
    return lower.charAt(0).toUpperCase() + lower.substr(1)
  })
  corpus.addDocs(text)
  let clean = corpus
    .clean()
    .trim()
    .removeWords(upperCasedStopWords)
    .removeWords(tm.STOPWORDS.EN)
    .clean()

  return new tm.DocumentTermMatrix(clean)
}

const flatten = arr => {
  return arr.reduce(function(prev, curr) {
    return prev.concat(curr)
  })
}

const Query = {
  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },

  nouns(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return nouns(text, 'array')
    })
    return flatten(res)
  },

  verbs(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return verbs(text, 'array')
    })
    return flatten(res)
  },

  values(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return values(text, 'array')
    })
    return flatten(res)
  },

  people(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return people(text, 'array')
    })
    return flatten(res)
  },

  places(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return places(text, 'array')
    })
    return flatten(res)
  },

  organizations(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return organizations(text, 'array')
    })
    return flatten(res)
  },

  topics(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return topics(text, 'array')
    })
    return flatten(res)
  },

  sentences(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return sentences(text, 'array')
    })
    return flatten(res)
  },

  contractions(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return contractions(text, 'array')
    })
    return flatten(res)
  },

  compromiseMatch(parent, { text, expression }, ctx, info) {
    return match(text, expression)
  },

  nounsTags(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return nouns(text, 'tags')
    })
    return flatten(res)
  },
  verbsTags(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return verbs(text, 'tags')
    })
    return flatten(res)
  },
  valuesTags(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return values(text, 'tags')
    })
    return flatten(res)
  },
  peopleTags(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return people(text, 'tags')
    })
    return flatten(res)
  },
  placesTags(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return places(text, 'tags')
    })
    return flatten(res)
  },
  organizationsTags(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return organizations(text, 'tags')
    })
    return flatten(res)
  },
  topicsTags(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return topics(text, 'tags')
    })
    return flatten(res)
  },
  sentencesTags(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return sentences(text, 'tags')
    })
    return flatten(res)
  },
  contractionsTags(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      return contractions(text, 'tags')
    })
    return flatten(res)
  },

  normalize(parent, { text, options }, ctx, info) {
    return normalize(text, options)
  },

  //Natural
  tokenize(parent, { text, tokenizerType }, ctx, info) {
    return tokenize(text, tokenizerType)
  },

  hammingDistance(parent, { source, target }, ctx, info) {
    return hammingDistance(source, target)
  },
  jaroWinklerDistance(parent, { source, target }, ctx, info) {
    return jaroWinklerDistance(source, target)
  },
  diceCoefficient(parent, { source, target }, ctx, info) {
    return diceCoefficient(source, target)
  },
  levenshteinDistance(
    parent,
    { source, target, insertionCost, deletionCost, substitutionCost },
    ctx,
    info
  ) {
    return levenshteinDistance(source, target)
  },
  damerauLevenshteinDistance(
    parent,
    { source, target, transportationCost, restricted },
    ctx,
    info
  ) {
    return hammingDistance(source, target)
  },

  async classify(parent, { classifierName, text }, ctx, info) {
    return classify(classifierName, text)
  },

  sentiment(parent, { texts }, ctx, info) {
    let res = texts.map(text => {
      var sentiment = new Sentiment()
      let s = sentiment.analyze(text)
      return s.score.toString()
    })

    return res
  },

  average(parent, { values }, ctx, info) {
    const arrSum = values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    return (arrSum / values.length).toString()
  },

  extractKeyword(parent, { sentences }, ctx, info) {
    let res = []
    retext()
      .use(keywords)
      .process(sentences.join('\n'), (err, file) => {
        file.data.keywords.forEach(keyword =>
          res.push(toString(keyword.matches[0].node))
        )
      })
    return res
  },
  extractKeyphrases(parent, { sentences }, ctx, info) {
    let res = []
    retext()
      .use(keywords)
      .process(sentences.join('\n'), (err, file) => {
        file.data.keyphrases.forEach(keyphrase => {
          res.push(
            keyphrase.matches[0].nodes.map(val => toString(val)).join('')
          )
        })
      })
    return res
  },

  getTop10FrequenteWordsInText(parent, { text }, ctx, info) {
    let terms = documentMatrixFromArray(text)
    let frequent = terms.findFreqTerms(2)
    let topWords = _.take(_.orderBy(frequent, 'count', 'desc'), 10).map(
      x => x.word
    )

    return topWords
  },

  getTop100FrequenteRankedWordsInText(parent, { text }, ctx, info) {
    let terms = documentMatrixFromArray(text)
    let frequent = terms.findFreqTerms(2)
    let rankedWords = _.take(_.orderBy(frequent, 'count', 'desc'), 100)
    return rankedWords
  },

  getVocabulary(parent, { text }, ctx, info) {
    let terms = documentMatrixFromArray(text)
    return terms.vocabulary
  },

  combinedRanked(parent, { ranked1, ranked2 }, ctx, info) {
    let agg = []
    let result = [...ranked1, ...ranked2].map(entry => {
      let { word, count } = entry
      let exists = _.find(agg, { word })
      if (_.isEmpty(exists)) {
        agg.push(entry)
      } else {
        let select = exists
        let sum = select.count + count
        agg = agg.filter(x => {
          x.word === word
        })
        agg.push({ word, count: sum })
      }
    })
    return agg
  },

  getTop10RankedeWords(parent, { ranked }, ctx, info) {
    let terms = documentMatrixFromArray(text)
    let frequent = terms.findFreqTerms(2)
    return _.take(_.orderBy(frequent, 'count', 'desc'), 10)
  },

  combineLists(parent, { list1, list2 }, ctx, info) {
    return [...list1, ...list2]
  }
}

module.exports = { Query }
