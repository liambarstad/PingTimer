const Realm = require('realm')

const TimerSchema = {
  name: 'Timer',
  primaryKey: 'id',
  properties: {
    id: 'int',
    time: 'date',
    last: 'date?',
    active: 'bool',
    name: 'string',
    defaulted: 'bool',
    defaultPing: 'string?',
    customPings: 'string?[]',
  },
}

const BucketSchema = {
  name: 'Bucket',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    timers: 'Timer[]',
    //customPings: 'string?[]',
  },
}

const SettingsSchema = {
  name: 'Settings',
  primaryKey: 'name',
  properties: {
    name: 'string',
    value: 'string',
  }
}

module.exports = { schema: 
  [
    TimerSchema, 
    BucketSchema,
    SettingsSchema,
  ] 
}
