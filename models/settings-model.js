const Realm = require('realm')
const { schema } = require('./schema')

const getPingInterval = async () => {
  try {
    let realm = await Realm.open({ schema })
    let pingSetting = realm.objectForPrimaryKey('Settings', 'pingInterval')
    if (pingSetting) {
      return pingSetting.value
    } else {
      return await initializePingInterval()
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

const initializePingInterval = async (time='15') => {
  let realm = await Realm.open({ schema })
  realm.write(() => {
    realm.create('Settings', {
      name: 'pingInterval',
      value: time
    })
  })
  return time
}

const getLayout = async () => {

}

const setLayout = async (layout) => {

}

const getColors = async () => {

}

const setColors = async (colorScheme) => {

}

module.exports = { 
  getPingInterval, 
  setPingInterval, 
  getLayout,
  setLayout,
  getColors,
  setColors,
}
