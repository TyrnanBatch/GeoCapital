import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const InitialScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Home');
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, [navigation]);

    return (
        <>
            <LinearGradient
                colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
                style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            {Platform.OS === 'android' && ( <View style={{width: '100%', height: screenWidth * 0.03, }} />)}
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <SafeAreaView>
                        <View style={styles.greenSection}>
                            <Image
                                source={require('../../Photos/Map/World_Moving.gif')}
                                style={styles.photo}
                                resizeMode="contain"
                            />
                        </View>
                    </SafeAreaView>
                </View>
                <View style={styles.bottomSection}>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 99,
    },
    topSection: {
        flex: 2,
        width: '100%',
    },
    bottomSection: {
        flex: 5,
        width: '100%',
    },
    greenSection: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    insideText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    photo: {
        width: screenWidth,
        height: '100%',
        position: 'absolute',
    },
});

export default InitialScreen;
