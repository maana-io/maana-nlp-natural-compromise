const { getUserId } = require('../../utils')
const {
  createClassifier,
  addLabeledDocumentToClassifier
} = require('../../naturalWrapper')
const uuid4 = require('uuid4')

const classifier = {
  async createClassifier(parent, { name }, ctx, info) {
    let savedClassifier = await createClassifier(name)
    return ctx.db.mutation.createClassifier(
      {
        data: {
          name,
          status: 'clean',
          serialized: savedClassifier
        }
      },
      info
    )
  },

  async addLabeledDocumentToClassifier(
    parent,
    { classifierName, text, label },
    ctx,
    info
  ) {
    await addLabeledDocumentToClassifier(classifierName, text, label)

    return ctx.db.mutation.updateClassifier(
      {
        where: {
          name: classifierName
        },
        data: {
          status: 'dirty'
        }
      },
      info
    )
  }
}

module.exports = { classifier }
