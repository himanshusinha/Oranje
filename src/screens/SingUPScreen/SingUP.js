import {
  SafeAreaView, StyleSheet, Text, View,
  Image, ImageBackground, TouchableOpacity, Modal, ActivityIndicator, ScrollView, Dimensions
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import CountryPicker from 'react-native-country-picker-modal';
import DocumentPicker from 'react-native-document-picker';
import { SingupAction } from '../../Redux/Actions/SinupAction';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../Redux/Utils/BaseUrl';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import showToast from '../../components/showToast';
import SelectDropdown from 'react-native-select-dropdown';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const workvisa = [
  {
    id: 1,
    title: "Work visa",
  },
]
const passport = [
  {
    id: 1,
    title: "Pass port",
  },
]

const SingUP = ({ navigation }) => {
  const dispatch = useDispatch();

  const [selectedCountrycode, setSelectedCountrycode] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Id, setId] = useState('')
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [crmpassword, setCrmPassword] = useState('');
  const [Surename, setSurename] = useState('')

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("Select file");
  const [isSelectPdfDisabled, setIsSelectPdfDisabled] = useState(true);


  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [selectedpassport, setSelectedpassport] = useState("Select file");
  const [isSelectPdf2Disabled, setIsSelectPdf2Disabled] = useState(true);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryname, setCountryName] = useState();
  const [selectedState, setSelectedState] = useState(null);
  const [statename, setStateName] = useState();
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);



  const countryCode = selectedCountrycode?.callingCode || '91';
  const mergedId = `+${countryCode}${Id}`;

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const onCountrySelect = (country) => {
    setSelectedCountrycode(country);
    setShowPicker(false);
  };
  useEffect(() => {
    {
      CountysApi();
      StateApi()
      CityApi()
    }
  }, [selectedCountry, selectedState, selectedCity])

  const CountysApi = () => {
    axios
      .get(`${API.BaseUrl}/api/colaborador/all-country`)
      .then((response) => {
        const data = response?.data?.all_country; // Updated to response.data
        if (Array.isArray(data)) {
          setCountries(data);
          setFilteredCountry(data);
        } else {
          console.error('API response does not contain an array of countries');
        }
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  };


  const StateApi = () => {
    if (selectedCountry) {
      let id = selectedCountry.id;
      let name = selectedCountry.name;
      setCountryName(name);
      axios
        .get(`${API.BaseUrl}/api/colaborador/all-states?country_id=${id}`)
        .then((response) => {
          const data = response?.data?.all_states;
          if (Array.isArray(data)) {
            setStateData(data);
          } else {
            console.error('API response does not contain an array of states');
          }
        })
        .catch((error) => {
          console.error('Error fetching states:', error);
        });
    } else {
      // Handle the case where selectedCountry is null
      // You can choose to set a default state or display an error message
    }
  };



  const CityApi = () => {
    if (selectedState) {
      let id = selectedState.id;
      let name = selectedState.name;
      setStateName(name);
      // Fetch cities based on the selected state ID
      axios.get(`${API.BaseUrl}/api/colaborador/all-cities?state_id=${id}`)
        .then((response) => {
          const data = response?.data?.all_city;
          if (Array.isArray(data)) { // Make sure the API response key matches
            setCity(data);
            setFilteredCity(data);
            // console.log("Cities response:", response);
          } else {
            console.error('API response does not contain an array of cities');
          }
        })
        .catch((error) => {
          console.error('Error fetching cities:', error);
        });
    } else {
      // Handle the case where selectedState is null
      // You can choose to set a default city or display an error message
    }
  };




  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const handleDropdownSelection = (title) => {
    setSelectedTitle(title);
    setIsDropdownOpen(false);
    if (title === "Work visa") {
      setIsSelectPdfDisabled(false);
    } else {
      setIsSelectPdfDisabled(true);
    } 
  };

  const handleDropdownSelection2 = (title) => {
    setSelectedpassport(title);
    setIsDropdownOpen2(false); 
    if (title === "Pass port") {
      setIsSelectPdf2Disabled(false);
    } else {
      setIsSelectPdf2Disabled(true);
    }
  };

  const [identity_document, setIdentity_document] = useState();

  const selectPdf = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      // console.log('Selected Document URI:', res);
      // console.log('Selected Document Name:', res.name);
      setIdentity_document(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        // Handle other errors
        Alert.alert('Error', 'Could not pick the document. Please try again.');
      }
    }
  };

  const [identity_Passport, setIdentity_Passport] = useState();

  const selectPdf2 = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      // console.log('Selected Document URI:', res);
      // console.log('Selected Document Name:', res.name);
      setIdentity_Passport(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        // Handle other errors
        showToast('Error', 'Could not pick the document. Please try again.');
      }
    }
  };

  const SinupRes = useSelector(state => state?.SinupReducer?.SINGUP);
  console.log('SinupRes', SinupRes)

  // useEffect(() => {
  //   if (SinupRes.status === true) {
  //     navigation.navigate('Login');
  //   } else if (SinupRes.status === false) {
  //     showToast(SinupRes.message);
  //   }
  // }, [SinupRes]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (SinupRes.status === true) {
      dispatch({ type: 'reset_signup' });
      setShowSuccessModal(true); // Show the success modal
    } else if (SinupRes.status === false && formSubmitted) {
      // showToast(SinupRes.message);
    }
  }, [SinupRes, dispatch, formSubmitted]);

  const handleSuccessModalOk = () => {
    setShowSuccessModal(false); // Hide the success modal
    navigation.navigate('Login'); // Navigate to the login screen
  };

  const handleAPIRequest = () => {
    if (
      !countryname ||
      !statename ||
      !selectedCity?.name ||
      !mergedId ||
      !name ||
      !mobileNo ||
      !Surename ||
      !emailPattern.test(email) ||
      !password ||
      !crmpassword ||
      !identity_document ||
      !identity_Passport
    ) {
      showToast('Please fill in all required fields.')
      return;
    }
    if (!emailPattern.test(email)) {
      showToast('Please enter a valid email address.');
      return;
    }
    if (!mobileNo || mobileNo.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number.');
      return;
    }
    setFormSubmitted(true);
    const requestBody = {
      country: countryname,
      state: statename,
      city: selectedCity?.name,
      id: mergedId,
      name: name,
      surname: Surename,
      mail: email,
      password: password,
      repeat_password: crmpassword,
      identity_document: identity_document,
      attach_passport: identity_Passport,
      attach_work_visa: identity_Passport,
      attach_photo: identity_document,
    };
    console.log("req body send data = ", requestBody)
    dispatch(SingupAction(requestBody));
  };

  const handleSearchCountry = (text) => {
    // Filter the country data based on the search text
    const filteredDataCountry = countries.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountry(filteredDataCountry);
  };

  const handleSearchCity = (text) => {
    // Filter the country data based on the search text
    const filteredDataCity = city.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCity(filteredDataCity);
  };

  
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={{ flexGrow: 1, }}
        showsVerticalScrollIndicator={false}>
        <ImageBackground style={styles.backgroundimg}
          source={require('../../assets/images/others/unlockformbackground.png')}>
          <View
            style={{
              backgroundColor: 'rgba(255, 119, 0, 0.6)',
              flex: 1,
            }}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}
              style={{ marginTop: "7%" }}>
              <Image style={styles.backimg}
                source={require('../../assets/images/others/backicon2.png')} />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image style={styles.headingText}
                source={require('../../assets/images/others/signuptext.png')} />
            </View>
          </View>
        </ImageBackground>
        <View style={styles.secondcontainer}>
          <View style={styles.contain}>
            <Text style={styles.countrytxt}>Country</Text>


            <SelectDropdown
              data={filteredCountry}
              search
              searchPlaceHolder='Search...'
              searchPlaceHolderColor={"black"}
              searchInputStyle={styles.searchInput}
              onChangeSearchInputText={handleSearchCountry}
              onSelect={(selectedItem, index) => {
                setSelectedCountry(selectedItem);
              }}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Text style={styles.dropdown3BtnTxt}>
                      {selectedItem ? selectedItem.name : 'Select County'}
                    </Text>
                  </View>
                );
              }}
              renderDropdownIcon={isOpened => {
                return isOpened ? null : (
                  <Image source={require('../../assets/images/others/dropdownicon.png')} style={styles.dropdownimg} />
                );
              }}
              dropdownIconPosition={'right'}
              rowStyle={styles.dropdown3RowStyle}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <Text style={[styles.dropdown3RowTxt]}>{item.name}</Text>
                  </View>
                );
              }}
            />


            <View>
              <Text style={[styles.countrytxt, { marginTop: '5%' }]}>State/Department</Text>
              <SelectDropdown
                data={stateData}
                search
                searchPlaceHolder='Search...'
                searchPlaceHolderColor={"black"}
                searchInputStyle={styles.searchInput}
                onSelect={(selectedItem, index) => {
                  setSelectedState(selectedItem);
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.name : 'Select State'}
                      </Text>
                    </View>
                  );
                }}
                renderDropdownIcon={isOpened => {
                  return isOpened ? null : (
                    <Image source={require('../../assets/images/others/dropdownicon.png')} style={styles.dropdownimg} />
                  );
                }}
                dropdownIconPosition={'right'}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>
                      <Text style={styles.dropdown3RowTxt}>{item.name}</Text>
                    </View>
                  );
                }}
              />
            </View>

            <Text style={[styles.countrytxt, { marginTop: '5%' }]}>City</Text>
            <SelectDropdown
              data={filteredCity}
              search
              searchPlaceHolder='Search...'
              searchPlaceHolderColor={"black"}
              searchInputStyle={styles.searchInput}
              onChangeSearchInputText={handleSearchCity}
              onSelect={(selectedItem, index) => {
                setSelectedCity(selectedItem);
                console.log('Selected City Name:', selectedItem?.name);
                //setCityName(selectedItem.name);
                console.log('CityName:', selectedItem);
              }}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Text style={styles.dropdown3BtnTxt}>
                      {selectedItem ? selectedItem.name : 'Select City'}
                    </Text>
                  </View>
                );
              }}
              renderDropdownIcon={isOpened => {
                return isOpened ? null : (
                  <Image source={require('../../assets/images/others/dropdownicon.png')} style={styles.dropdownimg} />
                );
              }}
              dropdownIconPosition={'right'}
              rowStyle={styles.dropdown3RowStyle}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={styles.dropdown3RowChildStyle}>

                    <Text style={[styles.dropdown3RowTxt]}>{item.name}</Text>
                  </View>
                );
              }}
            />


            {/* <View style={styles.dropdownview}>
              <TouchableOpacity>
                <View style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row', alignItems: 'center',
                  marginHorizontal: 15
                }}>
                  <Text style={styles.ustxt}>Unitad state</Text>
                  <Image style={styles.dropdownimg}
                    source={require('../../assets/images/others/dropdownicon.png')} />
                </View>
              </TouchableOpacity>
            </View> */}

            <Text style={[styles.countrytxt, { marginTop: '5%' }]}>ID</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setShowPicker(true)}
                style={[styles.dropdownview, { width: WIDTH / 3.50, flexDirection: 'row', alignItems: 'center', }]}>

                <CountryPicker
                  onSelect={onCountrySelect}
                  withEmoji={true}
                  withFilter={true}
                  withFlag={true}
                  //   withCountryNameButton={true}
                  withAlphaFilter={true}
                  visible={showPicker}
                  countryCode={selectedCountrycode?.cca2 || 'US'}
                />
                <Text style={{ fontSize: 17, color: '#000', fontWeight: '600', marginLeft: -2, }}>
                  +{selectedCountrycode?.callingCode || '1'}
                </Text>
              </TouchableOpacity>
              <View style={[styles.dropdownview, { width: WIDTH / 1.89, marginLeft: 8 }]}>
                <TextInput
                  placeholder='ID'
                  style={styles.txtinput}
                  value={Id}
                  placeholderTextColor='#8B919E'
                  onChangeText={setId}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>

            <Text style={[styles.countrytxt, { marginTop: '5%' }]}>Name</Text>
            <View style={[styles.dropdownview]}>
              <TextInput
                placeholder='Name'
                style={styles.txtinput}
                value={name}
                placeholderTextColor='#8B919E'
                onChangeText={setName}
              />
            </View>
            <Text style={[styles.countrytxt, { marginTop: '5%' }]}>Surnames</Text>
            <View style={[styles.dropdownview]}>
              <TextInput
                placeholder='Surnames'
                style={styles.txtinput}
                value={Surename}
                placeholderTextColor='#8B919E'
                onChangeText={setSurename}
              />
            </View>
            <Text style={[styles.countrytxt, { marginTop: '5%' }]}>Phone</Text>
            <View style={[styles.dropdownview]}>
              <TextInput
                placeholder='Phone'
                style={styles.txtinput}
                value={mobileNo}
                placeholderTextColor='#8B919E'
                onChangeText={setMobileNo}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <Text style={[styles.countrytxt, { marginTop: '5%' }]}>Mail</Text>
            <View style={[styles.dropdownview]}>
              <TextInput
                placeholder='Mail'
                style={styles.txtinput}
                value={email}
                placeholderTextColor='#8B919E'
                onChangeText={setEmail}
              />
            </View>
            <Text style={[styles.countrytxt, { marginTop: '5%' }]}>Password</Text>
            <View style={[styles.dropdownview]}>
              <TextInput
                placeholder='Password'
                style={styles.txtinput}
                value={password}
                placeholderTextColor='#8B919E'
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            <Text style={[styles.countrytxt, { marginTop: '5%' }]}>Repeat Password</Text>
            <View style={[styles.dropdownview]}>
              <TextInput
                placeholder='Repeat Password'
                style={styles.txtinput}
                placeholderTextColor='#8B919E'
                value={crmpassword}
                onChangeText={setCrmPassword}
                secureTextEntry={true}
              />
            </View>
            <Text style={[styles.countrytxt, {
              marginTop: '5%',
              textAlign: 'center',
            }]}>Attach work visa (pdf, jpg, png)</Text>

            <View style={{ flexDirection: 'row' }}>
              <View>
                <TouchableOpacity
                  style={[styles.dropdownview, { width: WIDTH / 2.50 }]}
                  onPress={toggleDropdown}
                >
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 12,
                    }}
                  >
                    <Text style={[styles.selectfiletxt, selectedTitle === "Select file" ? { color: "gray" } : { color: "black" }]}>
                      {selectedTitle}
                    </Text>
                    <Image
                      style={styles.dropdownimg}
                      source={require('../../assets/images/others/dropdownicon.png')}
                    />
                  </View>
                </TouchableOpacity>

                {isDropdownOpen && (
                  // Render dropdown content when isDropdownOpen is true
                  <View style={styles.dropdownContent}>
                    {workvisa.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleDropdownSelection(item.title)}
                        style={styles.dropdownItem} // Style for each dropdown item
                      >
                        <Text style={styles.dropdownItemText}>{item.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <TouchableOpacity 
              onPress={selectPdf} 
              disabled={isSelectPdfDisabled}
                style={[styles.dropdownview, { width: WIDTH / 2.50, marginLeft: 15 }]}>
                <Text style={[styles.nameinput, { color: 'gray', textAlign: 'center' }]}>
                  {identity_document?.name ? identity_document.name.slice(-15) : "Attech"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.countrytxt, {
              marginTop: '5%',
              textAlign: 'center',
            }]}>Attach passport (pdf, jpg, png)</Text>

            <View style={{ flexDirection: 'row' }}>
              <View>
                <TouchableOpacity
                  style={[styles.dropdownview, { width: WIDTH / 2.50 }]}
                  onPress={toggleDropdown2}
                >
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 12,
                    }}
                  >
                    <Text style={[styles.selectfiletxt, selectedpassport === "Select file" ? { color: "gray" } : { color: "black" }]}>
                      {selectedpassport}
                    </Text>
                    <Image
                      style={styles.dropdownimg}
                      source={require('../../assets/images/others/dropdownicon.png')}
                    />
                  </View>
                </TouchableOpacity>

                {isDropdownOpen2 && (
                  // Render dropdown content when isDropdownOpen is true
                  <View style={styles.dropdownContent}>
                    {passport.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleDropdownSelection2(item.title)}
                        style={styles.dropdownItem}
                      >
                        <Text style={styles.dropdownItemText}>{item.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>


              <TouchableOpacity 
                onPress={selectPdf2}
                disabled={isSelectPdf2Disabled}
                style={[styles.dropdownview, { width: WIDTH / 2.50, marginLeft: 15 }]}>
                <Text style={[styles.nameinput, { color: 'gray', textAlign: 'center' }]}>
                  {identity_Passport?.name ? identity_Passport.name.slice(-15) : "Attech"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: "10%", flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.condtiontxt}>Accept </Text>
              <TouchableOpacity>
                <Text style={[styles.condtiontxt, { color: "orange", fontFamily: "Montserrat-Bold", }]}>terms and conditions</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleAPIRequest} style={styles.btnview}>
              <Text style={styles.btntxt}>To register</Text>
            </TouchableOpacity>

            <View style={{ marginTop: "5%", marginBottom: 20, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.condtiontxt}>Do you already have an account?  </Text>
              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Text style={[styles.condtiontxt, { color: "orange", fontFamily: "Montserrat-Bold", }]}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal transparent={true} visible={showSuccessModal}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
            <View style={{
              backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
              padding: 20, height: 150, width: WIDTH / 1.70,
              borderRadius: 10
            }}>
              <Text style={styles.moadaltxt}>Your signup was successful!</Text>
              <TouchableOpacity style={{ height: 40, width: WIDTH / 2.40, marginTop: "12%", justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', borderRadius: 8 }} onPress={handleSuccessModalOk}>
                <Text style={{ color: 'white', fontSize: 18 }}>ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>

    </SafeAreaView>
  )
}

export default SingUP

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  backgroundimg: {
    height: 180,
    width: '100%',
  },
  backimg: {
    height: 20,
    width: 12,
    marginHorizontal: 30,
  },
  headingText: {
    height: 30,
    width: 100,
    alignSelf: 'center',
    marginTop: 40,
  },
  secondcontainer: {
    marginTop: '-5%',
    // height: 1500,
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white',
    // resizeMode:'contain',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  contain: {
    marginTop: '8%',
    marginHorizontal: WIDTH / 13
  },
  countrytxt: {
    color: '#737373',
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
  },
  dropdownview: {
    height: 45,
    width: WIDTH / 1.20,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 10,
    borderRadius: 10,
    // alignItems:'center',
    justifyContent: 'center'
  },
  dropdownimg: {
    height: 10,
    width: 11,
    marginRight: 8
  },
  txtinput: {
    color: 'black',
    fontSize: 16,
    marginHorizontal: 10,
    width: "90%"
  },
  ustxt: {
    color: 'black',
    fontSize: 16,
  },
  selectfiletxt: {
    color: "gray",
    fontSize: 16,
  },
  dropdownContent: {
    backgroundColor: 'white',
    marginTop: 2,
    borderRadius: 12,
    elevation: 3,
    // Additional styles for the dropdown container
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    // Additional styles for each dropdown item
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'black',
  },
  nameinput: {
    fontSize: 14,
  },
  condtiontxt: {
    color: 'gray',
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
  },
  btnview: {
    height: 50,
    width: WIDTH / 1.20,
    backgroundColor: '#FF8000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: '5%'
  },
  btntxt: {
    color: 'white',
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
  },
  // dropdownArea:{
  //   height:300,
  //   width:WIDTH/1.20,
  //   borderRadius:10,
  //   marginTop:20,
  //   backgroundColor:"white",
  //   elevation:5,
  //   alignSelf:'center'
  // },
  searchInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 0,
  },
  dropdown3BtnStyle: {
    height: 45,
    width: WIDTH / 1.20,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 10,
    borderRadius: 10,
    // alignItems:'center',
    justifyContent: 'center'
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal: -5,
    borderRadius: 10,
    marginHorizontal: 10
  },
  dropdown3BtnTxt: {
    color: "black",
    textAlign: 'center',
    //fontWeight: '600',
    fontFamily: "Montserrat-Regular",
    //marginHorizontal: 7,
  },
  dropdown3RowStyle: {
    //backgroundColor: 'rgba(178, 37, 204, 0.05)',
    borderBottomColor: "white",
    height: 50,
    borderRadius: 10,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(178, 37, 204, 0.02)',
  },
  dropdown3RowTxt: {
    color: "black",
    textAlign: 'center',
    fontFamily: "Montserrat-Regular",
    //fontWeight: '600',
  },
  moadaltxt: {
    fontSize: 14,
    color: "black",
    fontFamily: "Montserrat-Regular",
    textAlign: 'center'
  }
})