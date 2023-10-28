import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Modal,
    Button,
    ActivityIndicator,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView,
  } from 'react-native';
  import React, {useState, useRef, useEffect} from 'react';
  import {FogetPasswordAction} from '../../Redux/Actions/FogetPasswordAction';
  import {useDispatch, useSelector} from 'react-redux';
  import {ResetPasswordAction} from '../../Redux/Actions/ResetPasswordAction';
  
  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;
  
  const ResetPassword = ({navigation, route}) => {
    const {email} = route.params;
    const dispatch = useDispatch();
  
    const [showActivityIndicator, setShowActivityIndicator] = useState(true);
    const [password, setPassword] = useState('');
    const [crmpassword, setcrmPassword] = useState('');
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isPasswordHidden2, setIsPasswordHidden2] = useState(true);
  
    const togglePasswordVisibility = () => {
      setIsPasswordHidden(!isPasswordHidden);
    };
  
    const togglePasswordVisibility2 = () => {
      setIsPasswordHidden2(!isPasswordHidden2);
    };
  
    useEffect(() => {
      // Set a timeout to hide the ActivityIndicator after 2 seconds
      const timeout = setTimeout(() => {
        setShowActivityIndicator(false);
      }, 1000);
  
      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeout);
    }, []);
  
    const ResetpasswordRes = useSelector(
      state => state?.ResetPasswordReducer?.RESETPASSWORD,
    );
    console.log('ResetpasswordRes', ResetpasswordRes);
  
    // useEffect(() => {
    //     if (ResetpasswordRes.status === true) {
    //         navigation.navigate('Login');
    //     } else if (ResetpasswordRes.status === false) {
    //         showToast(ResetpasswordRes.message);
    //     }
    // }, [ResetpasswordRes]);
  
    const handleAPIRequest = () => {
      const requestBody = {
        email: email,
        password: password,
        repeat_password: crmpassword,
      };
      console.log('req body send data = ', requestBody);
      dispatch(ResetPasswordAction(requestBody));
    };
  
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    useEffect(() => {
      if (ResetpasswordRes.status === true) {
        setIsModalVisible(true); // Show the modal when status is true
      }
    }, [ResetpasswordRes]);
  
    const closeModal = () => {
      setIsModalVisible(false); // Close the modal when "OK" is pressed
      // navigation.navigate('Login'); // Navigate to the login screen
    };
  
    const FirstContainer = () => {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={styles.crosspngview}>
              <Image
                style={{height: 25, width: 25}}
                source={require('../../assets/images/icons/orangecrossicon.png')}
              />
            </View>
          </TouchableOpacity>
  
          <View style={styles.frogettxtview}>
            <Text style={styles.forgetpswtxt}>Reset Password</Text>
          </View>
          <View style={styles.verificationtxtview}>
            <Text style={styles.verificationtxt}>
              Set the new password for your account
            </Text>
            <Text style={styles.verificationtxt}>
              so you can login and access all the features.
            </Text>
          </View>
  
          <Text style={styles.emailtxt}>Password</Text>
          <View style={styles.emailview}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: '3%',
              }}>
              <TextInput
                style={styles.emailinput}
                placeholder="Enter new password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={isPasswordHidden}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  style={styles.hideimg}
                  source={
                    isPasswordHidden
                      ? require('../../assets/images/icons/hide.png')
                      : require('../../assets/images/icons/security.png') // Use appropriate image for hide/unhide
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.emailtxt, {marginTop: '4%'}]}>
            Confirm password
          </Text>
          <View style={[styles.emailview]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: '3%',
              }}>
              <TextInput
                style={styles.emailinput}
                placeholder="Enter confirm password"
                value={crmpassword}
                onChangeText={setcrmPassword}
                secureTextEntry={isPasswordHidden2}
              />
              <TouchableOpacity onPress={togglePasswordVisibility2}>
                <Image
                  style={styles.hideimg}
                  source={
                    isPasswordHidden2
                      ? require('../../assets/images/icons/hide.png')
                      : require('../../assets/images/icons/security.png') // Use appropriate image for hide/unhide
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
  
    const SecondContainer = () => {
      return (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            // onPress={() => { navigation.navigate('OptScreen') }}
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
              Send OTP
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
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                  {FirstContainer()}
                  {SecondContainer()}
                </ScrollView>
              </View>
            </View>
            <Modal visible={isModalVisible} transparent animationType="fade">
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    height: 150,
                    width: WIDTH / 1.7,
                    borderRadius: 10,
                  }}>
                  <Text style={styles.moadaltxt}>
                    Your password updated successfully
                  </Text>
                  <TouchableOpacity
                    style={{height: 40, width: WIDTH / 2.4, marginTop: '12%'}}
                    onPress={closeModal}>
                    <Button title="OK" onPress={closeModal} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </ImageBackground>
        )}
      </SafeAreaView>
    );
  };
  
  export default ResetPassword;
  
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
      // fontWeight: '700',
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
      // fontWeight: '400',
      textAlign: 'center',
      fontFamily: 'Montserrat-Regular',
    },
    emailtxt: {
      marginLeft: '3%',
      fontSize: 16,
      color: '#E6A263',
      fontWeight: '400',
      marginTop: '7%',
    },
    emailview: {
      marginTop: '2%',
      height: 55,
      width: WIDTH / 1.1,
      backgroundColor: 'white',
      // alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 10,
      elevation: 5,
      borderWidth: 1,
      borderColor: '#E6A263',
    },
    emailinput: {
      alignItems: 'center',
      // marginHorizontal: '5%',
      fontSize: 16,
      color: 'black',
    },
    hideimg: {
      height: 20,
      width: 20,
    },
    moadaltxt: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'Montserrat-Regular',
      textAlign: 'center',
    },
  });
  