import { View, TextInput, Button, ActivityIndicator, StyleSheet, ImageBackground, Text} from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from './firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

export default function LoginFunction({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => { 
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            navigation.navigate('Stamps');
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
            navigation.navigate('Stamps');
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
                    <View style={styles.innerContainer}>
                        <View style={styles.rectangle}>
                        <LinearGradient
                        colors={['rgba(190, 190, 190, 0.16)', 'rgba(213, 213, 213, 0.16)']}
                        start={{x: 0.0, y: 0.0}} 
                        end={{x: 0.0, y: 1.0}}
                        style={{flex: 1}}
                        >
                           <Text style={styles.signInTexter}>Sign in here!</Text>
                        </LinearGradient>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='email'
                            autoCapitalize='none'
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor='#c9c9c9'
                        />
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder='password'
                            autoCapitalize='none'
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor='#c9c9c9'
                        />
                        {loading ? <ActivityIndicator size='large' color='blue' /> : (
                            <>
                          <View style={styles.button}>
                                <Button title='Sign in' color='white' onPress={signIn} />
                            </View>
                            <View style={styles.button}>
                                <Button title='Create account' color='white' onPress={signUp} />
                            </View>
                            </>
                        )}
                            <Button style={styles.skip} title='Skip' onPress={() => navigation.navigate("Stamps")} /> 
                        </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent', // Transparent button
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        width: '80%', // Set a fixed width for the input space
        height: 50,
        marginBottom: 10,
        fontSize: 20,
        color: 'white',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    skip: {
        color: 'grey',
        fontSize: 5,
    },
    box: {
        height: 117,
        width: 391,
      },
    rectangle: {
        width: '90%',
        height: 117,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.00)',
        opacity: 0.35,
        backgroundColor: 'rgba(213, 213, 213, 0.16)',
        shadowColor: 'rgba(255, 255, 255, 0.70)',
        marginBottom:"5%",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 28,
        elevation: 5, // For Android shadow
        borderBottomWidth: 0, // For Android shadow
        borderTopWidth: 0, // For Android shadow
        borderRightWidth: 0, // For Android shadow
        borderLeftWidth: 0, // For Android shadow
      },
      innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    signInTexter: {
        color: '#FFFFFF',
        textAlign: 'center',
        textShadowColor: 'rgba(255, 255, 255, 0.50)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontSize: 40,
        alignSelf: 'center',
        marginTop: '9%',
},
});
