import React, { Component } from 'react';
import { View, Button } from 'react-native';

class Payments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => this.props.navigation.goBack()} title="Payments" />
      </View>
    );
  }
}

export default Payments;
