// import React, { useState, useEffect, useRef } from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, Dimensions, Platform, Animated } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native'; // Assuming you are using React Navigation
// import DisplayWord from '../Multiple/DisplayWord';

// const { width: screenWidth } = Dimensions.get('window');

// let FastImage;
// if (Platform.OS === 'android') {
//   FastImage = require('react-native-fast-image');
// }

// const Instructions = () => {
//   const [gifSource, setGifSource] = useState(require('../../Photos/OnePhone.gif'));
//   const [isFlipped, setIsFlipped] = useState(true);
//   const [pressCount, setPressCount] = useState(0);
//   const [text1, setText1] = useState('paris is further north then');
//   const [text2, setText2] = useState('madrid so swipe paris off the screen');
//   const [buttonImage, setButtonImage] = useState(require('../../Photos/Next.png')); // Initial button image
//   const navigation = useNavigation();

//   // Animated values
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   // Fade in when component mounts
//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   const handleButtonPress = () => {
//     // Fade out all elements
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 500,
//       useNativeDriver: true,
//     }).start(() => {
//       // Update the content after fade-out
//       if (pressCount === 0) {
//         setGifSource(require('../../Photos/TwoPhone.gif'));
//         setIsFlipped(false); // Set flipped state to tr
//         setText1('london is further north then');
//         setText2('paris so swipe london off the screen');
//         setButtonImage(require('../../Photos/Play.png')); // Change button image to start.png
//         setPressCount(pressCount + 1);
        
//         // Fade back in with new content
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }).start();
//       } else if (pressCount === 1) {
//         // Fade out before navigating
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 500,
//           useNativeDriver: true,
//         }).start(() => {
//           if (Platform.OS === 'android') {
//             navigation.navigate('MainGameAndroid'); // Navigate to Android-specific screen
//           } else if (Platform.OS === 'ios') {
//             navigation.navigate('MainGameIos'); // Navigate to iOS-specific screen
//           }
//         });
//       }
//     });
//   };

//   return (
//     <>
//       <LinearGradient
//         colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
//         style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
//       />
     
//       <View style={styles.container}>
//         <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', flex: 1, justifyContent: 'space-evenly', }}>
          
          
          
//           <View style={{backgroundColor: 'white', width: '100%', height: screenWidth * 0.12,
//           justifyContent: 'space-evenly',  shadowColor: 'black',
//           shadowOffset: { width: 4, height: 4 },
//           shadowOpacity: 0.8,
//           shadowRadius: 10,
//           elevation: 10,borderRadius: screenWidth * 0.02}}>
//             <DisplayWord Word={text1} sizeW={0.8} sizeH={0.032} left={0} />
//             <DisplayWord Word={text2} sizeW={0.8} sizeH={0.032} left={0} />
//           </View>

//           <View style={styles.greenSection}>  
// {Platform.OS === 'android' ? (
//           FastImage ? (
//             <FastImage 
//             style={styles.photo}
//               source={gifSource} // Local GIF for Android using FastImage
//               resizeMode={FastImage.resizeMode.contain}
//             />
//           ) : null 
//         ) : (
//           <Image
//           source={gifSource}
//           style={styles.photo}
//           resizeMode="contain"
//         />
//         )}

// {Platform.OS === 'android' ? (
//           FastImage ? (
//             <FastImage 
//             style={[styles.photo, isFlipped && { transform: [{ scaleX: -1 }] }]}
//               source={require('../../Photos/MovingHand.gif')} // Local GIF for Android using FastImage
//               resizeMode={FastImage.resizeMode.contain}
//             />
//           ) : null // In case FastImage is undefined for some reason
//         ) : (
//           <Image
//               source={require('../../Photos/MovingHand.gif')}
//               style={[styles.photo, isFlipped && { transform: [{ scaleX: -1 }] }]} // Flip the GIF horizontally if isFlipped is true
//               resizeMode="contain"
//             /> 
//         )}
        
