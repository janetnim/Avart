import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Alert } from 'react-native';

export default class SignOut extends Component {
  constructor(props) {
    super(props);
  }

  handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('LoginForm');
      Alert.alert("You have successfully logged out");
    }).catch((error) => {
      Alert.alert(`${error}`);
    });
  }

  render() {
    return (
      <View>
        {this.handleSignOut()}
      </View>
    );
  }
}
