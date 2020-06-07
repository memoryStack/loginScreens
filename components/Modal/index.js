/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  StyleSheet,
  Modal,
  View,
  Text,
} from 'react-native'
import Button from '../Button'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: 1,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: 300,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24
  },
  headingText: {
      fontSize: 20,
      fontWeight: 'bold'
  },
  messageText: {
    fontSize: 16,
    fontWeight: '300'
  }
});

export default class CustomModal  extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Text style={styles.headingText}>{this.props.heading}</Text>
                <Text style={styles.messageText}>{this.props.message}</Text>
                <Button
                    text={this.props.buttonText}
                    onButtonClick={this.props.buttonClickHandler}
                />
            </View>
        </View>
        
    )
  }
}