//           </View>

//           <TouchableOpacity onPress={handleButtonPress}>
//             <Image
//               source={buttonImage} // Button image based on the state
//               style={styles.button}
//             />
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//   },
//   greenSection: {
//     width: screenWidth * 0.9,
//     height: screenWidth * 0.9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   photo: {
//     width: screenWidth * 0.8,
//     height: '100%',
//     position: 'absolute',
//   },
//   button: {
//     width: screenWidth * 0.32, 
//     height: screenWidth * 0.14,
//     alignSelf: 'center',
//   },
// });

// export default Instructions;





import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions, Platform, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Assuming you are using React Navigation
import DisplayWord from '../Multiple/DisplayWord';

const { width: screenWidth } = Dimensions.get('window');

let FastImage;
if (Platform.OS === 'android') {
  FastImage = require('react-native-fast-image');
}

const Instructions = () => {
  const [gifSource, setGifSource] = useState(require('../../Photos/OnePhone.gif'));
  const [isFlipped, setIsFlipped] = useState(true);
  const [pressCount, setPressCount] = useState(0);
  const [text1, setText1] = useState('paris is further north then');
  const [text2, setText2] = useState('madrid so swipe paris off the screen');
  const [buttonImage, setButtonImage] = useState(require('../../Photos/Next.png')); // Initial button image
  const [showHand, setShowHand] = useState(true); // New state to control visibility of the moving hand
  const navigation = useNavigation();

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade in when component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleButtonPress = () => {
    // Fade out all elements
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Update the content after fade-out
      if (pressCount === 0) {
        setGifSource(require('../../Photos/TwoPhone.gif'));
        setIsFlipped(false); // Set flipped state to false
        setText1('london is further north then');
        setText2('paris so swipe london off the screen');
        setButtonImage(require('../../Photos/Play.png')); // Change button image to start.png
        setPressCount(pressCount + 1);

        // Restart the moving hand GIF by toggling visibility
        setShowHand(false);
        setTimeout(() => {
          setShowHand(true); // Show hand after a brief delay
        }, 100);

        // Fade back in with new content
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
          if (Platform.OS === 'android') {
            navigation.navigate('MainGameAndroid'); // Navigate to Android-specific screen
          } else if (Platform.OS === 'ios') {
            navigation.navigate('MainGameIos'); // Navigate to iOS-specific screen
          }
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
          
          <View style={{backgroundColor: 'white', width: '100%', height: screenWidth * 0.12,
          justifyContent: 'space-evenly',  shadowColor: 'black',
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 10,borderRadius: screenWidth * 0.02}}>
            <DisplayWord Word={text1} sizeW={0.8} sizeH={0.032} left={0} />
            <DisplayWord Word={text2} sizeW={0.8} sizeH={0.032} left={0} />
          </View>

          <View style={styles.greenSection}>  
            {Platform.OS === 'android' ? (
              FastImage ? (
                <FastImage 
                  style={styles.photo}
                  source={gifSource} // Local GIF for Android using FastImage
                  resizeMode={FastImage.resizeMode.contain}
                />
              ) : null 
            ) : (
              <Image
                source={gifSource}
                style={styles.photo}
                resizeMode="contain"
              />
            )}

            {showHand && ( // Conditionally render the moving hand GIF
              Platform.OS === 'android' ? (
                FastImage ? (
                  <FastImage 
                    style={[styles.photo, isFlipped && { transform: [{ scaleX: -1 }] }]}
                    source={require('../../Photos/MovingHand.gif')} // Local GIF for Android using FastImage
                    resizeMode={FastImage.resizeMode.contain}
                  />
                ) : null 
              ) : (
                <Image
                  source={require('../../Photos/MovingHand.gif')}
                  style={[styles.photo, isFlipped && { transform: [{ scaleX: -1 }] }]} // Flip the GIF horizontally if isFlipped is true
                  resizeMode="contain"
                /> 
              )
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
