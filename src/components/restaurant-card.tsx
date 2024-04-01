import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Star} from '../resources/icons/star';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export type Restaurant = {
  name?: string;
  location_string?: string;
  rating?: string;

  is_closed?: boolean;
  description?: string;
  phone?: string;
  num_reviews?: string;
  address?: string;
  cuisine?: [
    {
      key: string;
      name: string;
    },
  ];
  photo?: {
    images: {
      [key: string]: {
        width: string;
        url: string;
        height: string;
      };
    };
  };
};

export const RestaurantCard = ({restaurant}: {restaurant: Restaurant}) => {
  const navigation = useNavigation<NavigationProp<{[key: string]: any}>>();
  const handlePress = () => {
    navigation.navigate('Restaurant', {screen: 'Home', restaurant});
  };
  return (
    <Pressable onPress={handlePress} style={styles.card}>
      {/* Style like card and display image top of it. */}
      <Image
        source={{uri: restaurant.photo?.images.original.url}}
        defaultSource={{uri: 'https://via.placeholder.com/150'}}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{restaurant?.name}</Text>
        <View style={styles.rating}>
          <Star width={24} height={24} color={'#ffcd3c'} />
          <Text>
            {restaurant.rating} ({restaurant?.num_reviews})
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.address}>
          {restaurant.address}
        </Text>
        <Text numberOfLines={2} style={styles.phone}>
          {restaurant.phone}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  rating: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 5,
  },
  address: {
    color: 'gray',
    flexShrink: 1,
  },
  phone: {
    color: 'gray',
    fontSize: 16,
    flexShrink: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  cardImage: {
    objectFit: 'cover',
    height: 180,
    width: '100%',
  },
});
