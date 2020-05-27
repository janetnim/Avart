import React, { Component } from 'react';
import { View, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Input from './Input';
import firebase from 'firebase';
import { AuthSession } from 'expo';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    }
  }

  static navigationOptions = {
    drawerLabel: () => null
  }

  handleButtonPress() {
    this.setState({error: '', loading: true})
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).
    then(this.onSignUpSuccess.bind(this)).
    catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if(errorCode == 'auth/weak-password') {
        this.onSignUpFailure.bind(this)('Weak password!')
      } else {
        this.onSignUpFailure.bind(this)(errorMessage)
      }
    });
  }

  handleGoogleLogin = async () =>  {
    try {
      let redirectUrl = 'https://exp.host/@janetnim/expo-template-bare';
      let googleWebAppId = '180000856073-rh5nuiv5qo7ja8c9r5m5kojc0fh5hpml.apps.googleusercontent.com';
      const result = await AuthSession.startAsync({
        authUrl:
          `https://accounts.google.com/o/oauth2/v2/auth?` +
          `&client_id=${googleWebAppId}` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
          `&response_type=code` +
          `&access_type=offline` +
          `&scope=profile`,
        });
      if(result.type === 'success') {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
        .then(this.onSignUpSuccess.bind(this))
        .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if(errorCode == 'auth/weak-password') {
            this.onSignUpFailure.bind(this)('Weak password!')
          } else {
            this.onSignUpFailure.bind(this)(errorMessage)
          }
        })
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  onSignUpSuccess() {
    const { email, password, firstName, lastName, phoneNumber } = this.state;
    const currentUser = firebase.auth().currentUser;
    currentUser && currentUser.updateProfile({
      displayName: `${firstName.trim()} ${lastName.trim()}`
    })

    this.setState({email: '', password: '', error: '', firstName: '', lastName: '', phoneNumber: '', loading: false})
  }

  onSignUpFailure(errorMessage) {
    this.setState({error: errorMessage, loading: false})
  }

  renderSignUpButton() {
    if(this.state.loading) {
      return (
        <View style={{paddingTop: 10}}>
          <ActivityIndicator size={"small"}/>
        </View>
      );
    }
    return (
      <Button title="Sign Up" onPress={this.handleButtonPress.bind(this)} color="#48929B" />
    )
  }

  renderGoogleSigninButton() {
    return (
      <View style={{paddingTop: 10}}>
        <Button
          title="Sign in with Google"
          onPress={this.handleGoogleLogin}
          color="#48929B"
        />
      </View>
    )
  }

  renderLogInButton() {
    return (
      <View style={styles.logIn}>
        <Text>Already have an account?</Text>
        <Text style={styles.logInLink} onPress={() => {this.props.navigation.navigate('LoginForm')}}> Log in</Text>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.main} className="signin">
        <Text style={styles.error}>{this.state.error}</Text>
        <Input label="First name" placeholder="Enter first name..." value={this.state.firstName} onChangeText={(firstName) => this.setState({firstName})} />
        <Input label="Last name" placeholder="Enter last name..." value={this.state.lastName} onChangeText={(lastName) => this.setState({lastName})} />
        <Input label="Email" placeholder="Enter email..." value={this.state.email} onChangeText={(email) => this.setState({email})} />
        <Input label="Phone number" placeholder="Enter phone number..." value={this.state.phoneNumber} onChangeText={(phoneNumber) => this.setState({phoneNumber})} />
        <Input label="Password" placeholder="Enter password..." value={this.state.password} secureTextEntry={true} onChangeText={(password) => this.setState({password})} />
        {this.renderSignUpButton()}
        {this.renderGoogleSigninButton()}
        {this.renderLogInButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    // padding: 30,
    // flexDirection: 'column',
    // justifyContent: 'center',
    backgroundColor: 'white',

    top: '5%',
    margin: '10%'
  },
  error: {
    color: 'red'
  },
  logIn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  logInLink: {
    color: '#069',
    textDecorationLine: "underline"
  }
});
