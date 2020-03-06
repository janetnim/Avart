import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default (Comp: ReactClass<*>) => {
  return ({props}: Object) => (
    <View>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Avart', style: { color: '#fff' } }}
       />
    </View>
  )
}

const SideNavigation = () => {
  <View>
    <Text>This is the side bar</Text>
  </View>
}
