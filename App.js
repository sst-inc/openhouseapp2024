import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
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
        <Drawer.Screen name="Login" component={LoginFunction} options={{ drawerLabel: 'Login', drawerItemStyle: { height: 0 } ,headerShown: false}}  />
        <Drawer.Screen name="Stamps" component={Stamps} options={{ drawerLabel: 'Stamps',headerShown: false }}   />
        <Drawer.Screen name="QRCode" component={QRCodeScanner} options={{ drawerLabel: 'QR Code',drawerItemStyle: { height: 0 } ,headerShown: false }} />
        <Drawer.Screen name="BoothInfo" component={BoothInfo} options={{ drawerLabel: 'Booth Info',headerShown: false }}    />
        <Drawer.Screen name="Events" component={EventsPage} options={{ drawerLabel: 'Events',headerShown: false }}  />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}




const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/startingPage.png')} style={styles.imageBackground}>
        <TouchableOpacity style={{ width:"100%",height:'100%'}} onPress={() => navigation.navigate('Login')} />
      </ImageBackground>
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
  }
});

export default App;