import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import showToast from '../../components/showToast';
import Geolocation from '@react-native-community/geolocation';
import {verifyQRAction} from '../../Redux/Actions/VerifyQRAction';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const CheckIn = ({navigation, route}) => {
  const dispatch = useDispatch();
  //  const { successfullyTxtKey } = route.params;
  const [qrvalue, setQrvalue] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLatitude(info?.coords?.latitude);
      setLongitude(info?.coords?.longitude);
    });
    onOpenScanner();
  }, [latitude, longitude]);

  const VERIFYQRRes = useSelector(state => state?.verifyQRReducer?.VERIFYQR);
  console.log('VERIFYQRRes', VERIFYQRRes);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (VERIFYQRRes.status === true) {
      dispatch({type: 'reset_verifyqr'});
      navigation.navigate('SuccessCheckIn');
    } else if (VERIFYQRRes.status === false && formSubmitted) {
      showToast(VERIFYQRRes.message);
      navigation.navigate('MyDrawer', {
        screen: 'Home',
      });
    }
  }, [VERIFYQRRes, dispatch, formSubmitted]);

  const handleVerifyQR = async () => {
    setFormSubmitted(true);
    if (typeof latitude === 'number' && typeof longitude === 'number') {
      const data = {
        qr_code: 'your_qr_code_here',
        latitude: latitude,
        longitude: longitude,
      };

      dispatch(verifyQRAction(data));
    } else {
      showToast({
        type: 'error',
        text1: 'Invalid latitude or longitude',
      });
    }
  };

  const onBarcodeScan = qrvalue => {
    setQrvalue(qrvalue);
    setOpenScanner(false);
    handleVerifyQR(qrvalue);
  };

  const onOpenScanner = () => {
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setQrvalue('');
            setOpenScanner(true);
          } else {
            showToast({
              type: 'error',
              text1: 'CAMERA permission denied',
            });
          }
        } catch (err) {
          showToast({
            type: 'error',
            text1: 'CAMERA permission err',
          });
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpenScanner(true);
    }
  };
  async function requestLocationPermission() {
    const locationPermission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await check(locationPermission);

    if (result === RESULTS.DENIED) {
      const requestResult = await request(locationPermission);
      if (requestResult === RESULTS.GRANTED) {
        // Location permission granted, proceed with using location services
        Geolocation.getCurrentPosition(info => {
          setLatitude(info?.coords?.latitude);
          setLongitude(info?.coords?.longitude);
        });
      } else {
      }
    } else if (result === RESULTS.GRANTED) {
      // Location permission is already granted, proceed with using location services
    }
  }

  requestLocationPermission();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/others/successcanbg.png')}>
        <View style={styles.child}>
          {openScanner ? (
            <View style={{flex: 1}}>
              <QRCodeScanner
                onRead={event => onBarcodeScan(event.data)} // Use event.data to get the QR code value
                reactivate={true}
                reactivateTimeout={500}
                showMarker={true}
              />
            </View>
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.socialnetworkheading}>Loading...</Text>
            </View>
          )}
        </View>

        {/* <TouchableOpacity onPress={handleVerifyQR}>
          <Text style={{fontSize:32,color:"black"}}>click</Text>
        </TouchableOpacity> */}
      </ImageBackground>
      {/* <ImageBackground style={{ height: '85%', width: '100%' }}
        source={require('../../assets/images/others/successcanbg.png')}>
        <View
          style={{
            backgroundColor: 'rgba(255, 119, 0, 0.6)',
            height: '85%',
          }}>
          <View style={styles.successfullytxtview}>
            <Text style={styles.successfullytxt}>You are successfully</Text>
            <Text style={styles.successfullytxt}>{successfullyTxtKey}</Text>
          </View>
          <View style={{
      marginTop:HEIGHT/15,
      alignItems: 'center',
    }}>
      <Text style={styles.addresstxt} >Shekhar central</Text>
      <Text style={styles.addresstxt1}>AB Rd, Manorama Ganj, Indore, Madhya Pradesh 452018</Text>
    </View>
    <View style={{
      flexDirection: 'row', marginTop: 10,alignItems:'center',justifyContent:'center',
    }}>
      <Text style={styles.datetxt}>date:02-10-2023</Text>
      <Text style={styles.datetxt}>Time:5.31pm</Text>
    </View>
        </View>

      </ImageBackground>

      <View style={{
        marginTop: -190,
        height: "50%",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: "white"
      }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image style={styles.tickimg}
            source={require('../../assets/images/others/tickicon.png')} />
          <Text style={[styles.Alwaysscantxt, { marginTop: 20 }]}>Always remember to scan</Text>
          <Text style={styles.Alwaysscantxt}>the code when entering and leaving</Text>
          <Text style={styles.Alwaysscantxt}>from your workplace.</Text>
        </View>

        <View style={{justifyContent:'center',
        alignItems:'center',marginTop:"8%",marginBottom:20}}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}
        style={styles.btnview}>
          <Text style={styles.btntxt}>After</Text>
        </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  successfullytxtview: {
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successfullytxt: {
    fontSize: 21,
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  tickimg: {
    height: 60,
    width: 60,
    marginTop: '15%',
    resizeMode: 'contain',
  },
  addresstxt: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  addresstxt1: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    marginTop: 5,
  },
  datetxt: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    marginHorizontal: 40,
  },

  Alwaysscantxt: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Montserrat-Regular',
  },
  btnview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8001',
    height: 40,
    width: WIDTH / 1.5,
    elevation: 5,
    borderRadius: 10,
  },
  btntxt: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  socialnetworkheading: {
    fontFamily: 'Montserrat-Regular',
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(255, 119, 0, 0.6)',
    //marginBottom: moderateVerticalScale(20),
  },
});
