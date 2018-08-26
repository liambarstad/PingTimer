import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import reportStyles from '../../styles/report-styles'

export default class BucketReportBar extends Component {
  constructor(props) {
    super(props)
    this.name = this.props.name
    this.numBuckets = this.props.numBuckets
    this.state = {
      time: this.props.time,
      maxTime: this.props.maxTime,
    }
  }

  render() {
    return (
      <View
        style={[
          reportStyles.barEntry,
          {width: this._calculateWidth()},
        ]}
      >
        <View style={reportStyles.barContainer}>
          <Text style={reportStyles.barTitle}>
            { this.state.time }
          </Text>

          <View
            style={[
              reportStyles.bar,
              {height: this._calculateHeight()},
            ]}
          />
        </View>

        <View style={reportStyles.divider} />

        <View style={reportStyles.barFooterContainer}>
          <Text style={reportStyles.barFooter}>
            { this.name }
          </Text> 
        </View>
      </View>
    )
  }

  _calculateWidth() {
    return (100.0 / this.numBuckets).toString() + '%'
  }

  _calculateHeight() {
    let ratio = ((this.state.time / this.state.maxTime) * 100) - 10
    return ratio.toString() + '%'
  }
}
