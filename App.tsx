import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './src/components/Header';
import LoginForm from './src/components/LoginForm';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

class AuthenticationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  componentDidMount() {
    let config = {
      apiKey: "AIzaSyA1nF_Bbfm3zy91F5k2beeZ5L1At-Mux2E",
      authDomain: "avart-app.firebaseapp.com",
      databaseURL: "https://avart-app.firebaseio.com",
      projectId: "avart-app",
      storageBucket: "avart-app.appspot.com",
      messagingSenderId: "127805856366",
      appId: "1:127805856366:web:0b0caca4fd97e98c9f647f"
    };

    firebase.initializeApp(config);

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
        <View>
          <HomeScreen />
          <Button title='Sign Out' onPress={() => firebase.auth().signOut()} />
        </View>
      )
    } else {
      return <LoginForm />;
    }
  }

  // <Button title='Sign Out' onPress={() => firebase.auth().signOut()} />
  // firebase log out code

  render() {
    return (
      <View>
        <Header title='Avart' />
        {this.renderDetailsPage()}
      </View>
    )
  }
}

//testing more than one route
class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Auth: AuthenticationScreen,
    Home: HomeScreen,
  },
  {
    inititalRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return < AppContainer/>;
  }
}
