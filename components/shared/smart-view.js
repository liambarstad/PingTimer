import React, { Component } from 'react'
import { View } from 'react-native'
const Dimensions = require('Dimensions')

export default class SmartView extends Component {
  constructor(props) {
    super(props)
    this.verticalDimensions = {
      height: this.props.verticalHeight || '100%',
      width: this.props.verticalWidth || '100%',
      orientation: 'vertical',
    }

    this.horizontalDimensions = {
      height: this.props.horizontalHeight || '100%',
      width: this.props.horizontalWidth || '100%',
      orientation: 'horizontal',
    }

    let isVertical = this._isVertical()
    if (isVertical) {
      this.state = { dimensions: this.verticalDimensions }
    } else {
      this.state = { dimensions: this.horizontalDimensions }
    }
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this._swapOrientation()
    })
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', () => {
      this._swapOrientation()
    })
  }

  render() {
    return (
      <View
        style={{
          height: this.state.dimensions.height,
          width: this.state.dimensions.width,
        }}
      >
        { this.props.children }
      </View>
    )
  }

  _isVertical() {
    let dimensions = Dimensions.get('window')
    if (dimensions.height > dimensions.width) { return true }
    return false
  }

  _swapOrientation() {
    if (this._isVertical()) {
      this.setState({ dimensions: this.verticalDimensions })
    } else {
      this.setState({ dimensions: this.horizontalDimensions })
    }
  }

}
