// import React, { useRef } from 'react';
// import {
//   StatusBar,
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';
// import Carousel from './Carousel';

// const { width, height } = Dimensions.get('window');

// export default function Page2() {
//   const navigation = useNavigation();

//   const scrollX = useRef(new Animated.Value(0)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current; // Start with 0 for fade-in effect
//   const cardFadeAnim = useRef(new Animated.Value(0)).current; // Start with 0 for fade-in effect
//   const cardTranslateAnim = useRef(new Animated.Value(0)).current; // Start with 0 for no translation

//   useFocusEffect(
//     React.useCallback(() => {
//       Animated.parallel([
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 400,
//           useNativeDriver: true,
//         }),
//         Animated.timing(cardFadeAnim, {
//           toValue: 1,
//           duration: 400,
//           useNativeDriver: true,
//         })
//       ]).start();
//     }, [])
//   );

//   const handleNavigation = () => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//       Animated.timing(cardFadeAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//       Animated.timing(cardTranslateAnim, {
//         toValue: -width * 0.2,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       setTimeout(() => {
//         navigation.navigate('Home');
//       }, 800);
//     });
//   };

//   return (
//     <>
//       <LinearGradient
//         colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
//         style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
//       />


// <View style={{backgroundColor: 'orange', top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0, position: 'absolute', zIndex: 1000}}></View>


//       <View style={styles.container}>
       
//       {Platform.isPad ? (
//         <></>
//       ) : (
//         <View style={{ width: width, height: width * 0.14 }}></View> 
//       )}

//        <Animated.View style={{ opacity: cardFadeAnim, transform: [{ translateX: cardTranslateAnim }], height: Platform.isPad ? width * 1.2 : width * 1.4 }}>
//         <Carousel
//           scrollX={scrollX}
//           fadeAnim={fadeAnim}
//           cardFadeAnim={cardFadeAnim}
//           cardTranslateAnim={cardTranslateAnim}
//         />
//       </Animated.View>

//       <View style={{ width: width, justifyContent: 'center' }}>
//         {Platform.isPad ? (
//           <View style={{ zIndex: 100, alignSelf: 'center', height: width * 0.09, alignItems: 'center' }}>
//             <TouchableOpacity onPress={handleNavigation}>
//               <Animated.View style={{ opacity: fadeAnim }}>
//                 <Image
//                   source={require('../../Photos/closeX.png')}
//                   style={{ width: width * 0.09, height: width * 0.09 }}
//                 />
//               </Animated.View>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={{ zIndex: 100, width: width, height: width * 0.14, alignItems: 'center' }}>
//             <TouchableOpacity onPress={handleNavigation}>
//               <Animated.View style={{ opacity: fadeAnim }}>
//                 <Image
//                   source={require('../../Photos/closeX.png')}
//                   style={{ width: width * 0.14, height: width * 0.14 }}
//                 />
//               </Animated.View>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//   },
// });








import React, { useRef, useState } from 'react';
import {
  StatusBar,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Carousel from './Carousel';

const { width, height } = Dimensions.get('window');

export default function Page2() {
  const navigation = useNavigation();
  
  const [isGifVisible, setGifVisible] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start with 0 for fade-in effect
  const cardFadeAnim = useRef(new Animated.Value(0)).current; // Start with 0 for fade-in effect
  const cardTranslateAnim = useRef(new Animated.Value(0)).current; // Start with 0 for no translation

  // useFocusEffect(
  //   React.useCallback(() => {
  //     Animated.parallel([
  //       Animated.timing(fadeAnim, {
  //         toValue: 1,
  //         duration: 400,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(cardFadeAnim, {
  //         toValue: 1,
  //         duration: 400,
  //         useNativeDriver: true,
  //       })
  //     ]).start();
  //   }, [])
  // );


  useFocusEffect(
    React.useCallback(() => {
      // Reset the animation values
      fadeAnim.setValue(0);
      cardFadeAnim.setValue(0);
      cardTranslateAnim.setValue(0);
  
      // Delay for 1 second before starting the animations
      Animated.sequence([
        Animated.delay(500), // 1 second delay
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(cardFadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ]).start();
    }, [])
  );
  

  const handleNavigation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cardFadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateAnim, {
        toValue: -width * 0.2,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.navigate('Home');
      }, 800);
    });
  };

  const toggleGif = () => {
    setGifVisible(true);
    setTimeout(() => {
      setGifVisible(false);
    }, 4000);
  };

  const toggleGifTwo = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cardFadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateAnim, {
        toValue: -width * 0.2,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }

  let FastImage;
