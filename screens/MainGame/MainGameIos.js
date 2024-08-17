// import React, { useState, useRef, useEffect } from 'react';
// import { View, Dimensions, Animated, PanResponder, Text, TouchableOpacity, Image, Easing, Platform } from 'react-native';
// import { data } from '../../files/capitalData';
// import { useNavigation } from '@react-navigation/native';
// import DisplayWord from '../Multiple/DisplayWord';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import SwipeCard from '../SwipeCard/SwipeCard';
// import EndGame from '../EndGame/EndGame';
// import GameTopBar from '../Multiple/GameTopBar';
// import LinearGradient from 'react-native-linear-gradient';
// import useSoundPlayer from '../Multiple/useSoundPlayer';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const MainGameIos = () => {
//   const navigation = useNavigation();

//   const leftPosition = useRef(new Animated.Value(-screenWidth)).current;
//   const rightPosition = useRef(new Animated.Value(screenWidth)).current;
//   const [isLeftSwiped, setIsLeftSwiped] = useState(false);
//   const [isRightSwiped, setIsRightSwiped] = useState(false);
//   const [counter, setCounter] = useState(0);
//   const [previousEntries, setPreviousEntries] = useState([]);
//   const [randomEntry, setRandomEntry] = useState(null);
//   const [secondRandomEntry, setSecondRandomEntry] = useState(null);
//   const [gifUrl, setGifUrl] = useState(require('../../Photos/TimerMove.gif'));
//   const [key, setKey] = useState(Date.now());
//   const [isGifPlaying, setIsGifPlaying] = useState(true);
//   const [direction, setDirection] = useState('North');
//   const [leftShown, setLeftShown] = useState(true);
//   const [rightShown, setRightShown] = useState(true);
//   const [backgroundColor, setBackgroundColor] = useState(null);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [topBar, setTopBar] = useState(false);
//   const [gifVisible, setGifVisible] = useState(false);
//   const gifOpacity = useRef(new Animated.Value(0)).current; // Animated value for GIF opacity
//   const { playSoundCorrect, playSoundWrong } = useSoundPlayer();
//   const swipingDisabled = useRef(false);
//   const [resetTrigger, setResetTrigger] = useState(false);

//   const incrementGamesPlayed = async () => {
//     try {
//       const gamesPlayed = parseInt(await AsyncStorage.getItem('gamesPlayed')) || 0;
//       await AsyncStorage.setItem('gamesPlayed', (gamesPlayed + 1).toString());
//     } catch (error) {
//       console.error('Error updating gamesPlayed:', error);
//     }
//   };
  
//   useEffect(() => { incrementGamesPlayed(); }, []);

//   useEffect(() => {
//     changeDirection();
//     const getRandomEntry = () => data[Math.floor(Math.random() * data.length)];

//     const initialRandomEntry = getRandomEntry();
//     setRandomEntry(initialRandomEntry);

//     let initialSecondRandomEntry;
//     do {
//       initialSecondRandomEntry = getRandomEntry();
//     } while (initialSecondRandomEntry === initialRandomEntry);
//     setSecondRandomEntry(initialSecondRandomEntry);

//     // Delay the animation by 0.5 seconds
//     setTimeout(() => {
//       Animated.parallel([
//         Animated.timing(leftPosition, {
//           toValue: 0,
//           duration: 800,
//           useNativeDriver: true,
//         }),
//         Animated.timing(rightPosition, {
//           toValue: 0,
//           duration: 800,
//           useNativeDriver: true,
//         }),
//       ]).start();
//       setTopBar(true);
//       handleRestartGif();
//       setGifVisible(true);
//       // Fade in the GIF when it becomes visible
//       Animated.timing(gifOpacity, {
//         toValue: 1,
//         duration: 2000,
//         useNativeDriver: true,
//       }).start();
//     }, 800);
//   }, [resetTrigger]);


