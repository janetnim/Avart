import React, { Component } from 'react';
import UpdateProfile from './Profile';
import { Text, View } from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop: 8}}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}
