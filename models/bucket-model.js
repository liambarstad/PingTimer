const Realm = require('realm')
const { schema } = require('./schema')

const getAll = async () => {
  let realm = await Realm.open({ schema })
  return realm.objects('Bucket')
}

const create = async (bucket) => {

}

const destroy = async (id) => {

}

module.exports = {
  getAll,
  create,
  destroy,
}
