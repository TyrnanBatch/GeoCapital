// import React, { useState, useRef, useEffect } from 'react';
// import { View, Dimensions, Animated, PanResponder, Text, TouchableOpacity, Image, Easing } from 'react-native';
// import { data } from '../../files/capitalData';
// import { useNavigation, useRoute } from '@react-navigation/native';
// // import DisplayWord from '../../Multiple/DisplayWord';
// // import DisplayCount from '../../Multiple/DisplayCount';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import SwipeCardLevel from '../SwipeCard/SwipeCardLevel';
// import SwipeCardLevelHard from '../SwipeCard/SwipeCardLevelHard';
// import EndGameFour from '../EndGame/EndGameFour'
// import GameTopBar from '../Multiple/GameTopBar';
// import LinearGradient from 'react-native-linear-gradient';
// // import useSoundPlayer from '../Multiple/useSoundPlayer';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const MainGameLevel = () => {
//   const route = useRoute();
//   const { selectedLevel } = route.params;

//   const navigation = useNavigation();

//   // const leftPosition = useRef(new Animated.Value(0)).current;
//   // const rightPosition = useRef(new Animated.Value(0)).current;
//   // const bottomLeftPosition = useRef(new Animated.Value(0)).current;
//   // const bottomRightPosition = useRef(new Animated.Value(0)).current;
//   const rotation = useRef(new Animated.Value(0)).current;
//   const [isLeftSwiped, setIsLeftSwiped] = useState(false);
//   const [isRightSwiped, setIsRightSwiped] = useState(false);
//   const [isBottomLeftSwiped, setIsBottomLeftSwiped] = useState(false);
//   const [isBottomRightSwiped, setIsBottomRightSwiped] = useState(false);
//   const [counter, setCounter] = useState(0);
//   const [previousEntries, setPreviousEntries] = useState([]);
//   const [randomEntry, setRandomEntry] = useState(null);
//   const [secondRandomEntry, setSecondRandomEntry] = useState(null);
//   const [thirdRandomEntry, setThirdRandomEntry] = useState(null);
//   const [fourthRandomEntry, setFourthRandomEntry] = useState(null);
//   const [gifUrl, setGifUrl] = useState(require('../../Photos/TimerMove.gif'));
//   const [key, setKey] = useState(Date.now());
//   const [isGifPlaying, setIsGifPlaying] = useState(true);
//   const [direction, setDirection] = useState('North');
//   const [leftShown, setLeftShown] = useState(true);
//   const [rightShown, setRightShown] = useState(true);
//   const [bottomleftShown, setBottomLeftShown] = useState(true);
//   const [bottomrightShown, setBottomRightShown] = useState(true);
//   const [backgroundColor, setBackgroundColor] = useState(null)
//   const [topBar, setTopBar] = useState(false);
//   const gifOpacity = useRef(new Animated.Value(0)).current;
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [gifVisible, setGifVisible] = useState(false);

//   const leftPosition = useRef(new Animated.Value(-screenWidth)).current;
//   const rightPosition = useRef(new Animated.Value(screenWidth)).current;
//   const bottomLeftPosition = useRef(new Animated.Value(-screenHeight)).current;
//   const bottomRightPosition = useRef(new Animated.Value(screenHeight)).current;

//   const [resetTrigger, setResetTrigger] = useState(false);
//   const swipingDisabled = useRef(false);


//   const incrementGamesPlayed = async () => {
//     try {
//       const gamesPlayed = parseInt(await AsyncStorage.getItem('gamesPlayed')) || 0;
//       await AsyncStorage.setItem('gamesPlayed', (gamesPlayed + 1).toString());
//     } catch (error) {
//       console.error('Error updating gamesPlayed:', error);
//     }
//   };
  
//   useEffect(() => { incrementGamesPlayed(); }, []);

//   // const { playSoundCorrect, playSoundWrong } = useSoundPlayer();

//   // useEffect(() => {
//   //   changeDirection();
  
//   //   const getRandomEntry = () => data[Math.floor(Math.random() * data.length)];
  
//   //   const initialRandomEntry = getRandomEntry();
//   //   setRandomEntry(initialRandomEntry);
  
//   //   let initialSecondRandomEntry;
//   //   do {
//   //     initialSecondRandomEntry = getRandomEntry();
//   //   } while (initialSecondRandomEntry === initialRandomEntry);
//   //   setSecondRandomEntry(initialSecondRandomEntry);
  
//   //   let initialThirdRandomEntry;
//   //   do {
//   //     initialThirdRandomEntry = getRandomEntry();
//   //   } while (
//   //     initialThirdRandomEntry === initialRandomEntry ||
//   //     initialThirdRandomEntry === initialSecondRandomEntry
//   //   );
//   //   setThirdRandomEntry(initialThirdRandomEntry);
  
//   //   let initialFourthRandomEntry;
//   //   do {
//   //     initialFourthRandomEntry = getRandomEntry();
//   //   } while (
//   //     initialFourthRandomEntry === initialRandomEntry ||
//   //     initialFourthRandomEntry === initialSecondRandomEntry ||
//   //     initialFourthRandomEntry === initialThirdRandomEntry
//   //   );
//   //   setFourthRandomEntry(initialFourthRandomEntry);





//   //   setTimeout(() => {
//   //     // Animated.parallel([
//   //     //   Animated.timing(leftPosition, {
//   //     //     toValue: 0,
//   //     //     duration: 500,
//   //     //     useNativeDriver: true,
//   //     //   }),
//   //     //   Animated.timing(rightPosition, {
//   //     //     toValue: 0,
//   //     //     duration: 500,
//   //     //     useNativeDriver: true,
//   //     //   }),
//   //     // ]).start();
//   //     setTopBar(true);
//   //     handleRestartGif();
//   //     setGifVisible(true);
//   //     // Fade in the GIF when it becomes visible
//   //     Animated.timing(gifOpacity, {
//   //       toValue: 1,
//   //       duration: 600,
//   //       useNativeDriver: true,
//   //     }).start();
//   //   }, 600);


//   // }, []);







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

//     let initialThirdRandomEntry;
//     do {
//       initialThirdRandomEntry = getRandomEntry();
//     } while (
//       initialThirdRandomEntry === initialRandomEntry ||
//       initialThirdRandomEntry === initialSecondRandomEntry
//     );
//     setThirdRandomEntry(initialThirdRandomEntry);

//     let initialFourthRandomEntry;
//     do {
//       initialFourthRandomEntry = getRandomEntry();
//     } while (
//       initialFourthRandomEntry === initialRandomEntry ||
//       initialFourthRandomEntry === initialSecondRandomEntry ||
//       initialFourthRandomEntry === initialThirdRandomEntry
//     );
//     setFourthRandomEntry(initialFourthRandomEntry);

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
//         Animated.timing(bottomLeftPosition, {
//           toValue: 0,
//           duration: 800,
//           useNativeDriver: true,
//         }),
//         Animated.timing(bottomRightPosition, {
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

