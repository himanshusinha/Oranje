import { Text, View, SafeAreaView, StatusBar,StyleSheet } from "react-native";
import React,{useEffect} from 'react'
import 'react-native-gesture-handler';
import Navigation from "./src/components/NavigationScreen";
import RootNavigation from "./src/navigation/RootNavigation";
import { persistStore, PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
// import configureStore, { persistor } from './src/Redux/store/configureStore';
import configureStore, { persistor } from "./src/Redux/store";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '1E1E1E',
  },
});
