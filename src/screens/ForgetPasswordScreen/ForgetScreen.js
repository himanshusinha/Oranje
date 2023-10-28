import {
    StyleSheet, Text, StatusBar, View,
    SafeAreaView, KeyboardAvoidingView, ActivityIndicator, ImageBackground, Image, Dimensions, TouchableOpacity, TextInput, ScrollView
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { FogetPasswordAction } from '../../Redux/Actions/FogetPasswordAction';
import { useDispatch, useSelector } from 'react-redux';
import showToast from '../../components/showToast';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const ForgetScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [showActivityIndicator, setShowActivityIndicator] = useState(true);
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Set a timeout to hide the ActivityIndicator after 2 seconds
        const timeout = setTimeout(() => {
            setShowActivityIndicator(false);
        }, 1000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }, []);

    const FogetpasswordRes = useSelector(state => state?.FogetPasswordReducer?.FOGETPASSWORD);
    console.log('FogetpasswordRes', FogetpasswordRes)

    useEffect(() => {
        if (FogetpasswordRes.status === true) {
            navigation.navigate('OptScreen',{email});
        } else if (FogetpasswordRes.status === false) {
            // showToast(FogetpasswordRes.message);
        }
    }, [FogetpasswordRes]);


    // const handleAPIRequest = async () => {
    //     const requestBody = {
    //       email: email,
    //     };
      
    //     try {
    //       const response = await dispatch(FogetPasswordAction(requestBody));
      
    //       if (response && response.status === true) {
    //         navigation.navigate('OptScreen', { email });
    //       } else if (response && response.status === false) {
    //         showToast(response.message);
    //       } else {
    //         showToast("An error occurred");
    //       }
    //     } catch (error) {
    //       console.error("Error:", error);
    //       showToast("An error occurred");
    //     }
    //   };

      const handleAPIRequest = async () => {
        const requestBody = {
            email: email,
        }; 
        // console.log("EMAIL SEND",requestBody )
        dispatch(FogetPasswordAction(requestBody));
      };


    const FirstContainer = () => {
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <View style={styles.crosspngview}>
                        <Image style={{ height: 25, width: 25 }}
                            source={require('../../assets/images/icons/orangecrossicon.png')} />
                    </View>
                </TouchableOpacity>


                <View style={styles.frogettxtview}>
                    <Text style={styles.forgetpswtxt}>Forget Password</Text>
                </View>
                <View style={styles.verificationtxtview}>
                    <Text style={styles.verificationtxt}>Enter your email for the verification process,</Text>
                    <Text style={styles.verificationtxt}>we will send 4 digite code to your email.</Text>
                </View>

                <Text style={styles.emailtxt}>E-mail</Text>
                <View style={styles.emailview}>
                    <TextInput
                        style={styles.emailinput}
                        placeholder='Enter email'
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>
        )
    }

    const SecondContainer = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                <TouchableOpacity
                    // onPress={() => { navigation.navigate('OptScreen') }}
                    onPress={handleAPIRequest}
                    style={{
                        height: 56,
                        backgroundColor: '#FF8000',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 333,
                        width: WIDTH / 1.10,
                        alignSelf: 'center',
                        marginBottom: 15,
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: '700'
                        }}>
                        Send OTP
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

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
                        justifyContent: 'center', alignItems: 'center'
                    }}
                />
            ) : (
                <ImageBackground style={{ height: '100%', width: '100%' }}
                    source={require('../../assets/images/bg/loginbg.png')}
                >
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
                                    width: "65%",
                                    resizeMode: 'contain',
                                }}
                                source={require('../../assets/images/icons/apptext.png')}
                            />
                        </View>

                        <View style={styles.secondcontainer}>

                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                {FirstContainer()}
                                {SecondContainer()}
                            </ScrollView>

                        </View>
                    </View>
                </ImageBackground>
            )}
        </SafeAreaView>
    )
}

export default ForgetScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    contentContainer: {
        // flex: 1,
        // padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
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
        alignItems: 'center'
    },
    crosspngview: {
        alignSelf: 'flex-end',
        marginRight: '1%',
        marginTop: '5%'
    },
    frogettxtview: {
        alignItems: 'center',
        marginTop: '4%'
    },
    forgetpswtxt: {
        fontSize: 24,
        // fontWeight: '700',
        color: 'orange',
        fontFamily: 'Montserrat-Bold'
    },
    verificationtxtview: {
        alignSelf: 'center',
        marginTop: '5%',
        marginHorizontal: '2%'
    },
    verificationtxt: {
        color: '#E6A263',
        fontSize: 15,
        // fontWeight: '400',
        textAlign: 'center',
        fontFamily: "Montserrat-Regular",
    },
    emailtxt: {
        marginLeft: "3%",
        fontSize: 16,
        color: '#E6A263',
        fontWeight: '400',
        marginTop: '7%'
    },
    emailview: {
        marginTop: '2%',
        height: 55,
        width: WIDTH / 1.10,
        backgroundColor: 'white',
        // alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E6A263'
    },
    emailinput: {
        alignItems: 'center',
        marginHorizontal: '5%',
        fontSize: 16,
        color: 'black'
    },

})