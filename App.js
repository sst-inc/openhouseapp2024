import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
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
        <Drawer.Screen name="Login" component={LoginFunction} options={{ drawerLabel: 'Login' ,headerShown: false}}  />
        <Drawer.Screen name="Stamps" component={Stamps} options={{ drawerLabel: 'Stamps',headerShown: false }}   />
        <Drawer.Screen name="QRCode" component={QRCodeScanner} options={{ drawerLabel: 'QR Code',drawerItemStyle: { height: 0 } ,headerShown: false }} />
        <Drawer.Screen name="BoothInfo" component={BoothInfo} options={{ drawerLabel: 'Booth Info',headerShown: false }}    />
        <Drawer.Screen name="Events" component={EventsPage} options={{ drawerLabel: 'Events',headerShown: false }}  />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const retrieveEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    retrieveEmail();
  }, []);

  function whereToGo() {
    if (email !== '') {
      navigation.navigate('Events');
    } else {
      navigation.navigate('Login');
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/startingPage.png')} style={styles.imageBackground}>
        <TouchableOpacity style={{ width:"100%",height:'100%'}} onPress={whereToGo} />
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