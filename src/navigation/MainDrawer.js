import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from './MyTabs'
import DrawerItem from '../components/DrawerNavigation';
import Home from '../screens/TabScreen/Home';

const Drawer = createDrawerNavigator();

export default function MainDrawer({route}) {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerItem {...props} />}
      screenOptions={{ headerShown: false,}}
      drawerStyle={{
        width: 200, // Set the desired width for your drawer
      }}>
      <Drawer.Screen name="MyTabs" component={MyTabs}/>
      <Drawer.Screen name="Home" component={Home}/>
    </Drawer.Navigator>
  );
}