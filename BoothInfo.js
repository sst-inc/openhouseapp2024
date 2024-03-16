import React from 'react';
import { ImageBackground, TouchableOpacity, View, Alert } from 'react-native';

const BoothInfo = () => {
  const handlePointPress = (point) => {
    Alert.alert(
      `Point ${point.id}`,
      `More information about point ${point.id}: ${point.info}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: true }
    );
  };

  const points = [
    { id: '1', top: 50, left: 50, info: 'Info about point 1' },
    { id: '2', top: 100, left: 100, info: 'Info about point 2' },
    // Add more points as needed
  ];

  return (
    <ImageBackground source={{ uri: 'https://example.com/your-image.jpg' }} style={{ width: '100%', height: '100%' }}>
      {points.map((point) => (
        <TouchableOpacity
          key={point.id}
          onPress={() => handlePointPress(point)}
          style={{
            position: 'absolute',
            top: point.top,
            left: point.left,
            width: 20,
            height: 20,
            backgroundColor: 'red',
          }}
        />
      ))}
    </ImageBackground>
  );
};

export default BoothInfo;