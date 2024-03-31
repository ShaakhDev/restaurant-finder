import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {useGeolocation} from './useGeolocation';

const Key = '17bad8ca-1678-4b5f-a720-49ad1e3302a8';

const PlacesApiKey = '4961e6e5-76f3-45bf-990f-1582236521d3';

export const Home = () => {
  const [search, setSearch] = useState('');
  const {coords, loading} = useGeolocation();
  const [location, setLocation] = useState('');
  console.log(JSON.stringify(coords, null, 2));
  useEffect(() => {
    const fetchGeocode = async () => {
      const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${Key}&geocode=${coords.longitude},${coords.latitude}&lang=en_US&format=json`;

      const response = await fetch(url);
      const data = await response.json();

      setLocation(
        data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.text,
      );
    };
    if (coords.latitude && coords.longitude) {
      fetchGeocode();
    }
  }, [loading, coords]);

  //   useEffect(() => {
  //     const fetchPlaces = async () => {
  //       const url = `https://search-maps.yandex.ru/v1/?text=Asl burger&type=biz&lang=en_US&apikey=${PlacesApiKey}`;
  //       console.log(url);
  //       const response = await fetch(url);
  //       console.log(JSON.stringify(response, null, 2));
  //       const data = await response.json();
  //     };

  //     if (coords.latitude && coords.longitude) {
  //       fetchPlaces();
  //     }
  //   }, [coords]);
  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme
        placeholder="Search"
        value={search}
        onChange={search => setSearch(search.target.value)}
      />
      <View style={styles.currentLocationBox}>
        <Text style={styles.text}>My location: {location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    color: 'black',
  },
  currentLocationBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
