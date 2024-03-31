/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(info => console.log(info));

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [location, setLocation] = React.useState<GeolocationResponse>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(info => setLocation(info));
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView style={styles.container}>
        <Text>lat: {location?.coords?.latitude}</Text>
        <Text>lon: {location?.coords?.longitude}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
