import React, { Component } from 'react';
import { View, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Input from './Input';
import firebase from 'firebase';
import { AuthSession } from 'expo';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      isSigninInProgress: false
    };
  }

  static navigationOptions = {
    drawerLabel: () => null
  }

  handleButtonPress() {
    this.setState({error: '', loading: true})
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).
    then(this.onLoginSuccess.bind(this)).
    catch((error) => {
      let errorMessage = error.message;
      this.onLoginFailure.bind(this)(errorMessage)
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
        .then(this.onLoginSuccess.bind(this))
        .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if(errorCode == 'auth/weak-password') {
            this.onLoginFailure.bind(this)('Weak password!')
          } else {
            this.onLoginFailure.bind(this)(errorMessage)
          }
        })
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  onLoginSuccess() {
    this.setState({email: '', password: '', error: '', loading: false});
    this.props.navigation.navigate('Home');
  }

  onLoginFailure(errorMessage) {
    this.setState({error: errorMessage, loading: false});
  }

  renderLogInButton() {
    if(this.state.loading) {
      return (
        <View style={{paddingTop: 10}}>
          <ActivityIndicator size={"small"}/>
        </View>
      );
    }
    return (
      <Button title="Sign In" onPress={this.handleButtonPress.bind(this)} color="#48929B" style={{paddingTop: 10}} />
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

  renderSignInButton() {
    return (
      <View style={styles.signUp}>
        <Text>Create a new account?</Text>
        <Text style={styles.signUpLink} onPress={() => {this.props.navigation.navigate('SignUpForm')}}> Sign up</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.main} className="login">
        <Text style={{'color': 'red'}}>{this.state.error}</Text>
        <Input label="Email" placeholder="Enter email..." value={this.state.email} secureTextEntry={false} onChangeText={(email) => this.setState({email})} />
        <Input label="Password" placeholder="Enter password..." value={this.state.password} secureTextEntry={false} onChangeText={(password) => this.setState({password})} />
        {this.renderLogInButton()}
        {this.renderGoogleSigninButton()}
        {this.renderSignInButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    top: '15%',
    margin: '10%'
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  signUpLink: {
    color: '#069',
    textDecorationLine: "underline"
  }
})
