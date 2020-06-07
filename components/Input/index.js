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
  TextInput,
} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Svg, Path } from 'react-native-svg'

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 8
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '300'
  },
  inputEditorContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    borderColor: 'gray',
    borderWidth: 1
  },
  inputEditor: {
    display: 'flex',
    flex: 1,
    height: 40,
    marginLeft: 8,
  },
  eyeIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    height: 24,
    width: 24,
  }

});

export default class Input  extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            showPassword: false
        }

        this.eyeIconPressed = this.eyeIconPressed.bind(this)
    }

    eyeIconPressed() {
        this.setState({showPassword: !this.state.showPassword})
    }

    // TODO: separate this code to files
    getOpenEyeIcon() {
        return(
            <Svg viewBox="0 0 469.333 469.333" style="enable-background:new 0 0 469.333 469.333;" width={24} height={24}>
                <Path d="M234.667,170.667c-35.307,0-64,28.693-64,64s28.693,64,64,64s64-28.693,64-64S269.973,170.667,234.667,170.667z"/>
                <Path d="M234.667,74.667C128,74.667,36.907,141.013,0,234.667c36.907,93.653,128,160,234.667,160
                    c106.773,0,197.76-66.347,234.667-160C432.427,141.013,341.44,74.667,234.667,74.667z M234.667,341.333
                    c-58.88,0-106.667-47.787-106.667-106.667S175.787,128,234.667,128s106.667,47.787,106.667,106.667
                    S293.547,341.333,234.667,341.333z"/>
            </Svg>
        )
    }

    getClosedEyeIcon() {
        return (
            <Svg viewBox="0 0 469.333 469.333" style="enable-background:new 0 0 469.333 469.333;" width={24} height={24}>
                <Path d="M231.147,160.373l67.2,67.2l0.32-3.52c0-35.307-28.693-64-64-64L231.147,160.373z"/>
                <Path d="M234.667,117.387c58.88,0,106.667,47.787,106.667,106.667c0,13.76-2.773,26.88-7.573,38.933l62.4,62.4
                    c32.213-26.88,57.6-61.653,73.28-101.333c-37.013-93.653-128-160-234.773-160c-29.867,0-58.453,5.333-85.013,14.933l46.08,45.973
                    C207.787,120.267,220.907,117.387,234.667,117.387z"/>
                <Path d="M21.333,59.253l48.64,48.64l9.707,9.707C44.48,145.12,16.64,181.707,0,224.053c36.907,93.653,128,160,234.667,160
                    c33.067,0,64.64-6.4,93.547-18.027l9.067,9.067l62.187,62.293l27.2-27.093L48.533,32.053L21.333,59.253z M139.307,177.12
                    l32.96,32.96c-0.96,4.587-1.6,9.173-1.6,13.973c0,35.307,28.693,64,64,64c4.8,0,9.387-0.64,13.867-1.6l32.96,32.96
                    c-14.187,7.04-29.973,11.307-46.827,11.307C175.787,330.72,128,282.933,128,224.053C128,207.2,132.267,191.413,139.307,177.12z"
                    />
            </Svg>
        )
    }

    getEyeIcon() {
        return (
            <TouchableHighlight onPress={this.eyeIconPressed} underlayColor="white">
                <View style={styles.eyeIconContainer} >
                    {this.state.showPassword ? this.getClosedEyeIcon() : this.getOpenEyeIcon()}
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
        <View style={[styles.container, this.props.customContainerStyles]} >
            <Text style={[this.props.inputTitle, this.props.customTitleStyles]}>{this.props.inputTitle}</Text>
            <View style={styles.inputEditorContainer}>
                <TextInput
                    style={[styles.inputEditor, this.props.customEditorStyles]}
                    onChangeText={this.props.onInputChanged}
                    value={this.props.inputValue}
                    secureTextEntry={this.props.isPasswordInput && !this.state.showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {this.props.isPasswordInput ? this.getEyeIcon() : null}
            </View>
        </View>
        )
    }
}
