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
  topics
} = require('../compromiseWrapper')

const {
  tokenize,
  hammingDistance,
  jaroWinklerDistance,
  levenshteinDistance,
  damerauLevenshteinDistance,
  diceCoefficient
} = require('../naturalWrapper')

const Query = {
  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },

  nouns(parent, { text }, ctx, info) {
    return nouns(text, 'array')
  },

  verbs(parent, { text }, ctx, info) {
    return verbs(text, 'array')
  },

  values(parent, { text }, ctx, info) {
    return values(text, 'array')
  },

  people(parent, { text }, ctx, info) {
    return people(text, 'array')
  },

  places(parent, { text }, ctx, info) {
    return places(text, 'array')
  },

  organizations(parent, { text }, ctx, info) {
    return organizations(text, 'array')
  },

  topics(parent, { text }, ctx, info) {
    return topics(text, 'array')
  },

  sentences(parent, { text }, ctx, info) {
    return sentences(text, 'array')
  },

  contractions(parent, { text }, ctx, info) {
    return contractions(text, 'array')
  },

  compromiseMatch(parent, { text, expression }, ctx, info) {
    return match(text, expression)
  },

  nounsTags(parent, { text }, ctx, info) {
    return nouns(text, 'tags')
  },
  verbsTags(parent, { text }, ctx, info) {
    return verbs(text, 'tags')
  },
  valuesTags(parent, { text }, ctx, info) {
    return values(text, 'tags')
  },
  peopleTags(parent, { text }, ctx, info) {
    return people(text, 'tags')
  },
  placesTags(parent, { text }, ctx, info) {
    return places(text, 'tags')
  },
  organizationsTags(parent, { text }, ctx, info) {
    return organizations(text, 'tags')
  },
  topicsTags(parent, { text }, ctx, info) {
    return topics(text, 'tags')
  },
  sentencesTags(parent, { text }, ctx, info) {
    return sentences(text, 'tags')
  },
  contractionsTags(parent, { text }, ctx, info) {
    return contractions(text, 'tags')
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
  }
}

module.exports = { Query }
