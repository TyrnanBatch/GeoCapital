import React, { useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions, Platform, Text } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const isPad = Platform.isPad;

const CustomButton = ({ onPress, text, color1, color2 }) => {
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
          outputRange: [0, isPad ? screenWidth * 0.007 : screenWidth * 0.019],
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

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.button}>
       <View style={[styles.layer2, { backgroundColor: color2 }]} /> 
        <Animated.View style={[styles.layer1, animatedStyle, { backgroundColor: color1 }]}>
          {text === 'countries and capitals' ? (
            isPad ? (
              <Text style={{color: 'black',fontSize: screenWidth * 0.02, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{'COUNTRIES AND CAPITALS'}</Text> 
            ) : (
                 <Text style={{color: 'black',fontSize: screenWidth * 0.0265, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{'COUNTRIES AND\n    CAPITALS'}</Text> 
            )
          ) : (
            <Text style={{color: 'black',fontSize: isPad ? screenWidth * 0.02 : screenWidth * 0.03, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{(text).toUpperCase()}</Text> 
          )}
          <Animated.View style={[styles.shine, shineStyle]} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const faceWidth = screenWidth * 0.3;
const faceHeight = isPad ? faceWidth * 0.13 : faceWidth * 0.25;
const borderRadius = isPad ? screenWidth * 0.01 : screenWidth * 0.02;

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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius,
    overflow: 'hidden',
  },
  layer2: {
    position: 'absolute',
    top: borderRadius,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: borderRadius,
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '300%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    transform: [{ rotate: '45deg' }],
  },
});

export default CustomButton;
