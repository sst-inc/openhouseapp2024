import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginFunction from './Login';
import { Stamps, QRCodeScanner } from './Stamps';
import BoothInfo from './BoothInfo';
import EventsPage from './Events';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{drawerPosition:"right"}} options={{ headerShown: false }}   >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabel: 'Home',drawerItemStyle: { height: 0 } ,headerShown: false }} />
        <Drawer.Screen name="Stamps" component={Stamps} options={{ drawerLabel: 'Stamps',headerShown: false }}   />
        <Drawer.Screen name="QRCode" component={QRCodeScanner} options={{ drawerLabel: 'QR Code',drawerItemStyle: { height: 0 } ,headerShown: false }} />
        <Drawer.Screen name="BoothInfo" component={BoothInfo} options={{ drawerLabel: 'Booth Info',headerShown: false }}    />
        <Drawer.Screen name="Events" component={EventsPage} options={{ drawerLabel: 'Events',headerShown: false }}  />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0
  const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  function whereToGo() {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }
    ).start(() => navigation.navigate('Events'));  // Navigate after the animation completes
  }

  return (
    <View style={styles.container}>
      <AnimatedImageBackground
        source={require('./assets/startingPage.png')}
        style={[styles.imageBackground, { opacity: fadeAnim }]}
      >
        <TouchableOpacity style={{ width:"100%",height:'100%'}} onPress={whereToGo} />
      </AnimatedImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBackground: {
    width: '100%',
    height: '100%'
  },
});

export default App;