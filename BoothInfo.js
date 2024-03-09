import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ImageBackground } from 'react-native';

const BoothInfo = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/placeholderImage.png')} style={styles.imageBackground}>
            <View>
                <View >
                    <TouchableOpacity style={styles.button} onPress={togglePopup}>
                        <Text style={styles.buttonText}>Placeholder</Text>
                    </TouchableOpacity>
                </View>
            </View>
                <Modal visible={showPopup} animationType="fade" transparent>
                    <View style={styles.popup}>
                        <Text style={styles.popupText}>Extra Information</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={togglePopup}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                </ImageBackground >
        </View>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'grey',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    popup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    popupText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default BoothInfo;