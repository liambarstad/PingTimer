const Realm = require('realm')
const { schema } = require('./schema')

const getAll = async () => {
  let realm = await Realm.open({ schema })
  return realm.objects('Timer')
}

const get = async (id) => {
  try {
    let realm = await Realm.open({ schema })
    return realm.objectForPrimaryKey('Timer', id)
  } catch (e) {
    alert(e)
  }
}

const getActiveIntervals = async (id) => {
  try {
    let timer = await get(id)
    let pings = []
    if (timer.defaulted) { pings.push(timer.defaultPing) }
    for (let customPing in timer.customPings) {
      pings.push(timer.customPings[customPing])
    }
    return pings
  } catch (e) {
    alert(e)
  }
}

const getActiveDefaultTimers = async () => {
  try {
    let realm = await Realm.open({ schema })
    let timers = realm.objects('Timer')
    return timers.filtered('active == true AND defaulted == true')
  } catch (e) {
    alert(e)
  }
}

const turnOnDefault = async (id, defaultPing) => {
  try {
    let realm = await Realm.open({ schema })
    realm.write(() => {
      realm.create('Timer', { id, defaulted: true, defaultPing }, true)
    })
  } catch (e) {
    alert(e)
  }
}

const turnOffDefault = async (id) => {
  try {
    let realm = await Realm.open({ schema })
    realm.write(() => {
      realm.create('Timer', { id, defaulted: false }, true)
    })
  } catch (e) {
    alert(e)
  }
}

const changeDefault = async (interval) => {
  try {
    let realm = await Realm.open({ schema })
    let timers = realm.objects('Timer').filtered('defaulted == true')
    realm.write(() => {
      for (let timer in timers) {
        timers[timer].defaultPing = interval
      }
    })
  } catch (e) {
    alert(e)
  }
}

const addCustom = async (id, value) => {
  try {
    let realm = await Realm.open({ schema }) 
    let timer = realm.objectForPrimaryKey('Timer', id)
    realm.write(() => {
      timer.customPings = [...timer.customPings, value]
    })
  } catch (e) {
    alert(e)
  }
}

const removeCustom = async (id, value) => {
  try {
    let realm = await Realm.open({ schema })
    let timer = realm.objectForPrimaryKey('Timer', id)
    realm.write(() => {
      let ind = timer.customPings.indexOf(value)
      timer.customPings.splice(ind, 1)
    })
  } catch (e) {
    alert(e)
  }

}

const create = async (data) => {
  let realm = await Realm.open({ schema })
  realm.write(() => {
    realm.create('Timer', data)
  })
  return data
}

const destroy = async (id) => {
  let realm = await Realm.open({ schema })
  const timers = realm.objects('Timer').filtered(`id = ${id}`)
  realm.write(() => realm.delete(timers[0]))
  return timers[0]
}

const toggleActive = async (id, prevValue) => {
  try {
    let realm = await Realm.open({ schema })
    realm.write(() => realm.create('Timer', { id, active:!prevValue, last: Date.now() }, true))
    return true
  } catch (e) {
    return false
  }
}

const addTime = async (id, time) => {
  try {
    let realm = await Realm.open({ schema })
    let oldTime = await get(id)
    let newTime = new Date()
    newTime.setTime(oldTime.time.getTime() + time)
    realm.write(() => realm.create('Timer', { id, time: newTime }, true))
  } catch (e) {
    alert(e)
  }
}

const update = async (id, key, value) => {
  try {
    let realm = await Realm.open({ schema })
    let data = {}
    data.id = id
    data[key] = value
    realm.write(() => realm.create('Timer', data, true)) 
  } catch (e) {
    alert(e)
  }
}

const performMigrations = async () => {
  new Realm({ 
    schema,
    schemaVersion: 1,
    migration: (oldRealm, newRealm) => {
      oldRealm.deleteAll()
      newRealm.deleteAll()
    }
  })
}

module.exports = { 
  getAll, 
  get, 
  getActiveIntervals,
  getActiveDefaultTimers,
  turnOnDefault,
  turnOffDefault,
  changeDefault,
  addCustom,
  removeCustom,
  create, 
  destroy, 
  toggleActive, 
  addTime, 
  update, 
  performMigrations,
}
