import React, {useState, useEffect, useRef, createContext} from 'react';
import {Alert, Platform} from 'react-native';
import {PermissionsIOS, PermissionsAndroid} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Svg, {Circle, Path, Line, Image, G} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const saveData = async () => {
  try {
    const jsonData = JSON.stringify(scannedDataArray);
    await AsyncStorage.setItem('@scannedData', jsonData);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'The app needs access to your camera to scan QR codes.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
const QRCodeScanner = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [scannedDataArray, setScannedDataArray] = useState([]);
  const [lastScannedTime, setLastScannedTime] = useState(0);
  const cameraRef = useRef(null);
  LogBox.ignoreAllLogs();

  useEffect(() => {
    (async () => {
      const granted = await requestCameraPermission();
      setHasPermission(granted);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(
        'scannedDataArray',
        JSON.stringify(scannedDataArray),
      );
    })();
  }, [scannedDataArray]); // Save to AsyncStorage whenever scannedDataArray changes

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const barcodeRecognized = barcode => {
    const currentTime = Date.now();
    if (currentTime - lastScannedTime >= 300) {
      setLastScannedTime(currentTime);
      const newDataArray = [...scannedDataArray];
      newDataArray.push(barcode.data);
      console.log(barcode.data);
      setScannedDataArray(newDataArray);
      if (
        barcode.data === 'c3N0aW5jbWFkZXRoaXN3' ||
        barcode.data === 'aWxvdmVhcnRo' ||
        barcode.data === 'am9pbnNzdGluYw=='
      ) {
        navigation.navigate('Stamps');
        Alert.alert(
          'Correct value scanned!' + '\n' + '\n' + 'Value: ' + barcode.data,
        );
      }
    }
  };

  return (
    <View>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.imageBackground}>
        <SafeAreaView style={{flex: 1, marginTop: '2%'}}>
          <View style={{height: 50}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Stamps')}
              style={{marginLeft: 20}}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="30"
                viewBox="0 0 26 20"
                fill="none">
                <Path
                  d="M26.0001 19C26.0001 19.2652 25.8947 19.5196 25.7072 19.7071C25.5196 19.8947 25.2653 20 25.0001 20C24.7348 20 24.4805 19.8947 24.2929 19.7071C24.1054 19.5196 24.0001 19.2652 24.0001 19C23.9967 16.0836 22.8368 13.2877 20.7746 11.2255C18.7124 9.1633 15.9164 8.00331 13.0001 8.00001H3.4138L7.70755 12.2925C7.8952 12.4801 8.00061 12.7346 8.00061 13C8.00061 13.2654 7.8952 13.5199 7.70755 13.7075C7.51991 13.8951 7.26542 14.0006 7.00005 14.0006C6.73469 14.0006 6.48019 13.8951 6.29255 13.7075L0.292554 7.70751C0.199578 7.61463 0.125819 7.50434 0.0754943 7.38295C0.02517 7.26155 -0.000732422 7.13142 -0.000732422 7.00001C-0.000732422 6.86859 0.02517 6.73846 0.0754943 6.61707C0.125819 6.49567 0.199578 6.38538 0.292554 6.29251L6.29255 0.292507C6.48019 0.104866 6.73469 -0.000549318 7.00005 -0.000549316C7.26542 -0.000549314 7.51991 0.104866 7.70755 0.292507C7.8952 0.480147 8.00061 0.734643 8.00061 1.00001C8.00061 1.26537 7.8952 1.51987 7.70755 1.70751L3.4138 6.00001H13.0001C16.4468 6.00365 19.7512 7.37445 22.1884 9.81164C24.6256 12.2488 25.9964 15.5533 26.0001 19Z"
                  fill="black"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
              width: '100%',
            }}
            onBarCodeRead={barcodeRecognized}
            captureAudio={false}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const Stamps = ({navigation}) => {
  const [stamp1, setStamp1] = useState(false);
  const [stamp2, setStamp2] = useState(false);
  const [stamp3, setStamp3] = useState(false);
  const [scannedDataArray, setScannedDataArray] = useState([]); // Add this line

  useEffect(() => {
    (async () => {
      const storedScannedDataArray = await AsyncStorage.getItem(
        'scannedDataArray',
      );
      const parsedArray = storedScannedDataArray
        ? JSON.parse(storedScannedDataArray)
        : [];
      setScannedDataArray(parsedArray); // Add this line
      if (scannedDataArray.includes('c3N0aW5jbWFkZXRoaXN3')) {
        setStamp1(true);
      }
      if (scannedDataArray.includes('aWxvdmVhcnRo')) {
        setStamp2(true);
      }
      if (scannedDataArray.includes('am9pbnNzdGluYw==')) {
        setStamp3(true);
      }
    })();
  }, [scannedDataArray]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.imageBackground}>
        <ScrollView>
          <SafeAreaView>
            <View style={{marginTop: '5%'}} />
            <View style={styles.topSidebar}>
              <Text style={styles.header}>Stamps</Text>
              <TouchableOpacity
                style={styles.hamburgerIconPress}
                onPress={() => navigation.openDrawer()}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  style={{marginTop: '28%'}}>
                  <Path
                    d="M42.5 24.25C42.5 24.8467 42.2629 25.419 41.841 25.841C41.419 26.2629 40.8467 26.5 40.25 26.5H7.25C6.65326 26.5 6.08097 26.2629 5.65901 25.841C5.23705 25.419 5 24.8467 5 24.25C5 23.6533 5.23705 23.081 5.65901 22.659C6.08097 22.2371 6.65326 22 7.25 22H40.25C40.8467 22 41.419 22.2371 41.841 22.659C42.2629 23.081 42.5 23.6533 42.5 24.25ZM7.25 14.5H40.25C40.8467 14.5 41.419 14.2629 41.841 13.841C42.2629 13.419 42.5 12.8467 42.5 12.25C42.5 11.6533 42.2629 11.081 41.841 10.659C41.419 10.2371 40.8467 10 40.25 10H7.25C6.65326 10 6.08097 10.2371 5.65901 10.659C5.23705 11.081 5 11.6533 5 12.25C5 12.8467 5.23705 13.419 5.65901 13.841C6.08097 14.2629 6.65326 14.5 7.25 14.5ZM40.25 34H7.25C6.65326 34 6.08097 34.2371 5.65901 34.659C5.23705 35.081 5 35.6533 5 36.25C5 36.8467 5.23705 37.419 5.65901 37.841C6.08097 38.2629 6.65326 38.5 7.25 38.5H40.25C40.8467 38.5 41.419 38.2629 41.841 37.841C42.2629 37.419 42.5 36.8467 42.5 36.25C42.5 35.6533 42.2629 35.081 41.841 34.659C41.419 34.2371 40.8467 34 40.25 34Z"
                    fill="#1C1C12"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            <Text style={styles.boxHeader}>Your Stamps</Text>
            <View style={{marginTop: '5%'}} />
            <View>
              <View style={styles.box}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '65%',
                    marginRight: '10%',
                  }}>
                  <Text style={styles.stampHeader}>Academic booth</Text>
                  <Text style={styles.stampBody}>
                    {stamp1 ? 'Stamp unlocked!' : 'Stamp locked!'}
                  </Text>
                </View>
                <View>
                  {stamp1 ? (
                    <Svg
                      fill="#ffffff"
                      height="48px"
                      width="48px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 330 330">
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"></G>
                      <G id="SVGRepo_iconCarrier">
                        <G id="XMLID_516_">
                          <Path
                            id="XMLID_517_"
                            d="M15,160c8.284,0,15-6.716,15-15V85c0-30.327,24.673-55,55-55c30.327,0,55,24.673,55,55v45h-25 c-8.284,0-15,6.716-15,15v170c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15H170V85 c0-46.869-38.131-85-85-85S0,38.131,0,85v60C0,153.284,6.716,160,15,160z"></Path>
                        </G>
                      </G>
                    </Svg>
                  ) : (
                    <Svg
                      fill="#ffffff"
                      height="48px"
                      width="48px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 330 330">
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"></G>
                      <G id="SVGRepo_iconCarrier">
                        <G id="XMLID_504_">
                          <Path
                            id="XMLID_505_"
                            d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M207.481,219.356l-42.5,42.5 c-2.929,2.929-6.768,4.394-10.606,4.394s-7.678-1.465-10.606-4.394l-21.25-21.25c-5.858-5.858-5.858-15.354,0-21.213 c5.857-5.858,15.355-5.858,21.213,0l10.644,10.643l31.894-31.893c5.857-5.858,15.355-5.858,21.213,0 C213.34,204.002,213.34,213.498,207.481,219.356z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></Path>
                        </G>
                      </G>
                    </Svg>
                  )}
                </View>
              </View>
              <View style={styles.box}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '65%',
                    marginRight: '10%',
                  }}>
                  <Text style={styles.stampHeader}>Panel discussions</Text>
                  <Text style={styles.stampBody}>
                    {stamp2 ? 'Stamp unlocked!' : 'Stamp locked!'}
                  </Text>
                </View>
                <View>
                  {stamp2 ? (
                    <Svg
                      fill="#ffffff"
                      height="48px"
                      width="48px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 330 330">
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"></G>
                      <G id="SVGRepo_iconCarrier">
                        <G id="XMLID_516_">
                          <Path
                            id="XMLID_517_"
                            d="M15,160c8.284,0,15-6.716,15-15V85c0-30.327,24.673-55,55-55c30.327,0,55,24.673,55,55v45h-25 c-8.284,0-15,6.716-15,15v170c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15H170V85 c0-46.869-38.131-85-85-85S0,38.131,0,85v60C0,153.284,6.716,160,15,160z"></Path>
                        </G>
                      </G>
                    </Svg>
                  ) : (
                    <Svg
                      fill="#ffffff"
                      height="48px"
                      width="48px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 330 330">
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"></G>
                      <G id="SVGRepo_iconCarrier">
                        <G id="XMLID_504_">
                          <Path
                            id="XMLID_505_"
                            d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M207.481,219.356l-42.5,42.5 c-2.929,2.929-6.768,4.394-10.606,4.394s-7.678-1.465-10.606-4.394l-21.25-21.25c-5.858-5.858-5.858-15.354,0-21.213 c5.857-5.858,15.355-5.858,21.213,0l10.644,10.643l31.894-31.893c5.857-5.858,15.355-5.858,21.213,0 C213.34,204.002,213.34,213.498,207.481,219.356z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></Path>
                        </G>
                      </G>
                    </Svg>
                  )}
                </View>
              </View>
              <View style={styles.box}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '65%',
                    marginRight: '10%',
                  }}>
                  <Text style={styles.stampHeader}>Hands on activity</Text>
                  <Text style={styles.stampBody}>
                    {stamp3 ? 'Stamp unlocked!' : 'Stamp locked!'}
                  </Text>
                </View>
                <View>
                  {stamp3 ? (
                    <Svg
                      fill="#ffffff"
                      height="48px"
                      width="48px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 330 330">
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"></G>
                      <G id="SVGRepo_iconCarrier">
                        <G id="XMLID_516_">
                          <Path
                            id="XMLID_517_"
                            d="M15,160c8.284,0,15-6.716,15-15V85c0-30.327,24.673-55,55-55c30.327,0,55,24.673,55,55v45h-25 c-8.284,0-15,6.716-15,15v170c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15H170V85 c0-46.869-38.131-85-85-85S0,38.131,0,85v60C0,153.284,6.716,160,15,160z"></Path>
                        </G>
                      </G>
                    </Svg>
                  ) : (
                    <Svg
                      fill="#ffffff"
                      height="48px"
                      width="48px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 330 330">
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"></G>
                      <G id="SVGRepo_iconCarrier">
                        <G id="XMLID_504_">
                          <Path
                            id="XMLID_505_"
                            d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M207.481,219.356l-42.5,42.5 c-2.929,2.929-6.768,4.394-10.606,4.394s-7.678-1.465-10.606-4.394l-21.25-21.25c-5.858-5.858-5.858-15.354,0-21.213 c5.857-5.858,15.355-5.858,21.213,0l10.644,10.643l31.894-31.893c5.857-5.858,15.355-5.858,21.213,0 C213.34,204.002,213.34,213.498,207.481,219.356z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></Path>
                        </G>
                      </G>
                    </Svg>
                  )}
                </View>
              </View>
            </View>
            <Text style={styles.centeredText}>
              Unlock stamps by scanning a QR code provided by the relevant
              booth!
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginTop: '5%',
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('QRCode')}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none">
                    <Path
                      d="M9.75 3.75H5.25C4.85218 3.75 4.47064 3.90804 4.18934 4.18934C3.90804 4.47064 3.75 4.85218 3.75 5.25V9.75C3.75 10.1478 3.90804 10.5294 4.18934 10.8107C4.47064 11.092 4.85218 11.25 5.25 11.25H9.75C10.1478 11.25 10.5294 11.092 10.8107 10.8107C11.092 10.5294 11.25 10.1478 11.25 9.75V5.25C11.25 4.85218 11.092 4.47064 10.8107 4.18934C10.5294 3.90804 10.1478 3.75 9.75 3.75ZM9.75 9.75H5.25V5.25H9.75V9.75ZM9.75 12.75H5.25C4.85218 12.75 4.47064 12.908 4.18934 13.1893C3.90804 13.4706 3.75 13.8522 3.75 14.25V18.75C3.75 19.1478 3.90804 19.5294 4.18934 19.8107C4.47064 20.092 4.85218 20.25 5.25 20.25H9.75C10.1478 20.25 10.5294 20.092 10.8107 19.8107C11.092 19.5294 11.25 19.1478 11.25 18.75V14.25C11.25 13.8522 11.092 13.4706 10.8107 13.1893C10.5294 12.908 10.1478 12.75 9.75 12.75ZM9.75 18.75H5.25V14.25H9.75V18.75ZM18.75 3.75H14.25C13.8522 3.75 13.4706 3.90804 13.1893 4.18934C12.908 4.47064 12.75 4.85218 12.75 5.25V9.75C12.75 10.1478 12.908 10.5294 13.1893 10.8107C13.4706 11.092 13.8522 11.25 14.25 11.25H18.75C19.1478 11.25 19.5294 11.092 19.8107 10.8107C20.092 10.5294 20.25 10.1478 20.25 9.75V5.25C20.25 4.85218 20.092 4.47064 19.8107 4.18934C19.5294 3.90804 19.1478 3.75 18.75 3.75ZM18.75 9.75H14.25V5.25H18.75V9.75ZM12.75 16.5V13.5C12.75 13.3011 12.829 13.1103 12.9697 12.9697C13.1103 12.829 13.3011 12.75 13.5 12.75C13.6989 12.75 13.8897 12.829 14.0303 12.9697C14.171 13.1103 14.25 13.3011 14.25 13.5V16.5C14.25 16.6989 14.171 16.8897 14.0303 17.0303C13.8897 17.171 13.6989 17.25 13.5 17.25C13.3011 17.25 13.1103 17.171 12.9697 17.0303C12.829 16.8897 12.75 16.6989 12.75 16.5ZM20.25 15C20.25 15.1989 20.171 15.3897 20.0303 15.5303C19.8897 15.671 19.6989 15.75 19.5 15.75H17.25V19.5C17.25 19.6989 17.171 19.8897 17.0303 20.0303C16.8897 20.171 16.6989 20.25 16.5 20.25H13.5C13.3011 20.25 13.1103 20.171 12.9697 20.0303C12.829 19.8897 12.75 19.6989 12.75 19.5C12.75 19.3011 12.829 19.1103 12.9697 18.9697C13.1103 18.829 13.3011 18.75 13.5 18.75H15.75V13.5C15.75 13.3011 15.829 13.1103 15.9697 12.9697C16.1103 12.829 16.3011 12.75 16.5 12.75C16.6989 12.75 16.8897 12.829 17.0303 12.9697C17.171 13.1103 17.25 13.3011 17.25 13.5V14.25H19.5C19.6989 14.25 19.8897 14.329 20.0303 14.4697C20.171 14.6103 20.25 14.8011 20.25 15ZM20.25 18V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25C19.3011 20.25 19.1103 20.171 18.9697 20.0303C18.829 19.8897 18.75 19.6989 18.75 19.5V18C18.75 17.8011 18.829 17.6103 18.9697 17.4697C19.1103 17.329 19.3011 17.25 19.5 17.25C19.6989 17.25 19.8897 17.329 20.0303 17.4697C20.171 17.6103 20.25 17.8011 20.25 18Z"
                      fill="#EBEBEF"
                    />
                  </Svg>
                  <Text
                    style={{
                      color: '#EBEBEF',
                      fontFamily: 'Prototype',
                      fontSize: 16,
                      fontStyle: 'normal',
                      fontWeight: '400',
                      lineHeight: 16,
                      marginTop: '1.5%',
                    }}>
                    Scan A Stamp
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSidebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: '5%',
    marginTop: '1%',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  header: {
    color: '#356AA9',
    fontFamily: 'Prototype',
    fontSize: 50,
    fontWeight: '400',
  },
  boxHeader: {
    color: '#1C1C12',
    fontFamily: 'Prototype',
    fontSize: 27,
    fontWeight: '400',
    marginLeft: '5%',
    marginTop: '15%',
  },
  moreInfoText: {
    color: 'rgba(235, 235, 239, 0.70)',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    padding: 10,
    marginLeft: '1%',
  },
  entireBox: {
    width: '100%',
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%',
  },
  button: {
    width: '90%',
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%',
    backgroundColor: '#356AA9', // Add this line
    shadowColor: 'rgba(28, 28, 34, 0.30)', // Add this line
    shadowOffset: {width: 4, height: 4}, // Add this line
    shadowOpacity: 0.3, // Add this line
    shadowRadius: 32, // Add this line
  },
  box: {
    backgroundColor: '#4F90DD',
    width: '90%',
    height: height * 0.1,
    marginLeft: '5%',
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  centeredText: {
    color: '#1C1C12',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19.2, // You need to specify a numeric value for lineHeight
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
  },
  stampHeader: {
    color: '#EBEBEF',
    fontFamily: 'Prototype',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  stampBody: {
    color: '#EBEBEF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19.2,
  },
});

export {Stamps, QRCodeScanner};
