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

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={LoginFunction} options={{ headerShown: false }} />
        <Stack.Screen name="Stamps" component={Stamps}  options={{ headerShown: false }}  />
        <Stack.Screen name="QRCode" component={QRCodeScanner} />
        <Stack.Screen name="BoothInfo" component={BoothInfo} />
        <Stack.Screen name="Events" component={EventsPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
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