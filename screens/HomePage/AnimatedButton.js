import React, { useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions, Platform, Text } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const AnimatedButton = ({ onPress, text }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const shineValue = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: 1,
          speed: 20,
          bounciness: 5,
          useNativeDriver: true,
        }),
        Animated.timing(shineValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: 0,
          speed: 20,
          bounciness: 5,
          useNativeDriver: true,
        }),
        Animated.timing(shineValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      if (onPress) {
        onPress();
      }
    });
  };

  const animatedStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Platform.isPad ? screenWidth * 0.013 : screenWidth * 0.019],
        }),
      },
    ],
  };

  const shineStyle = {
    opacity: shineValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.8],
    }),
    transform: [
      {
        translateX: shineValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-screenWidth, screenWidth],
        }),
      },
    ],
  };

  const sizeH = Platform.isPad ? 0.04 : 0.05;

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.button}>
        <View style={styles.layer2} />
        <Animated.View style={[styles.layer1, animatedStyle]}>
          <Text style={{color: 'black',fontSize: screenWidth * sizeH, fontFamily: 'Chalkboard SE',}}>{text}</Text>
          <Animated.View style={[styles.shine, shineStyle]} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const faceWidth = Platform.isPad ? screenWidth * 0.55 : screenWidth * 0.7;
const faceHeight = Platform.isPad ? screenWidth * 0.075 : screenWidth * 0.1;

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    width: faceWidth,
    height: faceHeight,
  },
  layer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '80%',
    backgroundColor: '#98FB98',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Platform.isPad ? screenWidth * 0.01 : screenWidth * 0.02,
    overflow: 'hidden',
  },
  layer2: {
    position: 'absolute',
    top: Platform.isPad ? screenWidth * 0.014 : screenWidth * 0.02,
    left: 0,
    width: '100%',
    height: '80%',
    backgroundColor: '#3dcf3d',
    borderRadius: Platform.isPad ? screenWidth * 0.01 : screenWidth * 0.02,
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '300%', // Increase width to make the effect stronger
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Increase opacity to make it stronger
    transform: [{ rotate: '45deg' }],
  },
});

export default AnimatedButton;
