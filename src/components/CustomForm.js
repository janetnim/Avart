import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Input from './Input';

export default class CustomForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, labels, handleFirstName, handleLastName, handleEmail, handlePhone, handleSubmit, currentUser } = this.props;
    const firstName = currentUser.displayName ? currentUser.displayName.split(" ")[0] : "First name";
    const lastName = currentUser.displayName ? currentUser.displayName.split(" ")[1] : "Last name";

    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <Input label="First name" placeholder={firstName} style={styles.itemInput} onChangeText={handleFirstName} />
        <Input label="Last name" placeholder={lastName} style={styles.itemInput} onChangeText={handleLastName} />
        <Input label="Email" placeholder={currentUser.email || "Email"} style={styles.itemInput} onChangeText={handleEmail} />
        <Input label="Phone number" placeholder={currentUser.phoneNumber || "Phone Number"} style={styles.itemInput} onChangeText={handlePhone} />
        <TouchableOpacity style={styles.button} underlayColor="white" onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
});
