const Realm = require('realm')
const { schema } = require('./schema')

const possiblePingIntervals = {
  'None': 'NA',
  '5 min': '5',
  '10 min': '10',
  '15 min': '15',
  '20 min': '20',
  '30 min': '30',
  '45 min': '45',
  '1 hr': '60',
  '2 hrs': '120',
  '4 hrs': '240',
  '6 hrs': '360',
  '8 hrs': '480',
  '12 hrs': '720',
  'Daily': 'DAY',
  'Weekly': 'WEEK',
  'Monthly': 'MONTH',
}

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
  possiblePingIntervals,
  getPingInterval, 
  setPingInterval, 
  getLayout,
  setLayout,
  getColors,
  setColors,
}
