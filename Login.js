/* import { View, TextInput, Button, ActivityIndicator, StyleSheet, ImageBackground, Text, Animated, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { FIREBASE_AUTH } from './firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import { BoxShadow } from 'react-native-shadow';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LoginFunction({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    
    const positionAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(positionAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const signIn = async () => { 
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            // Store email in AsyncStorage after successful login
            await AsyncStorage.setItem('email', email);
            navigation.navigate('Events');
        } catch (error) {
            console.log(error);
            alert('Sign in failed:' + error.message);
        } finally {
            setLoading(false);
        }
    }
    
    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Account successfully created');
            // Store email in AsyncStorage after successful sign up
            await AsyncStorage.setItem('email', email);
            navigation.navigate('Events');
        } catch (error) {
            console.log(error);
            alert('Sign up failed:' + error.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./assets/background.png')}
                resizeMode="cover"
                style={styles.image}>
                    <Animated.View style={[styles.innerContainer, { transform: [{ translateY: positionAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -500] }) }] }]}>
                         <Text
allowFontScaling={false} style={styles.signInTexter}>Ready to start your SST journey?</Text>
                        <Text
allowFontScaling={false}Input
                            style={styles.input}
                            placeholder='Email'
                            autoCapitalize='none'
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor='#c9c9c9'
                        />
                        <View style={{marginTop:'1.5%'}}/>
                        <Text
allowFontScaling={false}Input
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder='Password'
                            autoCapitalize='none'
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor='#c9c9c9'
                        />
                        {loading ? <ActivityIndicator size='large' color='blue' /> : (
                            <>
                            <TouchableOpacity style={styles.button} onPress={signIn}>
                                <Text
allowFontScaling={false} style={styles.buttonText}>LOGIN</Text>
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', marginTop:'5%'}}>
                            <Text
allowFontScaling={false} style={{color:'grey'}}>Don't have an account?</Text>
                            <Pressable onPress={signUp} >
                                <Text
allowFontScaling={false} style={styles.signUpButton}>  SIGN UP</Text>
                            </Pressable>
                            </View>
                            </>
                        )}
                            <Pressable onPress={() => navigation.navigate("Events")} >
                                <Text
allowFontScaling={false} style={{color:'grey',fontWeight:'500',textDecorationLine: 'underline',marginTop:'3%'}} >Skip</Text>    
                            </Pressable> 
                        </Animated.View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '65%',
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10,
        backgroundColor: '#bfbfbf',
        height: '8%',
    },
    buttonText:{
        color: 'black',
        fontSize: 25,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#bfbfbf',
        width: '80%', // Set a fixed width for the input space
        height: '9%',
        marginBottom: 10,
        fontSize: 20,
        color: 'white',
        borderRadius: 12,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    box: {
        height: 117,
        width: 391,
      },

      innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      signInTexter: {
        color: '#FFFFFF',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: '4.5%',
        fontFamily: 'Lato',
        fontSize: 35, // convert rem to pixels
        marginBottom: '5%',
        padding: '4%',
      },
      signUpButton:{
        color:'#1a75ff',
        textDecorationLine: 'underline',
      },
}); */
