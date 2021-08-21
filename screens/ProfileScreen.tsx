import * as React from 'react';
import { useEffect } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { View } from '../components/Themed';
import * as Segment from 'expo-analytics-segment';
import faker from 'faker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [firstName, setFirstName] = React.useState(faker.name.firstName);
  const [lastName, setLastName] = React.useState(faker.name.lastName);
  const [email, setEmail] = React.useState(faker.internet.email().toLowerCase());

  const onUpdateProfile = () => {
    Segment.track('UPDATE_PROFILE');
  };

  useEffect(() => {
    Segment.screen('Profile');

    (async () => {
      try {
        const userString = (await AsyncStorage.getItem('user')) as string;
        const user = JSON.parse(userString);
        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput placeholder="First name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Last name" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <Button title="Update profile" onPress={onUpdateProfile} />
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
