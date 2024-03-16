import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
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
        <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabel: 'Home' }}  options={{ drawerItemStyle: { height: 0 } ,headerShown: false}}/>
        <Drawer.Screen name="Login" component={LoginFunction} options={{ drawerLabel: 'Login' }} options={{ drawerItemStyle: { height: 0 } ,headerShown: false}} />
        <Drawer.Screen name="Stamps" component={Stamps} options={{ drawerLabel: 'Stamps' }} options={{ headerShown: false }}  />
        <Drawer.Screen name="QRCode" component={QRCodeScanner} options={{ drawerLabel: 'QR Code' }} options={{ drawerItemStyle: { height: 0 } ,headerShown: false}} />
        <Drawer.Screen name="BoothInfo" component={BoothInfo} options={{ drawerLabel: 'Booth Info' }} options={{ headerShown: false }}   />
        <Drawer.Screen name="Events" component={EventsPage} options={{ drawerLabel: 'Events' }} options={{ headerShown: false }}  />
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

const DetailsScreen = () => { 
  return (
    <View style={styles.container}>
        <Text>Details Screen</Text>
    </View>
  );

}


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