import React, { Component } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { SocialIcon, Avatar } from 'react-native-elements';

class CustomDrawerNavigation extends Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 200, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
              <View style={{ height: 130, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                <Avatar
                 size="large"
                 rounded
                 activeOpacity={0.7}
                 onPress={() => this.props.navigation.navigate('Profile')}
                 source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',}}
                 showEditButton />
              </View>
              <View style={{ height: 10, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
                <Text>John Doe</Text>
              </View>
            </View>
            <DrawerItems {...this.props} />
            <View style={{ alignItems: "center", bottom: -5 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', marginRight: 10 }}>
                  <SocialIcon type='twitter' />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <SocialIcon type='facebook' />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

export default CustomDrawerNavigation;
