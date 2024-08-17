// import React, { useRef } from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, Platform, Dimensions, Animated } from 'react-native';

// const screenWidth = Dimensions.get('window').width;

// const ButtonComponent = ({ mainHandlePress }) => {
//   const animatedValue = useRef(new Animated.Value(0)).current;

//   const handlePress = () => {
//     Animated.timing(animatedValue, {
//       toValue: 1,
//       duration: 350,
//       useNativeDriver: true,
//     }).start(() => {
//       mainHandlePress();
//     });
//   };

//   const scale = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 0.9], // Adjust the value as needed to scale down the image
//   });

//   return (
//     <TouchableOpacity onPress={handlePress} style={{ backgroundColor: 'red' }}>
//       {Platform.isPad ? (
//         <View style={styles.padContainer}>
//           <Animated.Image
//             source={require('../../Photos/button2.png')}
//             style={[styles.photo, { transform: [{ scale }] }]}
//             resizeMode="contain"
//           />
//         </View>
//       ) : (
//         <View style={styles.phoneContainer}>
//           <Animated.Image
//             source={require('../../Photos/button2.png')}
//             style={[styles.photo, { transform: [{ scale }] }]}
//             resizeMode="contain"
//           />
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   padContainer: {
//     width: screenWidth * 0.3,
//     height: screenWidth * 0.3,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   phoneContainer: {
//     width: screenWidth * 0.4,
//     height: screenWidth * 0.4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   circle: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     top: screenWidth * 0.02,
//     borderRadius: screenWidth * 0.2,
//     backgroundColor: 'red',
//   },
//   photo: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default ButtonComponent;


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

    // shadowColor: 'black',
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 0.8,
    // shadowRadius: 10,
    // elevation: 10,
  },
});

export default ButtonComponent;
