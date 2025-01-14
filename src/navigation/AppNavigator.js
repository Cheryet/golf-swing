import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTabBar from './CustomTab/CustomTab';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import VideoScreen from '../screens/VideoScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Record" component={VideoScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
