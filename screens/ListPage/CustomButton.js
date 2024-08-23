import React, { useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated, Dimensions, Text } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CustomButton = ({ onPress, isSelected, label }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const shineValue = useRef(new Animated.Value(0)).current;
  const labelLength = label.length;
  const dynamicWidth = (screenWidth * 0.019 * labelLength) + (screenWidth * 0.04);

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
          outputRange: [0, screenWidth * 0.01],
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
    <TouchableOpacity onPress={handlePress} style={{ margin: screenWidth * 0.013 }}>
      <View style={[styles.button, { width: dynamicWidth }]}>
        <View style={[styles.layer2, { backgroundColor: isSelected ? '#CE761E' : '#789475' }]} />
        <Animated.View
          style={[
            styles.layer1,
            {
              backgroundColor: isSelected ? '#F7A858' : '#D6F2D3',
            },
            animatedStyle,
          ]}
        >
          <Text style={{color: 'black',fontSize: screenWidth * 0.03, 
fontFamily: 'Chalkboard SE',}}>{(label).toUpperCase()}</Text>
          <Animated.View style={[styles.shine, shineStyle]} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    height: screenWidth * 0.057,
    borderRadius: screenWidth * 0.2,
  },
  layer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: screenWidth * 0.02,
    overflow: 'hidden',
  },
  layer2: {
    position: 'absolute',
    top: screenWidth * 0.011,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: screenWidth * 0.02,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    shadowColor: 'black',
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