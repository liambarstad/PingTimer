import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
const Dimensions = require('Dimensions')

export default class RowList extends Component {
  constructor(props) {
    super(props)
    this.onFormat = this.props.onFormat
    this.targetWidth = this.props.targetWidth
    this.state = {
      objects: this.props.children,
      rows: [],
      height: this.props.height,
      width: this.props.width,
      visibleNumber: this._calculateVisibleObjects(this.props.width),
      orientation: this.props.orientation || 'Vertical',
    }
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this._swapOrientation()
    })
    this.populateObjects() 
  }
  
  componentWillReceiveProps(props) {
    if (props.children) {
      let objects = props.children
      let rows = this._initializeRows(objects)
      this.setState({ objects, rows })
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', () => {
      this._swapOrientation()
    })
  }

  populateObjects(objects=this.state.objects) {
    let rows = this._initializeRows(objects)
    this.setState({ rows })
  }

  render() {
    return (
      <View>
        { this.state.rows }
      </View>
    )
  }

  _calculateVisibleObjects(windowWidth, targetWidth=this.targetWidth) {
    return Math.floor(windowWidth / parseInt(targetWidth))
  }

  _initializeRows(objects=this.state.objects) {
    let rows = []
    for (i = 0; i < objects.length; i += this.state.visibleNumber) {
      let batch = objects.slice(i, (i + this.state.visibleNumber))
      let newRow = this._formatBatch(batch, i)
      let row = this._formatRow(newRow)
      rows.push(row)
    }
    return rows
  }

  _swapOrientation(objects) {
    const width = this.state.height
    const height = this.state.width
    const visibleNumber = this._calculateVisibleObjects(width) 
    this.setState({ height, width, visibleNumber })
    let rows = this._initializeRows(objects)
    this.setState({ rows })
  }

  _setOrientation() {
    if (this.state.height > this.state.width) {
      this.setState({ orientation: 'Vertical' })
    } else {
      this.setState({ orientation: 'Horizontal' })
    }
  }

  _formatBatch(objects, startIndex) {
    let formattedObjects = []
    objects.forEach((object, ind) => {
      formattedObjects.push(
        this.onFormat(object, (startIndex + ind), this.state.visibleNumber)
      )
    })
    return formattedObjects
  }

  _formatRow(formattedObjects) {
    return (
      <View style={{flexDirection: 'row'}}>
        { formattedObjects }
      </View>
    )
  }

}
