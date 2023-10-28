import { StyleSheet, Text, View, Image, StatusBar,Dimensions } from 'react-native'
import React, { useEffect } from 'react'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Splash = ({ navigation }) => {

  useEffect(() => {
    navigationFun();
  }, []);

  const navigationFun = () => {
    setTimeout(() => {
      {
        navigation.navigate('Login');
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        backgroundColor="#ff8000"
      />
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image style={{ height: HEIGHT/3.80,
    width: WIDTH/1,resizeMode:'contain' }}
          source={require('../../assets/images/icons/neworanjelogo.png')}
        />
      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8000',
    justifyContent: 'center'
  },
  imageStyle: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%'
  }
})