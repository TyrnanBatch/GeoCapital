import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Platform, Dimensions, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const ButtonComponent = ({ mainHandlePress }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }).start(() => {
            mainHandlePress();
        });
    };

    const scale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.95], // Adjust the value as needed to scale down the image
    });

    useFocusEffect(
        React.useCallback(() => {
            // Reset the animation value when the screen comes into focus
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }).start();
        }, [animatedValue])
    );

    return (
        <TouchableOpacity onPress={handlePress} >
            {Platform.isPad ? (
                <View style={styles.padContainer}>
                    <Animated.Image
                        source={require('../../Photos/button.png')}
                        style={[styles.photo, { transform: [{ scale }] }]}
                        resizeMode="stretch"
                    />
                </View>
            ) : (
                <View style={styles.phoneContainer}>
                    <Animated.Image
                        source={require('../../Photos/button.png')}
                        style={[styles.photo, { transform: [{ scale }] }]}
                        resizeMode="stretch"
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    padContainer: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneContainer: {
        width: screenWidth * 0.42,
        height: screenWidth * 0.42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
});

export default ButtonComponent;