//     // Rest of your existing code...
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
//     setBottomLeftShown(true);
//     setBottomRightShown(true);
//     setBackgroundColor(null);
//     setLoseGame(false);
//     setGifVisible(false)
//     // setGifDone(false)
//     leftPosition.setValue(-screenWidth);
//     rightPosition.setValue(screenWidth);
//     bottomLeftPosition.setValue(-screenWidth);
//     bottomRightPosition.setValue(screenWidth);
//     swipingDisabled.current = false;
//     setResetTrigger(prev => !prev); // Toggle the resetTrigger to trigger useEffect
//   };

  


  
//   const resetPosition = (position) => {
//     Animated.timing(position, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start(() => setIsAnimating(false)); // Set isAnimating to false when animation ends
//   };
  

//   const handleSwipe = (position, setSwiped, direction) => {
//     setIsAnimating(true); // Set isAnimating to true when animation starts
//     let toValue = 0;
//     switch (direction) {
//       case 'left':
//         toValue = -screenWidth;
//         leftCounter();
//         break;
//       case 'right':
//         toValue = screenWidth;
//         rightCounter();
//         break;
//       case 'bottomLeft':
//         toValue = -screenHeight; // Adjust as needed
//         leftBottomCounter();
//         break;
//       case 'bottomRight':
//         toValue = screenHeight; // Adjust as needed
//         rightBottomCounter();
//         break;
//       default:
//         break;
//     }
  
//     Animated.timing(position, {
//       toValue: toValue,
//       duration: 400,
//       useNativeDriver: true,
//     }).start(() => {
//       setTimeout(() => {
//         setSwiped(false);
//         resetPosition(position);
//       }, 1000);
//     });
//   };
  

//   const rightCounter = () => {
//     checkScoreRight()
//   };

//   const leftCounter = () => {
//     checkScoreLeft()
//   };

//   const rightBottomCounter = () => {
//     checkScoreBottomRight()
//   };

//   const leftBottomCounter = () => {
//     checkScoreBottomLeft()
//   };






//   // const leftPanResponder = PanResponder.create({
//   //   onStartShouldSetPanResponder: () => !isAnimating, // Check if animation is in progress
//   //   onPanResponderMove: (_, gestureState) => {
//   //     if (!isAnimating && gestureState.moveX <= screenWidth / 2 && gestureState.dx <= 0) {
//   //       leftPosition.setValue(gestureState.dx);
//   //     }
//   //   },
//   //   onPanResponderRelease: (_, { dx }) => {
//   //     if (dx < -40) {
//   //       handleSwipe(leftPosition, setIsLeftSwiped, 'left');
//   //     } else {
//   //       resetPosition(leftPosition);
//   //     }
//   //   },
//   // });
//   // const rightPanResponder = PanResponder.create({
//   //   onStartShouldSetPanResponder: () => !isAnimating, // Check if animation is in progress
//   //   onPanResponderMove: (_, gestureState) => {
//   //     if (!isAnimating && gestureState.moveX >= screenWidth / 2 && gestureState.dx >= 0) {
//   //       rightPosition.setValue(gestureState.dx);
//   //     }
//   //   },
//   //   onPanResponderRelease: (_, { dx }) => {
//   //     if (dx > 40) {
//   //       handleSwipe(rightPosition, setIsRightSwiped, 'right');
//   //     } else {
//   //       resetPosition(rightPosition);
//   //     }
//   //   },
//   // });
//   // const leftBottomPanResponder = PanResponder.create({
//   //   onStartShouldSetPanResponder: () => !isAnimating, // Check if animation is in progress
//   //   onPanResponderMove: (_, gestureState) => {
//   //     if (!isAnimating && gestureState.moveX <= screenWidth / 2 && gestureState.dx <= 0) {
//   //       bottomLeftPosition.setValue(gestureState.dx);
//   //     }
//   //   },
//   //   onPanResponderRelease: (_, { dx }) => {
//   //     if (dx < -40) {
//   //       handleSwipe(bottomLeftPosition, setIsBottomLeftSwiped, 'bottomLeft');
//   //     } else {
//   //       resetPosition(bottomLeftPosition);
//   //     }
//   //   },
//   // });
//   // const rightBottomPanResponder = PanResponder.create({
//   //   onStartShouldSetPanResponder: () => !isAnimating, // Check if animation is in progress
//   //   onPanResponderMove: (_, gestureState) => {
//   //     if (!isAnimating && gestureState.moveX >= screenWidth / 2 && gestureState.dx >= 0) {
//   //       bottomRightPosition.setValue(gestureState.dx);
//   //     }
//   //   },
//   //   onPanResponderRelease: (_, { dx }) => {
//   //     if (dx > 40) {
//   //       handleSwipe(bottomRightPosition, setIsBottomRightSwiped, 'bottomRight');
//   //     } else {
//   //       resetPosition(bottomRightPosition);
//   //     }
//   //   },
//   // });

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
//   const leftBottomPanResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => !isAnimating && !swipingDisabled.current, // Check if animation is in progress or swiping is disabled
//     onPanResponderMove: (_, gestureState) => {
//       if (!isAnimating && !swipingDisabled.current && gestureState.moveX <= screenWidth / 2 && gestureState.dx <= 0) {
//         bottomLeftPosition.setValue(gestureState.dx);
//       }
//     },
//     onPanResponderRelease: (_, { dx }) => {
//       if (!swipingDisabled.current && dx < -40) {
//         handleSwipe(bottomLeftPosition, setIsBottomLeftSwiped, 'bottomLeft');
//       } else {
//         resetPosition(bottomLeftPosition);
//       }
//     },
//   });
  
//   const rightBottomPanResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => !isAnimating && !swipingDisabled.current, // Check if animation is in progress or swiping is disabled
//     onPanResponderMove: (_, gestureState) => {
//       if (!isAnimating && !swipingDisabled.current && gestureState.moveX >= screenWidth / 2 && gestureState.dx >= 0) {
//         bottomRightPosition.setValue(gestureState.dx);
//       }
//     },
//     onPanResponderRelease: (_, { dx }) => {
//       if (!swipingDisabled.current && dx > 40) {
//         handleSwipe(bottomRightPosition, setIsBottomRightSwiped, 'bottomRight');
//       } else {
//         resetPosition(bottomRightPosition);
//       }
//     },
//   });










//   const getFilteredRandomEntry = (excludedEntries) => {
//     const filteredData = data.filter(
//       entry =>
//         entry !== randomEntry &&
//         entry !== secondRandomEntry &&
//         entry !== thirdRandomEntry &&
//         entry !== fourthRandomEntry &&
//         !excludedEntries.includes(entry)
//     );
//     return filteredData[Math.floor(Math.random() * filteredData.length)];
//   };

