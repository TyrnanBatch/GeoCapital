import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Animated, PanResponder, Text, TouchableOpacity, Image, Easing, StyleSheet, Platform } from 'react-native';
import { data } from '../../files/capitalData';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SwipeCard from '../SwipeCard/SwipeCard';
import EndGameThree from '../EndGame/EndGameThree';
import GameTopBar from '../Multiple/GameTopBar';
import LinearGradient from 'react-native-linear-gradient';
import useSoundPlayer from '../Multiple/useSoundPlayer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const shuffleArray = (array) => {
    const shuffleOnce = (arr) => {
        let currentIndex = arr.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [
                arr[randomIndex], arr[currentIndex]];
        }
    };
    for (let i = 0; i < 5; i++) {
        shuffleOnce(array);
    }
    return array;
};

const MiniGameTwo = ({ route }) => {
    const { game } = route.params;
    const navigation = useNavigation();
    const leftPosition = useRef(new Animated.Value(-screenWidth)).current;
    const rightPosition = useRef(new Animated.Value(screenWidth)).current;
    const rotation = useRef(new Animated.Value(0)).current;
    const [isLeftSwiped, setIsLeftSwiped] = useState(false);
    const [isRightSwiped, setIsRightSwiped] = useState(false);
    const [counter, setCounter] = useState(0);
    const [previousEntries, setPreviousEntries] = useState([]);
    const [randomEntry, setRandomEntry] = useState(null);
    const [secondRandomEntry, setSecondRandomEntry] = useState(null);
    const [gifUrl, setGifUrl] = useState(require('../../Photos/TimerMove.gif'));
    const [key, setKey] = useState(Date.now());
    const [isGifPlaying, setIsGifPlaying] = useState(true);
    const [direction, setDirection] = useState('North');
    const [leftShown, setLeftShown] = useState(true);
    const [rightShown, setRightShown] = useState(true);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [gifVisible, setGifVisible] = useState(false);
    const [topBar, setTopBar] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loseGame, setLoseGame] = useState(false);
    const gifOpacity = useRef(new Animated.Value(0)).current;
    const { playSoundCorrect, playSoundWrong } = useSoundPlayer();
    const [redBackground, setRedBackground] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(false);
    const [gifDone, setGifDone] = useState(false);
    const [hasPlayedWrongSound, setHasPlayedWrongSound] = useState(false); // New state variable
    const swipingDisabled = useRef(false);

    const incrementGamesPlayed = async () => {
        try {
            const gamesPlayed = parseInt(await AsyncStorage.getItem('gamesPlayed')) || 0;
            await AsyncStorage.setItem('gamesPlayed', (gamesPlayed + 1).toString());
        } catch (error) {
            console.error('Error updating gamesPlayed:', error);
        }
    };

    useEffect(() => {
        incrementGamesPlayed();
    }, []);


    const [shuffledData, setShuffledData] = useState([]);

    useEffect(() => {
        changeDirection();

        // Shuffle the data once when the game starts or resets
        const shuffled = shuffleArray([...data]);
        setShuffledData(shuffled);

        // Set the initial entries from the shuffled array
        setRandomEntry(shuffled[0]);
        setSecondRandomEntry(shuffled[1]);

        setTimeout(() => {
            Animated.parallel([
                Animated.timing(leftPosition, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(rightPosition, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]).start();
            setTopBar(true);
            handleRestartGif();
            setGifVisible(true);
            Animated.timing(gifOpacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }).start();
        }, 800);
    }, [resetTrigger]);

    const onButtonPressReset = () => {
        incrementGamesPlayed();
        setCounter(0);
        gifOpacity.setValue(0);
        setTopBar(false);
        setPreviousEntries([]);
        setRedBackground(false);
        setLeftShown(true);
        setRightShown(true);
        setBackgroundColor(null);
        setLoseGame(false);
        setGifVisible(false);
        setGifDone(false);
        leftPosition.setValue(-screenWidth);
        rightPosition.setValue(screenWidth);
        swipingDisabled.current = false;
        setResetTrigger((prev) => !prev); // Toggle the resetTrigger to trigger useEffect
        setHasPlayedWrongSound(false); // Reset the wrong sound flag
    };

    const resetPosition = (position) => {
        Animated.timing(position, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => setIsAnimating(false)); // Set isAnimating to false when animation ends
    };

    const handleSwipe = (position, setSwiped, direction) => {
        setIsAnimating(true); // Set isAnimating to true when animation starts
        Animated.timing(position, {
            toValue: direction === 'left' ? -screenWidth : screenWidth,
            duration: 400,
            useNativeDriver: true,
        }).start(() => {
            if (direction === 'left') {
                checkScoreLeft();
            } else {
                checkScoreRight();
            }
            setTimeout(() => {
                setSwiped(false);
                resetPosition(position);
            }, 1000);
        });
    };

    const leftPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => !isAnimating && !swipingDisabled.current, // Check if animation is in progress or swiping is disabled
        onPanResponderMove: (_, gestureState) => {
            if (!isAnimating && !swipingDisabled.current && gestureState.moveX <= screenWidth / 2 && gestureState.dx <= 0) {
                leftPosition.setValue(gestureState.dx);
            }
        },
        onPanResponderRelease: (_, { dx }) => {
            if (!swipingDisabled.current && dx < -40) {
                handleSwipe(leftPosition, setIsLeftSwiped, 'left');
            } else {
                resetPosition(leftPosition);
            }
        },
    });

    const rightPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => !isAnimating && !swipingDisabled.current, // Check if animation is in progress or swiping is disabled
        onPanResponderMove: (_, gestureState) => {
            if (!isAnimating && !swipingDisabled.current && gestureState.moveX >= screenWidth / 2 && gestureState.dx >= 0) {
                rightPosition.setValue(gestureState.dx);
            }
        },
        onPanResponderRelease: (_, { dx }) => {
            if (!swipingDisabled.current && dx > 40) {
                handleSwipe(rightPosition, setIsRightSwiped, 'right');
            } else {
                resetPosition(rightPosition);
            }
        },
    });

    const displayData = () => {
        const getRandomEntry = () => data[Math.floor(Math.random() * data.length)];
        let newRandomEntry;
        do {
            newRandomEntry = getRandomEntry();
        } while (newRandomEntry === secondRandomEntry);
        setRandomEntry(newRandomEntry);
    };

    const displaySecondData = () => {
        const getRandomEntry = () => data[Math.floor(Math.random() * data.length)];
        let newSecondRandomEntry;
        do {
            newSecondRandomEntry = getRandomEntry();
        } while (newSecondRandomEntry === randomEntry);
        setSecondRandomEntry(newSecondRandomEntry);
    };

    useEffect(() => {
        swipingDisabled.current = false;

        const disableSwipingTimeout = setTimeout(() => {
            swipingDisabled.current = true; // Disable swiping after 7 seconds
        }, 9000);

        const gifDuration = 10000;
        const timer = setTimeout(() => {
            if (!loseGame) { // Check if the user has already lost
                setIsGifPlaying(false);
                setRedBackground(true);
                if (!hasPlayedWrongSound) { // Only play the wrong sound if it hasn't been played yet
                    playSoundWrong();
                    setHasPlayedWrongSound(true); // Mark the wrong sound as played
                }
                setLoseGame(true);
                setGifDone(true);
            }
        }, gifDuration);

        return () => {
            clearTimeout(disableSwipingTimeout);
            clearTimeout(timer);
        };
    }, [key, loseGame, hasPlayedWrongSound]);

    const handleRestartGif = () => {
        setKey(Date.now());
        setIsGifPlaying(true);
        swipingDisabled.current = false; // Re-enable swiping when restarting the GIF
    };

    useEffect(() => {
        let rotationValue = 90;
        switch (direction) {
            case 'Higher':
                rotationValue = 90;
                break;
            case 'Lower':
                rotationValue = 270;
                break;
        }
        Animated.timing(rotation, {
            toValue: rotationValue,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [direction]);

    const changeDirection = () => {
        const directions = ['Higher', 'Lower'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        setDirection(randomDirection);
    };

    const parseSize = (sizeString) => {
        return parseFloat(sizeString.replace('km²', '').replace(/,/g, '').trim());
    };

    const parsePopulation = (population) => {
        let numericPopulation = parseInt(population.replace(/[^0-9.]/g, ''));
        if (population.includes('billion')) {
            numericPopulation *= 1000000000;
        } else if (population.includes('million')) {
            numericPopulation *= 1000000;
        }
        return numericPopulation;
    };

    const rotationInterpolate = rotation.interpolate({
        inputRange: [90, 270],
        outputRange: ['90deg', '270deg'],
    });

    const checkScoreRight = () => {
        let isCorrect = false;
        if (game === 'SizeGame') {
            const leftSize = parseSize(randomEntry.size);
            const rightSize = parseSize(secondRandomEntry.size);
            switch (direction) {
                case 'Higher':
                    isCorrect = rightSize >= leftSize;
                    break;
                case 'Lower':
                    isCorrect = leftSize >= rightSize;
                    break;
            }
        } else if (game === 'PopulationGame') {
            const leftPopulation = parsePopulation(randomEntry.population);
            const rightPopulation = parsePopulation(secondRandomEntry.population);
            switch (direction) {
                case 'Higher':
                    isCorrect = rightPopulation >= leftPopulation;
                    break;
                case 'Lower':
                    isCorrect = leftPopulation >= rightPopulation;
                    break;
            }
        }

        if (isCorrect) {
            playSoundCorrect();
            setBackgroundColor('green');
            setTimeout(() => {
                setBackgroundColor(null);
            }, 600);
            displaySecondData();
            CorrectScore();
        } else {
            playSoundWrong();
            setRedBackground(true);
            WrongScore();
            setRightShown(false);
        }
    };

    const checkScoreLeft = () => {
        let isCorrect = false;
        if (game === 'SizeGame') {
            const leftSize = parseSize(randomEntry.size);
            const rightSize = parseSize(secondRandomEntry.size);
            switch (direction) {
                case 'Higher':
                    isCorrect = rightSize <= leftSize;
                    break;
                case 'Lower':
                    isCorrect = leftSize <= rightSize;
                    break;
            }
        } else if (game === 'PopulationGame') {
            const leftPopulation = parsePopulation(randomEntry.population);
            const rightPopulation = parsePopulation(secondRandomEntry.population);
            switch (direction) {
                case 'Higher':
                    isCorrect = rightPopulation <= leftPopulation;
                    break;
                case 'Lower':
                    isCorrect = leftPopulation <= rightPopulation;
                    break;
            }
        }

        if (isCorrect) {
            playSoundCorrect();
            setBackgroundColor('green');
            setTimeout(() => {
                setBackgroundColor(null);
            }, 600);
            displayData();
            CorrectScore();
        } else {
            playSoundWrong();
            setRedBackground(true);
            setLeftShown(false);
            WrongScore();
        }
    };

    const CorrectScore = () => {
        setCounter((prevCounter) => prevCounter + 1);
        handleRestartGif();
        changeDirection();
    };

    const WrongScore = () => {
        setIsGifPlaying(false);
        setLoseGame(true);
        setGifDone(true);
    };

    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateBackground = () => {
            Animated.loop(
                Animated.timing(translateX, {
                    toValue: -screenWidth * 5.3,
                    duration: 60000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        };

        animateBackground();
    }, [translateX]);

    return (
        <>
            <LinearGradient
                colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
                style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: backgroundColor }}>
                {redBackground && <View style={styles.redBanner}></View>}
                {topBar && <GameTopBar direction={direction} count={counter} game={game} />}


                <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                    <View style={{ width: screenWidth, height: screenWidth * 0.8, flexDirection: 'row', }}>
                        <View style={{ width: screenWidth * 0.5, height: screenWidth * 0.8, justifyContent: 'center' }}>
                            {leftShown && (
                                <Animated.View
                                    {...leftPanResponder.panHandlers}
                                    style={{
                                        width: screenWidth * 0.46,
                                        height: screenWidth * 0.8,
                                        marginLeft: screenWidth * 0.024,
                                        transform: [{ translateX: leftPosition }],
                                    }}
                                >
                                    {randomEntry && (
                                        <SwipeCard
                                            country={randomEntry.country}
                                            capital={randomEntry.capital}
                                            latitude={randomEntry.latitude}
                                            longitude={randomEntry.longitude}
                                            position={'left'}
                                            game={'country'}
                                        />
                                    )}
                                </Animated.View>
                            )}
                        </View>
                        <View style={{ width: screenWidth * 0.5, height: screenWidth * 0.8, justifyContent: 'center' }}>
                            {rightShown && (
                                <Animated.View
                                    {...rightPanResponder.panHandlers}
                                    style={{
                                        width: screenWidth * 0.46,
                                        height: screenWidth * 0.8,
                                        marginLeft: screenWidth * 0.016,
                                        transform: [{ translateX: rightPosition }],
                                    }}
                                >
                                    {secondRandomEntry && (
                                        <SwipeCard
                                            country={secondRandomEntry.country}
                                            capital={secondRandomEntry.capital}
                                            latitude={secondRandomEntry.latitude}
                                            longitude={secondRandomEntry.longitude}
                                            position={'right'}
                                            game={'country'}
                                        />
                                    )}
                                </Animated.View>
                            )}
                        </View>
                    </View>
                    {gifVisible && (
                        <Animated.View style={{ opacity: gifOpacity,}}>
                            <View style={{ height: Platform.isPad ? screenWidth * 0.15 : screenWidth * 0.3, zIndex: 100, width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>
                                <Image key={key} source={gifUrl} style={{ width: Platform.isPad ? '60%' : '85%', height: '100%' }} resizeMode="stretch" />
                                {gifDone && (
                                    <Image
                                        source={require('../../Photos/TimerDone.png')}
                                        style={{ width: Platform.isPad ? '60%' : '85%', height: '100%', position: 'absolute' }}
                                        resizeMode="stretch"
                                    />
                                )}
                            </View>
                        </Animated.View>
                    )}
                </View>
                {loseGame && (
                    <EndGameThree
                        population1={randomEntry.population}
                        population2={secondRandomEntry.population}
                        size1={randomEntry.size}
                        size2={secondRandomEntry.size}
                        country1={randomEntry.country}
                        country2={secondRandomEntry.country}
                        score={counter}
                        game={game}
                        onButtonPressReset={onButtonPressReset}
                    />
                )}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    redBanner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'red',
    },
});

export default MiniGameTwo;


