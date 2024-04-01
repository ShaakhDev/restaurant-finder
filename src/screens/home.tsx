import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {useGeolocation} from './useGeolocation';
import {
  fetchGeocode,
  getCurrentLocationId,
  getNearbyRestaurants,
} from '../features/requests';
import {FlashList} from '@shopify/flash-list';
import {useDebounce} from 'use-debounce';
import {Restaurant, RestaurantCard} from '../components/restaurant-card';
import {rest} from '../components/mock/restaurant';

const getRestaurantsByLocation = async (location: string) => {
  try {
    const locationData = await getCurrentLocationId(location);
    const location_id =
      locationData?.results?.data[0]?.result_object?.location_id;
    const restaurants = await getNearbyRestaurants(location_id);
    return restaurants?.results?.data;
  } catch (error) {
    console.error(error);
  }
};

export const Home = () => {
  const [search, setSearch] = useState('');
  const {coords} = useGeolocation();
  const [location, setLocation] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm] = useDebounce(search, 700);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getGeo = async () => {
      setIsFetching(true);
      const data = await fetchGeocode(coords);
      // const data = {} as any;

      const address = data?.metaDataProperty?.GeocoderMetaData?.Address;

      setLocation(
        address?.Components.find(
          (item: {kind: string; name: string}) => item.kind === 'locality',
        )?.name ||
          data?.metaDataProperty?.GeocoderMetaData?.text ||
          '',
      );
    };
    if (coords.latitude && coords.longitude) {
      getGeo();
    }
  }, [coords]);

  useEffect(() => {
    if (!searchTerm && location) {
      (async () => {
        setIsFetching(true);
        const rests = await getRestaurantsByLocation(location);
        setRestaurants(rests);
        setIsFetching(false);
      })();
    } else {
      const filteredRestaurants = restaurants?.filter(rest => {
        return rest.name?.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setRestaurants(filteredRestaurants);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (location) {
      (async () => {
        setIsFetching(true);
        const rests = await getRestaurantsByLocation(location);
        setRestaurants(rests);
        setIsFetching(false);
      })();
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>
      <SearchBar
        lightTheme
        showLoading={isFetching}
        placeholder="Search for restaurants"
        value={search}
        placeholderTextColor={'#c1c1c1'}
        containerStyle={styles.searchBar}
        style={styles.searchInput}
        labelStyle={styles.searchInput}
        inputContainerStyle={styles.searchInput}
        onChangeText={setSearch}
      />
      <View style={styles.currentLocationBox}>
        <Text style={styles.text}>Location: {location}</Text>
      </View>
      <FlashList
        data={restaurants || [rest]}
        // data={[rest]}
        renderItem={({item}) => <RestaurantCard restaurant={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
  currentLocationBox: {
    marginVertical: 10,
    padding: 10,
  },
  searchBar: {
    backgroundColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#e8e8e8',
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  searchInput: {
    color: 'black',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
