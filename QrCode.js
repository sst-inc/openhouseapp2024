import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Button, Alert, Platform } from 'react-native';
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

const QRCode = ({ navigation }) => { 
  const onSuccess = e => {
    console.log(e.data); // This will log the data encoded in the scanned QR code
    navigation.navigate('Stamps', { qrData: e.data }); // Navigate to a screen with the scanned data
  };

  const requestCameraPermission = async () => {
    try {
      const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
      const result = await check(permission);

      if (result === RESULTS.DENIED) {
        Alert.alert(
          'Camera Permission',
          'This app needs access to your camera',
          [
            {
              text: 'Cancel',
              onPress: () => navigation.navigate('Stamps'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                const requestResult = await request(permission);
                if (requestResult !== RESULTS.GRANTED) {
                  console.log('Camera permission denied');
                  navigation.navigate('Stamps');
                }
              },
            },
          ],
          { cancelable: false },
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return(
    <View>
      <ImageBackground source={require('./assets/background.png')} >
        <QRCodeScanner
          onRead={onSuccess}
          reactivate={true} // this prop will make the scanner to continue scan after a QR code is detected
          reactivateTimeout={3000} // time (in ms) between each scan
          showMarker={true} // It will show a marker in the center of the scanner
          markerStyle={{ borderColor: '#FFF' }} // This is the marker style
          cameraStyle={{ height: '100%' }} // You can set the height to whatever you want
        />
      </ImageBackground>
    </View>
  );
}

export default QRCode;