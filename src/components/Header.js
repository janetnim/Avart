import React from 'react';
import { Text, ImageBackground } from 'react-native';

const Header = () => {
  return (
    <ImageBackground style={styles.header} source= {require('./assets/brand_logo.png')} >
    </ImageBackground>
  )
};

const styles = {
  header : {
    margin: 9,
    padding: 9,
    shadowColor: '#ddd',
    backgroundColor: '#f8f8f8',
    height: 100,
    paddingTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderColor: '#fff',
    borderBottomWidth: 4,
  },
}

export default Header;
