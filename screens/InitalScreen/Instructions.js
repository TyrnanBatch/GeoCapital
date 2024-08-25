import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions, Platform, Animated, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const Instructions = () => {
    const [gifSource, setGifSource] = useState(require('../../Photos/OnePhone.gif'));
    const [isFlipped, setIsFlipped] = useState(true);
    const [pressCount, setPressCount] = useState(0);
    const [text1, setText1] = useState('paris is further north than');
    const [text2, setText2] = useState('madrid so swipe paris off the screen');
    const [buttonImage, setButtonImage] = useState(require('../../Photos/Next.png')); // Initial button image
    const [showHand, setShowHand] = useState(true); // New state to control visibility of the moving hand
    const navigation = useNavigation();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleButtonPress = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            // Update the content after fade-out
            if (pressCount === 0) {
                setGifSource(require('../../Photos/TwoPhone.gif'));
                setIsFlipped(false); // Set flipped state to false
                setText1('london is further north than');
                setText2('paris so swipe london off the screen');
                setButtonImage(require('../../Photos/Play.png')); // Change button image to start.png
                setPressCount(pressCount + 1);

                setShowHand(false);
                setTimeout(() => {
                    setShowHand(true); // Show hand after a brief delay
                }, 100);

                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();
            } else if (pressCount === 1) {
                // Fade out before navigating
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => {
                    navigation.navigate('MainGameIos');
                });
            }
        });
    };

    return (
        <>
            <LinearGradient
                colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
                style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            <View style={styles.container}>
                <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', flex: 1, justifyContent: 'space-evenly', }}>

                    <View style={{backgroundColor: 'white', width: screenWidth * 0.8, height: screenWidth * 0.12,
                        justifyContent: 'space-evenly',  shadowColor: 'black',
                        shadowOffset: { width: 4, height: 4 },
                        shadowOpacity: 0.8,
                        shadowRadius: 10,
                        elevation: 10,borderRadius: screenWidth * 0.02}}>

                        <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                            fontFamily: 'Chalkboard SE',}}>{text1}</Text>

                        <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                            fontFamily: 'Chalkboard SE',}}>{text2}</Text>

                        <View/>

                    </View>

                    <View style={styles.greenSection}>
                        <Image
                            source={gifSource}
                            style={styles.photo}
                            resizeMode="contain"
                        />
                        {showHand && ( // Conditionally render the moving hand GIF
                            <Image
                                source={require('../../Photos/MovingHand.gif')}
                                style={[styles.photo, isFlipped && { transform: [{ scaleX: -1 }] }]} // Flip the GIF horizontally if isFlipped is true
                                resizeMode="contain"
                            />
                        )}
                    </View>

                    <TouchableOpacity onPress={handleButtonPress}>
                        <Image
                            source={buttonImage} // Button image based on the state
                            style={styles.button}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    greenSection: {
        width: screenWidth * 0.9,
        height: screenWidth * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: screenWidth * 0.8,
        height: '100%',
        position: 'absolute',
    },
    button: {
        width: screenWidth * 0.32,
        height: screenWidth * 0.14,
        alignSelf: 'center',
    },
});

export default Instructions;
