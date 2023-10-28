import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import Splash from '../screens/SplashScreen/Splash'
import Login from '../screens/LoginScreen/Login';
import SingUP from '../screens/SingUPScreen/SingUP';
import ForgetScreen from '../screens/ForgetPasswordScreen/ForgetScreen';
import OptScreen from '../screens/ForgetPasswordScreen/OptScreen';
import ResetPassword from '../screens/ResetPasswordScreen/ResetPassword';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    
      screenOptions={{ header: () => null }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SingUP" component={SingUP} />
      <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
      <Stack.Screen name="OptScreen" component={OptScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}



