import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Svg, { Circle,Path, Line } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

  


const Stamps = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/background.png')} style={styles.imageBackground}>
                <View style={styles.topSidebar}>
                    <Text style={styles.header}>Stamps</Text> 
                    <View style={styles.icons}>
                        <TouchableOpacity style={styles.hamburgerIconPress} onPress={() => navigation.openDrawer()}>
                            <Svg width="48" height="52" viewBox="0 0 48 52" fill="none">
                                <LinearGradient
                                    colors={['#D9D9D9', 'transparent']}
                                    style={{ borderRadius: 24 }}
                                >
                                    <Circle cx="24" cy="24" r="24" fillOpacity="0.2" />
                                </LinearGradient>
                                <Circle cx="24" cy="24" r="23.5" strokeOpacity="0.65" />
                                <Circle cx="24" cy="28" r="23.5" strokeOpacity="0.2" />
                                <Line x1="12" y1="16.5" x2="36" y2="16.5" stroke="#EBEBEF" />
                                <Line x1="12" y1="24.5" x2="36" y2="24.5" stroke="#EBEBEF" />
                                <Line x1="12" y1="32.5" x2="36" y2="32.5" stroke="#EBEBEF" />
                                <Circle cx="24" cy="26" r="26" stroke="#F5F5F5" strokeWidth="2" fill="none" />
                            </Svg>
                        </TouchableOpacity>
                     </View>
                </View>
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
    topSidebar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    icons: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    imageBackground: {
        width: '100%',
        height: '100%'
      },
    header: {
        color: '#EBEBEF',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 40,
        fontWeight: 'normal',
        lineHeight: 40, 
    },
    svg: {
        width: 31,
        height: 32,
        flexShrink: 0,
    },
    
});

export default Stamps;