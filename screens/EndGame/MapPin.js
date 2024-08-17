// import React from 'react';
// import { View, Image, StyleSheet, Dimensions } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');

// const MapPin = ({ top1, left1, top2, left2, top3, left3, top4, left4 }) => {
//   const renderOverlayImage = (source, top, left) => {
//     if (top === 0 && left === 0) return null;

//     return (
//       <Image
//         source={source}
//         resizeMode="contain"
//         style={[styles.overlayImage, { top: screenWidth * top, left: screenWidth * left }]}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../../Photos/Map/MapPin.png')}
//         resizeMode="contain"
//         style={styles.image}
//       />
//       {renderOverlayImage(require('../../Photos/pinDropOne.png'), top1, left1)}
//       {renderOverlayImage(require('../../Photos/pinDropTwo.png'), top2, left2)}
//       {renderOverlayImage(require('../../Photos/pinDropThree.png'), top3, left3)}
//       {renderOverlayImage(require('../../Photos/pinDropFour.png'), top4, left4)}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: screenWidth * 0.9,
//     height: screenWidth * 0.423,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   overlayImage: {
//     position: 'absolute',
//     width: screenWidth * 0.041,
//     height: screenWidth * 0.06,
//   },
// });

// export default MapPin;


// import React, { useRef, useEffect, useState } from 'react';
// import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');

// const MapPin = ({ top1, left1, top2, left2, top3, left3, top4, left4 }) => {
//   const [showPins, setShowPins] = useState([false, false, false, false]);
//   const mapOpacity = useRef(new Animated.Value(0)).current;
//   const pinOpacities = [
//     useRef(new Animated.Value(0)).current,
//     useRef(new Animated.Value(0)).current,
//     useRef(new Animated.Value(0)).current,
//     useRef(new Animated.Value(0)).current,
//   ];

//   useEffect(() => {
//     // Fade in the map image after 1 second
//     Animated.timing(mapOpacity, {
//       toValue: 1,
//       duration: 1000,
//       delay: 1000,
//       useNativeDriver: true,
//     }).start();

//     // Show the pins with a staggered fade-in effect
//     pinOpacities.forEach((pinOpacity, index) => {
//       setTimeout(() => {
//         Animated.timing(pinOpacity, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }).start();
//         setShowPins((prev) => {
//           const newShowPins = [...prev];
//           newShowPins[index] = true;
//           return newShowPins;
//         });
//       }, (index + 2) * 1000); // Each pin appears 1 second after the previous one
//     });
//   }, []);

//   const renderOverlayImage = (source, top, left, opacity, index) => {
//     if (!showPins[index]) return null;

//     return (
//       <Animated.Image
//         source={source}
//         resizeMode="contain"
//         style={[
//           styles.overlayImage,
//           { top: screenWidth * top, left: screenWidth * left, opacity },
//         ]}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.Image
//         source={require('../../Photos/Map/MapPin.png')}
//         resizeMode="contain"
//         style={[styles.image, { opacity: mapOpacity }]}
//       />
//       {renderOverlayImage(require('../../Photos/pinDropOne.png'), top1, left1, pinOpacities[0], 0)}
//       {renderOverlayImage(require('../../Photos/pinDropTwo.png'), top2, left2, pinOpacities[1], 1)}
//       {renderOverlayImage(require('../../Photos/pinDropThree.png'), top3, left3, pinOpacities[2], 2)}
//       {renderOverlayImage(require('../../Photos/pinDropFour.png'), top4, left4, pinOpacities[3], 3)}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: screenWidth * 0.9,
//     height: screenWidth * 0.423,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   overlayImage: {
//     position: 'absolute',
//     width: screenWidth * 0.041,
//     height: screenWidth * 0.06,
//   },
// });

// export default MapPin;




// import React, { useRef, useEffect, useState } from 'react';
// import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');

// const MapPin = ({ top1, left1, top2, left2, top3, left3, top4, left4 }) => {
//   const [showPins, setShowPins] = useState([false, false, false, false]);

//   // Animated values
//   const mapOpacity = useRef(new Animated.Value(0)).current;
//   const pinAnimations = [
//     {
//       opacity: useRef(new Animated.Value(0)).current,
//       translateY: useRef(new Animated.Value(-10)).current, // Start 10 units higher
//     },
//     {
//       opacity: useRef(new Animated.Value(0)).current,
//       translateY: useRef(new Animated.Value(-10)).current,
//     },
//     {
//       opacity: useRef(new Animated.Value(0)).current,
//       translateY: useRef(new Animated.Value(-10)).current,
//     },
//     {
//       opacity: useRef(new Animated.Value(0)).current,
//       translateY: useRef(new Animated.Value(-10)).current,
//     },
//   ];

