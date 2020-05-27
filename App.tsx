import React, { Component } from 'react';
import Home from './src/components/Home';
import SignOut from './src/components/SignOut';
import Payments from './src/components/Payments';
import History from './src/components/History';
import Authentication from './src/components/Authentication';
import UpdateProfile from './src/components/Profile';
import LoginForm from './src/components/LoginForm';
import SignUpForm from './src/components/SignUpForm';
import CustomDrawerNavigation from './src/components/Drawer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

const Drawer = createDrawerNavigator({
  Authentication: {
    screen: Authentication,
  },
  SignUpForm: {
    screen: SignUpForm,
  },
  LoginForm: {
    screen: LoginForm,
  },
  Home: {
    screen: Home,
  },
  Profile: {
    screen: UpdateProfile,
  },
  History: {
    screen: History,
  },
  Payments: {
    screen: Payments,
  },
  SignOut: {
    screen: SignOut,
  }
},{
  initialRouteName: 'Authentication',
  contentComponent: CustomDrawerNavigation,
  contentOptions: {
    activeTintColor: '#000000',
    activeBackgroundColor: '#e6e6e6',
  }
});

const App = createAppContainer(Drawer);
export default App;
