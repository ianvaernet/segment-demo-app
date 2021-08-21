import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Segment from 'expo-analytics-segment';
import faker from 'faker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({ navigation }) {
  const [id, setId] = React.useState((Math.floor(Math.random() * 1000) + 1).toString());
  const [firstName, setFirstName] = React.useState(faker.name.firstName());
  const [lastName, setLastName] = React.useState(faker.name.lastName());
  const [email, setEmail] = React.useState(faker.internet.email().toLowerCase());

  const onSignUp = async () => {
    Segment.identifyWithTraits(id, { firstName, lastName, email });
    Segment.trackWithProperties('SIGN_UP', {
      userId: id,
      firstName,
      lastName,
      email,
    });
    try {
      await AsyncStorage.setItem('user', JSON.stringify({ userId: id, firstName, lastName, email }));
    } catch (e) {
      console.log(e);
    }
    navigation.navigate('SignIn');
  };

  //   const refreshForm = () => {
  //     setId((Math.floor(Math.random() * 10000) + 1).toString());
  //     setFirstName(faker.name.firstName);
  //     setLastName(faker.name.lastName);
  //     setEmail(faker.internet.email().toLowerCase());
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID: {id}</Text>
      <TextInput placeholder="First name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Last name" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <Button title="Sign Up" onPress={onSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    margin: 10,
    padding: 5,
  },
  text: {
    margin: 10,
    justifyContent: 'center',
    fontSize: 16,
  },
});
