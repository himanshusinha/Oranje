import { SafeAreaView, StyleSheet,Dimensions, Image, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SuccessCheckIn = ({ navigation, route }) => {
  // const { result } = route.params;
  const dispatch = useDispatch();
  const VERIFYQRRes = useSelector(state => state?.verifyQRReducer?.VERIFYQR);
  // console.log('VERIFYQRRes', VERIFYQRRes.data.date)

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ height: '85%', width: '100%' }}
        source={require('../../assets/images/others/successcanbg.png')}>
        <View
          style={{
            backgroundColor: 'rgba(255, 119, 0, 0.6)',
            height: '85%',
          }}>
          <View style={styles.successfullytxtview}>
            <Text style={styles.successfullytxt}>You are</Text>
            <Text style={styles.successfullytxt}>{VERIFYQRRes.message}</Text>
          </View>
          <View style={{
            marginTop: HEIGHT / 10,
            alignItems: 'center',
            justifyContent:'center'
          }}>
            {/* <Text style={styles.addresstxt} >Shekhar central</Text> */}
            <Text style={styles.addresstxt1}>{'Address: ' + VERIFYQRRes.data.location}</Text>
          </View>
          <View style={{
            flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center',
          }}>
            <Text style={styles.datetxt}>date:{VERIFYQRRes.data.date}</Text>
            <Text style={styles.datetxt}>{'Time: '+ VERIFYQRRes.data.time}</Text>
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

        <View style={{
          justifyContent: 'center',
          alignItems: 'center', marginTop: "8%", marginBottom: 20
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('MyDrawer', {
            screen: 'Home'
          })}
            style={styles.btnview}>
            <Text style={styles.btntxt}>After</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SuccessCheckIn

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
    fontFamily: "Montserrat-SemiBold"
  },
  tickimg: {
    height: 60,
    width: 60,
    marginTop: '15%',
    resizeMode: 'contain'
  },
  addresstxt: {
    fontSize: 16,
    color: 'white',
    fontFamily: "Montserrat-SemiBold"
  },
  addresstxt1: {
    fontSize: 14,
    color: 'white',
    fontFamily: "Montserrat-Regular",
    marginTop: 5,
    textAlign:'center'
  },
  datetxt: {
    fontSize: 12,
    color: 'white',
    fontFamily: "Montserrat-SemiBold",
    marginHorizontal: 40
  },


  Alwaysscantxt: {
    fontSize: 14,
    color: 'gray',
    fontFamily: "Montserrat-Regular",

  },
  btnview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8001',
    height: 40,
    width: WIDTH / 1.50,
    elevation: 5,
    borderRadius: 10
  },
  btntxt: {
    fontSize: 18,
    color: 'white',
    fontFamily: "Montserrat-Bold",
  },
  socialnetworkheading: {
    fontFamily: "Montserrat-Regular",
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
})