if (Platform.OS === 'android') {
  FastImage = require('react-native-fast-image');
}

  return (
    <>
      <LinearGradient
        colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
        style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

 {/* <View
        style={{  position: 'absolute', width: '100%', height: '100%', zIndex: 80, 
        backgroundColor: 'orange',justifyContent: 'center', alignItems: 'center'}}
      > 
        <View style={{ position: 'absolute',backgroundColor: 'green', width: 10, hight: 10}} />
        </View> */}



  {/* <View
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 80, 
         justifyContent: 'center', alignItems: 'center'}}
      > 
        <View style={{ position: 'absolute', backgroundColor: 'green', width: width * 0.2,
    height: width * 0.2, }} />
      </View>     */}

      {isGifVisible && (
        <View style={{ position: 'absolute', zIndex: 1000, top: 0, left: 0, right: 0, bottom: 0 }}>



           {/* <Image
            source={require('../../Photos/ballMoving.gif')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />  */}



{Platform.OS === 'android' ? (
                <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('../../Photos/AndroidBallMoving.gif')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : ( 
                <Image
                source={require('../../Photos/ballMoving.gif')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              /> 
              )}


        </View>
      )}

      <View style={styles.container}>
       
      {Platform.isPad ? (
        <></>
      ) : (
        <View style={{ width: width, height: width * 0.14 }}></View> 
      )}

       <Animated.View style={{ opacity: cardFadeAnim,transform: [{ translateX: cardTranslateAnim }], height: Platform.isPad ? width * 1.22 : width * 1.4,  }}>
        <Carousel
          scrollX={scrollX}
          fadeAnim={fadeAnim}
          cardFadeAnim={cardFadeAnim}
          cardTranslateAnim={cardTranslateAnim}
          toggleGif={toggleGif} 
          toggleGifTwo={toggleGifTwo}
        />
      </Animated.View>

      <View style={{ width: width, justifyContent: 'center' }}>
        {Platform.isPad ? (
          <View style={{ zIndex: 100, alignSelf: 'center', height: width * 0.09, alignItems: 'center' }}>
            <TouchableOpacity onPress={handleNavigation}>
              <Animated.View style={{ opacity: fadeAnim }}>
                <Image
                  source={require('../../Photos/Home.png')}
                  style={{ width: width * 0.22, height: width * 0.1, marginTop: -width * 0.01 }}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ zIndex: 100, width: width, height: width * 0.14, alignItems: 'center', }}>
            <TouchableOpacity onPress={handleNavigation}>
              <Animated.View style={{ opacity: fadeAnim }}>
                <Image
                  source={require('../../Photos/Home.png')}
                  style={{ width: width * 0.32, height: width * 0.14, marginTop: -width * 0.05 }}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});



// import React, { useRef, useState } from 'react';
// import {
//   StatusBar,
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   TouchableOpacity,
//   Platform,
//   Text,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';
// import Carousel from './Carousel';

// const { width, height } = Dimensions.get('window');

// export default function Page2() {
//   const navigation = useNavigation();
  
//   const [isGifVisible, setGifVisible] = useState(false);

//   const scrollX = useRef(new Animated.Value(0)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current; // Start with 0 for fade-in effect
//   const cardFadeAnim = useRef(new Animated.Value(0)).current; // Start with 0 for fade-in effect
//   const cardTranslateAnim = useRef(new Animated.Value(0)).current; // Start with 0 for no translation

//   useFocusEffect(
//     React.useCallback(() => {
//       Animated.parallel([
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 400,
//           useNativeDriver: true,
//         }),
//         Animated.timing(cardFadeAnim, {
//           toValue: 1,
//           duration: 400,
//           useNativeDriver: true,
//         })
//       ]).start();
//     }, [])
//   );

//   const handleNavigation = () => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//       Animated.timing(cardFadeAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//       Animated.timing(cardTranslateAnim, {
//         toValue: -width * 0.2,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       setTimeout(() => {
//         navigation.navigate('Home');
//       }, 800);
//     });
//   };

//   const toggleGif = () => {
//     setGifVisible(true);
//     setTimeout(() => {
//       setGifVisible(false);
//     }, 5000);
//   };

//   return (
//     <>
//       <LinearGradient
//         colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
//         style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
//       />

//       {isGifVisible && (
//         <View style={{ position: 'absolute', zIndex: 1000, top: 0, left: 0, right: 0, bottom: 0 }}>
//            <Image
//             source={require('../../Photos/ballMoving.gif')}
//             style={{ width: '100%', height: '100%' }}
//             resizeMode="cover"
//           /> 
//         </View>
//       )}

//       <View style={styles.container}>
       
//       {Platform.isPad ? (
//         <></>
//       ) : (
//         <View style={{ width: width, height: width * 0.14 }}></View> 
//       )}

//        <Animated.View style={{ opacity: cardFadeAnim, transform: [{ translateX: cardTranslateAnim }], height: Platform.isPad ? width * 1.2 : width * 1.4 }}>
//         <Carousel
//           scrollX={scrollX}
//           fadeAnim={fadeAnim}
//           cardFadeAnim={cardFadeAnim}
//           cardTranslateAnim={cardTranslateAnim}
//         />
//       </Animated.View>

//       <View style={{ width: width, justifyContent: 'center' }}>
//         {Platform.isPad ? (
//           <View style={{ zIndex: 100, alignSelf: 'center', height: width * 0.09, alignItems: 'center' }}>
//             <TouchableOpacity onPress={handleNavigation}>
//               <Animated.View style={{ opacity: fadeAnim }}>
//                 <Image
//                   source={require('../../Photos/closeX.png')}
//                   style={{ width: width * 0.09, height: width * 0.09 }}
//                 />
//               </Animated.View>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={{ zIndex: 100, width: width, height: width * 0.14, alignItems: 'center' }}>
//             <TouchableOpacity onPress={handleNavigation}>
//               <Animated.View style={{ opacity: fadeAnim }}>
//                 <Image
//                   source={require('../../Photos/closeX.png')}
//                   style={{ width: width * 0.14, height: width * 0.14 }}
//                 />
//               </Animated.View>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       <TouchableOpacity onPress={toggleGif} style={styles.toggleButton}>
//         <Text style={styles.toggleButtonText}>Toggle GIF</Text>
//       </TouchableOpacity>
//     </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//   },
//   toggleButton: {
//     position: 'absolute',
//     bottom: 50,
//     left: 20,
//     right: 20,
//     padding: 15,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   toggleButtonText: {
//     fontSize: 16,
//     color: 'black',
//   },
// });