//   const onButtonPressReset = () => {
//     incrementGamesPlayed()
//     setCounter(0);
//     gifOpacity.setValue(0);
//     setTopBar(false)
//     setPreviousEntries([]);
//     // setRedBackground(false)
//     setLeftShown(true);
//     setRightShown(true);
//     setBackgroundColor(null);
//     setLoseGame(false);
//     setGifVisible(false)
//     // setGifDone(false)
//     leftPosition.setValue(-screenWidth);
//     rightPosition.setValue(screenWidth);
//     swipingDisabled.current = false;
//     setResetTrigger(prev => !prev); // Toggle the resetTrigger to trigger useEffect
//   };



//   const resetPosition = (position) => {
//     Animated.timing(position, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start(() => setIsAnimating(false));
//   };

//   const handleSwipe = (position, setSwiped, direction) => {
//     setIsAnimating(true);
//     Animated.timing(position, {
//       toValue: direction === 'left' ? -screenWidth : screenWidth,
//       duration: 400,
//       useNativeDriver: true,
//     }).start(() => {
//       if (direction === 'left') {
//         leftCounter();
//       } else {
//         rightCounter();
//       }
//       setTimeout(() => {
//         setSwiped(false);
//         resetPosition(position);
//       }, 1000);
//     });
//   };

//   const rightCounter = () => {
//     checkScoreRight();
//   };

//   const leftCounter = () => {
//     checkScoreLeft();
//   };


//   const leftPanResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => !isAnimating && !swipingDisabled.current, // Check if animation is in progress or swiping is disabled
//     onPanResponderMove: (_, gestureState) => {
//       if (!isAnimating && !swipingDisabled.current && gestureState.moveX <= screenWidth / 2 && gestureState.dx <= 0) {
//         leftPosition.setValue(gestureState.dx);
//       }
//     },
//     onPanResponderRelease: (_, { dx }) => {
//       if (!swipingDisabled.current && dx < -40) {
//         handleSwipe(leftPosition, setIsLeftSwiped, 'left');
//       } else {
//         resetPosition(leftPosition);
//       }
//     },
//   });
  
//   const rightPanResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => !isAnimating && !swipingDisabled.current, // Check if animation is in progress or swiping is disabled
//     onPanResponderMove: (_, gestureState) => {
//       if (!isAnimating && !swipingDisabled.current && gestureState.moveX >= screenWidth / 2 && gestureState.dx >= 0) {
//         rightPosition.setValue(gestureState.dx);
//       }
//     },
//     onPanResponderRelease: (_, { dx }) => {
//       if (!swipingDisabled.current && dx > 40) {
//         handleSwipe(rightPosition, setIsRightSwiped, 'right');
//       } else {
//         resetPosition(rightPosition);
//       }
//     },
//   });


//   const displayData = () => {
//     const getRandomEntry = () => data[Math.floor(Math.random() * data.length)];
//     let newRandomEntry;
//     do {
//       newRandomEntry = getRandomEntry();
//     } while (newRandomEntry === secondRandomEntry);
//     setRandomEntry(newRandomEntry);
//   };

//   const displaySecondData = () => {
//     const getRandomEntry = () => data[Math.floor(Math.random() * data.length)];
//     let newSecondRandomEntry;
//     do {
//       newSecondRandomEntry = getRandomEntry();
//     } while (newSecondRandomEntry === randomEntry);
//     setSecondRandomEntry(newSecondRandomEntry);
//   };


//   useEffect(() => {
//     // Set swipingDisabled to false at the start
//     swipingDisabled.current = false;
  
//     // Timer to disable swiping after 7 seconds
//     const disableSwipingTimeout = setTimeout(() => {
//       swipingDisabled.current = true; // Disable swiping after 7 seconds
//     }, 9000); // 7 seconds in milliseconds
  
