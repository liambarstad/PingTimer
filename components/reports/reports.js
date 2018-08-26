import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import ReportTabs from './report-tabs'
import BucketReportBars from './bucket-report-bars'
import reportStyles from '../../styles/report-styles'

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
      <View style={reportStyles.reportBackground}>
        <ReportTabs 
          onChange={this.switchTabs.bind(this)} 
        />

        { this.reportBars() }

        <TouchableHighlight
          onPress={this.onReturn}
          style={reportStyles.returnButton}
        >
          <Text style={reportStyles.title}>
            Return
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
