import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './Header';
import SignUpForm from './SignUpForm';
import Home from './Home';
import firebase from 'firebase';
import { app } from './config'

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  static navigationOptions = {
    drawerLabel: () => null
  }

  componentDidMount() {
    app;
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    })
  }

  renderDetailsPage = () => {
    if (this.state.loggedIn) {
      return (
        <Home />
      )
    } else {
      return (
        <View>
          <Header />
          <SignUpForm />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{marginTop: 8}}>
        {this.renderDetailsPage()}
      </View>
    )
  }
}

export default Authentication;
