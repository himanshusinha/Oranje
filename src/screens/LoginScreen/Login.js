import {
  StyleSheet, Text, StatusBar, View,
  SafeAreaView, KeyboardAvoidingView,Modal, ImageBackground, Image, Dimensions, TouchableOpacity, TextInput, ScrollView
} from 'react-native'
import React, { useState, useRef,useEffect,useCallback } from 'react'
import CountryPicker from 'react-native-country-picker-modal';
import { LoginAction } from '../../Redux/Actions/LoginAction';
import { useDispatch, useSelector } from 'react-redux';
import showToast from '../../components/showToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Redux/Utils/BaseUrl';
import axios from 'axios';
import { AuthContext } from '../../Redux/Utils/Context';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
//  const { signIn } = React.useContext(AuthContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [Id, setId] = useState('')

  const countryCode = selectedCountry?.callingCode || '91';
  const mergedId = `+${countryCode}${Id}`;

  const onCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowPicker(false);
  };

  const LoginRes = useSelector(state => state?.LoginReducer?.LOGIN);
  
  const [isAccountBlocked, setIsAccountBlocked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // useEffect(() => {
  //     if (LoginRes.status === true) {
  //       // signIn(LoginRes.token);
  //       { navigation.navigate('MyDrawer', {
  //             screen: 'Home' }) }
  //     } else if (LoginRes.status === false) {
  //         showToast(LoginRes.message);
  //     }
  // }, [LoginRes]);

  useEffect(() => {
    if (LoginRes.status === true) {
      // signIn(LoginRes.token);
      navigation.navigate('MyDrawer', { screen: 'Home' });
    } else if (LoginRes.status === false) {
      showToast(LoginRes.message);
      
      // Check if the message is "Account blocked. Please contact support."
      if (LoginRes.message === "Account blocked. Please contact support.") {
      setIsAccountBlocked(true);
      setModalMessage("Your account is blocked. Please contact support.");
      setIsModalVisible(true);
      }
    }
  }, [LoginRes]);
  

  const handleAPIRequest = () => {
    const requestBody = {
        id:mergedId,
        password:password,
        fcm_token: "ewrsdt7f8g9h0js4d5gf67h98j0kxrc6tv7yb8un9i",
    };
   console.log("req body send data = ", requestBody)
   dispatch(LoginAction(requestBody)); 
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        backgroundColor="black"
      />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground style={{ height: '100%', width: '100%' }}
          source={require('../../assets/images/bg/loginbg.png')}
        >
          <View
            style={{
              backgroundColor: 'rgba(255, 119, 0, 0.6)',
              flex: 1,
            }}>

            <View style={styles.questioniconview}>
              <TouchableOpacity>
                <Image
                  style={{ height: 25, width: 25, }}
                  source={require('../../assets/images/icons/questionicon.png')}
                />
              </TouchableOpacity>
            </View>


            <View style={styles.apptextview}>
              <Image style={styles.apptxtimg}
                source={require('../../assets/images/icons/neworanjelogo.png')} />
            </View>

            <View style={{ flex: 1,
               justifyContent: 'flex-end',
               marginBottom:'10%' }}>
           
            <View style={styles.countyidview}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.txtinputview}>
                  <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    style={{ flexDirection: 'row', alignItems: 'center', }} >
                    <CountryPicker
                      onSelect={onCountrySelect}
                      withEmoji={true}
                      withFilter={true}
                      withFlag={true}
                      //   withCountryNameButton={true}
                      withAlphaFilter={true}
                      visible={showPicker}
                      countryCode={selectedCountry?.cca2 || 'US'}
                    />
                    <Text style={{ fontSize: 17, color: '#000', fontWeight: '600', marginLeft: -2, }}>
                      +{selectedCountry?.callingCode || '1'}
                    </Text>
                  </TouchableOpacity>

                </View>
                <View style={styles.txtinputview2}>
                  <TextInput
                    // style={[styles.txtinput, { marginLeft: 10 }]}
                    style={[
                      styles.txtinput,{marginLeft:10},
                      isAccountBlocked
                        ? { backgroundColor: '#FADDDA' } 
                        : null,
                    ]}
                    keyboardType="numeric"
                    placeholder='ID'
                    value={Id}
                    onChangeText={setId}
                    maxLength={10} 
                    placeholderTextColor='#8B919E'
                    editable={!isAccountBlocked}
                  />
                </View>
              </View>

              <View style={styles.txtinputview3}>
                <TextInput
                  value={password}
                  // style={styles.txtinput}
                  style={[
                    styles.txtinput,
                    isAccountBlocked
                      ? { backgroundColor: '#FADDDA' } 
                      : null,
                  ]}
                  placeholder='Enter your password'
                  secureTextEntry={showPassword}
                  placeholderTextColor='#8B919E'
                  onChangeText={text => setPassword(text)}
                  editable={!isAccountBlocked}
                />
                <TouchableOpacity
                  style={{ alignItems: 'flex-end', justifyContent: 'flex-end', }}
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ?
                    <Image style={{ height: 19, width: 19, resizeMode: 'contain', }} source={require('../../assets/images/icons/eye-show.png')} />
                    :
                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../assets/images/icons/eye-hide.png')} />}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => { navigation.navigate('ForgetScreen') }}>
                <Text style={styles.forgettxt}>Did you forget your password?</Text>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={handleAPIRequest}
              //   onPress={() => { navigation.navigate('MyDrawer', {
              //     screen: 'Home'
              // }) }}
              // onPress={() => { navigation.navigate('MyTabs') }}
      
                style={styles.enterbtn}>
                <Text style={styles.entertxt}>Enter</Text>
              </TouchableOpacity>

              <View style={styles.sinupview}>
                <Text style={styles.sinuptxt1}>You don't have an account yet?</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('SingUP'); }}>
                  <Text style={styles.sinuptxt2}> Sign Up</Text>
                </TouchableOpacity>
              </View>
             
            </View>
            <Image style={styles.qrcodeimg}
                source={require('../../assets/images/others/qrcodeicon.png')}
              />
              <Text style={styles.socalnetworktxt}>Follow us on our social network</Text>
              <View style={styles.socalnetworkview}>
                <TouchableOpacity>
                  <Image style={styles.socalnetwokimg}
                    source={require('../../assets/images/icons/fblogo.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.socalnetwokimg}
                    source={require('../../assets/images/icons/twitter.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.socalnetwokimg}
                    source={require('../../assets/images/icons/linkedinlogo.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.socalnetwokimg}
                    source={require('../../assets/images/icons/instalogo2.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Modal visible={isModalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  scrollContainer: {
    flexGrow: 1,
    //  justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerContainer: {
    justifyContent: 'center',
    padding: 10,
  },


  questioniconview: {
    marginTop: "7%",
    alignSelf: 'flex-end',
    marginRight: "5%"
  },
  apptextview: {
    alignItems: 'center',
     marginTop: "14%",
  },
  apptxtimg: {
    height: HEIGHT/3.80,
    width: WIDTH/1,
    resizeMode: 'contain',
  },
  countyidview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginTop: '-15%'
  },
  txtinputview: {
    height: 50,
    width: "28%",
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  txtinput: {
    color: 'black',
    fontSize: 18,
    width: '95%',
    // marginLeft: 10,
  },
  txtinputview2: {
    height: 50,
    width: "66%",
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    marginLeft: "3%"
  },
  txtinputview3: {
    height: 50,
    width: "97%",
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    paddingHorizontal: '3%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    marginTop: '2%',

  },
  forgettxt: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: '3%',
    fontFamily: "Montserrat-Regular",
  },
  enterbtn: {
    height: 50,
    width: "97%",
    backgroundColor: '#FF8000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black', 
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15, 
    shadowRadius: 4, 
    elevation: 5, 
    marginTop: '5%',
  },

  entertxt: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  sinupview: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  sinuptxt1: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400'
  },
  sinuptxt2: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700'
  },
  qrcodeimg: {
    height: 65,
    width: 65,
    marginTop: "8%",
    alignSelf:'center'
  },
  socalnetworktxt: {
    marginTop: "6%",
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    alignSelf:'center'
  },
  socalnetworkview: {
    alignSelf: 'center',
    marginTop: "2%",
    flexDirection: 'row'
  },
  socalnetwokimg: {
    height: 26,
    width: 26,
    margin: 3
  },
})