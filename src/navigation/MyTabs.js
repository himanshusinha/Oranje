import { Text, View, Dimensions, Image, StyleSheet } from 'react-native';
import React from 'react'
import Home from '../screens/TabScreen/Home';
import Message from '../screens/TabScreen/Message';
import Location from '../screens/TabScreen/Location';
import Notification from '../screens/TabScreen/Notification';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          height: 68,
          paddingBottom: 7,
          backgroundColor: '#ff8000',
          elevation: 0,
          position:'absolute',
        },
        headerShown: false,
      //   tabBarInactiveTintColor: '#B3B5B7',
      //   tabBarActiveTintColor: 'white',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle: {},
          tabBarLabel: '',
          tabBarIcon: config => (
            <Image
              style={
               styles.ImageBottom
              }
              resizeMode="contain"
              //  source={require('./SRC/assets/images/home.png')}
               source={require('../assets/images/icons/home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarLabel: '',
          tabBarIcon: config => (
            <Image
              style={
                styles.messageimg
              }
              source={require('../assets/images/icons/message.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarLabel: '',
          tabBarIcon: config => (
            <Image
              style={
                styles.Locationimg
              }
              source={require('../assets/images/icons/location.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: '',
          tabBarIcon: config => (
            <Image
              style={
                styles.Notifactionimg
              }
              source={require('../assets/images/icons/notification.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default MyTabs

const styles = StyleSheet.create({
    ImageTintBottom: {
        // tintColor: '#009eff',
        height: 25,
        width: 25,
        marginTop: 16
    },
    ImageBottom: {
        // tintColor: '#B3B5B7',
        height: 37,
        width:29,
        marginTop: 16
    },
    messageimg:{
        height: 28,
        width:28 ,
        marginTop: 16
    },
    Locationimg:{
        height: 31,
        width:25,
        marginTop: 16
    },
    Notifactionimg:{
        height: 31,
        width:27,
        marginTop: 16
    }
})