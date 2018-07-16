import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import RowList from '../shared/row-list'
import SmartView from '../shared/smart-view'
import Bucket from './bucket'
import NewBucketForm from './new-bucket-form'
const BucketModel = require('../../models/bucket-model')

export default class Buckets extends Component {
  constructor(props) {
    super(props)
    this.notificationScheduler = this.props.notificationScheduler
    this.state = {
      buckets: [],
      creating: false,
    }
  }

  async componentDidMount() {
    let rawBuckets = await BucketModel.getAll()
    let buckets = Array.from(rawBuckets)
    this.setState({ buckets })
  }

  add() {
    this.setState({ creating: true })
  }

  async createBucket(bucket) {
    let newBucket = await BucketModel.create(bucket)
    this.setState({ buckets: [...this.state.buckets, newBucket]})
  }

  destroyBucket(id, ind) {
    let buckets = this.state.buckets
    buckets.splice(ind, 1)
    this.setState({ buckets })
    BucketModel.destroy(id)
  }

  formatBucket(bucket, index, visibleNumber) {
    return (
      <Bucket
        key={bucket.id.toString()}
        id={bucket.id}
        index={index.toString()}
        name={bucket.name}
        width={this.props.width / visibleNumber}
        onPress={this.props.onBucketDetail.bind(this)}
        onDestroy={this.destroyBucket.bind(this)}
      />
    )
  }

  render() {
    return (
      <SmartView
        verticalHeight={'75%'}
        horizontalHeight={'60%'}
      >
        <NewBucketForm
          creating={this.state.creating}
          onSubmit={this.createBucket.bind(this)}
        />
        <ScrollView>
          <RowList
            onFormat={this.formatBucket.bind(this)}
            targetWidth={this.props.targetWidth}
          >
            { this.state.buckets }
          </RowList>
        </ScrollView>
      </SmartView>
    )
  }

}
