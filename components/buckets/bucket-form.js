import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modal'
import modalStyles from '../../styles/modal-styles'

export default class BucketForm extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.id
    this.onDestroy = this.props.onDestroy
    this.state = {
      editing: this.props.editing,
    }
  }

  componentWillReceiveProps(props) {
    if (props.editing) {
      this.setState({ editing: props.editing })
    }
  }

  destroy() {
    this.setState({ editing: false })
    this.onDestroy(this.id)
  }

  render() {
    return (
      <Modal
        isVisible={this.state.editing}
        onBackdropPress={() => this.setState({editing:false})}
        style={modalStyles.center}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <TouchableHighlight
          style={modalStyles.redButton}
          onPress={this.destroy.bind(this)}
        >
          <Text style={modalStyles.title}>
            Delete Bucket
          </Text>
        </TouchableHighlight>
      </Modal>
    )
  }

}