//   const displayData = () => {
//     const newRandomEntry = getFilteredRandomEntry([secondRandomEntry, thirdRandomEntry, fourthRandomEntry]);
//     setRandomEntry(newRandomEntry);
//     setPreviousEntries([...previousEntries, newRandomEntry]);
//   };

//   const displaySecondData = () => {
//     const newSecondRandomEntry = getFilteredRandomEntry([randomEntry, thirdRandomEntry, fourthRandomEntry]);
//     setSecondRandomEntry(newSecondRandomEntry);
//     setPreviousEntries([...previousEntries, newSecondRandomEntry]);
//   };

//   const displayThirdData = () => {
//     const newThirdRandomEntry = getFilteredRandomEntry([randomEntry, secondRandomEntry, fourthRandomEntry]);
//     setThirdRandomEntry(newThirdRandomEntry);
//     setPreviousEntries([...previousEntries, newThirdRandomEntry]);
//   };

//   const displayFourthData = () => {
//     const newFourthRandomEntry = getFilteredRandomEntry([randomEntry, secondRandomEntry, thirdRandomEntry]);
//     setFourthRandomEntry(newFourthRandomEntry);
//     setPreviousEntries([...previousEntries, newFourthRandomEntry]);
//   };




//   // useEffect(() => {
//   //   const gifDuration = 13000; // 10 seconds in milliseconds
//   //   const timer = setTimeout(() => {
//   //     setIsGifPlaying(false);
//   //     setBackgroundColor('red');
//   //     setLoseGame(true)
//   //   }, gifDuration);

//   //   return () => clearTimeout(timer);
//   // }, [key]);

//   // const handleRestartGif = () => {
//   //   setKey(Date.now());
//   //   setIsGifPlaying(true);
//   // };

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
//       setBackgroundColor('red');
//       setLoseGame(true);

//       // setGifDone(true);
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


//  useEffect(() => {
//   let rotationValue = 0;
//   switch (direction) {
//     case 'North':
//       rotationValue = 90;
//       break;
//     case 'East':
//       rotationValue = 180;
//       break;
//     case 'South':
//       rotationValue = 270; 
//       break;
//     case 'West':
//       rotationValue = 0;
//       break;
//   }
//     Animated.timing(rotation, {
//       toValue: rotationValue,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   }, [direction]);

//   const changeDirection = () => {
//     const directions = ['North', 'East', 'South', 'West'];
//     const randomDirection = directions[Math.floor(Math.random() * directions.length)];
//     setDirection(randomDirection);
//   };

//   const rotationInterpolate = rotation.interpolate({
//     inputRange: [0, 90, 180, 270, 360],
//     outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
//   });
  
//   const [loseGame, setLoseGame] = useState(false);

//   const checkScoreRight = () => {
//     const leftLongitude = parseFloat(randomEntry.longitude);
//     const rightLongitude = parseFloat(secondRandomEntry.longitude);
//     const leftLatitude = parseFloat(randomEntry.latitude);
//     const rightLatitude = parseFloat(secondRandomEntry.latitude);
//     const leftBottomLongitude = parseFloat(thirdRandomEntry.longitude);
//     const rightBottomLongitude = parseFloat(fourthRandomEntry.longitude);
//     const leftBottomLatitude = parseFloat(thirdRandomEntry.latitude);
//     const rightBottomLatitude = parseFloat(fourthRandomEntry.latitude);
//     let isCorrect = false;
//     switch (direction) {
//       case 'North':
//         isCorrect = rightLatitude >= leftLatitude &&
//                     rightLatitude >= leftBottomLatitude &&
//                     rightLatitude >= rightBottomLatitude;
//         break;
//       case 'South':
//         isCorrect = rightLatitude <= leftLatitude &&
//                     rightLatitude <= leftBottomLatitude &&
//                     rightLatitude <= rightBottomLatitude;
//         break;
//       case 'East':
//         isCorrect = rightLongitude >= leftLongitude &&
//                     rightLongitude >= leftBottomLongitude &&
//                     rightLongitude >= rightBottomLongitude;
//         break;
//       case 'West':
//         isCorrect = rightLongitude <= leftLongitude &&
//                     rightLongitude <= leftBottomLongitude &&
//                     rightLongitude <= rightBottomLongitude;
//         break;
//       default:
//         return;
//     }
//     if (isCorrect) {
//       // playSoundCorrect()
//       setBackgroundColor('green'); 
//         setTimeout(() => {
//     setBackgroundColor(null);
//   }, 600);
//       displaySecondData()
//       CorrectScore();
//     } else {
//       // playSoundWrong()
//       setBackgroundColor('red');
//       WrongScore()
//       setRightShown(false)
//     }
//   };
  
//   const checkScoreLeft = () => {
//     const leftLongitude = parseFloat(randomEntry.longitude);
//     const rightLongitude = parseFloat(secondRandomEntry.longitude);
//     const leftLatitude = parseFloat(randomEntry.latitude);
//     const rightLatitude = parseFloat(secondRandomEntry.latitude);
//     const leftBottomLongitude = parseFloat(thirdRandomEntry.longitude);
//     const rightBottomLongitude = parseFloat(fourthRandomEntry.longitude);
//     const leftBottomLatitude = parseFloat(thirdRandomEntry.latitude);
//     const rightBottomLatitude = parseFloat(fourthRandomEntry.latitude);
//     let isCorrect = false;
//     switch (direction) {
//       case 'North':
//         isCorrect = leftLatitude >= rightLatitude &&
//                     leftLatitude >= leftBottomLatitude &&
//                     leftLatitude >= rightBottomLatitude;
//         break;
//       case 'South':
//         isCorrect = leftLatitude <= rightLatitude &&
//                     leftLatitude <= leftBottomLatitude &&
//                     leftLatitude <= rightBottomLatitude;
//         break;
//       case 'East':
//         isCorrect = leftLongitude >= rightLongitude &&
//                     leftLongitude >= leftBottomLongitude &&
//                     leftLongitude >= rightBottomLongitude;
//         break;
//       case 'West':
//         isCorrect = leftLongitude <= rightLongitude &&
//                     leftLongitude <= leftBottomLongitude &&
//                     leftLongitude <= rightBottomLongitude;
//         break;
//       default:
//         return;
//     }
//     if (isCorrect) {
//       // playSoundCorrect()
//  setBackgroundColor('green'); 
//         setTimeout(() => {
//     setBackgroundColor(null);
//   }, 600);
//       displayData()
//       CorrectScore();
//     } else {
//       // playSoundWrong()
//       setBackgroundColor('red');
//       setLeftShown(false)
//       WrongScore()
//     }
//   };