//     // Timer for the 10-second GIF duration
//     const gifDuration = 10000; // 10 seconds in milliseconds
//     const timer = setTimeout(() => {
//       setIsGifPlaying(false);
//       setLoseGame(true);
//       setBackgroundColor('red');
//       playSoundWrong()
//     }, gifDuration);
  
//     // Cleanup timers when the effect is cleaned up
//     return () => {
//       clearTimeout(disableSwipingTimeout);
//       clearTimeout(timer);
//     };
//   }, [key]);
  
//   const handleRestartGif = () => {
//     setKey(Date.now());
//     setIsGifPlaying(true);
//     swipingDisabled.current = false; // Re-enable swiping when restarting the GIF
//   };

//   const changeDirection = () => {
//     const directions = ['North', 'East', 'South', 'West'];
//     const randomDirection = directions[Math.floor(Math.random() * directions.length)];
//     setDirection(randomDirection);
//   };

//   const [loseGame, setLoseGame] = useState(false);

//   const checkScoreRight = () => {
//     const leftLongitude = parseFloat(randomEntry.longitude);
//     const rightLongitude = parseFloat(secondRandomEntry.longitude);
//     const leftLatitude = parseFloat(randomEntry.latitude);
//     const rightLatitude = parseFloat(secondRandomEntry.latitude);

//     let isCorrect = false;

//     switch (direction) {
//       case 'North':
//         isCorrect = rightLatitude >= leftLatitude;
//         break;
//       case 'South':
//         isCorrect = leftLatitude >= rightLatitude;
//         break;
//       case 'East':
//         isCorrect = rightLongitude >= leftLongitude;
//         break;
//       case 'West':
//         isCorrect = leftLongitude >= rightLongitude;
//         break;
//       default:
//         return;
//     }
//     if (isCorrect) {
//       playSoundCorrect()
//       setBackgroundColor('green');
//       setTimeout(() => {
//         setBackgroundColor(null);
//       }, 600);

//       displaySecondData();
//       CorrectScore();
//     } else {
//       playSoundWrong()
//       setBackgroundColor('red');
//       WrongScore();
//       setRightShown(false);
//     }
//   };

//   const checkScoreLeft = () => {
//     const leftLongitude = parseFloat(randomEntry.longitude);
//     const rightLongitude = parseFloat(secondRandomEntry.longitude);
//     const leftLatitude = parseFloat(randomEntry.latitude);
//     const rightLatitude = parseFloat(secondRandomEntry.latitude);

//     let isCorrect = false;

//     switch (direction) {
//       case 'North':
//         isCorrect = leftLatitude >= rightLatitude;
//         break;
//       case 'South':
//         isCorrect = rightLatitude >= leftLatitude;
//         break;
//       case 'East':
//         isCorrect = leftLongitude >= rightLongitude;
//         break;
//       case 'West':
//         isCorrect = rightLongitude >= leftLongitude;
//         break;
//       default:
//         return;
//     }
//     if (isCorrect) {
//       playSoundCorrect()
//       setBackgroundColor('green');
//       setTimeout(() => {
//         setBackgroundColor(null);
//       }, 600);
//       displayData();
//       CorrectScore();
//     } else {
//       playSoundWrong()
//       setBackgroundColor('red');
//       setLeftShown
//       (false);
//       WrongScore();
//     }
//   };

//   const CorrectScore = () => {
//     setCounter((prevCounter) => prevCounter + 1);
//     handleRestartGif();
//     changeDirection();
//   };

//   const WrongScore = () => {
//     setIsGifPlaying(false);
//     setLoseGame(true);
//   };

//   const translateX = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const animateBackground = () => {
//       Animated.loop(
//         Animated.timing(translateX, {
//           toValue: -screenWidth * 5.3,
//           duration: 60000,
//           easing: Easing.linear,
//           useNativeDriver: true,
//         })
//       ).start();
//     };

//     animateBackground();
//   }, [translateX]);

//   return (
//     <>
//       <LinearGradient
//         colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
//         style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
//       />

