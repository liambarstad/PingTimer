import React, { Components } from 'react'
import { Text, View, ScrollView } from 'react-native'
const Dimensions = require('Dimensions')

export default class Buckets extends Component {
  constructor(props) {
    super(props)
    this.notificationScheduler = this.props.notificationScheduler
    this.state = {
      buckets: [],
      rows: [],
      height: this.props.height,
      width: this.props.width,
      visibleNumber: this._calculateV
    }
  }
}