//   const checkScoreBottomLeft = () => {
//     const leftLongitude = parseFloat(randomEntry.longitude);
//     const rightLongitude = parseFloat(secondRandomEntry.longitude);
//     const leftLatitude = parseFloat(randomEntry.latitude);
//     const rightLatitude = parseFloat(secondRandomEntry.latitude);
//     const leftBottomLongitude = parseFloat(thirdRandomEntry.longitude);
//     const rightBottomLongitude = parseFloat(fourthRandomEntry.longitude);
//     const leftBottomLatitude = parseFloat(thirdRandomEntry.latitude);
//     const rightBottomLatitude = parseFloat(fourthRandomEntry.latitude);
//     let isCorrect = false;
//     switch (direction) {
//       case 'North':
//         isCorrect = leftBottomLatitude >= rightLatitude &&
//                     leftBottomLatitude >= leftLatitude &&
//                     leftBottomLatitude >= rightBottomLatitude;
//         break;
//       case 'South':
//         isCorrect = leftBottomLatitude <= rightLatitude &&
//                     leftBottomLatitude <= leftLatitude &&
//                     leftBottomLatitude <= rightBottomLatitude;
//         break;
//       case 'East':
//         isCorrect = leftBottomLongitude >= rightLongitude &&
//                     leftBottomLongitude >= leftLongitude &&
//                     leftBottomLongitude >= rightBottomLongitude;
//         break;
//       case 'West':
//         isCorrect = leftBottomLongitude <= rightLongitude &&
//                     leftBottomLongitude <= leftLongitude &&
//                     leftBottomLongitude <= rightBottomLongitude;
//         break;
//       default:
//         return;
//     }
//     if (isCorrect) {
//     // playSoundCorrect()
//  setBackgroundColor('green'); 
//         setTimeout(() => {
//     setBackgroundColor(null);
//   }, 600);
//   displayThirdData()
//       CorrectScore();
//     } else {
//       // playSoundWrong()
//       setBackgroundColor('red');
//       setBottomLeftShown(false)
//       WrongScore()
//     }
//   };

//   const checkScoreBottomRight = () => {
//     const leftLongitude = parseFloat(randomEntry.longitude);
//     const rightLongitude = parseFloat(secondRandomEntry.longitude);
//     const leftLatitude = parseFloat(randomEntry.latitude);
//     const rightLatitude = parseFloat(secondRandomEntry.latitude);
//     const leftBottomLongitude = parseFloat(thirdRandomEntry.longitude);
//     const rightBottomLongitude = parseFloat(fourthRandomEntry.longitude);
//     const leftBottomLatitude = parseFloat(thirdRandomEntry.latitude);
//     const rightBottomLatitude = parseFloat(fourthRandomEntry.latitude);
//     let isCorrect = false;
//     switch (direction) {
//       case 'North':
//         isCorrect = rightBottomLatitude>= rightLatitude &&
//                     rightBottomLatitude >= leftLatitude &&
//                     rightBottomLatitude >= leftBottomLatitude;
//         break;
//       case 'South':
//         isCorrect = rightBottomLatitude <= rightLatitude &&
//                     rightBottomLatitude <= leftLatitude &&
//                     rightBottomLatitude <= leftBottomLatitude;
//         break;
//       case 'East':
//         isCorrect = rightBottomLongitude >= rightLongitude &&
//                     rightBottomLongitude >= leftLongitude &&
//                     rightBottomLongitude >= leftBottomLongitude;
//         break;
//       case 'West':
//         isCorrect = rightBottomLongitude <= rightLongitude &&
//                     rightBottomLongitude <= leftLongitude &&
//                     rightBottomLongitude <= leftBottomLongitude;
//         break;
//       default:
//         return;
//     }
//     if (isCorrect) {
//     //  playSoundCorrect()
//  setBackgroundColor('green'); 
//         setTimeout(() => {
//     setBackgroundColor(null);
//   }, 600);
//   displayFourthData()
//       CorrectScore();
//     } else {
//       // playSoundWrong()
//       setBackgroundColor('red');
//       setBottomRightShown(false)
//       WrongScore()
//     }
//   };

  
//   const CorrectScore = () => {
//     setCounter((prevCounter) => prevCounter + 1);
//     handleRestartGif();
//     changeDirection();
//   }

//     const WrongScore = () => {
//         setIsGifPlaying(false);
//         setLoseGame(true)
//       }


//       const translateX = useRef(new Animated.Value(0)).current;

//       useEffect(() => {
//         const animateBackground = () => {
//           Animated.loop(
//             Animated.timing(translateX, {
//               toValue: -screenWidth * 5.3,
//               duration: 60000,
//               easing: Easing.linear,
//               useNativeDriver: true,
//             })
//           ).start();
//         };
    
//         animateBackground();
//       }, [translateX]);


//   return (
// <>

//     <LinearGradient
//     colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
//     style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
//   />


//     <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: backgroundColor }}>

// {/* <BlurredMap /> */}

// {/* <View style={{ 
//         position: 'absolute',
//         height: useSafeAreaInsets().top, 
//         width: '100%',
//         backgroundColor:'white',
//         top: 0,  
//         zIndex: 100,          
//       }} /> */}
    
    
// {/*     
//       <View style={{ height: screenWidth * 0.25, width: screenWidth, backgroundColor: 'white', flexDirection: 'row', borderBottomRightRadius: screenWidth * 0.02,
//       borderBottomLeftRadius: screenWidth * 0.02,  shadowColor: 'black',
//         shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8,shadowRadius: 10,elevation: 10,}}>
//         <View style={{ height: screenWidth * 0.25, width: screenWidth * 0.25, }}>
//           <DisplayCount count={counter} size={0}/>
//         </View>
//         <View style={{ height: screenWidth * 0.25, width: screenWidth * 0.5, justifyContent: 'space-evenly' }}>
//           <View>
//           <Text>{selectedLevel}</Text>
//             <DisplayWord Word={'what is further'} sizeW={0.5} sizeH={0.04} left={0} />
//             <DisplayWord Word={'the direction :'} sizeW={0.5} sizeH={0.04} left={0} />
//           </View>
//           <DisplayWord Word={direction} sizeW={0.5} sizeH={0.1} left={0} />
//         </View>
//         <View style={{ height: screenWidth * 0.25, width: screenWidth * 0.25, justifyContent: 'center', alignItems: 'center' }}>
//           <Animated.Image
//             source={require('../../assets/Photos/arrow.png')}
//             style={{
//               width: '80%',
//               height: '80%',
//               transform: [{ rotate: rotationInterpolate }],
//             }}
//             resizeMode="contain"
//           />
//         </View>
//       </View> */}

// {topBar && (
//           <GameTopBar direction={direction} count={counter} />
//         )}






//       <View style={{flex: 1, justifyContent: 'space-evenly'}}>
//       <View style={{ width: screenWidth, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, flexDirection: 'row', }}>
//         <View style={{ width: screenWidth * 0.5, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, justifyContent: 'center', }}>
//         {leftShown && (




//           <Animated.View
//             {...leftPanResponder.panHandlers}
//             style={{
//               width: screenWidth * 0.46,
//               height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4,
//               marginLeft: screenWidth * 0.024,
//         shadowColor: 'black',
//         shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8,shadowRadius: 10,elevation: 10,
//               transform: [{ translateX: leftPosition }],
//             }}
//           >
            
