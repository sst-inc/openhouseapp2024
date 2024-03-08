import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Svg, { Circle,Path, Line } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';





const Stamps = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/background.png')} style={styles.imageBackground}>
                <View style={styles.container1}>
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
                    <View style={styles.container2}>
                        <Text style={styles.collectionHeader}>Your Stamp Collection</Text>
                        <View></View>     
                        <View></View>                        
                        <View></View>                        
                        <View></View>   
                        <TouchableOpacity style={styles.button} onPress={() => navigation.push("QRCode")} >
                            <View style={{flexDirection:'row', marginLeft:'34%'}}>
                                <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <Path d="M8.125 3.125H4.375C4.04348 3.125 3.72554 3.2567 3.49112 3.49112C3.2567 3.72554 3.125 4.04348 3.125 4.375V8.125C3.125 8.45652 3.2567 8.77446 3.49112 9.00888C3.72554 9.2433 4.04348 9.375 4.375 9.375H8.125C8.45652 9.375 8.77446 9.2433 9.00888 9.00888C9.2433 8.77446 9.375 8.45652 9.375 8.125V4.375C9.375 4.04348 9.2433 3.72554 9.00888 3.49112C8.77446 3.2567 8.45652 3.125 8.125 3.125ZM8.125 8.125H4.375V4.375H8.125V8.125ZM8.125 10.625H4.375C4.04348 10.625 3.72554 10.7567 3.49112 10.9911C3.2567 11.2255 3.125 11.5435 3.125 11.875V15.625C3.125 15.9565 3.2567 16.2745 3.49112 16.5089C3.72554 16.7433 4.04348 16.875 4.375 16.875H8.125C8.45652 16.875 8.77446 16.7433 9.00888 16.5089C9.2433 16.2745 9.375 15.9565 9.375 15.625V11.875C9.375 11.5435 9.2433 11.2255 9.00888 10.9911C8.77446 10.7567 8.45652 10.625 8.125 10.625ZM8.125 15.625H4.375V11.875H8.125V15.625ZM15.625 3.125H11.875C11.5435 3.125 11.2255 3.2567 10.9911 3.49112C10.7567 3.72554 10.625 4.04348 10.625 4.375V8.125C10.625 8.45652 10.7567 8.77446 10.9911 9.00888C11.2255 9.2433 11.5435 9.375 11.875 9.375H15.625C15.9565 9.375 16.2745 9.2433 16.5089 9.00888C16.7433 8.77446 16.875 8.45652 16.875 8.125V4.375C16.875 4.04348 16.7433 3.72554 16.5089 3.49112C16.2745 3.2567 15.9565 3.125 15.625 3.125ZM15.625 8.125H11.875V4.375H15.625V8.125ZM10.625 13.75V11.25C10.625 11.0842 10.6908 10.9253 10.8081 10.8081C10.9253 10.6908 11.0842 10.625 11.25 10.625C11.4158 10.625 11.5747 10.6908 11.6919 10.8081C11.8092 10.9253 11.875 11.0842 11.875 11.25V13.75C11.875 13.9158 11.8092 14.0747 11.6919 14.1919C11.5747 14.3092 11.4158 14.375 11.25 14.375C11.0842 14.375 10.9253 14.3092 10.8081 14.1919C10.6908 14.0747 10.625 13.9158 10.625 13.75ZM16.875 12.5C16.875 12.6658 16.8092 12.8247 16.6919 12.9419C16.5747 13.0592 16.4158 13.125 16.25 13.125H14.375V16.25C14.375 16.4158 14.3092 16.5747 14.1919 16.6919C14.0747 16.8092 13.9158 16.875 13.75 16.875H11.25C11.0842 16.875 10.9253 16.8092 10.8081 16.6919C10.6908 16.5747 10.625 16.4158 10.625 16.25C10.625 16.0842 10.6908 15.9253 10.8081 15.8081C10.9253 15.6908 11.0842 15.625 11.25 15.625H13.125V11.25C13.125 11.0842 13.1908 10.9253 13.3081 10.8081C13.4253 10.6908 13.5842 10.625 13.75 10.625C13.9158 10.625 14.0747 10.6908 14.1919 10.8081C14.3092 10.9253 14.375 11.0842 14.375 11.25V11.875H16.25C16.4158 11.875 16.5747 11.9408 16.6919 12.0581C16.8092 12.1753 16.875 12.3342 16.875 12.5ZM16.875 15V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875C16.0842 16.875 15.9253 16.8092 15.8081 16.6919C15.6908 16.5747 15.625 16.4158 15.625 16.25V15C15.625 14.8342 15.6908 14.6753 15.8081 14.5581C15.9253 14.4408 16.0842 14.375 16.25 14.375C16.4158 14.375 16.5747 14.4408 16.6919 14.5581C16.8092 14.6753 16.875 14.8342 16.875 15Z" fill="black"/>
                                </Svg>
                                <Text>Scan A Stamp</Text>
                            </View>
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
    container1: {
        marginTop: "3%",
     },
    container2: { 
        marginTop:'35%',
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
    },
    svg: {
        width: 31,
        height: 32,
        flexShrink: 0,
    },
    collectionHeader:{
        color: '#FFF',
        fontFamily: 'Lato',
        fontSize: 24,
        marginLeft: '6%',
        flexDirection: 'column',
    },
    button: {
        width: '90%',
        height: '40%',
        alignItems: 'flex-start',
        flexShrink: 0,
        borderRadius: 24,
        backgroundColor: '#EBEBEF',
        justifyContent: 'center',
        marginLeft: '5%',
    },
});

export default Stamps;