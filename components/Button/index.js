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
  View,
  Text,
} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 240,
        height: 40,
        marginVertical: 8,
        borderRadius: 40,
        backgroundColor: 'rgb(87, 163, 216)'
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        color: 'white',
    }
});

export default class Button extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableHighlight onPress={this.props.onButtonClick} underlayColor="white">
                <View style={[styles.container, this.props.customContainerStyles]}>
                    <Text style={[styles.text, this.props.customTextStyles]}>{this.props.text}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