//             {randomEntry && (

// <>

//  {selectedLevel === 'Hard' ? (
//   <SwipeCardLevelHard
//   capital={randomEntry.capital}
// />
// ) : (
//   <SwipeCardLevel
//   country={randomEntry.country}
//   capital={randomEntry.capital}
//  />
//  )}
//        </>       
//             )}
//           </Animated.View>






// )}
//         </View>
//         <View style={{ width: screenWidth * 0.5, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4,
//          justifyContent: 'center', }}>
//         {rightShown && (
//           <Animated.View
//             {...rightPanResponder.panHandlers}
//             style={{
//               width: screenWidth * 0.46,
//               height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4,
//               marginLeft: screenWidth * 0.016,
//       shadowColor: 'black',
//         shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8,shadowRadius: 10,elevation: 10,
//               transform: [{ translateX: rightPosition }],
//             }}
//           >
//             {secondRandomEntry && (
              
// <>

// {selectedLevel === 'Hard' ? (
//  <SwipeCardLevelHard
//  capital={secondRandomEntry.capital}
// />
// ) : (
//  <SwipeCardLevel
//  country={secondRandomEntry.country}
//  capital={secondRandomEntry.capital}
// />
// )}
//       </>      
//             )}
//           </Animated.View> 
//           )}
//         </View>
//       </View>




//       <View style={{ width: screenWidth, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, flexDirection: 'row', }}>
//         <View style={{ width: screenWidth * 0.5, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, justifyContent: 'center', }}>
//         {bottomleftShown && (
//           <Animated.View
//             {...leftBottomPanResponder.panHandlers}
//             style={{
//               width: screenWidth * 0.46,height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4,
//               marginLeft: screenWidth * 0.024,
//         shadowColor: 'black',
//         shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8,shadowRadius: 10,elevation: 10,
//               transform: [{ translateX: bottomLeftPosition }],
//             }}
//           >
//             {thirdRandomEntry && (
//                 <>

// {selectedLevel === 'Hard' ? (
//  <SwipeCardLevelHard
//  capital={thirdRandomEntry.capital}
// />
// ) : (
//  <SwipeCardLevel
//  country={thirdRandomEntry.country}
//  capital={thirdRandomEntry.capital}
// />)}</> 
//             )}
//           </Animated.View>
// )}
//         </View>
//         <View style={{ width: screenWidth * 0.5, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, justifyContent: 'center', }}>
//         {bottomrightShown && (
//           <Animated.View
//             {...rightBottomPanResponder.panHandlers}
//             style={{
//               width: screenWidth * 0.46,
//               height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4,
//               marginLeft: screenWidth * 0.016,
//         shadowColor: 'black',
//         shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8,shadowRadius: 10,elevation: 10,
//               transform: [{ translateX: bottomRightPosition }],
//             }}
//           >
//             {fourthRandomEntry && (    
//                 <>
// {selectedLevel === 'Hard' ? (
//  <SwipeCardLevelHard
//  capital={fourthRandomEntry.capital}
// />
// ) : (
//  <SwipeCardLevel
//  country={fourthRandomEntry.country}
//  capital={fourthRandomEntry.capital}
// />)}</> 
//             )}
//           </Animated.View> 
//           )}
//         </View>
//       </View>


// {/* {gifVisible && (
//             <Animated.View style={{ opacity: gifOpacity }}>
//               <View style={{ height: screenWidth * 0.2, width: screenWidth }}>
//                 <Image
//                   key={key}
//                   source={gifUrl}
//                   style={{ width: '100%', height: '100%' }}
//                   resizeMode="contain"
//                 />
//                 {!isGifPlaying && (
//                   <Image
//                     source={require('../../Photos/TimerDone.png')}
//                     style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
//                     resizeMode="contain"
//                   />
//                 )}
//               </View>
//             </Animated.View>
//           )} */}

// {gifVisible && (
//             <Animated.View style={{ opacity: gifOpacity }}>
//               <View style={{ height: screenWidth * 0.3, width: screenWidth,alignItems: 'center', justifyContent: 'center'  }}>
//                 <Image
//                   key={key}
//                   source={gifUrl}
//                   style={{ width: '85%', height: '100%' }}
//                   resizeMode="streach"
//                 />
//                 {!isGifPlaying && (
//                   <Image
//                     source={require('../../Photos/TimerDone.png')}
//                     style={{ width: '85%', height: '100%', position: 'absolute',  }}
//                     resizeMode="streach"
//                   />
//                 )}
//               </View>
//             </Animated.View>
//           )}



//       </View>
//       {loseGame && (
//     //   <EndGameFourCards
//     //   country1={randomEntry.country}
//     //   capital1={randomEntry.capital}
//     //   longitude1={randomEntry.longitude}
//     //   latitude1={randomEntry.latitude}
//     //   score={counter}
//     //   country2={secondRandomEntry.country}
//     //   capital2={secondRandomEntry.capital}
//     //   longitude2={secondRandomEntry.longitude}
//     //   latitude2={secondRandomEntry.latitude}
//     //   pinDropX={0.3}
//     //   pinDropY={0.3}
//     //   country3={thirdRandomEntry.country}
//     //   capital3={thirdRandomEntry.capital}
//     //   longitude3={thirdRandomEntry.longitude}
//     //   latitude3={thirdRandomEntry.latitude}
//     //   country4={fourthRandomEntry.country}
//     //   capital4={fourthRandomEntry.capital}
//     //   longitude4={fourthRandomEntry.longitude}
//     //   latitude4={fourthRandomEntry.latitude}
//     //   selectedLevel={selectedLevel}
//     // />
//     <EndGameFour
//           game={selectedLevel}
//           onButtonPressReset={onButtonPressReset}
//           score={counter}

//             country1={randomEntry.country}
//             capital1={randomEntry.capital}
//             longitude1={randomEntry.longitude}
//             latitude1={randomEntry.latitude}

//             country2={secondRandomEntry.country}
//             capital2={secondRandomEntry.capital}
//             longitude2={secondRandomEntry.longitude}
//             latitude2={secondRandomEntry.latitude}

//               country3={thirdRandomEntry.country}
//             capital3={thirdRandomEntry.capital}
//            longitude3={thirdRandomEntry.longitude}
//             latitude3={thirdRandomEntry.latitude}

//             country4={fourthRandomEntry.country}
//             capital4={fourthRandomEntry.capital}
//             longitude4={fourthRandomEntry.longitude}
//            latitude4={fourthRandomEntry.latitude}

//           />
//     )}
//     </SafeAreaView>
//     </>
//   );
// };


// export default MainGameLevel;









