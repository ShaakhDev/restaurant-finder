import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from './screens/home';
import {MapView} from './screens/map-view';
import {TabBar} from './components/my-tab-bar';
import HomeIcon from './resources/icons/home';
import MapIcon from './resources/icons/map';

const Tab = createBottomTabNavigator();
export const MainNavigation = () => {
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
