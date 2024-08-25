import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, Animated, StyleSheet, TouchableOpacity, Text, Image, Platform, } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import FlagImage from '../Multiple/FlagImage';
import DisplayNumber from '../Multiple/DisplayNumber';
import LottieView from 'lottie-react-native';

// const EndgameThree = ({ longitude1, latitude1, longitude2,latitude2,country1,country2, capital1, capital2,
//   score,onButtonPressReset,PinTop1,PinLeft1,PinTop2,PinLeft2 }) => {

const EndgameThree = ({ population1,population2,size1,size2,country1,country2, score, game, onButtonPressReset }) => {

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const isIpad = Platform.isPad;
    const translateYDown = useRef(new Animated.Value(-screenHeight / 2)).current;
    const translateYUp = useRef(new Animated.Value(screenHeight / 2)).current;
    const [showContent, setShowContent] = useState(false);
    const [showContent2, setShowContent2] = useState(false);

    const [onHighScore, setOnHighScore] = useState(false)
    const [storedHighScore, setStoredHighScore] = useState(0);

    const updateHighScore = async (score) => {
        try {
            let continentKey;
            if (game === 'SizeGame') {
                continentKey = 'highScoreSizeGame';
            }else{
                continentKey = 'highScorePopulationGame';
            }
            const storedHighScore = await AsyncStorage.getItem(continentKey);
            let highScore = storedHighScore ? parseInt(storedHighScore) : 0;
            if (score > highScore) {
                highScore = score;
                await AsyncStorage.setItem(continentKey, highScore.toString());
                setOnHighScore(true);
            }
            setStoredHighScore(highScore);
        } catch (error) {
            console.error('Error updating high score:', error);
        }
    };



    useEffect(() => {
        const startAnimation = () => {
            updateHighScore(score)
            Animated.parallel([
                Animated.timing(translateYDown, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(translateYUp, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setShowContent(true);
                setTimeout(() => {
                    setShowContent2(true);
                }, 1200);
            });
        };
        setTimeout(startAnimation, 1200);
    }, [translateYDown, translateYUp]);

    const navigation = useNavigation();

    const handleNavigateHome = () => {
        navigation.navigate('MoreGame');
    };

    const highScoreImage = require('../../Photos/HighScore.png');


    const [showFirst, setShowFirst] = useState(false);
    const hasShownRef = useRef(false);

    useEffect(() => {
        if (!hasShownRef.current) {
            const firstTimeout = setTimeout(() => setShowFirst(true), 200); // Waits 2 seconds to show the first one
            const hideTimeout = setTimeout(() => {
                setShowFirst(false);
            }, 5000); // All animations disappear after 5.8 seconds (2s delay + 3s visibility + 0.8s delay)

            hasShownRef.current = true; // Set this to true after the animation has been shown

            return () => {
                clearTimeout(firstTimeout);
                clearTimeout(hideTimeout);
            };
        }
    }, []);



    return (
        <View style={{ width: screenWidth, height: screenHeight, position: 'absolute', zIndex: 100 }}>

            {showContent === false ? (
                <>
                    <Animated.View style={[styles.blurContainer, { top: 0, transform: [{ translateY: translateYDown }] }]}>
                        <BlurView style={[styles.absolute, { width: screenWidth }]} blurType="light" blurAmount={6} />
                    </Animated.View>
                    <Animated.View style={[styles.blurContainer, { bottom: 0, transform: [{ translateY: translateYUp }] }]}>
                        <BlurView style={[styles.absolute, { width: screenWidth }]} blurType="light" blurAmount={6} />
                    </Animated.View>
                </>
            ):(




                <BlurView style={styles.content} blurType="light" blurAmount={6} >
                    {showContent2 && (

                        <>


                            <View style={{
                                position: 'absolute',
                                width: screenWidth * 0.902,
                                height: screenWidth * 1.2,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                top: isIpad ? screenWidth * 0.1 : null,
                            }}>

                                {score > 3 && onHighScore && (
                                    <Image
                                        resizeMode="stretch"
                                        source={highScoreImage}
                                        style={{
                                            width: screenWidth * 0.9,
                                            height: screenWidth * 0.2,
                                            marginTop: Platform.OS === 'android' ? -screenWidth * 0.14 : -screenWidth * 0.098,
                                            zIndex: 100,
                                            position: 'absolute',
                                        }} /> )}



                                <View style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: screenWidth * 1.2,
                                    backgroundColor: '#2c8ed7',
                                    borderRadius: screenWidth * 0.055,
                                    overflow: 'hidden',
                                    borderWidth: screenWidth * 0.01,
                                    borderColor: 'black'
                                }}>


                                    <LinearGradient


                                        colors={['#2c8ed7', '#2cd37c']}

                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            overflow: 'hidden' // Keep overflow hidden here
                                        }}
                                    >

                                        <View style={{width: '100%', height: screenWidth * 0.22,}}>
                                            <DisplayNumber number={score} sizeW={0.9} sizeH={0.22} left={0} />
                                        </View>

                                        <View style={{width: '100%', height: screenWidth * 0.6,  flexDirection: 'row', justifyContent: 'space-evenly',  }}>


                                            <View style={{backgroundColor: '#8d5da2', width: screenWidth * 0.42, height: screenWidth * 0.6, borderRadius: screenWidth * 0.02, }}>
                                                <View style={{width: '100%', height: screenWidth * 0.15, justifyContent: 'space-evenly'}}>

                                                    <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                                                        fontFamily: 'Chalkboard SE',}}>{country1}</Text>

                                                </View>
                                                <View style={{width: '100%', height: screenWidth * 0.45, justifyContent: 'space-between'}}>
                                                    <View style={{width: screenWidth * 0.351,
                                                        height: screenWidth * 0.246, alignSelf: 'center',}}>
                                                        <FlagImage country={country1} />
                                                    </View>
                                                    <View>
                                                        {game === 'SizeGame' ? (
                                                            <>
                                                                <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                                                                    fontFamily: 'Chalkboard SE',}}>{'size of country: '}</Text>
                                                                <View style={{margin: screenWidth * 0.005}}/>
                                                                <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                                                                    fontFamily: 'Chalkboard SE',}}>{size1}</Text>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                                                                    fontFamily: 'Chalkboard SE',}}>{'popution of country: '}</Text>
                                                                <View style={{margin: screenWidth * 0.005}}/>
                                                                <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                                                                    fontFamily: 'Chalkboard SE',}}>{population1 + ' people'}</Text>
                                                            </>
                                                        )}
                                                    </View>
                                                    <View/>
                                                </View>
                                            </View>


                                            <View style={{backgroundColor: '#d56c2a', width: screenWidth * 0.42, height: screenWidth * 0.6, borderRadius: screenWidth * 0.02, }}>
                                                <View style={{width: '100%', height: screenWidth * 0.15, justifyContent: 'space-evenly'}}>
                                                    <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                                                        fontFamily: 'Chalkboard SE',}}>{country2}</Text>
                                                </View>
                                                <View style={{width: '100%', height: screenWidth * 0.45,justifyContent: 'space-between'}}>
                                                    <View style={{width: screenWidth * 0.351,
                                                        height: screenWidth * 0.246, alignSelf: 'center',}}>
                                                        <FlagImage country={country2} />
                                                    </View>
                                                    <View>
                                                        {game === 'SizeGame' ? (
                                                            <>
                                                                <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                                                                    fontFamily: 'Chalkboard SE',}}>{'size of country: '}</Text>
                                                                <View style={{margin: screenWidth * 0.005}}/>
                                                                <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                                                                    fontFamily: 'Chalkboard SE',}}>{size2}</Text>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                                                                    fontFamily: 'Chalkboard SE',}}>{'popution of country: '}</Text>
                                                                <View style={{margin: screenWidth * 0.005}}/>
                                                                <Text style={{color: 'black',fontSize: screenWidth * 0.035, alignSelf: 'center',
                                                                    fontFamily: 'Chalkboard SE',}}>{population2 + ' people'}</Text>
                                                            </>
                                                        )}
                                                    </View>
                                                    <View/>
                                                </View>
                                            </View>


                                        </View>




                                        <View style={{       width: '100%', height: screenWidth * 0.14, alignItems: 'center',
                                            justifyContent: 'space-evenly', flexDirection: 'row',  }}>
                                            <TouchableOpacity onPress={onButtonPressReset}>
                                                <Image
                                                    source={require('../../Photos/Retry.png')}
                                                    style={{
                                                        width: screenWidth * 0.32,
                                                        height: screenWidth * 0.14
                                                    }}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleNavigateHome}>
                                                <Image
                                                    source={require('../../Photos/Done.png')}
                                                    style={{
                                                        width: screenWidth * 0.32,
                                                        height: screenWidth * 0.14
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>


                                    </LinearGradient>


                                    {score > 3 && onHighScore && showFirst && (
                                        <LottieView
                                            source={require('../../Photos/Confettie.json')}
                                            autoPlay
                                            style={{
                                                width: screenWidth,
                                                position: 'absolute',
                                                height: screenWidth,
                                                zIndex: 100,
                                            }}
                                        />)}

                                </View>
                            </View>

                        </>
                    )}
                </BlurView>
            )}
        </View>

    );
};

const styles = StyleSheet.create({
    blurContainer: {
        position: 'absolute',
        width: '100%',
        height: '50%',
    },
    absolute: {
        position: 'absolute',
        height: '100%',
    },
    content: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EndgameThree;