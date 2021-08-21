import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { View } from '../components/Themed';
import * as Segment from 'expo-analytics-segment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function SignInScreen({ navigation }) {
  const [id, setId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignIn = () => {
    Segment.identify(id);
    Segment.track('SIGN_IN');
    navigation.navigate('Profile');
  };

  useEffect(() => {
    (async () => {
      try {
        const userString = (await AsyncStorage.getItem('user')) as string;
        const user = JSON.parse(userString);
        setId(user.userId);
        setEmail(user.email);
        setPassword(user.firstName + user.lastName);
      } catch (e) {
        console.log(e);
      }
    })();
  });

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email name" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
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
  },
});
