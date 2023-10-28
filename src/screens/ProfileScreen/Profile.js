import {
  StyleSheet, Text, StatusBar, View,
  SafeAreaView, KeyboardAvoidingView, Modal, ActivityIndicator, ImageBackground, Image, Dimensions, TouchableOpacity, TextInput, ScrollView
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        backgroundColor="black"
      />
      {/* <KeyboardAvoidingView
        style={styles.keyboardavoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'null'}>
        <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.containerprofile}>
            <CircularProgress
              //initialValue={10}
              value={100}
              radius={75}
              inActiveStrokeOpacity={0.1}
              activeStrokeWidth={10}
              inActiveStrokeWidth={10}
              activeStrokeColor={"orange"}
              progressValueColor={'#737373'}
              progressValueStyle={styles.progressVal}
              maxValue={100}
              valuePrefix={'Profile '}
              valuePrefixStyle={styles.valPrefix}
              valueSuffix={'%'}
              valueSuffixStyle={styles.valSuffix}
              title={'complete'}
              titleStyle={styles.titleStyle}
            />
            <TouchableOpacity style={styles.imageStyle} 
            // onPress={() => selectImage()}
            >
              <Image source={ require('../../assets/images/others/dummypic.png')} style={styles.imagePic} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView> */}
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardavoid: {
    flex: 1,
    backgroundColor:"white",
    flexGrow: 1,
  },
  containerprofile: {
    marginTop: '10%',
    marginBottom: '-10%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  progressVal: {
    fontSize: 19,
    //fontFamily: FONTS.MONTSERRAT_REGULAR,
    top: '85%',
    right: '130%',
  },
  imageStyle: {
    flex: 1,
    height: 120,
    width: 120,
    alignItems: 'center',
    borderRadius: 70,
    bottom: '50%',
  },
  imagePic: {
    height: 120,
    width: 120,
    borderRadius: 70,
  },
  valPrefix: {
    color: '#737373',
    fontSize: 19,
    //fontFamily: FONTS.MONTSERRAT_REGULAR,
    top: '85%',
    right: '130%',
  },
  valSuffix: {
    color: '#737373',
    fontSize: 19,
    //fontFamily: FONTS.MONTSERRAT_REGULAR,
    top: '85%',
    right: '130%',
  },
  titleStyle: {
    fontSize: 19,
    color:'#737373',
    //fontFamily: FONTS.MONTSERRAT_REGULAR,
    top: '64%',
    marginLeft: "12%",
  },
})