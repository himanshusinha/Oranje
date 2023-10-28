import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {StretchOutY} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const [showActivityIndicator, setShowActivityIndicator] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [isCheckInVisible, setIsCheckInVisible] = useState(true);
  const [isCheckOutVisible, setIsCheckOutVisible] = useState(true);

  // const handleCheckInPress = () => {
  //     setIsCheckInVisible(false);
  //     navigation.navigate('CheckIn');
  //   };

  //   const handleCheckOutPress = () => {
  //     setIsCheckOutVisible(false);
  //     navigation.navigate('CheckOut');
  //   };
  const VERIFYQRRes = useSelector(state => state?.verifyQRReducer?.VERIFYQR);
  console.log('VERIFYQRRes', VERIFYQRRes);

  const handleToggleCheck = () => {
    if (VERIFYQRRes && VERIFYQRRes.status === false) {
      // Show 'Check-in' when status is false
      navigation.navigate('CheckIn', {
        successfullyTxtKey: 'Check-in',
      });
    } else {
      // Toggle isCheckedIn state and update the button text accordingly
      setIsCheckedIn(!isCheckedIn);
      navigation.navigate('CheckIn', {
        successfullyTxtKey: isCheckedIn ? 'Check-out' : 'Check-in',
      });
    }
  };

  useEffect(() => {
    // Set a timeout to hide the ActivityIndicator after 1 seconds
    const timeout = setTimeout(() => {
      setShowActivityIndicator(false);
    }, 1000);
    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const FirstContainer = () => {
    return (
      <View style={styles.seondcontainer}>
        <TouchableOpacity>
          <View style={styles.workpointview}>
            <Image
              style={styles.workpointimg}
              source={require('../../assets/images/others/dashboardsecondoption.png')}
            />
            <View style={styles.imgtxtview}>
              <Text style={styles.imageText}>Your works</Text>
              <Text style={styles.imageText1}>Sites</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.workpointview}>
            <Image
              style={styles.workpointimg}
              source={require('../../assets/images/others/dashboardfirstoption.png')}
            />
            <View style={styles.imgtxtview}>
              <Text style={styles.imageText}>Your hours</Text>
              <Text style={styles.imageText1}>Worked</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{marginBottom: '22%'}} />
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        {showActivityIndicator ? (
          <ActivityIndicator
            size="large"
            color="#FF8000"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          />
        ) : (
          <ImageBackground
            style={{height: '100%', width: '100%'}}
            source={require('../../assets/images/others/dashboardbg.png')}>
            <View
              style={{
                backgroundColor: 'rgba(255, 119, 0, 0.6)',
                flex: 1,
              }}>
              <View style={styles.firstcontainer}>
                <TouchableOpacity
                  style={styles.dummyDpContainer}
                  onPress={() => navigation.toggleDrawer()}
                  // onPress={toggleModal}

                  // onPress={() => navigation.navigate('MyDrawer')}
                >
                  <Image
                    source={require('../../assets/images/others/dummypic.png')}
                    style={styles.dummyDp}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleToggleCheck}>
                                    <Text style={styles.checkintxt}>
                                        {isCheckedIn ? 'Check-out' : 'Check-in'}
                                    </Text>
                                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CheckIn');
                  }}>
                  <Text style={styles.checkintxt}>Check-in</Text>
                </TouchableOpacity>
                {/* <View style={styles.checkContainer}>
                                    {isCheckInVisible ? (
                                       <TouchableOpacity onPress={handleCheckInPress}>
                                       <Text style={styles.checkintxt}>Check-in</Text>
                                   </TouchableOpacity>
                                    ) : (
                                    <TouchableOpacity onPress={handleCheckOutPress}>
                                            <Text style={styles.checkintxt}>Check-out</Text>
                                    </TouchableOpacity>
                                    )}
                                </View> */}
              </View>
              <View style={styles.willfindview}>
                <Text style={styles.willfindtxt}>Here you will find</Text>
                <Text style={styles.willfindtxt}>everything</Text>
              </View>

              {FirstContainer()}
            </View>
          </ImageBackground>
        )}
      </ScrollView>
      <Modal
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <View style={{flex: 1}}>
            <View style={styles.modalprofileview}>
              <TouchableOpacity
                // onPress={()=>{setModalVisible(false)}}
                onPress={() => {
                  navigation.navigate('Profile');
                  setModalVisible(false);
                }}
                style={styles.dummyDpContainer}>
                <Image
                  source={require('../../assets/images/others/dummypic.png')}
                  style={styles.dummyDp}
                />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.idtxt}> ID </Text>
              </View>
            </View>
            <View style={styles.sidemenuview}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home');
                  setModalVisible(false);
                  setActiveTab('Home'); // Set the active tab to 'Home'
                }}
                style={[
                  styles.homeview,
                  activeTab === 'Home' ? {backgroundColor: '#fff6ef'} : {}, // Apply orange background if active
                ]}>
                <Image
                  style={styles.homeimg}
                  source={require('../../assets/images/icons/sidehome.png')}
                />
                <Text style={styles.hometxt}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('WorkPoints');
                  setModalVisible(false);
                  setActiveTab('WorkPoints');
                }}
                style={[
                  styles.homeview,
                  activeTab === 'WorkPoints'
                    ? {backgroundColor: '#fff6ef'}
                    : {}, // Apply orange background if active
                ]}>
                <Image
                  style={styles.loactionimg}
                  source={require('../../assets/images/icons/sideloaction2.png')}
                />
                <Text style={[styles.hometxt, {marginLeft: '7%'}]}>
                  Your works points
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('FormReports');
                  setActiveTab('FormReports');
                  setModalVisible(false);
                }}
                style={[
                  styles.homeview,
                  activeTab === 'FormReports'
                    ? {backgroundColor: '#fff6ef'}
                    : {}, // Apply orange background if active
                ]}>
                <Image
                  style={styles.fromreportimg}
                  source={require('../../assets/images/icons/sidefromreport.png')}
                />
                <Text style={[styles.hometxt, {marginLeft: '6%'}]}>
                  Forms/Reports
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Dashboard');
                  setModalVisible(false);
                  setActiveTab('Dashboard');
                }}
                style={[
                  styles.homeview,
                  activeTab === 'Dashboard' ? {backgroundColor: '#fff6ef'} : {}, // Apply orange background if active
                ]}>
                <Image
                  style={styles.dashbordimg}
                  source={require('../../assets/images/icons/sidedashbord.png')}
                />
                <Text style={[styles.hometxt, {marginLeft: '7%'}]}>
                  Dashboard
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chatbot');
                  setModalVisible(false);
                  setActiveTab('Chatbot');
                }}
                style={[
                  styles.homeview,
                  activeTab === 'Chatbot' ? {backgroundColor: '#fff6ef'} : {}, // Apply orange background if active
                ]}>
                <Image
                  style={styles.chatbotimg}
                  source={require('../../assets/images/icons/sidechat.png')}
                />
                <Text style={[styles.hometxt, {marginLeft: '7%'}]}>
                  Chatbot
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginBottom: '1%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Translate');
                  setModalVisible(false);
                }}>
                <View style={[styles.homeview, {}]}>
                  <Text style={[styles.hometxt, {}]}>Translate</Text>
                  <Image
                    style={styles.translateimg}
                    source={require('../../assets/images/icons/sidetranslate.png')}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.lineview} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Exit');
                  setModalVisible(false);
                }}>
                <View style={[styles.homeview, {}]}>
                  <Text style={[styles.hometxt, {}]}>Exit</Text>
                  <Image
                    style={styles.exitimg}
                    source={require('../../assets/images/icons/sideexit.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  firstcontainer: {
    flexDirection: 'row',
    marginTop: '10%',
    marginHorizontal: '7%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dummyDp: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  dummyDpContainer: {
    backgroundColor: 'white',
    borderRadius: 100,
    width: 60,
    height: 60,
  },
  checkintxt: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
    // fontWeight:'600',
    fontFamily: 'Montserrat-SemiBold',
  },
  willfindview: {
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  willfindtxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: 'white',
  },
  seondcontainer: {
    height: '100%',
    width: '100%',
    marginTop: '8%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  workpointview: {
    marginTop: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workpointimg: {
    height: 210,
    width: '92%',
    resizeMode: 'stretch',

    // height: HEIGHT/3.80,
    // width: WIDTH/1.10,
  },
  imgtxtview: {
    position: 'absolute',
    bottom: '12%',
    // left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    right: '12%',
  },
  imageText: {
    color: 'white',
    fontSize: 31,
    fontFamily: 'Montserrat-Regular',
  },
  imageText1: {
    color: 'white',
    fontSize: 30,
    // fontWeight:'600',
    fontFamily: 'Montserrat-Bold',
  },
  centeredView: {
    flex: 1,
    // backgroundColor: "#163300"
    // justifyContent: 'center',
  },
  modalView: {
    flex: 1,
    height: '100%',
    width: '93%',
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 20,
  },
  modalprofileview: {
    marginTop: '10%',
    marginHorizontal: '7%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '7%',
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
  },
  idtxt: {
    fontSize: 22,
    fontFamily: 'Montserrat-Regular',
    margin: 6,
  },
  sidemenuview: {
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  homeview: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    marginLeft: '4%',
    height: 48,
    width: '90%',
    paddingLeft: 20,
    borderRadius: 10,
  },
  homeimg: {
    height: 28,
    width: 28,
    marginLeft: '-1%',
  },
  hometxt: {
    fontSize: 21,
    marginLeft: '6%',
    fontFamily: 'Montserrat-Regular',
    color: 'gray',
  },
  loactionimg: {
    height: 30,
    width: 23,
  },
  fromreportimg: {
    height: 28,
    width: 28,
  },
  dashbordimg: {
    height: 26,
    width: 26,
  },
  chatbotimg: {
    height: 28,
    width: 28,
  },
  exitimg: {
    height: 28,
    width: 22,
    marginLeft: '6%',
  },
  translateimg: {
    height: 28,
    width: 28,
    marginLeft: '6%',
  },
  lineview: {
    height: 2,
    width: '80%',
    backgroundColor: 'orange',
    marginLeft: '8%',
  },
});
