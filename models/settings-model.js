const Realm = require('realm')
const { schema } = require('./schema')

const getPingInterval = async () => {
  try {
    let realm = await Realm.open({ schema })
    let pingSetting = realm.objectForPrimaryKey('Settings', 'pingInterval')
    if (pingSetting) {
      return pingSetting.value
    } else {
      let pingInterval = await initializePingInterval()
      return pingInterval
    }
  } catch (e) {
    alert(e)
  }
}

const getBucketView = async () => {
  try {
    let realm = await Realm.open({ schema })
    let bucketSetting = realm.objectForPrimaryKey('Settings', 'bucketView')
    if (bucketSetting) {
      return _toBool(bucketSetting.value)
    } else {
      let bucketView = await initializeBucketView()
      return _toBool(bucketView)
    }
  } catch (e) {
    alert(e)
  }
}


const setPingInterval = async (time) => {
  let realm = await Realm.open({ schema })
  realm.write(() => {
    realm.create('Settings', {
      name: 'pingInterval',
      value: time
    }, true)
  })
}

const initializeBucketView = async (value='false') => {
  let realm = await Realm.open({ schema })
  realm.write(() => {
    realm.create('Settings', {
      name: 'bucketView',
      value,
    })
  })
  return value
}

const initializePingInterval = async (value='15') => {
  let realm = await Realm.open({ schema })
  realm.write(() => {
    realm.create('Settings', {
      name: 'pingInterval',
      value,
    })
  })
  return value
}

const getLayout = async () => {

}

const setLayout = async (layout) => {

}

const getColors = async () => {

}

const setColors = async (colorScheme) => {

}

const _toBool = (str) => {
  if (str === 'true') { 
    return true 
  } else {
    return false 
  }
}

module.exports = { 
  getPingInterval, 
  getBucketView,
  setPingInterval, 
  getLayout,
  setLayout,
  getColors,
  setColors,
}
