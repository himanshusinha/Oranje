// import {
//     StyleSheet, Text, StatusBar, View,
//     SafeAreaView, KeyboardAvoidingView,ActivityIndicator, ImageBackground, Image, Dimensions, TouchableOpacity, TextInput, ScrollView
// } from 'react-native'
// import React, { useState, useRef,useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { OtpAction } from '../../Redux/Actions/OtpAction';
// import showToast from '../../components/showToast';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const OptScreen = ({navigation,route}) => {
//     const { email } = route.params;
//     const dispatch = useDispatch();

//     const [showActivityIndicator, setShowActivityIndicator] = useState(true);
//     const [otp, setOTP] = useState(['', '', '', '',]);
//     const [countdown, setCountdown] = useState(59);
//     const inputs = useRef([]);
//     const [countdownComplete, setCountdownComplete] = useState(false);
//     const otpValue = otp.join('');

//     const OTPRes = useSelector(state => state?.OtpReducer?.OTP);
//     console.log('OTPRes', OTPRes)

//     useEffect(() => {
//         if (OTPRes.status === true) {
//             navigation.navigate('ResetPassword',{email});
//         } else if (OTPRes.status === false) {
//             showToast(OTPRes.message);
//         }
//     }, [OTPRes]);

//     const handleAPIRequest = () => {
//         const requestBody = {
//             email: email,
//             otp:otpValue,
//         };
//         console.log("req body send data = ", requestBody)
//         dispatch(OtpAction(requestBody));
//     };

//     useEffect(() => {
//         // Set a timeout to hide the ActivityIndicator after 1 seconds
//         const timeout = setTimeout(() => {
//             setShowActivityIndicator(false);
//         }, 1000);
//         // Clear the timeout when the component unmounts
//         return () => clearTimeout(timeout);
//     }, []);

//     useEffect(() => {
//         // Function to decrement the countdown every second
//         const decrementCountdown = () => {
//             setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
//         };
//         const intervalId = setInterval(decrementCountdown, 1000);

//         // Clear the interval when the countdown reaches zero
//         if (countdown === 0) {
//             clearInterval(intervalId);
//             setCountdownComplete(true);
//         }

//         return () => clearInterval(intervalId);
//     }, [countdown]);

//     const focusNextInput = (index) => {
//         if (inputs.current[index + 1]) {
//             inputs.current[index + 1].focus();
//         }
//     };
//     const handleChangeText = (text, index) => {
//         const newOtp = [...otp];
//         newOtp[index] = text;
//         setOTP(newOtp);

//         if (text.length === 1) {
//             focusNextInput(index);
//         }
//     };

//     const renderInputs = () => {
//         return otp.map((value, index) => (
//             <View style={styles.textInputview} key={index}>
//                 <TextInput
//                     ref={(ref) => (inputs.current[index] = ref)}
//                     value={value}
//                     placeholder=""
//                     style={styles.textInput}
//                     // placeholderTextColor="#8B919E"
//                     onChangeText={(text) => handleChangeText(text, index)}
//                     keyboardType="numeric"
//                     maxLength={1}
//                     onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
//                 />
//             </View>
//         ));
//     };

//     const handleResendCode = () => {
//         setCountdown(59);
//         setCountdownComplete(false);
//     };

//     const FirstContainer = () => {
//         return (
//             <View>
//                 <TouchableOpacity  onPress={() => { navigation.navigate('Login')}} >
//                 <View style={styles.crosspngview}>
//                     <Image style={{ height: 25, width: 25 }}
//                         source={require('../../assets/images/icons/orangecrossicon.png')} />
//                 </View>
//                 </TouchableOpacity>

