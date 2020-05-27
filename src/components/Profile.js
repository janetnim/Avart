import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Input from './Input';
import { db } from './config';
import firebase from 'firebase';

// let updateProfile = ({firstName, lastName, email, phoneNumber, error}) => {
//   db.ref('/Profile').push({
//     email,
//     displayName: `${firstName} ${lastName}`,
//     phone_number: phoneNumber
//   }).then(() => {
//     const currentUser = firebase.auth().currentUser;
//     currentUser && currentUser.updateProfile({
//       email: email,
//       displayName: `${firstName} ${lastName}`,
//       phoneNumber: phoneNumber
//     })
//     Alert.alert('Profile updated successfully');
//   }).catch(error => {
//     error = true;
//     Alert.alert('There was a problem updating the profile, please try again later');
//   })
// };

const setDisplayName = (currentUser, firstName, lastName) => {
  let displayName;
  const currentFirstName = currentUser.displayName.split(" ")[0];
  const currentLastName = currentUser.displayName.split(" ")[1];

  if(firstName && lastName) {
    displayName = `${firstName.trim()} ${lastName.trim()}`;
  } else if(firstName && !lastName) {
    displayName = `${firstName.trim()} ${currentLastName}`;
  } else if (!firstName && lastName) {
    displayName = `${currentFirstName} ${lastName.trim()}`;
  } else {
    displayName = currentUser.displayName;
  }

  return displayName;
}

const updateUserProfile = ({firstName, lastName, email, error, currentUser}) => {
  if(currentUser) {
    const displayName = setDisplayName(currentUser, firstName, lastName);
    currentUser.updateEmail(email || currentUser.email).then(() => {
      currentUser.updateProfile({
        displayName: displayName
      }).then(() => {
        Alert.alert('Profile updated successfully');
      }).catch(error => {
        Alert.alert(`${error}`);
      })
    }).catch(error => {
      Alert.alert(`${error}`);
    })
  }
}

export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      currentUser: {},
      error: ''
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({currentUser: currentUser});
  }

  static navigationOptions = {
    drawerLabel: () => null
  }

  handleSubmit = () => {
    updateUserProfile(this.state);
  };

  render() {
    const { currentUser, firstName, lastName, email, phoneNumber } = this.state;
    let currentFirstName, currentLastName;
    if(currentUser.displayName) {
      currentFirstName = currentUser.displayName.split(" ")[0];
      currentLastName = currentUser.displayName.split(" ")[1];
    }

    return (
      <View style={styles.main}>
        <Text style={styles.title}>Update My Profile</Text>
        <Input label="First name" placeholder={currentFirstName || "First name"} value={firstName} style={styles.itemInput} onChangeText={(firstName) => this.setState({firstName})} />
        <Input label="Last name" placeholder={currentLastName || "Last name"} value={lastName} style={styles.itemInput} onChangeText={(lastName) => this.setState({lastName})} />
        <Input label="Email" placeholder={currentUser.email || "Email"} value={email} style={styles.itemInput} onChangeText={(email) => this.setState({email})} />
        <Input label="Phone number" placeholder={currentUser.phoneNumber || "Phone Number"} value={phoneNumber} style={styles.itemInput} onChangeText={(phoneNumber) => this.setState({phoneNumber})} />
        <TouchableOpacity style={styles.button} underlayColor="white" onPress={() => this.handleSubmit()}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    marginBottom: 5,
    marginTop: 30,
    fontSize: 20,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#48929B',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  itemInput: {
    height: 10,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
});