//       <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: backgroundColor }}>
//         {topBar && (
//           <GameTopBar direction={direction} count={counter} />
//         )}

//         <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
//           <View style={{ width: screenWidth, height: screenWidth * 0.8, flexDirection: 'row' }}>
//             <View style={{ width: screenWidth * 0.5, height: screenWidth * 0.8, justifyContent: 'center' }}>
//               {leftShown && (
//                 <Animated.View
//                   {...leftPanResponder.panHandlers}
//                   style={{
//                     width: screenWidth * 0.46,
//                     height: screenWidth * 0.8,
//                     marginLeft: screenWidth * 0.024,
//                     backgroundColor: 'white',
//                     borderRadius: screenWidth * 0.04,
//                     shadowColor: 'black',
//                     shadowOffset: { width: 4, height: 4 },
//                     shadowOpacity: 0.8,
//                     shadowRadius: 10,
//                     elevation: 10,
//                     transform: [{ translateX: leftPosition }],
//                   }}
//                 >
//                   {randomEntry && (
//                     <SwipeCard
//                       country={randomEntry.country}
//                       capital={randomEntry.capital}
//                       latitude={randomEntry.latitude}
//                       longitude={randomEntry.longitude}
//                       position={'left'}
//                     />
//                   )}
//                 </Animated.View>
//               )}
//             </View>
//             <View style={{ width: screenWidth * 0.5, height: screenWidth * 0.8, justifyContent: 'center' }}>
//               {rightShown && (
//                 <Animated.View
//                   {...rightPanResponder.panHandlers}
//                   style={{
//                     width: screenWidth * 0.46,
//                     height: screenWidth * 0.8,
//                     marginLeft: screenWidth * 0.016,
//                     backgroundColor: 'white',
//                     borderRadius: screenWidth * 0.04,
//                     shadowColor: 'black',
//                     shadowOffset: { width: 4, height: 4 },
//                     shadowOpacity: 0.8,
//                     shadowRadius: 10,
//                     elevation: 10,
//                     transform: [{ translateX: rightPosition }],
//                   }}
//                 >
//                   {secondRandomEntry && (
//                     <SwipeCard
//                       country={secondRandomEntry.country}
//                       capital={secondRandomEntry.capital}
//                       latitude={secondRandomEntry.latitude}
//                       longitude={secondRandomEntry.longitude}
//                       position={'right'}
//                     />
//                   )}
//                 </Animated.View>
//               )}
//             </View>
//           </View>


//           {gifVisible && (
//             <Animated.View style={{ opacity: gifOpacity }}>
//               <View style={{ height: screenWidth * 0.3, width: screenWidth,alignItems: 'center', justifyContent: 'center'  }}>
                
//                  <Image
//                   key={key}
//                   source={gifUrl}
//                   style={{ width: '85%', height: '100%' }}
//                   resizeMode="streach"
//                 /> 

//               {!isGifPlaying && (
//    <Image 
//    source={require('../../Photos/TimerDone.png')}
//    style={{ width: '85%', height: '100%', position: 'absolute',  }}
//    resizeMode="streach"
//  />
// )}
//               </View>
//             </Animated.View>
//           )}


//         </View>
//         {loseGame && (
//           <EndGame
//             longitude1={randomEntry.longitude}
//             latitude1={randomEntry.latitude}
//             longitude2={secondRandomEntry.longitude}
//             latitude2={secondRandomEntry.latitude}
//             country1={randomEntry.country}
//             country2={secondRandomEntry.country} 
//             capital1={randomEntry.capital}
//             capital2={secondRandomEntry.capital} 
//             score={counter}
//             onButtonPressReset={onButtonPressReset}
//           /> )}
        
//       </SafeAreaView>
//     </>
//   );
// };

// export default MainGameIos;











