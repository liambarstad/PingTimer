import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import ReportTabs from './report-tabs'
import BucketReportBars from './bucket-report-bars'

export default class Reports extends Component {
  constructor(props) {
    super(props)
    this.onReturn = this.props.onReturn
    this.state = {
      activeTab: 'buckets',
    }
  }

  switchTabs(newTab) {

  }

  reportBars() {
    if (this.state.activeTab = 'buckets') {
      return (
        <BucketReportBars />
      )
    }
  }

  render() {
    return (
      <View
        style={{
          height:'100%',
          flexDirection: 'column',
        }}
      >
        <ReportTabs 
          onChange={this.switchTabs.bind(this)} 
        />

        { this.reportBars() }

        <TouchableHighlight
          onPress={this.onReturn}
          style={[
            modalStyles.returnButton,
            modalStyles.bottom,
          ]}
        >
          <Text style={modalStyles.title}>
            Return
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
