import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/TabScreen/Home';
import Location from '../screens/TabScreen/Location';
import Message from '../screens/TabScreen/Message';
import Notification from '../screens/TabScreen/Notification';
import Profile from '../screens/ProfileScreen/Profile';
import MyTabs from './MyTabs';
import Exit from '../screens/SideMenueScreen/Exit';
import CheckIn from '../screens/CheckinCheckOutScreen/CheckIn';
import CheckOut from '../screens/CheckinCheckOutScreen/CheckOut';
import Translate from '../screens/SideMenueScreen/Translate';
import Chatbot from '../screens/SideMenueScreen/Chatbot';
import Dashboard from '../screens/SideMenueScreen/Dashboard';
import FormReports from '../screens/SideMenueScreen/FormReports';
import WorkPoints from '../screens/SideMenueScreen/WorkPoints';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerItem {...props} />}
      screenOptions={{ headerShown: false, }}
      drawerStyle={{
        width: 200, // Set the desired width for your drawer
      }}>
      <Drawer.Screen name="MyTabs" component={MyTabs} />
    </Drawer.Navigator>
  );
};

function RootNavigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="WorkPoints" component={WorkPoints} />
        <Stack.Screen name="FormReports" component={FormReports} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="Translate" component={Translate} />
        <Stack.Screen name="Exit" component={Exit} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="CheckIn" component={CheckIn} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
      </Stack.Navigator>
</NavigationContainer>
  );

}

export default RootNavigation;