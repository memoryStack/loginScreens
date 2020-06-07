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
import auth from '@react-native-firebase/auth'
import Input from '../Input'
import Button from '../Button'
import CustomModal from '../Modal'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(33, 66, 99)'
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 300,
    marginVertical: 100,
    backgroundColor: 'white'
  },
  headerText: {
    fontSize: 30,
  },
  authContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 450,
    width: '100%',
    backgroundColor: 'white'
  },
  loginCardHeadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%'
  },
  loginCardHeadingText: {
    fontSize: 20,
    fontWeight: '400',
  },
  inputsContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  authButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  buttonsSeparatorText: {
    fontSize: 20,
    fontWeight: '300'
  },
});

export default class LoginPage  extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      usernameValue: '',
      passwordValue: '',
      errorMessage: '',
      showModal: false,
      loggedInUsername: '',
    }

    this.usernameInputChanged = this.usernameInputChanged.bind(this)
    this.passwordInputChanged = this.passwordInputChanged.bind(this)
    this.loginButtonClicked = this.loginButtonClicked.bind(this)
    this.signupButtonClicked = this.signupButtonClicked.bind(this)
    this.onSuccessfulLogin = this.onSuccessfulLogin.bind(this)
    this.logoutButtonClicked = this.logoutButtonClicked.bind(this)
    this.onSuccessfulLogOut = this.onSuccessfulLogOut.bind(this)
  }

  usernameInputChanged(newValue) {
    this.setState({usernameValue: newValue})
  }

  passwordInputChanged(newValue) {
    this.setState({passwordValue: newValue})
  }

  onSuccessfulLogin() {
    const { currentUser } = auth()
    this.setState({loggedInUsername: currentUser.email, showModal: true, usernameValue: '', passwordValue: ''})
  }

  loginButtonClicked() {
    auth()
        .signInWithEmailAndPassword(this.state.usernameValue, this.state.passwordValue)
        .then(this.onSuccessfulLogin)
        .catch(error => this.setState({ errorMessage: error.message }))
  }

  signupButtonClicked() {
    this.props.navigation && this.props.navigation.navigate('SignUp')
  }

  onSuccessfulLogOut() {
      this.setState({showModal: false})
  }

  logoutButtonClicked() {
    auth()
    .signOut()
    .then(this.onSuccessfulLogOut)
  }

  getHeaderView() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{`Company Branding`}</Text>
      </View>
    )
  }

  getAuthenticationView() {
    return (
      <View style={styles.authContainer}>
        <View style={styles.loginCardHeadingContainer}>
          <Text style={styles.loginCardHeadingText}>{`Log In`}</Text>
        </View>
        <View style={styles.inputsContainer}>
          <Input
            inputTitle={`Username (Your Email Address)`}
            inputValue={this.state.usernameValue}
            onInputChanged={this.usernameInputChanged}
            isPasswordInput={false}
          />
          <Input
            inputTitle={`Password`}
            inputValue={this.state.passwordValue}
            onInputChanged={this.passwordInputChanged}
            isPasswordInput
          />
        </View>
        <View style={styles.authButtonsContainer}>
          <Button
            text={`Log In`}
            onButtonClick={this.loginButtonClicked}
          />
          <Text style={styles.buttonsSeparatorText}>{`Or`}</Text>
          <Button
            text={`Sign Up`}
            onButtonClick={this.signupButtonClicked}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container} >
        {this.getHeaderView()}
        {this.getAuthenticationView()}
        <Modal
            animationType = {"slide"}
            transparent = {true}
            visible = {this.state.showModal}
            onRequestClose = {() => { console.log("Modal has been closed.") } }
        >
            <CustomModal
                heading={`Thank You`}
                message={`You have been successfully logged in as ${this.state.loggedInUsername}`}
                buttonText={`Log Out`}
                buttonClickHandler={this.logoutButtonClicked}
            />
        </Modal>
      </View>
    )
  }
}

