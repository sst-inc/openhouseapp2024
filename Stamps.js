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
} from 'react-native';
import Svg, {Circle, Path, Line, Image} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [scannedDataSet, setScannedDataSet] = useState(new Set());

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
        JSON.stringify(Array.from(scannedDataSet)),
      );
    })();
  }, [scannedDataSet]); // Save to AsyncStorage whenever scannedDataSet changes

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const barcodeRecognized = ({barcodes}) => {
    setScannedDataSet(prevSet => {
      const newSet = new Set(prevSet);
      let isNewValueScanned = false;
      barcodes.forEach(barcode => {
        console.log(barcode.data);
        if (
          !newSet.has(barcode.data) &&
          ['1', '2', '3', '4'].includes(barcode.data)
        ) {
          isNewValueScanned = true;
          newSet.add(barcode.data);
        } else if (!['1', '2', '3', '4'].includes(barcode.data)) {
          Alert.alert(
            'Wrong QR Code Scanned',
            'The scanned QR code is not valid.',
          );
        }
      });
      if (isNewValueScanned) {
        Alert.alert(
          'New QR Code Scanned',
          'A new QR code has been scanned and its data has been added.',
        );
        navigation.navigate('Stamps');
      }
      return newSet;
    });
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
                  fill="#EBEBEF"
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
            onGoogleVisionBarcodesDetected={barcodeRecognized}
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
  const [stamp4, setStamp4] = useState(false);
  const [scannedDataSet, setScannedDataSet] = useState(new Set());

  useEffect(() => {
    (async () => {
      const storedScannedDataArray = await AsyncStorage.getItem(
        'scannedDataArray',
      );
      const parsedArray = storedScannedDataArray
        ? new Set(JSON.parse(storedScannedDataArray))
        : new Set();
      setScannedDataSet(parsedArray);
      if (parsedArray.has('1')) {
        setStamp1(true);
      }
      if (parsedArray.has('2')) {
        setStamp2(true);
      }
      if (parsedArray.has('3')) {
        setStamp3(true);
      }
      if (parsedArray.has('4')) {
        setStamp4(true);
      }
    })();
  }, [scannedDataSet]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.imageBackground}>
        <ScrollView>
          <SafeAreaView>
            <View style={{marginTop: '5%'}} />
            <View style={styles.navBar}>
              <Text style={styles.header}>Stamps</Text>
              <View style={{marginTop: '2%'}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Svg width="48" height="52" viewBox="0 0 48 52" fill="none">
                    <LinearGradient
                      colors={['#D9D9D9', 'transparent']}
                      style={{borderRadius: 24}}></LinearGradient>
                    <Line
                      x1="12"
                      y1="16.5"
                      x2="36"
                      y2="16.5"
                      stroke="#EBEBEF"
                    />
                    <Line
                      x1="12"
                      y1="24.5"
                      x2="36"
                      y2="24.5"
                      stroke="#EBEBEF"
                    />
                    <Line
                      x1="12"
                      y1="32.5"
                      x2="36"
                      y2="32.5"
                      stroke="#EBEBEF"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container2}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.collectionHeader}>
                  Your Stamp Collection{' '}
                </Text>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none">
                  <Path
                    d="M26.25 26.25C26.25 26.4986 26.1512 26.7371 25.9754 26.9129C25.7996 27.0887 25.5611 27.1875 25.3125 27.1875H4.6875C4.43886 27.1875 4.2004 27.0887 4.02459 26.9129C3.84877 26.7371 3.75 26.4986 3.75 26.25C3.75 26.0014 3.84877 25.7629 4.02459 25.5871C4.2004 25.4113 4.43886 25.3125 4.6875 25.3125H25.3125C25.5611 25.3125 25.7996 25.4113 25.9754 25.5871C26.1512 25.7629 26.25 26.0014 26.25 26.25ZM24.375 15H17.7621L19.6031 6.41133C19.7204 5.86464 19.7139 5.29865 19.5841 4.75479C19.4544 4.21093 19.2047 3.70297 18.8532 3.26809C18.5018 2.8332 18.0576 2.4824 17.5531 2.24136C17.0486 2.00033 16.4966 1.87515 15.9375 1.875H14.0625C13.5034 1.87515 12.9514 2.00033 12.4469 2.24136C11.9424 2.4824 11.4982 2.8332 11.1468 3.26809C10.7953 3.70297 10.5456 4.21093 10.4159 4.75479C10.2861 5.29865 10.2796 5.86464 10.3969 6.41133L12.2379 15H5.625C5.12772 15 4.65081 15.1975 4.29917 15.5492C3.94754 15.9008 3.75 16.3777 3.75 16.875V21.5625C3.75 22.0598 3.94754 22.5367 4.29917 22.8883C4.65081 23.24 5.12772 23.4375 5.625 23.4375H24.375C24.8723 23.4375 25.3492 23.24 25.7008 22.8883C26.0525 22.5367 26.25 22.0598 26.25 21.5625V16.875C26.25 16.3777 26.0525 15.9008 25.7008 15.5492C25.3492 15.1975 24.8723 15 24.375 15Z"
                    fill="#EBEBEF"
                  />
                </Svg>
              </View>
              <View style={{marginTop: '5%'}} />
              <View>
                <View style={styles.stampCollection}>
                  <View style={stamp1 ? styles.stamp : styles.stampLocked}>
                    <ImageBackground
                      source={require('./assets/stampsPlaceholder.png')}
                      style={{width: '100%', height: '100%'}}>
                      <LinearGradient
                        colors={[
                          'rgba(28, 28, 34, 0.75)',
                          'rgba(28, 28, 34, 0.00)',
                        ]}
                        start={{x: 0.0, y: 1.0}}
                        end={{x: 0.0, y: 0.0}}
                        locations={[0.0112, 0.4001]}>
                        <Text style={styles.stampName}>Stamp Name</Text>
                        <Text style={styles.stampLocation}>@Auditorium</Text>
                        {!stamp1 && (
                          <BlurView
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            }}
                            blurType="dark"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="white">
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                              }}>
                              <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="50"
                                viewBox="0 0 24 27"
                                fill="none">
                                <Path
                                  d="M22 9H18V6C18 4.4087 17.3679 2.88258 16.2426 1.75736C15.1174 0.632141 13.5913 0 12 0C10.4087 0 8.88258 0.632141 7.75736 1.75736C6.63214 2.88258 6 4.4087 6 6V9H2C1.46957 9 0.960859 9.21071 0.585786 9.58579C0.210714 9.96086 0 10.4696 0 11V25C0 25.5304 0.210714 26.0391 0.585786 26.4142C0.960859 26.7893 1.46957 27 2 27H22C22.5304 27 23.0391 26.7893 23.4142 26.4142C23.7893 26.0391 24 25.5304 24 25V11C24 10.4696 23.7893 9.96086 23.4142 9.58579C23.0391 9.21071 22.5304 9 22 9ZM13 18.8288V22C13 22.2652 12.8946 22.5196 12.7071 22.7071C12.5196 22.8946 12.2652 23 12 23C11.7348 23 11.4804 22.8946 11.2929 22.7071C11.1054 22.5196 11 22.2652 11 22V18.8288C10.3328 18.5929 9.77045 18.1287 9.41237 17.5183C9.05429 16.9079 8.92353 16.1905 9.0432 15.493C9.16288 14.7955 9.52527 14.1628 10.0663 13.7066C10.6074 13.2505 11.2923 13.0003 12 13.0003C12.7077 13.0003 13.3926 13.2505 13.9337 13.7066C14.4747 14.1628 14.8371 14.7955 14.9568 15.493C15.0765 16.1905 14.9457 16.9079 14.5876 17.5183C14.2296 18.1287 13.6672 18.5929 13 18.8288ZM16 9H8V6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6V9Z"
                                  fill="#EBEBEF"
                                />
                              </Svg>
                              <Text style={styles.lockText}>
                                This stamp has not been unlocked yet
                              </Text>
                            </View>
                          </BlurView>
                        )}
                        <View style={{marginTop: '8%'}} />
                      </LinearGradient>
                    </ImageBackground>
                  </View>
                  <View style={stamp2 ? styles.stamp : styles.stampLocked}>
                    <ImageBackground
                      source={require('./assets/stampsPlaceholder.png')}
                      style={{width: '100%', height: '100%'}}>
                      <LinearGradient
                        colors={[
                          'rgba(28, 28, 34, 0.75)',
                          'rgba(28, 28, 34, 0.00)',
                        ]}
                        start={{x: 0.0, y: 1.0}}
                        end={{x: 0.0, y: 0.0}}
                        locations={[0.0112, 0.4001]}>
                        <Text style={styles.stampName}>Stamp Name</Text>
                        <Text style={styles.stampLocation}>@Auditorium</Text>
                        {!stamp2 && (
                          <BlurView
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            }}
                            blurType="dark"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="white">
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                              }}>
                              <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="50"
                                viewBox="0 0 24 27"
                                fill="none">
                                <Path
                                  d="M22 9H18V6C18 4.4087 17.3679 2.88258 16.2426 1.75736C15.1174 0.632141 13.5913 0 12 0C10.4087 0 8.88258 0.632141 7.75736 1.75736C6.63214 2.88258 6 4.4087 6 6V9H2C1.46957 9 0.960859 9.21071 0.585786 9.58579C0.210714 9.96086 0 10.4696 0 11V25C0 25.5304 0.210714 26.0391 0.585786 26.4142C0.960859 26.7893 1.46957 27 2 27H22C22.5304 27 23.0391 26.7893 23.4142 26.4142C23.7893 26.0391 24 25.5304 24 25V11C24 10.4696 23.7893 9.96086 23.4142 9.58579C23.0391 9.21071 22.5304 9 22 9ZM13 18.8288V22C13 22.2652 12.8946 22.5196 12.7071 22.7071C12.5196 22.8946 12.2652 23 12 23C11.7348 23 11.4804 22.8946 11.2929 22.7071C11.1054 22.5196 11 22.2652 11 22V18.8288C10.3328 18.5929 9.77045 18.1287 9.41237 17.5183C9.05429 16.9079 8.92353 16.1905 9.0432 15.493C9.16288 14.7955 9.52527 14.1628 10.0663 13.7066C10.6074 13.2505 11.2923 13.0003 12 13.0003C12.7077 13.0003 13.3926 13.2505 13.9337 13.7066C14.4747 14.1628 14.8371 14.7955 14.9568 15.493C15.0765 16.1905 14.9457 16.9079 14.5876 17.5183C14.2296 18.1287 13.6672 18.5929 13 18.8288ZM16 9H8V6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6V9Z"
                                  fill="#EBEBEF"
                                />
                              </Svg>
                              <Text style={styles.lockText}>
                                This stamp has not been unlocked yet
                              </Text>
                            </View>
                          </BlurView>
                        )}
                        <View style={{marginTop: '8%'}} />
                      </LinearGradient>
                    </ImageBackground>
                  </View>
                </View>
                <View style={styles.stampCollection}>
                  <View style={stamp3 ? styles.stamp : styles.stampLocked}>
                    <ImageBackground
                      source={require('./assets/stampsPlaceholder.png')}
                      style={{width: '100%', height: '100%'}}>
                      <LinearGradient
                        colors={[
                          'rgba(28, 28, 34, 0.75)',
                          'rgba(28, 28, 34, 0.00)',
                        ]}
                        start={{x: 0.0, y: 1.0}}
                        end={{x: 0.0, y: 0.0}}
                        locations={[0.0112, 0.4001]}>
                        <Text style={styles.stampName}>Stamp Name</Text>
                        <Text style={styles.stampLocation}>@Auditorium</Text>
                        {!stamp3 && (
                          <BlurView
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            }}
                            blurType="dark"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="white">
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                              }}>
                              <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="50"
                                viewBox="0 0 24 27"
                                fill="none">
                                <Path
                                  d="M22 9H18V6C18 4.4087 17.3679 2.88258 16.2426 1.75736C15.1174 0.632141 13.5913 0 12 0C10.4087 0 8.88258 0.632141 7.75736 1.75736C6.63214 2.88258 6 4.4087 6 6V9H2C1.46957 9 0.960859 9.21071 0.585786 9.58579C0.210714 9.96086 0 10.4696 0 11V25C0 25.5304 0.210714 26.0391 0.585786 26.4142C0.960859 26.7893 1.46957 27 2 27H22C22.5304 27 23.0391 26.7893 23.4142 26.4142C23.7893 26.0391 24 25.5304 24 25V11C24 10.4696 23.7893 9.96086 23.4142 9.58579C23.0391 9.21071 22.5304 9 22 9ZM13 18.8288V22C13 22.2652 12.8946 22.5196 12.7071 22.7071C12.5196 22.8946 12.2652 23 12 23C11.7348 23 11.4804 22.8946 11.2929 22.7071C11.1054 22.5196 11 22.2652 11 22V18.8288C10.3328 18.5929 9.77045 18.1287 9.41237 17.5183C9.05429 16.9079 8.92353 16.1905 9.0432 15.493C9.16288 14.7955 9.52527 14.1628 10.0663 13.7066C10.6074 13.2505 11.2923 13.0003 12 13.0003C12.7077 13.0003 13.3926 13.2505 13.9337 13.7066C14.4747 14.1628 14.8371 14.7955 14.9568 15.493C15.0765 16.1905 14.9457 16.9079 14.5876 17.5183C14.2296 18.1287 13.6672 18.5929 13 18.8288ZM16 9H8V6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6V9Z"
                                  fill="#EBEBEF"
                                />
                              </Svg>
                              <Text style={styles.lockText}>
                                This stamp has not been unlocked yet
                              </Text>
                            </View>
                          </BlurView>
                        )}
                        <View style={{marginTop: '8%'}} />
                      </LinearGradient>
                    </ImageBackground>
                  </View>
                  <View style={stamp4 ? styles.stamp : styles.stampLocked}>
                    <ImageBackground
                      source={require('./assets/stampsPlaceholder.png')}
                      style={{width: '100%', height: '100%'}}>
                      <LinearGradient
                        colors={[
                          'rgba(28, 28, 34, 0.75)',
                          'rgba(28, 28, 34, 0.00)',
                        ]}
                        start={{x: 0.0, y: 1.0}}
                        end={{x: 0.0, y: 0.0}}
                        locations={[0.0112, 0.4001]}>
                        <Text style={styles.stampName}>Stamp Name</Text>
                        <Text style={styles.stampLocation}>@Auditorium</Text>
                        {!stamp4 && (
                          <BlurView
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              height: '110%',
                              width: '100%',
                            }}
                            blurType="dark"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="white">
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                              }}>
                              <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="50"
                                viewBox="0 0 24 27"
                                fill="none">
                                <Path
                                  d="M22 9H18V6C18 4.4087 17.3679 2.88258 16.2426 1.75736C15.1174 0.632141 13.5913 0 12 0C10.4087 0 8.88258 0.632141 7.75736 1.75736C6.63214 2.88258 6 4.4087 6 6V9H2C1.46957 9 0.960859 9.21071 0.585786 9.58579C0.210714 9.96086 0 10.4696 0 11V25C0 25.5304 0.210714 26.0391 0.585786 26.4142C0.960859 26.7893 1.46957 27 2 27H22C22.5304 27 23.0391 26.7893 23.4142 26.4142C23.7893 26.0391 24 25.5304 24 25V11C24 10.4696 23.7893 9.96086 23.4142 9.58579C23.0391 9.21071 22.5304 9 22 9ZM13 18.8288V22C13 22.2652 12.8946 22.5196 12.7071 22.7071C12.5196 22.8946 12.2652 23 12 23C11.7348 23 11.4804 22.8946 11.2929 22.7071C11.1054 22.5196 11 22.2652 11 22V18.8288C10.3328 18.5929 9.77045 18.1287 9.41237 17.5183C9.05429 16.9079 8.92353 16.1905 9.0432 15.493C9.16288 14.7955 9.52527 14.1628 10.0663 13.7066C10.6074 13.2505 11.2923 13.0003 12 13.0003C12.7077 13.0003 13.3926 13.2505 13.9337 13.7066C14.4747 14.1628 14.8371 14.7955 14.9568 15.493C15.0765 16.1905 14.9457 16.9079 14.5876 17.5183C14.2296 18.1287 13.6672 18.5929 13 18.8288ZM16 9H8V6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6V9Z"
                                  fill="#EBEBEF"
                                />
                              </Svg>
                              <Text style={styles.lockText}>
                                This stamp has not been unlocked yet
                              </Text>
                            </View>
                          </BlurView>
                        )}
                        <View style={{marginTop: '8%'}} />
                      </LinearGradient>
                    </ImageBackground>
                  </View>
                </View>
              </View>
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
                  <View style={{flexDirection: 'row', marginLeft: '34%'}}>
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none">
                      <Path
                        d="M8.125 3.125H4.375C4.04348 3.125 3.72554 3.2567 3.49112 3.49112C3.2567 3.72554 3.125 4.04348 3.125 4.375V8.125C3.125 8.45652 3.2567 8.77446 3.49112 9.00888C3.72554 9.2433 4.04348 9.375 4.375 9.375H8.125C8.45652 9.375 8.77446 9.2433 9.00888 9.00888C9.2433 8.77446 9.375 8.45652 9.375 8.125V4.375C9.375 4.04348 9.2433 3.72554 9.00888 3.49112C8.77446 3.2567 8.45652 3.125 8.125 3.125ZM8.125 8.125H4.375V4.375H8.125V8.125ZM8.125 10.625H4.375C4.04348 10.625 3.72554 10.7567 3.49112 10.9911C3.2567 11.2255 3.125 11.5435 3.125 11.875V15.625C3.125 15.9565 3.2567 16.2745 3.49112 16.5089C3.72554 16.7433 4.04348 16.875 4.375 16.875H8.125C8.45652 16.875 8.77446 16.7433 9.00888 16.5089C9.2433 16.2745 9.375 15.9565 9.375 15.625V11.875C9.375 11.5435 9.2433 11.2255 9.00888 10.9911C8.77446 10.7567 8.45652 10.625 8.125 10.625ZM8.125 15.625H4.375V11.875H8.125V15.625ZM15.625 3.125H11.875C11.5435 3.125 11.2255 3.2567 10.9911 3.49112C10.7567 3.72554 10.625 4.04348 10.625 4.375V8.125C10.625 8.45652 10.7567 8.77446 10.9911 9.00888C11.2255 9.2433 11.5435 9.375 11.875 9.375H15.625C15.9565 9.375 16.2745 9.2433 16.5089 9.00888C16.7433 8.77446 16.875 8.45652 16.875 8.125V4.375C16.875 4.04348 16.7433 3.72554 16.5089 3.49112C16.2745 3.2567 15.9565 3.125 15.625 3.125ZM15.625 8.125H11.875V4.375H15.625V8.125ZM10.625 13.75V11.25C10.625 11.0842 10.6908 10.9253 10.8081 10.8081C10.9253 10.6908 11.0842 10.625 11.25 10.625C11.4158 10.625 11.5747 10.6908 11.6919 10.8081C11.8092 10.9253 11.875 11.0842 11.875 11.25V13.75C11.875 13.9158 11.8092 14.0747 11.6919 14.1919C11.5747 14.3092 11.4158 14.375 11.25 14.375C11.0842 14.375 10.9253 14.3092 10.8081 14.1919C10.6908 14.0747 10.625 13.9158 10.625 13.75ZM16.875 12.5C16.875 12.6658 16.8092 12.8247 16.6919 12.9419C16.5747 13.0592 16.4158 13.125 16.25 13.125H14.375V16.25C14.375 16.4158 14.3092 16.5747 14.1919 16.6919C14.0747 16.8092 13.9158 16.875 13.75 16.875H11.25C11.0842 16.875 10.9253 16.8092 10.8081 16.6919C10.6908 16.5747 10.625 16.4158 10.625 16.25C10.625 16.0842 10.6908 15.9253 10.8081 15.8081C10.9253 15.6908 11.0842 15.625 11.25 15.625H13.125V11.25C13.125 11.0842 13.1908 10.9253 13.3081 10.8081C13.4253 10.6908 13.5842 10.625 13.75 10.625C13.9158 10.625 14.0747 10.6908 14.1919 10.8081C14.3092 10.9253 14.375 11.0842 14.375 11.25V11.875H16.25C16.4158 11.875 16.5747 11.9408 16.6919 12.0581C16.8092 12.1753 16.875 12.3342 16.875 12.5ZM16.875 15V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875C16.0842 16.875 15.9253 16.8092 15.8081 16.6919C15.6908 16.5747 15.625 16.4158 15.625 16.25V15C15.625 14.8342 15.6908 14.6753 15.8081 14.5581C15.9253 14.4408 16.0842 14.375 16.25 14.375C16.4158 14.375 16.5747 14.4408 16.6919 14.5581C16.8092 14.6753 16.875 14.8342 16.875 15Z"
                        fill="black"
                      />
                    </Svg>
                    <Text style={{color: 'black'}}> Scan A Stamp</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
  container1: {
    marginTop: '3%',
  },
  container2: {
    marginTop: '25%',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '2%',
    marginRight: '5%',
  },

  imageBackground: {
    width: '100%',
    height: '100%',
    padding: 0,
  },
  header: {
    color: '#EBEBEF',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 50,
    fontWeight: 'normal',
    marginLeft: '4%',
    padding: 0,
  },
  collectionHeader: {
    color: '#FFF',
    fontFamily: 'Lato',
    fontSize: 24,
    marginLeft: '6%',
    flexDirection: 'column',
    marginBottom: '2%',
    padding: 0,
  },
  button: {
    width: '94%',
    height: 50,
    alignItems: 'flex-start',
    borderRadius: 24,
    backgroundColor: '#EBEBEF',
    justifyContent: 'center',
    padding: 10,
  },
  stampCollection: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    height: 188,
    padding: 0,
  },
  stamp: {
    border: '1px solid',
    borderColor: 'black',
    flexShrink: 0,
    width: '45%',
    height: 179,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 0,
  },
  stampName: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    marginRight: '20%',
    marginTop: '70%',
  },
  stampLocation: {
    color: 'rgba(235, 235, 239, 0.70)',
    textAlign: 'center',
    marginRight: '20%',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
  },
  stampLocked: {
    border: '1px solid',
    borderColor: 'black',
    flexShrink: 0,
    width: '45%',
    height: 179,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(28, 28, 34, 0.50)',
    transform: [{translateX: 0}, {translateY: 0}],
    padding: 0,
  },

  lockText: {
    color: '#EBEBEF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginTop: '5%',
  },
});

export {Stamps, QRCodeScanner};
