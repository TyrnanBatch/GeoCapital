import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Animated, Dimensions, Platform, Text, Alert, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import InsideViewStats from '../StatsPage/InsideViewStats';
import InsideView from './InsideView';
import InsideTopView from './InsideTopView';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomeScreen = () => {
    const navigation = useNavigation();

    const slideAnim = useRef(new Animated.Value(1)).current;
    const slideAnim2 = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current; // Set initial opacity to 0 for fade-in
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState('Easy');


    const [gamesPlayed, setGamesPlayed] = useState(0);

    const getGamesPlayed = async () => {
        try {
            const value = await AsyncStorage.getItem('gamesPlayed');
            if (value !== null) {
                setGamesPlayed(parseInt(value, 10)); // set state with the retrieved value
            }
        } catch (error) {
            console.error('Error fetching gamesPlayed from AsyncStorage:', error);
        }
    };


    useFocusEffect(
        React.useCallback(() => {
            getGamesPlayed()
            // Reset animation values on screen focus
            slideAnim.setValue(1);
            slideAnim2.setValue(1);
            fadeAnim.setValue(0); // Reset the fade animation value
            setIsExpanded(false);
            setIsExpanded2(false);

            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: false,
                    }),
                    Animated.timing(slideAnim2, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: false,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1, // Fade in InsideTopView
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 300); // 0.3 second delay
        }, [slideAnim, slideAnim2, fadeAnim])
    );

    const toggleSlide = () => {
        Animated.timing(slideAnim, {
            toValue: isExpanded ? 0 : 1,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            setIsExpanded(!isExpanded);
        });
    };

    const toggleSlide2 = () => {
        Animated.timing(slideAnim2, {
            toValue: isExpanded2 ? 0 : 1,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            setIsExpanded2(!isExpanded2);
        });
    };

    const fadeOutTopView = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const slideUp = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, screenHeight]
    });

    const slideUp2 = slideAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, screenHeight]
    });

    toggleMainInstruction = () => {
        fadeOutTopView();
        setTimeout(() => {
            toggleSlide();
            toggleSlide2();
        }, 200);
        setTimeout(() => {
            navigation.navigate('Instruction');
        }, 1400);
    }

    const toggleSlideMain = () => {
        fadeOutTopView();
        setTimeout(() => {
            toggleSlide();
            toggleSlide2();
        }, 200);
        setTimeout(() => {
            if (selectedLevel === 'Easy') {
                navigation.navigate('MainGameIos');
            } else {
                navigation.navigate('MainGameLevel', { selectedLevel });
            }
        }, 1400);
    };

    const toggleSlideList = () => {
        navigation.navigate('List');
    };

    const toggleSlideGame = () => {
        fadeOutTopView();
        setTimeout(() => {
            toggleSlide();
            toggleSlide2();
        }, 200);
        setTimeout(() => {
            navigation.navigate('MoreGame');
        }, 1400);
    };

    return (
        <>
            <LinearGradient
                colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
                style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <InsideTopView />
                    </Animated.View>
                </View>
                <View style={{ flex: 5 }}>
                    <Animated.View style={[styles.bottomSection2, { transform: [{ translateY: slideUp }] }]}>
                        <InsideViewStats toggleSlide2={toggleSlide2} />
                    </Animated.View>
                    <Animated.View style={[styles.bottomSection, { transform: [{ translateY: slideUp2 }] }]}>
                        <InsideView
                            toggleSlideMain={toggleSlideMain}
                            toggleSlideGame={toggleSlideGame}
                            toggleSlideList={toggleSlideList}
                            toggleSlidePress={toggleSlide2}
                            selectedLevel={selectedLevel}
                            setSelectedLevel={setSelectedLevel}
                            gamesPlayed={gamesPlayed}
                            toggleMainInstruction={toggleMainInstruction}
                        />
                    </Animated.View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topSection: {
        flex: 2.2,
        width: '100%',
    },
    bottomSection: {
        flex: 5,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'black',
        borderTopLeftRadius: screenWidth * 0.06,
        borderTopRightRadius: screenWidth * 0.06,
        height: '101%',
    },
    bottomSection2: {
        flex: 5,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'white',
        borderTopLeftRadius: screenWidth * 0.06,
        borderTopRightRadius: screenWidth * 0.06,
        height: '100%',
    },
});

export default HomeScreen;