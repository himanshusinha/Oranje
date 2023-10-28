import { Text, StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { Component ,useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector, connect } from 'react-redux';

import Splash from '../screens/SplashScreen/Splash'
import Login from '../screens/LoginScreen/Login';
import SingUP from '../screens/SingUPScreen/SingUP';
import ForgetScreen from '../screens/ForgetPasswordScreen/ForgetScreen';
import OptScreen from '../screens/ForgetPasswordScreen/OptScreen';
import Home from '../screens/TabScreen/Home';
import Location from '../screens/TabScreen/Location';
import Message from '../screens/TabScreen/Message';
import Notification from '../screens/TabScreen/Notification';
import Profile from '../screens/ProfileScreen/Profile';
import WorkPoints from '../screens/SideMenueScreen/WorkPoints';
import FormReports from '../screens/SideMenueScreen/FormReports';
import Dashboard from '../screens/SideMenueScreen/Dashboard';
import Chatbot from '../screens/SideMenueScreen/Chatbot';
import Translate from '../screens/SideMenueScreen/Translate';
import Exit from '../screens/SideMenueScreen/Exit';
import DrawerItem from './DrawerNavigation';
import CheckOut from '../screens/CheckinCheckOutScreen/CheckOut';
import CheckIn from '../screens/CheckinCheckOutScreen/CheckIn';
import ResetPassword from '../screens/ResetPasswordScreen/ResetPassword';
import MainDrawer from '../navigation/MainDrawer';
import AuthStack from '../navigation/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigation from '../navigation/RootNavigation';
import showToast from './showToast';
import SuccessCheckIn from '../screens/SuccessCheckInScreen/SuccessCheckIn';
import { AuthContext } from '../Redux/Utils/Context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

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

  const MyDrawer = () => {
    return (
      <Drawer.Navigator
      drawerContent={props => <DrawerItem {...props} />}
      screenOptions={{ headerShown: false,}}
      drawerStyle={{
        width: 200, // Set the desired width for your drawer
      }}>
      <Drawer.Screen name="MyTabs" component={MyTabs}/>
    </Drawer.Navigator>
    );
  };


const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ header: () => null }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SingUP" component={SingUP} />
                <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
                <Stack.Screen name="OptScreen" component={OptScreen} />
                <Stack.Screen name="ResetPassword" component={ResetPassword}/>
                <Stack.Screen name="MyTabs" component={MyTabs}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Location" component={Location} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="WorkPoints" component={WorkPoints} />
                <Stack.Screen name="FormReports" component={FormReports} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Chatbot" component={Chatbot} />
                <Stack.Screen name="Translate" component={Translate} />
                <Stack.Screen name="Exit" component={Exit}/>
                <Stack.Screen name="MyDrawer" component={MyDrawer}/>
                <Stack.Screen name="CheckIn" component={CheckIn}/>
                <Stack.Screen name="CheckOut" component={CheckOut}/>   
                <Stack.Screen name="SuccessCheckIn" component={SuccessCheckIn}/>       
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// const Navigation = () => {
// const initialLoginState = {
//   isLoading: true,
//   userToken: null,
// };

// const loginReducer = (prevState, action) => {
//   switch (action.type) {
//     case 'RETRIEVE_TOKEN':
//       return {
//         ...prevState,
//         userToken: action.token,
//         isLoading: false,
//       };
//     case 'LOGIN':
//       return {
//         ...prevState,
//         userToken: action.token,
//         isLoading: false,
//       };
//     case 'LOGOUT':
//       return {
//         ...prevState,
//         userToken: null,
//         isLoading: false,
//       };
//   }
// };

// const [loginState, dispatch] = React.useReducer(
//   loginReducer,
//   initialLoginState,
// );
// const authContext = React.useMemo(
//   () => ({
//     signIn: async (token, details) => {
//       const userToken = token;
//       try {
//         await AsyncStorage.setItem('userToken', userToken);
//         dispatch({type: 'LOGIN', token: userToken});
//       } catch (e) {
//         console.log(e);
//       }
//     },
//     signOut: async () => {
//       try {
//         await AsyncStorage.removeItem('token');
//       } catch (e) {
//         console.log(e);
//       }
//       dispatch({type: 'LOGOUT'});
//     },
//   }),
//   [],
// );
// useEffect(() => {
//   setTimeout(async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
  
//       console.log("LLLLLLLL",token)
//       if (token !== null) {
//         dispatch({ type: 'RETRIEVE_TOKEN', token: token });
//       } else {
//         dispatch({ type: 'LOGOUT' });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }, 3000);
// }, []);

// if (loginState.isLoading) {
//   return <Splash />
// }

// return (
//   <AuthContext.Provider value={authContext}>
//     {loginState.userToken !== null ? <RootNavigation /> : <AuthStack />}
//     {/* <showToast position="top" topOffset={40} /> */}
//   </AuthContext.Provider>
// );

// }


export default Navigation

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