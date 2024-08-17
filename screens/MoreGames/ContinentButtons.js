import React, { useRef } from 'react';
import { View, TouchableOpacity, Alert, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import DisplayWord from '../Multiple/DisplayWord';

const { width: screenWidth } = Dimensions.get('window');

const CustomButton = ({ onPress, isSelected, label, children }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const shineValue = useRef(new Animated.Value(0)).current;
  const labelLength = label.length;
  const dynamicWidth = (screenWidth * 0.0165 * labelLength) + (screenWidth * 0.04);

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
    <TouchableOpacity onPress={handlePress} style={{ marginBottom: screenWidth * 0.014 }}>
      <View style={[styles.button, { width: dynamicWidth }]}>
        <View style={[styles.layer2, { backgroundColor: isSelected ? '#CE761E' : '#6C8A69' }]} />
        <Animated.View
          style={[
            styles.layer1,
            { backgroundColor: isSelected ? '#F7A858' : '#b2d7ad' },
            animatedStyle,
          ]}
        >
          {children || <DisplayWord Word={label} sizeW={0.25} sizeH={0.028} left={0} />}
          <Animated.View style={[styles.shine, shineStyle]} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const ContinentButtons = ({ selectedContinent, setContinent, calculatePercentage }) => {
  const continents = [
    { name: 'Europe', sizeW: 0.15, sizeH: 0.028 },
    { name: 'Africa', sizeW: 0.15, sizeH: 0.028 },
    { name: 'South America', sizeW: 0.2, sizeH: 0.028 },
    { name: 'Asia', sizeW: 0.12, sizeH: 0.028 },
    { name: 'Oceania', sizeW: 0.17, sizeH: 0.028 },
    { name: 'North America', sizeW: 0.25, sizeH: 0.028 },
  ];

  return (
    <>
      <View style={styles.row}>
        {continents.slice(0, 4).map((continent) => (
          <CustomButton
            key={continent.name}
            onPress={() => setContinent(continent.name)}
            isSelected={selectedContinent === continent.name}
            label={continent.name}
          />
        ))}
      </View>
      <View style={[styles.row, styles.bottomRow]}>
        {continents.slice(4).map((continent) => (
          <CustomButton
            key={continent.name}
            onPress={() => setContinent(continent.name)}
            isSelected={selectedContinent === continent.name}
            label={continent.name}
          />
        ))}
        {calculatePercentage() === 100 ? (
          <CustomButton
            onPress={() => setContinent('The World')}
            isSelected={selectedContinent === 'The World'}
            label=" The World "
          />
        ) : (
          <CustomButton
            onPress={() => Alert.alert('Unlock', 'To unlock, you need to complete all the continents games')}
            isSelected={false}
            label="         "
          >
            <Image
              source={require('../../Photos/Padlock.png')}
              style={styles.lockedImage}
            />
          </CustomButton>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    position: 'relative',
    height: screenWidth * 0.057,
    borderRadius: screenWidth * 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
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
  lockedImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default ContinentButtons;

