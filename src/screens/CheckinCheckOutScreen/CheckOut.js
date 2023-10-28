import React, { useEffect, useState } from 'react'
import { SafeAreaView, Dimensions, StyleSheet,
   Text, View, ImageBackground,  Platform, Image, TouchableOpacity,
    PermissionsAndroid } from 'react-native'
import showToast from '../../components/showToast';
import Geolocation from '@react-native-community/geolocation';
import { verifyQRAction } from '../../Redux/Actions/VerifyQRAction';
import { useDispatch, useSelector } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const CheckOut = () => {
  const dispatch = useDispatch();
//  const { successfullyTxtKey } = route.params;
  const [qrvalue, setQrvalue] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLatitude(info?.coords?.latitude)
      setLongitude(info?.coords?.longitude)
    });
    onOpenScanner();
  }, [latitude, longitude]);

  const handleVerifyQR = async () => {
    const data = {
      qr_code: '09b07f30-27c0-11ee-a737-b342fff6251d64ba784bde9fbf49f6ca9151Shekharcentral1689942121089',
      latitude: latitude,
      longitude: longitude,
    };
    const response = await dispatch(verifyQRAction(data));
    if (response?.status) {
      navigation.navigate('SuccessCheckout', { result: response });
    } else {
     showToast({
        type: 'error',
        text1: response?.message,
      })
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

  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground style={styles.imageBg} source={require('../../assets/images/others/successcanbg.png')}>
      <View style={styles.child}>
        {openScanner ? (
          <View style={{ flex: 1 }}>
        <QRCodeScanner
         onRead={event =>
          onBarcodeScan(event.nativeEvent.codeStringValue)
        }
         reactivate={true}
         reactivateTimeout={500}
         showMarker={true}
         
         />
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
              style={styles.socialnetworkheading}>Loading...</Text>
          </View>
        )}
    
      </View>
    </ImageBackground>
    </SafeAreaView>
  )
}

export default CheckOut

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

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
  socialnetworkheading: {
    fontFamily: "Montserrat-Regular",
  },
})