/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
    Modal,
    StyleSheet,
    View,
    Text,
} from 'react-native'
import auth from '@react-native-firebase/auth'
import Input from '../Input'
import Button from '../Button'
import CustomModal from '../Modal'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: 16,
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    otpContainer: {
        marginTop: 50,
    },
    boldHeaders: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    passwordGuideContainer: {
        width: '90%',
        marginVertical: 16
    },
    passwordGuideHeaderContainer: {
        marginBottom: 8
    },
    passwordGuideText: {
        fontSize: 16,
        fontWeight: '300'
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 50,
        width: '90%'
    },
    buttonContainer: {
        width: 140,
    },
    cancelButton: {
        borderWidth: 2,
        borderColor: 'rgb(87, 163, 216)',
        backgroundColor: 'white'
    },
    cancelText: {
        color: 'rgb(87, 163, 216)',
        fontWeight: '400',
    },
    errorMessageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        height: 24,
    },
    errorMessageStyles: {
        fontSize: 12,
        color: 'red',
    },
    errorEmptyView: {
        width: '90%',
        height: 24,
    }
});

export default class SignUpPage extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            otpInputValue: '',
            usernameInputValue: '',
            passwordInputValue: '',
            confirmPasswordInputValue: '',
            errorMessage: '',
            showModal: false
        }

        this.otpInputChanged = this.otpInputChanged.bind(this)
        this.usernameInputChanged = this.usernameInputChanged.bind(this)
        this.passwordInputChanged = this.passwordInputChanged.bind(this)
        this.confirmPasswordInputChanged = this.confirmPasswordInputChanged.bind(this)
        this.cancelButtonClicked = this.cancelButtonClicked.bind(this)
        this.submitButtonClicked = this.submitButtonClicked.bind(this)
        this.onSuccessfulSignedUp = this.onSuccessfulSignedUp.bind(this)
        this.navigateToLoginPage = this.navigateToLoginPage.bind(this)
    }

    otpInputChanged(newValue) {
        this.setState({otpInputValue: newValue})
    }

    usernameInputChanged(newValue) {
        this.setState({usernameInputValue: newValue})
    }

    passwordInputChanged(newValue) {
        this.setState({passwordInputValue: newValue})
    }

    confirmPasswordInputChanged(newValue) {
        this.setState({confirmPasswordInputValue: newValue})
    }

    navigateToLoginPage() {
        this.setState({showModal: false})
        this.props.navigation.navigate('LogIn')
    }

    onSuccessfulSignedUp() {
        this.setState({showModal: true, otpInputValue: '', usernameInputValue: '', passwordInputValue: '', confirmPasswordInputValue: ''})
    }

    cancelButtonClicked() {
        this.setState({otpInputValue: '', usernameInputValue: '', passwordInputValue: '', confirmPasswordInputValue: ''})
    }

    submitButtonClicked() {
        if (this.state.passwordInputValue !== this.state.confirmPasswordInputValue) {
            this.setState({errorMessage: `Passwords don't match.`})
            return
        }

        auth()
        .createUserWithEmailAndPassword(this.state.usernameInputValue, this.state.passwordInputValue)
        .then(this.onSuccessfulSignedUp)
        .catch(error => {
            let errorMessage = 'Sorry! You could not be signed up. Try Again.'
            if (error.code === 'auth/email-already-in-use') errorMessage = 'That email address is already in use!'
            if (error.code === 'auth/invalid-email') errorMessage = 'That email address is invalid!'
            if (error.code === 'auth/weak-password') errorMessage = 'Password is too weak. Try again.'
            this.setState({ errorMessage })
        })
    }

    getPasswordGuide() {
        return (
            <View style={styles.passwordGuideContainer}>
                <View style={styles.passwordGuideHeaderContainer}>
                    <Text style={styles.boldHeaders}>
                        {`Create Username and Password`}
                    </Text>
                </View>
                <Text style={styles.passwordGuideText}>
                    {
                        `Your Password must be between 8-15 characters long, and consist at least 1 letter and number or special character.`
                    }
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    inputTitle={`Enter OTP`}
                    inputValue={this.state.otpInputValue}
                    onInputChanged={this.otpInputChanged}
                    isPasswordInput={false}
                    customTitleStyles={styles.boldHeaders}
                    customContainerStyles={styles.otpContainer}
                />
                {this.getPasswordGuide()}
                <Input
                    inputTitle={`Username (Your Email Address)`}
                    inputValue={this.state.usernameInputValue}
                    onInputChanged={this.usernameInputChanged}
                    isPasswordInput={false}
                />
                <Input
                    inputTitle={`Password`}
                    inputValue={this.state.passwordInputValue}
                    onInputChanged={this.passwordInputChanged}
                    isPasswordInput
                />
                <Input
                    inputTitle={`Confirm Password`}
                    inputValue={this.state.confirmPasswordInputValue}
                    onInputChanged={this.confirmPasswordInputChanged}
                    isPasswordInput
                />

                {
                    this.state.errorMessage ?
                        <View style={styles.errorMessageContainer}>
                            <Text style={styles.errorMessageStyles}>{this.state.errorMessage}</Text>
                        </View>
                    : <View style={styles.errorEmptyView}/>
                }

                <View style={styles.buttonsContainer}>
                    <Button
                        text={`Cancel`}
                        onButtonClick={this.cancelButtonClicked}
                        customTextStyles={styles.cancelText}
                        customContainerStyles={[styles.buttonContainer, styles.cancelButton]}
                    />
                    <Button
                        text={`Submit`}
                        onButtonClick={this.submitButtonClicked}
                        customContainerStyles={styles.buttonContainer}
                    />
                </View>
                <Modal
                    animationType = {"none"}
                    transparent = {true}
                    visible = {this.state.showModal}
                >
                    <CustomModal
                        heading={`Congrats!`}
                        message={`You have been successfully signed up`}
                        buttonText={`Log In`}
                        buttonClickHandler={this.navigateToLoginPage}
                    />
                </Modal>
            </View>
        )
    }
}