import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Animated, PanResponder, Text, TouchableOpacity, Image, Easing, Platform } from 'react-native';
import { data } from '../../files/capitalData';
import { useNavigation } from '@react-navigation/native';
import DisplayWord from '../Multiple/DisplayWord';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SwipeCard from '../SwipeCard/SwipeCard';
import EndGame from '../EndGame/EndGame';
import GameTopBar from '../Multiple/GameTopBar';
import LinearGradient from 'react-native-linear-gradient';
import useSoundPlayer from '../Multiple/useSoundPlayer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MainGameIos = () => {
  const navigation = useNavigation();

  const leftPosition = useRef(new Animated.Value(-screenWidth)).current;
  const rightPosition = useRef(new Animated.Value(screenWidth)).current;
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [topBar, setTopBar] = useState(false);
  const [gifVisible, setGifVisible] = useState(false);
  const gifOpacity = useRef(new Animated.Value(0)).current; // Animated value for GIF opacity
  const { playSoundCorrect, playSoundWrong } = useSoundPlayer();
  const swipingDisabled = useRef(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [hasPlayedWrongSound, setHasPlayedWrongSound] = useState(false); // New state variable
  const [loseGame, setLoseGame] = useState(false);

  const incrementGamesPlayed = async () => {
    try {
      const gamesPlayed = parseInt(await AsyncStorage.getItem('gamesPlayed')) || 0;
      await AsyncStorage.setItem('gamesPlayed', (gamesPlayed + 1).toString());
    } catch (error) {
      console.error('Error updating gamesPlayed:', error);
    }
  };
  
  useEffect(() => { incrementGamesPlayed(); }, []);

  useEffect(() => {
    changeDirection();
    const getRandomEntry = () => data[Math.floor(Math.random() * data.length)];

    const initialRandomEntry = getRandomEntry();
    setRandomEntry(initialRandomEntry);

    let initialSecondRandomEntry;
    do {
      initialSecondRandomEntry = getRandomEntry();
    } while (initialSecondRandomEntry === initialRandomEntry);
    setSecondRandomEntry(initialSecondRandomEntry);

    // Delay the animation by 0.5 seconds
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
      // Fade in the GIF when it becomes visible
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
    setLeftShown(true);
    setRightShown(true);
    setBackgroundColor(null);
    setLoseGame(false);
    setGifVisible(false);
    leftPosition.setValue(-screenWidth);
    rightPosition.setValue(screenWidth);
    swipingDisabled.current = false;
    setResetTrigger((prev) => !prev);
    setHasPlayedWrongSound(false); // Reset the wrong sound flag
  };

  const resetPosition = (position) => {
    Animated.timing(position, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setIsAnimating(false));
  };

  const handleSwipe = (position, setSwiped, direction) => {
    setIsAnimating(true);
    Animated.timing(position, {
      toValue: direction === 'left' ? -screenWidth : screenWidth,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      if (direction === 'left') {
        leftCounter();
      } else {
        rightCounter();
      }
      setTimeout(() => {
        setSwiped(false);
        resetPosition(position);
      }, 1000);
    });
  };

  const rightCounter = () => {
    checkScoreRight();
  };

  const leftCounter = () => {
    checkScoreLeft();
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
    // Set swipingDisabled to false at the start
    swipingDisabled.current = false;
  
    // Timer to disable swiping after 7 seconds
    const disableSwipingTimeout = setTimeout(() => {
      swipingDisabled.current = true; // Disable swiping after 7 seconds
    }, 9000); // 7 seconds in milliseconds
  
    // Timer for the 10-second GIF duration
    const gifDuration = 10000; // 10 seconds in milliseconds
    const timer = setTimeout(() => {
      if (!loseGame) { // Check if the user has already lost
        setIsGifPlaying(false);
        setLoseGame(true);
        setBackgroundColor('red');
        if (!hasPlayedWrongSound) { // Only play the wrong sound if it hasn't been played yet
          playSoundWrong();
          setHasPlayedWrongSound(true); // Mark the wrong sound as played
        }
      }
    }, gifDuration);
  
    // Cleanup timers when the effect is cleaned up
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

  const changeDirection = () => {
    const directions = ['North', 'East', 'South', 'West'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    setDirection(randomDirection);
  };

  const checkScoreRight = () => {
    const leftLongitude = parseFloat(randomEntry.longitude);
    const rightLongitude = parseFloat(secondRandomEntry.longitude);
    const leftLatitude = parseFloat(randomEntry.latitude);
    const rightLatitude = parseFloat(secondRandomEntry.latitude);

    let isCorrect = false;

    switch (direction) {
      case 'North':
        isCorrect = rightLatitude >= leftLatitude;
        break;
      case 'South':
        isCorrect = leftLatitude >= rightLatitude;
        break;
      case 'East':
        isCorrect = rightLongitude >= leftLongitude;
        break;
      case 'West':
        isCorrect = leftLongitude >= rightLongitude;
        break;
      default:
        return;
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
      setBackgroundColor('red');
      WrongScore();
      setRightShown(false);
    }
  };

  const checkScoreLeft = () => {
    const leftLongitude = parseFloat(randomEntry.longitude);
    const rightLongitude = parseFloat(secondRandomEntry.longitude);
    const leftLatitude = parseFloat(randomEntry.latitude);
    const rightLatitude = parseFloat(secondRandomEntry.latitude);

    let isCorrect = false;

    switch (direction) {
      case 'North':
        isCorrect = leftLatitude >= rightLatitude;
        break;
      case 'South':
        isCorrect = rightLatitude >= leftLatitude;
        break;
      case 'East':
        isCorrect = leftLongitude >= rightLongitude;
        break;
      case 'West':
        isCorrect = rightLongitude >= leftLongitude;
        break;
      default:
        return;
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
      setBackgroundColor('red');
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
        {topBar && (
          <GameTopBar direction={direction} count={counter} />
        )}

        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          <View style={{ width: screenWidth, height: screenWidth * 0.8, flexDirection: 'row' }}>
            <View style={{ width: screenWidth * 0.5, height: screenWidth * 0.8, justifyContent: 'center' }}>
              {leftShown && (
                <Animated.View
                  {...leftPanResponder.panHandlers}
                  style={{
                    width: screenWidth * 0.46,
                    height: screenWidth * 0.8,
                    marginLeft: screenWidth * 0.024,
                    // backgroundColor: 'white',
                    borderRadius: screenWidth * 0.04,
                    shadowColor: 'black',
                    shadowOffset: { width: 4, height: 4 },
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
                    elevation: 10,
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
                    // backgroundColor: 'white',
                    borderRadius: screenWidth * 0.04,
                    shadowColor: 'black',
                    shadowOffset: { width: 4, height: 4 },
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
                    elevation: 10,
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
                    />
                  )}
                </Animated.View>
              )}
            </View>
          </View>

          

          {gifVisible && (
            <Animated.View style={{ opacity: gifOpacity }}>
              <View style={{ height: Platform.isPad ? screenWidth * 0.15 : screenWidth * 0.3, width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  key={key}
                  source={gifUrl}
                  style={{ width: Platform.isPad ? '60%' : '85%', height: '100%' }}
                  resizeMode="stretch"
                /> 

                {!isGifPlaying && (
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
          <EndGame
            longitude1={randomEntry.longitude}
            latitude1={randomEntry.latitude}
            longitude2={secondRandomEntry.longitude}
            latitude2={secondRandomEntry.latitude}
            country1={randomEntry.country}
            country2={secondRandomEntry.country} 
            capital1={randomEntry.capital}
            capital2={secondRandomEntry.capital} 
            score={counter}
            onButtonPressReset={onButtonPressReset}
            PinTop1={randomEntry.pinDropY}
            PinLeft1={randomEntry.pinDropX}
            PinTop2={secondRandomEntry.pinDropY}
            PinLeft2={secondRandomEntry.pinDropX}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default MainGameIos;
