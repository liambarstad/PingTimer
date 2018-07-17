const Realm = require('realm')
const { schema } = require('./schema')

const getAll = async () => {
  try {
    let realm = await Realm.open({ schema })
    return realm.objects('Bucket')
  } catch (e) {
    alert(e)
  }
}

const get = async (id) => {
 try {
   let realm = await Realm.open({ schema })
   return realm.objectForPrimaryKey('Bucket', id)
 } catch (e) {
  alert(e)
 }
}

const toggleTimer = async (bucketId, timerId) => {
  try {
    let realm = await Realm.open({ schema })
    realm.write(() => {
      let bucket = realm.objectForPrimaryKey('Bucket', bucketId)
      let timer = realm.objectForPrimaryKey('Timer', timerId)
      let ind = bucket.timers.indexOf(timer)
      if (ind < 0) {
        bucket.timers.push(timer) 
        realm.create('Bucket', bucket, true)
      } else {
        bucket.timers.splice(ind, 1)
        realm.create('Bucket', bucket, true)
      }
    })
  } catch (e) {
    alert(e)
  }
}

const create = async (data, linkedObjects={}) => {
  try {
    let realm = await Realm.open({ schema })
    realm.write(() => {
      let newBucket = realm.create('Bucket', data)
      linkedObjects.timers.forEach((timerId) => {
        let timer = realm.objectForPrimaryKey('Timer', timerId)
        newBucket.timers.push(timer)
      })
    })
  } catch (e) {
    alert(e)
  }
}

const destroy = async (id) => {
  try {
    let realm = await Realm.open({ schema })
    const bucket = realm.objectForPrimaryKey('Bucket', id)
    realm.write(() => realm.delete(bucket))
    return bucket
  } catch (e) {
    alert(e)
  }
}

module.exports = {
  getAll,
  get,
  toggleTimer,
  create,
  destroy,
}
