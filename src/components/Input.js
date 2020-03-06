import React from 'react';
import { Text, View, TextInput } from 'react-native';

const Input = (props) => {
  return (
    <View style={styles.viewStyles}>
      <Text style={styles.textStyles}>{props.label}</Text>
      <TextInput style={styles.textInputStyles} placeholder={props.placeholder}
       value={props.value} secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText} autocorrect={false} />
    </View>
  )
}

const styles = {
  viewStyles: {
    margin: 9,
    padding: 9,
    paddingTop: 14,
    borderColor: '#fff',
    height: 50,
    flex: 3,
    flexDirection: "row",
    alignItems: "center"
  },
  textStyles: {
    flex: 1,
    fontSize: 16
  },
  textInputStyles: {
    height: 50,
    flex: 2
  },
};

export default Input;
