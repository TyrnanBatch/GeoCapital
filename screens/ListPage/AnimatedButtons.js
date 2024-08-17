import React, { useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions, Linking,Image } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const CustomImageButton = ({ onPress, imageSource, color1, color2 }) => {
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
          outputRange: [0, screenWidth * 0.019],
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
          <Image source={imageSource} style={styles.image} />
          <Animated.View style={[styles.shine, shineStyle]} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const faceWidth = screenWidth * 0.4;
const faceHeight = faceWidth * 0.25;
const borderRadius = screenWidth * 0.02;

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    width: faceWidth,
    height: faceHeight,
    borderRadius: screenWidth * 0.2,
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    shadowColor: 'black',
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
  image: {
    width: '92%',
    resizeMode: 'contain',
  },
});

const AnimatedButton = ({ country }) => {


  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/${country}`;
    Linking.openURL(url);
  };

  const openWikipedia = () => {
    const url = `https://en.wikipedia.org/wiki/${country}`;
    Linking.openURL(url);
  };

  return (
    <View style={{flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: screenWidth,
    height: screenWidth * 0.11}}>
      <CustomImageButton
        onPress={() => openGoogleMaps()}
        imageSource={require('../../Photos/MapButton.png')}
        color1="#98FB98"
        color2="#3dcf3d"
      />
      <CustomImageButton
        onPress={() => openWikipedia()}
        imageSource={require('../../Photos/Wikipedia.png')}
        color1="#98FB98"
        color2="#3dcf3d"
        // color1="#b2d7ad"
        // color2="#6C8A69"
      />
    </View>
  );
};

export default AnimatedButton;


