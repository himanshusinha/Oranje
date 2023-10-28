import {
  StyleSheet, Text, View,
Image, Dimensions, TouchableOpacity,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const DrawerItem = ({ navigation }) => {

    const dispatch = useDispatch();
    const logOutFunc = async () => {
      AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    };

  return (
    <View style={styles.modalView}>
    <View style={{ flex: 1 }}>
        <View style={styles.modalprofileview}>
            <TouchableOpacity 
            // onPress={()=>{setModalVisible(false)}}
            onPress={() => {
              navigation.navigate('Profile');
              navigation.closeDrawer();
          }}
                style={styles.dummyDpContainer}>
                <Image
                    source={require('../assets/images/others/dummypic.png')}
                    style={styles.dummyDp} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.idtxt}> ID                      </Text>
            </View>
        </View>
        <View style={styles.sidemenuview}>
            <TouchableOpacity  
            
            onPress={() => {
              navigation.navigate('Profile');
              navigation.closeDrawer();
          }}
              style={[
                styles.homeview,
                // activeTab === 'Home' ? { backgroundColor: '#fff6ef' } : {}, // Apply orange background if active
              ]}>
             
                    <Image style={styles.homeimg}
                        source={require('../assets/images/icons/sidehome.png')} />
                    <Text style={styles.hometxt}>Home</Text>
               
            </TouchableOpacity>

            <TouchableOpacity 
             onPress={() => {
              navigation.navigate('Profile');
              navigation.closeDrawer();
          }}
            style={[
                styles.homeview,
                // activeTab === 'WorkPoints' ? { backgroundColor: '#fff6ef' } : {}, // Apply orange background if active
              ]}>
                    <Image style={styles.loactionimg}
                        source={require('../assets/images/icons/sideloaction2.png')} />
                    <Text style={[styles.hometxt, { marginLeft: "7%" }]}>Your works points</Text> 
            </TouchableOpacity>

            <TouchableOpacity 
             onPress={() => {
              navigation.navigate('Profile');
              navigation.closeDrawer();
          }}
                style={[
                    styles.homeview,
                    // activeTab === 'FormReports' ? { backgroundColor: '#fff6ef' } : {}, // Apply orange background if active
                  ]}>
                    <Image style={styles.fromreportimg}
                        source={require('../assets/images/icons/sidefromreport.png')} />
                    <Text style={[styles.hometxt, { marginLeft: "6%" }]}>Forms/Reports</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => {
              navigation.navigate('Profile');
              navigation.closeDrawer();
          }}
            style={[
                styles.homeview,
                // activeTab === 'Dashboard' ? { backgroundColor: '#fff6ef' } : {}, // Apply orange background if active
              ]} >
               
                    <Image style={styles.dashbordimg}
                        source={require('../assets/images/icons/sidedashbord.png')} />
                    <Text style={[styles.hometxt, { marginLeft: "7%" }]}>Dashboard</Text>
            
            </TouchableOpacity>

            <TouchableOpacity 
               onPress={() => {
                navigation.navigate('Profile');
                navigation.closeDrawer();
            }}
            style={[
                styles.homeview,
                // activeTab === 'Chatbot' ? { backgroundColor: '#fff6ef' } : {}, // Apply orange background if active
              ]}>
                    <Image style={styles.chatbotimg}
                        source={require('../assets/images/icons/sidechat.png')} />
                    <Text style={[styles.hometxt, { marginLeft: "7%" }]}>Chatbot</Text>
            </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end',
         marginBottom: "1%" }}>
            <TouchableOpacity 
             onPress={() => {
              navigation.navigate('Profile');
              navigation.closeDrawer();
          }}>
                <View style={[styles.homeview, {}]}>
                    <Text style={[styles.hometxt, {}]}>Translate</Text>
                    <Image style={styles.translateimg}
                        source={require('../assets/images/icons/sidetranslate.png')} />
                </View>
            </TouchableOpacity>

            <View style={styles.lineview} />
            <TouchableOpacity   onPress={() => logOutFunc()}
            // onPress={()=>{  navigation.navigate('Exit')
            //     setModalVisible(false)}}
                >
                <View style={[styles.homeview, {}]}>

                    <Text style={[styles.hometxt, {}]}>Exit</Text>
                    <Image style={styles.exitimg}
                        source={require('../assets/images/icons/sideexit.png')} />
                </View>
            </TouchableOpacity>

        </View>
    </View>
</View>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({
  dummyDp: {
    width: 60,
    height: 60,
    borderRadius: 30,
},
dummyDpContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 60,
    height: 60,
},
  modalView: {
    flex: 1,
    // height: "100%",
    // width: "100%",
    // borderBottomRightRadius: 40,
    // borderTopRightRadius: 40,
    // backgroundColor: "white",
    // justifyContent: 'center',
    // elevation: 20
},
modalprofileview: {
    marginTop: "10%",
    marginHorizontal: '7%',
    alignItems: 'center',
    flexDirection: 'row'
},
textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: "7%",
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
},
idtxt: {
    fontSize: 22,
    fontFamily: "Montserrat-Regular",
    margin: 6
},
sidemenuview: {
    marginTop: "9%",
    marginHorizontal: '-1%'
},
homeview: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    marginLeft: "4%",
    height:48,
    width:"90%",
    paddingLeft:20,
    borderRadius:10
},
homeimg: {
    height: 28,
    width: 28,
    marginLeft: "-1%"
},
hometxt: {
    fontSize: 21,
    marginLeft: "6%",
    fontFamily: "Montserrat-Regular",
    color: "gray"
},
loactionimg: {
    height: 30,
    width: 23
},
fromreportimg: {
    height: 28,
    width: 28
},
dashbordimg: {
    height: 26,
    width: 26
},
chatbotimg: {
    height: 28,
    width: 28
},
exitimg: {
    height: 28,
    width: 22,
    marginLeft: "6%"
},
translateimg: {
    height: 28,
    width: 28,
    marginLeft: "6%"
},
lineview: {
    height: 2,
    width: "80%",
    backgroundColor: "orange",
    marginLeft: "8%"
}
})