//   useEffect(() => {
//     // Fade in the map image after 0.5 seconds
//     Animated.timing(mapOpacity, {
//       toValue: 1,
//       duration: 500,
//       delay: 500,
//       useNativeDriver: true,
//     }).start();

//     // Show the pins with a staggered fade-in and drop-down effect
//     pinAnimations.forEach((pinAnimation, index) => {
//       setTimeout(() => {
//         Animated.parallel([
//           Animated.timing(pinAnimation.opacity, {
//             toValue: 1,
//             duration: 1000,
//             useNativeDriver: true,
//           }),
//           Animated.timing(pinAnimation.translateY, {
//             toValue: 0, // Move to the final position
//             duration: 1000,
//             useNativeDriver: true,
//           }),
//         ]).start();

//         setShowPins((prev) => {
//           const newShowPins = [...prev];
//           newShowPins[index] = true;
//           return newShowPins;
//         });
//       }, (index + 1) * 1000); // Each pin appears 1 second after the previous one
//     });
//   }, []);

//   const renderOverlayImage = (source, top, left, animation, index) => {
//     if (top === 0 && left === 0) return null; // Don't render if both top and left are 0
//     if (!showPins[index]) return null;

//     return (
//       <Animated.Image
//         source={source}
//         resizeMode="contain"
//         style={[
//           styles.overlayImage,
//           {
//             top: screenWidth * top,
//             left: screenWidth * left,
//             opacity: animation.opacity,
//             transform: [{ translateY: animation.translateY }],
//           },
//         ]}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.Image
//         source={require('../../Photos/Map/MapPin.png')}
//         resizeMode="contain"
//         style={[styles.image, { opacity: mapOpacity }]}
//       />
//       {renderOverlayImage(require('../../Photos/pinDropOne.png'), top1, left1, pinAnimations[0], 0)}
//       {renderOverlayImage(require('../../Photos/pinDropTwo.png'), top2, left2, pinAnimations[1], 1)}
//       {renderOverlayImage(require('../../Photos/pinDropThree.png'), top3, left3, pinAnimations[2], 2)}
//       {renderOverlayImage(require('../../Photos/pinDropFour.png'), top4, left4, pinAnimations[3], 3)}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: screenWidth * 0.9,
//     height: screenWidth * 0.423,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   overlayImage: {
//     position: 'absolute',
//     width: screenWidth * 0.041,
//     height: screenWidth * 0.06,
//   },
// });

// export default MapPin;


import React, { useRef, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const MapPin = ({ top1, left1, top2, left2, top3, left3, top4, left4 }) => {
  const [showPins, setShowPins] = useState([false, false, false, false]);

  // Animated values
  const mapOpacity = useRef(new Animated.Value(0)).current;
  const pinAnimations = [
    {
      opacity: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(-10)).current, // Start 10 units higher
    },
    {
      opacity: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(-10)).current,
    },
    {
      opacity: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(-10)).current,
    },
    {
      opacity: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(-10)).current,
    },
  ];

  useEffect(() => {
    // Sharper and quicker fade in for the map image (0.3 seconds)
    Animated.timing(mapOpacity, {
      toValue: 1,
      duration: 300, // Reduced duration for sharper fade-in
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Show the pins with a staggered fade-in and drop-down effect
    pinAnimations.forEach((pinAnimation, index) => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(pinAnimation.opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pinAnimation.translateY, {
            toValue: 0, // Move to the final position
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();

        setShowPins((prev) => {
          const newShowPins = [...prev];
          newShowPins[index] = true;
          return newShowPins;
        });
      }, (index + 1) * 1000); // Each pin appears 1 second after the previous one
    });
  }, []);

  const renderOverlayImage = (source, top, left, animation, index) => {
    if (top === 0 && left === 0) return null; // Don't render if both top and left are 0
    if (!showPins[index]) return null;

    return (
      <Animated.Image
        source={source}
        resizeMode="contain"
        style={[
          styles.overlayImage,
          {
            top: screenWidth * top,
            left: screenWidth * left,
            opacity: animation.opacity,
            transform: [{ translateY: animation.translateY }],
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../Photos/Map/MapPin.png')}
        resizeMode="contain"
        style={[styles.image, { opacity: mapOpacity }]}
      />
      {renderOverlayImage(require('../../Photos/pinDropOne.png'), top1, left1, pinAnimations[0], 0)}
      {renderOverlayImage(require('../../Photos/pinDropTwo.png'), top2, left2, pinAnimations[1], 1)}
      {renderOverlayImage(require('../../Photos/pinDropThree.png'), top3, left3, pinAnimations[2], 2)}
      {renderOverlayImage(require('../../Photos/pinDropFour.png'), top4, left4, pinAnimations[3], 3)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.423,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlayImage: {
    position: 'absolute',
    width: screenWidth * 0.041,
    height: screenWidth * 0.06,
  },
});

export default MapPin;

