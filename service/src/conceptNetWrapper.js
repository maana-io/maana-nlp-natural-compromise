const ConceptNet = require('concept-net')
let conceptNet = ConceptNet(null, null, '5.3')
const fetch = require('node-fetch')
const base = 'http://api.conceptnet.io'

const Wrapper = {
  getConcept: async (text, language) => {
    let uri = `/c/${language}/${text.replace(' ', '_')}`
    let res = await fetch(base + uri)
      .then(async res => await res.text())
      .then(body => JSON.parse(body))
    return res
  },

  getConceptStartingWith: async (text, language) => {
    let uri = `/c/${language}/${text.replace(' ', '_')}`
    let res = await fetch(base + '/query?start=' + uri + '&limit=100')
      .then(async res => await res.text())
      .then(body => JSON.parse(body))
    return res
  },
  getConceptEndingWith: async (text, language) => {
    let uri = `/c/${language}/${text.replace(' ', '_')}`
    let res = await fetch(base + '/query?end=' + uri + '&limit=100')
      .then(async res => await res.text())
      .then(body => JSON.parse(body))

    return res
  },
  getConceptWithRelation: async (text, relationName, language) => {
    let uri = `/c/${language}/${text.replace(' ', '_')}`
    console.log(
      base + '/query?start=' + uri + '&rel=/r/' + relationName + '&limit=20'
    )
    let res = await fetch(
      base + '/query?start=' + uri + '&rel=/r/' + relationName + '&limit=20'
    )
      .then(async res => await res.text())
      .then(body => JSON.parse(body))

    return res
  },
  getEdgesForConcepts: async (startText, endText, language) => {
    let startUri = `/c/${language}/${startText.replace(' ', '_')}`
    let endUri = `/c/${language}/${endText.replace(' ', '_')}`
    let res = await fetch(
      base + '/query?node=' + startUri + '&other=' + endUri + '&limit=100'
    )
      .then(async res => await res.text())
      .then(body => JSON.parse(body))
    return res
  }
}

module.exports = { ...Wrapper }
