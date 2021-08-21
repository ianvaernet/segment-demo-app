import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Segment from 'expo-analytics-segment';
import faker from 'faker';

export default function MarketScreen() {
  const asset1 = faker.commerce.productName();
  const asset2 = faker.commerce.productName();
  const asset3 = faker.commerce.productName();

  React.useEffect(() => {
    Segment.screen('Market');
  }, []);

  const buyAsset = (asset) => {
    Segment.trackWithProperties('BUY_ASSET', { asset });
  };

  return (
    <View style={styles.container}>
      <Button title={`Buy ${asset1}`} onPress={() => buyAsset(asset1)} />
      <View style={styles.separator} />
      <Button title={`Buy ${asset2}`} onPress={() => buyAsset(asset2)} />
      <View style={styles.separator} />
      <Button title={`Buy ${asset3}`} onPress={() => buyAsset(asset3)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  separator: {
    margin: 10,
  },
});