//                 <View style={styles.frogettxtview}>
//                     <Text style={styles.forgetpswtxt}>Enter 4 digits code</Text>
//                 </View>
//                 <View style={styles.verificationtxtview}>
//                     <Text style={styles.verificationtxt}>Enter the 4 digits code that you received on</Text>
//                     <Text style={styles.verificationtxt}>your email</Text>
//                 </View>
//                 <View style={styles.otprenderview}>
//                     {renderInputs()}
//                 </View>
//                 <View>
//             {countdownComplete ? (
//                 <TouchableOpacity style={styles.resendview} onPress={handleResendCode}>
//                     <Text style={styles.resendtxt}>Resend Code ?</Text>
//                 </TouchableOpacity>
//             ) : (
//                 <View style={styles.resendview}>
//                     <Text style={styles.resendtxt}>Resend code in</Text>
//                     <Text style={styles.resendtxt1}>
//                         {countdown > 0 ? `${countdown.toString().padStart(2, '0')}s` : '0'}
//                     </Text>
//                 </View>
//             )}
//         </View>
//             </View>
//         )
//     }

//     const SecondContainer = () => {
//         return (
//             <View style={{ flex: 1, justifyContent: 'flex-end', }}>
//                 <TouchableOpacity
//             //    onPress={() => { navigation.navigate('ResetPassword')}}
//                 onPress={handleAPIRequest}
//                     style={{
//                         height: 56,
//                         backgroundColor: '#FF8000',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         borderRadius: 333,
//                         width: WIDTH / 1.10,
//                         alignSelf: 'center',
//                         marginBottom: 15,
//                     }}>
//                     <Text
//                         style={{
//                             color: 'white',
//                             fontSize: 20,
//                             fontWeight:'700'
//                         }}>
//                       Confirm
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }

//   return (
//     <SafeAreaView style={styles.container}>
//     <StatusBar
//         barStyle="dark-content"
//         animated={true}
//         backgroundColor="black"
//     />
//    {showActivityIndicator ? (
//                     <ActivityIndicator
//                         size="large"
//                         color="#FF8000"
//                         style={{
//                             justifyContent:'center',alignItems:'center'}}
//                     />
//                 ) : (
//     <ImageBackground style={{ height: '100%', width: '100%' }}
//         source={require('../../assets/images/bg/loginbg.png')}
//     >
//         <View
//             style={{
//                 backgroundColor: 'rgba(255, 119, 0, 0.6)',
//                 flex: 1,
//             }}>

//             <View
//                 style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',

//                 }}>
//                 <Image
//                     style={{
//                         height: '28.70%',
//                         width: "65%",
//                         resizeMode: 'contain',
//                     }}
//                     source={require('../../assets/images/icons/apptext.png')}
//                 />
//             </View>

//             <View style={styles.secondcontainer} >
//                     <ScrollView showsVerticalScrollIndicator={false}
//                     contentContainerStyle={{ flexGrow: 1 }}>
//                         {FirstContainer()}
//                         {SecondContainer()}
//                     </ScrollView>
//             </View>
//         </View>
//     </ImageBackground>
//           )}
// </SafeAreaView>
//   )
// }

