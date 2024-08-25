import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const InsideTopView = () => {
    return (
        <SafeAreaView>
            <View style={styles.pinkSection}>
                <Image
                    source={require('../../Photos/Map/WorldMapFinal.png')} // local photo
                    style={styles.photo}
                    resizeMode="contain"
                />
                <Image
                    source={require('../../Photos/Map/MovingPins.gif')}
                    style={styles.photo}
                    resizeMode="contain"
                />

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    pinkSection: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: screenWidth,
        height: '100%',
        position: 'absolute',
    },
});

export default InsideTopView;
