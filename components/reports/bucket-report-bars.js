import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import BucketReportBar from './bucket-report-bar'
import reportStyles from '../../styles/report-styles'
const BucketModel = require('../../models/bucket-model')

export default class BucketReportBars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buckets: [],
    }
  }

  async componentDidMount() {
    let rawBuckets = await BucketModel.getAll()
    rawBuckets = Array.from(rawBuckets)
    let buckets = this._formatBuckets(rawBuckets)
    this.setState({ buckets })
  }

  componentWillUnmount() {
    this.setState({ buckets: [] })
  }

  render() {
    return (
      <View
        style={reportStyles.reportBars}
      >
        { this.state.buckets }
      </View>
    )
  }

  _formatBuckets(buckets) {
    let res = []
    let maxTime = this._getMaxTime(buckets)
    buckets.forEach((bucket) => {
      let totalTime = this._getBucketTotalTime(bucket)
      res.push(this._formatBucket(bucket, buckets.length, totalTime, maxTime))
    })
    return res
  }

  _getMaxTime(buckets) {
    let max = 0
    buckets.forEach((bucket) => {
      let totalTime = this._getBucketTotalTime(bucket)
      if (totalTime > max) { max = totalTime }
    })
    return max
  }

  _getBucketTotalTime(bucket) {
    let totalTimeMilliseconds = 0
    Array.from(bucket.timers).forEach((timer) => {
      totalTimeMilliseconds += (timer.time - new Date(0,0,0,0,0,0))
    })
    return totalTimeMilliseconds / 1000.0
  }

  _formatBucket(bucket, numBuckets, time, maxTime) {
    return (
      <BucketReportBar
        name={bucket.name}
        time={time}
        maxTime={maxTime}
        numBuckets={numBuckets}
      />
    )
  }

}