import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Animated, PanResponder, Text, TouchableOpacity, Image, Easing, Platform } from 'react-native';
import { data } from '../../files/capitalData';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SwipeCardLevel from '../SwipeCard/SwipeCardLevel';
import SwipeCardLevelHard from '../SwipeCard/SwipeCardLevelHard';
import EndGameFour from '../EndGame/EndGameFour';
import GameTopBar from '../Multiple/GameTopBar';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSoundPlayer from '../Multiple/useSoundPlayer'; // Importing the sound hook

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MainGameLevel = () => {
  const route = useRoute();
  const { selectedLevel } = route.params;

  const navigation = useNavigation();
  const rotation = useRef(new Animated.Value(0)).current;
  const [isLeftSwiped, setIsLeftSwiped] = useState(false);
  const [isRightSwiped, setIsRightSwiped] = useState(false);
  const [isBottomLeftSwiped, setIsBottomLeftSwiped] = useState(false);
  const [isBottomRightSwiped, setIsBottomRightSwiped] = useState(false);
  const [counter, setCounter] = useState(0);
  const [previousEntries, setPreviousEntries] = useState([]);
  const [randomEntry, setRandomEntry] = useState(null);
  const [secondRandomEntry, setSecondRandomEntry] = useState(null);
  const [thirdRandomEntry, setThirdRandomEntry] = useState(null);
  const [fourthRandomEntry, setFourthRandomEntry] = useState(null);
  const [gifUrl, setGifUrl] = useState(require('../../Photos/TimerMove.gif'));
  const [key, setKey] = useState(Date.now());
  const [isGifPlaying, setIsGifPlaying] = useState(true);
  const [direction, setDirection] = useState('North');
  const [leftShown, setLeftShown] = useState(true);
  const [rightShown, setRightShown] = useState(true);
  const [bottomLeftShown, setBottomLeftShown] = useState(true);
  const [bottomRightShown, setBottomRightShown] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [topBar, setTopBar] = useState(false);
  const gifOpacity = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const [gifVisible, setGifVisible] = useState(false);

  const leftPosition = useRef(new Animated.Value(-screenWidth)).current;
  const rightPosition = useRef(new Animated.Value(screenWidth)).current;
  const bottomLeftPosition = useRef(new Animated.Value(-screenHeight)).current;
  const bottomRightPosition = useRef(new Animated.Value(screenHeight)).current;

  const [resetTrigger, setResetTrigger] = useState(false);
  const swipingDisabled = useRef(false);
  const [loseGame, setLoseGame] = useState(false);
  const [hasPlayedWrongSound, setHasPlayedWrongSound] = useState(false); // New state variable

  const { playSoundCorrect, playSoundWrong } = useSoundPlayer(); // Sound hooks

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

    let initialThirdRandomEntry;
    do {
      initialThirdRandomEntry = getRandomEntry();
    } while (
      initialThirdRandomEntry === initialRandomEntry ||
      initialThirdRandomEntry === initialSecondRandomEntry
    );
    setThirdRandomEntry(initialThirdRandomEntry);

    let initialFourthRandomEntry;
    do {
      initialFourthRandomEntry = getRandomEntry();
    } while (
      initialFourthRandomEntry === initialRandomEntry ||
      initialFourthRandomEntry === initialSecondRandomEntry ||
      initialFourthRandomEntry === initialThirdRandomEntry
    );
    setFourthRandomEntry(initialFourthRandomEntry);

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
        Animated.timing(bottomLeftPosition, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bottomRightPosition, {
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
    setLeftShown(true);
    setRightShown(true);
    setBottomLeftShown(true);
    setBottomRightShown(true);
    setBackgroundColor(null);
    setLoseGame(false);
    setGifVisible(false);
    leftPosition.setValue(-screenWidth);
    rightPosition.setValue(screenWidth);
    bottomLeftPosition.setValue(-screenHeight);
    bottomRightPosition.setValue(screenHeight);
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
    let toValue = 0;
    switch (direction) {
      case 'left':
        toValue = -screenWidth;
        leftCounter();
        break;
      case 'right':
        toValue = screenWidth;
        rightCounter();
        break;
      case 'bottomLeft':
        toValue = -screenHeight;
        leftBottomCounter();
        break;
      case 'bottomRight':
        toValue = screenHeight;
        rightBottomCounter();
        break;
      default:
        break;
    }

    Animated.timing(position, {
      toValue: toValue,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
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

  const rightBottomCounter = () => {
    checkScoreBottomRight();
  };

  const leftBottomCounter = () => {
    checkScoreBottomLeft();
  };

  const leftPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isAnimating && !swipingDisabled.current,
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
    onStartShouldSetPanResponder: () => !isAnimating && !swipingDisabled.current,
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

  const leftBottomPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isAnimating && !swipingDisabled.current,
    onPanResponderMove: (_, gestureState) => {
      if (!isAnimating && !swipingDisabled.current && gestureState.moveX <= screenWidth / 2 && gestureState.dx <= 0) {
        bottomLeftPosition.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, { dx }) => {
      if (!swipingDisabled.current && dx < -40) {
        handleSwipe(bottomLeftPosition, setIsBottomLeftSwiped, 'bottomLeft');
      } else {
        resetPosition(bottomLeftPosition);
      }
    },
  });

  const rightBottomPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isAnimating && !swipingDisabled.current,
    onPanResponderMove: (_, gestureState) => {
      if (!isAnimating && !swipingDisabled.current && gestureState.moveX >= screenWidth / 2 && gestureState.dx >= 0) {
        bottomRightPosition.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, { dx }) => {
      if (!swipingDisabled.current && dx > 40) {
        handleSwipe(bottomRightPosition, setIsBottomRightSwiped, 'bottomRight');
      } else {
        resetPosition(bottomRightPosition);
      }
    },
  });

  const getFilteredRandomEntry = (excludedEntries) => {
    const filteredData = data.filter(
      entry =>
        entry !== randomEntry &&
        entry !== secondRandomEntry &&
        entry !== thirdRandomEntry &&
        entry !== fourthRandomEntry &&
        !excludedEntries.includes(entry)
    );
    return filteredData[Math.floor(Math.random() * filteredData.length)];
  };

  const displayData = () => {
    const newRandomEntry = getFilteredRandomEntry([secondRandomEntry, thirdRandomEntry, fourthRandomEntry]);
    setRandomEntry(newRandomEntry);
    setPreviousEntries([...previousEntries, newRandomEntry]);
  };

  const displaySecondData = () => {
    const newSecondRandomEntry = getFilteredRandomEntry([randomEntry, thirdRandomEntry, fourthRandomEntry]);
    setSecondRandomEntry(newSecondRandomEntry);
    setPreviousEntries([...previousEntries, newSecondRandomEntry]);
  };

  const displayThirdData = () => {
    const newThirdRandomEntry = getFilteredRandomEntry([randomEntry, secondRandomEntry, fourthRandomEntry]);
    setThirdRandomEntry(newThirdRandomEntry);
    setPreviousEntries([...previousEntries, newThirdRandomEntry]);
  };

  const displayFourthData = () => {
    const newFourthRandomEntry = getFilteredRandomEntry([randomEntry, secondRandomEntry, thirdRandomEntry]);
    setFourthRandomEntry(newFourthRandomEntry);
    setPreviousEntries([...previousEntries, newFourthRandomEntry]);
  };

  useEffect(() => {
    swipingDisabled.current = false;

    const disableSwipingTimeout = setTimeout(() => {
      swipingDisabled.current = true;
    }, 9000);

    const gifDuration = 10000;
    const timer = setTimeout(() => {
      if (!loseGame) {
        setIsGifPlaying(false);
        setBackgroundColor('red');
        if (!hasPlayedWrongSound) {
          playSoundWrong(); // Play wrong sound
          setHasPlayedWrongSound(true);
          setLoseGame(true);
        }
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
    swipingDisabled.current = false;
  };

  useEffect(() => {
    let rotationValue = 0;
    switch (direction) {
      case 'North':
        rotationValue = 90;
        break;
      case 'East':
        rotationValue = 180;
        break;
      case 'South':
        rotationValue = 270;
        break;
      case 'West':
        rotationValue = 0;
        break;
    }
    Animated.timing(rotation, {
      toValue: rotationValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [direction]);

  const changeDirection = () => {
    const directions = ['North', 'East', 'South', 'West'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    setDirection(randomDirection);
  };

  const rotationInterpolate = rotation.interpolate({
    inputRange: [0, 90, 180, 270, 360],
    outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
  });

  const checkScoreRight = () => {
    const leftLongitude = parseFloat(randomEntry.longitude);
    const rightLongitude = parseFloat(secondRandomEntry.longitude);
    const leftLatitude = parseFloat(randomEntry.latitude);
    const rightLatitude = parseFloat(secondRandomEntry.latitude);
    const leftBottomLongitude = parseFloat(thirdRandomEntry.longitude);
    const rightBottomLongitude = parseFloat(fourthRandomEntry.longitude);
    const leftBottomLatitude = parseFloat(thirdRandomEntry.latitude);
    const rightBottomLatitude = parseFloat(fourthRandomEntry.latitude);
    let isCorrect = false;
    switch (direction) {
      case 'North':
        isCorrect = rightLatitude >= leftLatitude &&
                    rightLatitude >= leftBottomLatitude &&
                    rightLatitude >= rightBottomLatitude;
        break;
      case 'South':
        isCorrect = rightLatitude <= leftLatitude &&
                    rightLatitude <= leftBottomLatitude &&
                    rightLatitude <= rightBottomLatitude;
        break;
      case 'East':
        isCorrect = rightLongitude >= leftLongitude &&
                    rightLongitude >= leftBottomLongitude &&
                    rightLongitude >= rightBottomLongitude;
        break;
      case 'West':
        isCorrect = rightLongitude <= leftLongitude &&
                    rightLongitude <= leftBottomLongitude &&
                    rightLongitude <= rightBottomLongitude;
        break;
      default:
        return;
    }
    if (isCorrect) {
      playSoundCorrect(); // Play correct sound
      setBackgroundColor('green'); 
      setTimeout(() => {
        setBackgroundColor(null);
      }, 600);
      displaySecondData();
      CorrectScore();
    } else {
      playSoundWrong(); // Play wrong sound
      setBackgroundColor('red');
      setRightShown(false);
      WrongScore();
    }
  };

  const checkScoreLeft = () => {
    const leftLongitude = parseFloat(randomEntry.longitude);
    const rightLongitude = parseFloat(secondRandomEntry.longitude);
    const leftLatitude = parseFloat(randomEntry.latitude);
    const rightLatitude = parseFloat(secondRandomEntry.latitude);
    const leftBottomLongitude = parseFloat(thirdRandomEntry.longitude);
    const rightBottomLongitude = parseFloat(fourthRandomEntry.longitude);
    const leftBottomLatitude = parseFloat(thirdRandomEntry.latitude);
    const rightBottomLatitude = parseFloat(fourthRandomEntry.latitude);
    let isCorrect = false;
    switch (direction) {
      case 'North':
        isCorrect = leftLatitude >= rightLatitude &&
                    leftLatitude >= leftBottomLatitude &&
                    leftLatitude >= rightBottomLatitude;
        break;
      case 'South':
        isCorrect = leftLatitude <= rightLatitude &&
                    leftLatitude <= leftBottomLatitude &&
                    leftLatitude <= rightBottomLatitude;
        break;
      case 'East':
        isCorrect = leftLongitude >= rightLongitude &&
                    leftLongitude >= leftBottomLongitude &&
                    leftLongitude >= rightBottomLongitude;
        break;
      case 'West':
        isCorrect = leftLongitude <= rightLongitude &&
                    leftLongitude <= leftBottomLongitude &&
                    leftLongitude <= rightBottomLongitude;
        break;
      default:
        return;
    }
    if (isCorrect) {
      playSoundCorrect(); // Play correct sound
      setBackgroundColor('green'); 
      setTimeout(() => {
        setBackgroundColor(null);
      }, 600);
      displayData();
      CorrectScore();
    } else {
      playSoundWrong(); // Play wrong sound
      setBackgroundColor('red');
      setLeftShown(false);
      WrongScore();
    }
  };

  const checkScoreBottomLeft = () => {
    const leftLongitude = parseFloat(randomEntry.longitude);
    const rightLongitude = parseFloat(secondRandomEntry.longitude);
    const leftLatitude = parseFloat(randomEntry.latitude);
    const rightLatitude = parseFloat(secondRandomEntry.latitude);
    const leftBottomLongitude = parseFloat(thirdRandomEntry.longitude);
    const rightBottomLongitude = parseFloat(fourthRandomEntry.longitude);
    const leftBottomLatitude = parseFloat(thirdRandomEntry.latitude);
    const rightBottomLatitude = parseFloat(fourthRandomEntry.latitude);
    let isCorrect = false;
    switch (direction) {
      case 'North':
        isCorrect = leftBottomLatitude >= rightLatitude &&
                    leftBottomLatitude >= leftLatitude &&
                    leftBottomLatitude >= rightBottomLatitude;
        break;
      case 'South':
        isCorrect = leftBottomLatitude <= rightLatitude &&
                    leftBottomLatitude <= leftLatitude &&
                    leftBottomLatitude <= rightBottomLatitude;
        break;
      case 'East':
        isCorrect = leftBottomLongitude >= rightLongitude &&
                    leftBottomLongitude >= leftLongitude &&
                    leftBottomLongitude >= rightBottomLongitude;
        break;
      case 'West':
        isCorrect = leftBottomLongitude <= rightLongitude &&
                    leftBottomLongitude <= leftLongitude &&
                    leftBottomLongitude <= rightBottomLongitude;
        break;
      default:
        return;
    }
    if (isCorrect) {
      playSoundCorrect(); // Play correct sound
      setBackgroundColor('green'); 
      setTimeout(() => {
        setBackgroundColor(null);
      }, 600);
      displayThirdData();
      CorrectScore();
    } else {
      playSoundWrong(); // Play wrong sound
      setBackgroundColor('red');
      setBottomLeftShown(false);
      WrongScore();
    }
  };

  const checkScoreBottomRight = () => {
    const leftLongitude = parseFloat(randomEntry.longitude);
    const rightLongitude = parseFloat(secondRandomEntry.longitude);
    const leftLatitude = parseFloat(randomEntry.latitude);
    const rightLatitude = parseFloat(secondRandomEntry.latitude);
    const leftBottomLongitude = parseFloat(thirdRandomEntry.longitude);
    const rightBottomLongitude = parseFloat(fourthRandomEntry.longitude);
    const leftBottomLatitude = parseFloat(thirdRandomEntry.latitude);
    const rightBottomLatitude = parseFloat(fourthRandomEntry.latitude);
    let isCorrect = false;
    switch (direction) {
      case 'North':
        isCorrect = rightBottomLatitude >= rightLatitude &&
                    rightBottomLatitude >= leftLatitude &&
                    rightBottomLatitude >= leftBottomLatitude;
        break;
      case 'South':
        isCorrect = rightBottomLatitude <= rightLatitude &&
                    rightBottomLatitude <= leftLatitude &&
                    rightBottomLatitude <= leftBottomLatitude;
        break;
      case 'East':
        isCorrect = rightBottomLongitude >= rightLongitude &&
                    rightBottomLongitude >= leftLongitude &&
                    rightBottomLongitude >= leftBottomLongitude;
        break;
      case 'West':
        isCorrect = rightBottomLongitude <= rightLongitude &&
                    rightBottomLongitude <= leftLongitude &&
                    rightBottomLongitude <= leftBottomLongitude;
        break;
      default:
        return;
    }
    if (isCorrect) {
      playSoundCorrect(); // Play correct sound
      setBackgroundColor('green'); 
      setTimeout(() => {
        setBackgroundColor(null);
      }, 600);
      displayFourthData();
      CorrectScore();
    } else {
      playSoundWrong(); // Play wrong sound
      setBackgroundColor('red');
      setBottomRightShown(false);
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
        {topBar && <GameTopBar direction={direction} count={counter} />}

        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          <View style={{ width: screenWidth, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, flexDirection: 'row' }}>
            <View style={{ width: screenWidth * 0.5, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, justifyContent: 'center' }}>
              {leftShown && (
                <Animated.View
                  {...leftPanResponder.panHandlers}
                  style={{
                    width: screenWidth * 0.46,
                    height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4,
                    marginLeft: screenWidth * 0.024,
                    shadowColor: 'black',
                    shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10,
                    transform: [{ translateX: leftPosition }],
                  }}
                >
                  {randomEntry && (
                    selectedLevel === 'Hard' ? (
                      <SwipeCardLevelHard capital={randomEntry.capital} />
                    ) : (
                      <SwipeCardLevel country={randomEntry.country} capital={randomEntry.capital} />
                    )
                  )}
                </Animated.View>
              )}
            </View>
            <View style={{ width: screenWidth * 0.5, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, justifyContent: 'center' }}>
              {rightShown && (
                <Animated.View
                  {...rightPanResponder.panHandlers}
                  style={{
                    width: screenWidth * 0.46,
                    height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4,
                    marginLeft: screenWidth * 0.016,
                    shadowColor: 'black',
                    shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10,
                    transform: [{ translateX: rightPosition }],
                  }}
                >
                  {secondRandomEntry && (
                    selectedLevel === 'Hard' ? (
                      <SwipeCardLevelHard capital={secondRandomEntry.capital} />
                    ) : (
                      <SwipeCardLevel country={secondRandomEntry.country} capital={secondRandomEntry.capital} />
                    )
                  )}
                </Animated.View>
              )}
            </View>
          </View>

          <View style={{ width: screenWidth, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, flexDirection: 'row' }}>
            <View style={{ width: screenWidth * 0.5, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, justifyContent: 'center' }}>
              {bottomLeftShown && (
                <Animated.View
                  {...leftBottomPanResponder.panHandlers}
                  style={{
                    width: screenWidth * 0.46, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4,
                    marginLeft: screenWidth * 0.024,
                    shadowColor: 'black',
                    shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10,
                    transform: [{ translateX: bottomLeftPosition }],
                  }}
                >
                  {thirdRandomEntry && (
                    selectedLevel === 'Hard' ? (
                      <SwipeCardLevelHard capital={thirdRandomEntry.capital} />
                    ) : (
                      <SwipeCardLevel country={thirdRandomEntry.country} capital={thirdRandomEntry.capital} />
                    )
                  )}
                </Animated.View>
              )}
            </View>
            <View style={{ width: screenWidth * 0.5, height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4, justifyContent: 'center' }}>
              {bottomRightShown && (
                <Animated.View
                  {...rightBottomPanResponder.panHandlers}
                  style={{
                    width: screenWidth * 0.46,
                    height: selectedLevel === 'Hard' ? screenWidth * 0.3 : screenWidth * 0.4,
                    marginLeft: screenWidth * 0.016,
                    shadowColor: 'black',
                    shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10,
                    transform: [{ translateX: bottomRightPosition }],
                  }}
                >
                  {fourthRandomEntry && (
                    selectedLevel === 'Hard' ? (
                      <SwipeCardLevelHard capital={fourthRandomEntry.capital} />
                    ) : (
                      <SwipeCardLevel country={fourthRandomEntry.country} capital={fourthRandomEntry.capital} />
                    )
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
          <EndGameFour
            game={selectedLevel}
            onButtonPressReset={onButtonPressReset}
            score={counter}
            country1={randomEntry.country}
            capital1={randomEntry.capital}
            longitude1={randomEntry.longitude}
            latitude1={randomEntry.latitude}
            country2={secondRandomEntry.country}
            capital2={secondRandomEntry.capital}
            longitude2={secondRandomEntry.longitude}
            latitude2={secondRandomEntry.latitude}
            country3={thirdRandomEntry.country}
            capital3={thirdRandomEntry.capital}
            longitude3={thirdRandomEntry.longitude}
            latitude3={thirdRandomEntry.latitude}
            country4={fourthRandomEntry.country}
            capital4={fourthRandomEntry.capital}
            longitude4={fourthRandomEntry.longitude}
            latitude4={fourthRandomEntry.latitude}
            PinTop1={randomEntry.pinDropY}
            PinLeft1={randomEntry.pinDropX}
            PinTop2={secondRandomEntry.pinDropY}
            PinLeft2={secondRandomEntry.pinDropX}
            PinTop3={thirdRandomEntry.pinDropY}
            PinLeft3={thirdRandomEntry.pinDropX}
            PinTop4={fourthRandomEntry.pinDropY}
            PinLeft4={fourthRandomEntry.pinDropX}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default MainGameLevel;
