import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from './screens/home';
import {MapView} from './screens/map-view';
import HomeIcon from './resources/icons/home';
import MapIcon from './resources/icons/map';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {RestaurantDetails} from './screens/restaurant-detail';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Restaurant"
        component={RestaurantDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#8a8a8a',
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <HomeIcon active={focused} />,
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => <MapIcon active={focused} />,
        }}
        name="Map"
        component={MapView}
      />
    </Tab.Navigator>
  );
};
