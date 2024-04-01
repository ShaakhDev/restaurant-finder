import {FC} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {Restaurant} from '../components/restaurant-card';
import {LeftArrow} from '../resources/icons/left-arrow';
import {Star} from '../resources/icons/star';

type Props = {
  route: any;
  navigation: any;
};

export const RestaurantDetails: FC<Props> = ({route, navigation}) => {
  const restaurant: Restaurant = route.params.restaurant;
  return (
    <View style={styles.root}>
      <View style={styles.imageBox}>
        <Image
          source={{uri: restaurant?.photo?.images?.original?.url}}
          style={styles.image}
        />
        <View style={styles.arrow}>
          <Pressable onPress={navigation.goBack}>
            <LeftArrow width={80} height={45} />
          </Pressable>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{restaurant?.name}</Text>
        <View style={styles.rating}>
          <Star width={24} height={24} color={'#ffcd3c'} />
          <Text>
            {restaurant.rating} ({restaurant?.num_reviews})
          </Text>
        </View>
        <Text style={styles.description}>{restaurant?.description}</Text>
        <Text style={styles.subtitle}>Details</Text>
        <Text style={styles.description}>{restaurant?.location_string}</Text>
        <Text style={styles.description}>{restaurant?.address}</Text>
        <Text style={styles.description}>{restaurant?.phone}</Text>
        <Text style={styles.subtitle}>Menu</Text>
        <Text style={styles.description}>
          {restaurant?.cuisine?.map(item => item.name).join(', ')} No menu
          available
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBox: {
    height: 'auto',
  },
  arrow: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  image: {
    width: '100%',
    height: 240,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  title: {
    fontSize: 32,
    color: '#333',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    color: '#333',
    paddingVertical: 20,
    fontWeight: '500',
  },
  rating: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 5,
  },
  description: {
    color: 'gray',
    fontSize: 16,
    flexShrink: 1,
  },
});