// export default OptScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center'
//     },
//     contentContainer: {
//         // flex: 1,
//         // padding: 20,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     footerContainer: {
//         // justifyContent: 'center',
//         // padding: 10,
//     },
//     secondcontainer: {
//         flex: 1,
//         height: HEIGHT / 1,
//         width: '100%',
//         backgroundColor: 'white',
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     crosspngview: {
//         alignSelf: 'flex-end',
//         marginRight: '1%',
//         marginTop: '5%'
//     },
//     frogettxtview: {
//         alignItems: 'center',
//         marginTop: '4%'
//     },
//     forgetpswtxt: {
//         fontSize: 24,
//         // fontWeight: '700',
//         color: 'orange',
//         // fontFamily:"Montserrat-SemiBold"
//         fontFamily:'Montserrat-Bold'
//     },
//     verificationtxtview: {
//         alignSelf: 'center',
//         marginTop: '5%',
//         marginHorizontal: '2%'
//     },
//     verificationtxt: {
//         color: '#E6A263',
//         fontSize: 15,
//         // fontWeight: '400',
//         textAlign: 'center',
//         fontFamily:"Montserrat-Regular",
//         //  fontFamily:'Montserrat-Bold',
//     },
//     otprenderview: {
//         flexDirection: 'row',
//         marginTop: "15%",
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginHorizontal: 15
//     },
//     textInputview: {
//         height: HEIGHT / 11.50,
//         width: WIDTH / 7.45,
//         borderRadius: 10,
//         backgroundColor: "white",
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderColor:'orange',
//         borderWidth:1,
//         margin: 10
//     },
//     textInput: {
//         alignItems: 'center',
//         alignSelf: 'center',
//         textAlign: 'center',
//         fontSize: 30,
//         fontWeight: '700',
//         width: 50,
//         color: 'orange'
//     },
//     resendview: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginHorizontal: 15,
//         marginTop: 15
//     },
//     resendtxt: {
//         color: 'black',
//         fontSize: 16,
//         fontWeight: '600'
//     },
//     resendtxt1: {
//         marginLeft: 5,
//         color: 'orange',
//         fontSize: 16,
//         fontWeight: '600'
//     },
// })

import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    ActivityIndicator,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView,
  } from 'react-native';
  import React, {useState, useRef, useEffect} from 'react';
  import {useDispatch, useSelector} from 'react-redux';
  import {OtpAction} from '../../Redux/Actions/OtpAction';
  import showToast from '../../components/showToast';
  
  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;
  
  const OptScreen = ({navigation, route}) => {
    const {email} = route.params;
    const dispatch = useDispatch();
  
    const [showActivityIndicator, setShowActivityIndicator] = useState(true);
    const [otp, setOTP] = useState(['', '', '', '']);
    const [countdown, setCountdown] = useState(59);
    const inputs = useRef([]);
    const [countdownComplete, setCountdownComplete] = useState(false);
    const otpValue = otp.join('');
  
    const OTPRes = useSelector(state => state?.OtpReducer?.OTP);
    console.log('OTPRes', OTPRes);
  
    useEffect(() => {
      if (OTPRes.status === true) {
        navigation.navigate('ResetPassword', {email});
      } else if (OTPRes.status === false) {
        showToast(OTPRes.message);
      }
    }, [OTPRes]);
  
    const handleAPIRequest = () => {
      const requestBody = {
        email: email,
        otp: otpValue,
      };
      console.log('req body send data = ', requestBody);
      dispatch(OtpAction(requestBody));
    };
  
    useEffect(() => {
      // Set a timeout to hide the ActivityIndicator after 1 second
      const timeout = setTimeout(() => {
        setShowActivityIndicator(false);
      }, 1000);
      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeout);
    }, []);
  
    useEffect(() => {
      // Function to decrement the countdown every second
      const decrementCountdown = () => {
        setCountdown(prevCountdown =>
          prevCountdown > 0 ? prevCountdown - 1 : 0,
        );
      };
      const intervalId = setInterval(decrementCountdown, 1000);
  
      // Clear the interval when the countdown reaches zero
      if (countdown === 0) {
        clearInterval(intervalId);
        setCountdownComplete(true);
      }
  
      return () => clearInterval(intervalId);
    }, [countdown]);
  
    const focusNextInput = index => {
      if (inputs.current[index + 1]) {
        inputs.current[index + 1].focus();
      }
    };
  
    const handleChangeText = (text, index) => {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOTP(newOtp);
  
      if (text.length === 1) {
        focusNextInput(index);
      }
    };
  
    const handleKeyPress = (index, key) => {
      if (key === 'Backspace' && index > 0) {
        // Handle backspace key press and move focus to the previous input
        focusNextInput(index - 1);
      }
      // You can add more key handling logic here if needed
    };
  
    const renderInputs = () => {
      return otp.map((value, index) => (
        <View style={styles.textInputview} key={index}>
          <TextInput
            ref={ref => (inputs.current[index] = ref)}
            value={value}
            placeholder=""
            style={styles.textInput}
            onChangeText={text => handleChangeText(text, index)}
            keyboardType="numeric"
            maxLength={1}
            onKeyPress={({nativeEvent: {key}}) => handleKeyPress(index, key)}
          />
        </View>
      ));
    };
  
    const handleResendCode = () => {
      setCountdown(59);
      setCountdownComplete(false);
    };
  
    const FirstContainer = () => {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <View style={styles.crosspngview}>
              <Image
                style={{height: 25, width: 25}}
                source={require('../../assets/images/icons/orangecrossicon.png')}
              />
            </View>
          </TouchableOpacity>
  
          <View style={styles.frogettxtview}>
            <Text style={styles.forgetpswtxt}>Enter 4 digits code</Text>
          </View>
          <View style={styles.verificationtxtview}>
            <Text style={styles.verificationtxt}>
              Enter the 4 digits code that you received on
            </Text>
            <Text style={styles.verificationtxt}>your email</Text>
          </View>
          <View style={styles.otprenderview}>{renderInputs()}</View>
          <View>
            {countdownComplete ? (
              <TouchableOpacity
                style={styles.resendview}
                onPress={handleResendCode}>
                <Text style={styles.resendtxt}>Resend Code ?</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.resendview}>
                <Text style={styles.resendtxt}>Resend code in</Text>
                <Text style={styles.resendtxt1}>
                  {countdown > 0
                    ? `${countdown.toString().padStart(2, '0')}s`
                    : '0'}
                </Text>
              </View>
            )}
          </View>
        </View>
      );
    };
  
    const SecondContainer = () => {
      return (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={handleAPIRequest}
            style={{
              height: 56,
              backgroundColor: '#FF8000',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 333,
              width: WIDTH / 1.1,
              alignSelf: 'center',
              marginBottom: 15,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '700',
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          animated={true}
          backgroundColor="black"
        />
        {showActivityIndicator ? (
          <ActivityIndicator
            size="large"
            color="#FF8000"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        ) : (
          <ImageBackground
            style={{height: '100%', width: '100%'}}
            source={require('../../assets/images/bg/loginbg.png')}>
            <View
              style={{
                backgroundColor: 'rgba(255, 119, 0, 0.6)',
                flex: 1,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: '28.70%',
                    width: '65%',
                    resizeMode: 'contain',
                  }}
                  source={require('../../assets/images/icons/apptext.png')}
                />
              </View>
  
              <View style={styles.secondcontainer}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{flexGrow: 1}}>
                  {FirstContainer()}
                  {SecondContainer()}
                </ScrollView>
              </View>
            </View>
          </ImageBackground>
        )}
      </SafeAreaView>
    );
  };
  
  export default OptScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    contentContainer: {
      // flex: 1,
      // padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerContainer: {
      // justifyContent: 'center',
      // padding: 10,
    },
    secondcontainer: {
      flex: 1,
      height: HEIGHT / 1,
      width: '100%',
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    crosspngview: {
      alignSelf: 'flex-end',
      marginRight: '1%',
      marginTop: '5%',
    },
    frogettxtview: {
      alignItems: 'center',
      marginTop: '4%',
    },
    forgetpswtxt: {
      fontSize: 24,
      color: 'orange',
      fontFamily: 'Montserrat-Bold',
    },
    verificationtxtview: {
      alignSelf: 'center',
      marginTop: '5%',
      marginHorizontal: '2%',
    },
    verificationtxt: {
      color: '#E6A263',
      fontSize: 15,
      fontFamily: 'Montserrat-Regular',
    },
    otprenderview: {
      flexDirection: 'row',
      marginTop: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 15,
    },
    textInputview: {
      height: HEIGHT / 11.5,
      width: WIDTH / 7.45,
      borderRadius: 10,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'orange',
      borderWidth: 1,
      margin: 10,
    },
    textInput: {
      alignItems: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: '700',
      width: 50,
      color: 'orange',
    },
    resendview: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 15,
      marginTop: 15,
    },
    resendtxt: {
      color: 'black',
      fontSize: 16,
      fontWeight: '600',
    },
    resendtxt1: {
      marginLeft: 5,
      color: 'orange',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  