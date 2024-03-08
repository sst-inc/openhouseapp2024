import { Platform } from 'react-native';
import { PermissionsIOS, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';


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
        }
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

const QRCodeScanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(RNCamera.Constants.Type.back);
  
    useEffect(() => {
      (async () => {
        const granted = await requestCameraPermission();
        setHasPermission(granted);
      })();
    }, []);
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    const handleBarCodeRead = ({ data }) => {
      // Handle the scanned QR code data
      console.log(data);
    };
  
    return (
      <RNCamera
        style={{ flex: 1 }}
        type={type}
        onBarCodeRead={handleBarCodeRead}
        captureAudio={false}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
            onPress={() => {
              setType(
                type === RNCamera.Constants.Type.back
                  ? RNCamera.Constants.Type.front
                  : RNCamera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>{' '}Flip</Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    );
  };
  
  export default QRCodeScanner;