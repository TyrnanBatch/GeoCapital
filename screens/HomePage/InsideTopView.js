import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Conditionally import FastImage for Android only
let FastImage;
if (Platform.OS === 'android') {
  FastImage = require('react-native-fast-image');
}

const InsideTopView = () => {
  return (
    <SafeAreaView>
      <View style={styles.pinkSection}>
        <Image 
          source={require('../../Photos/Map/WorldMapFinal.png')} // local photo
          style={styles.photo}
          resizeMode="contain" // make the image fit the screen
        />
        {Platform.OS === 'android' ? (
          FastImage ? (
            <FastImage 
              style={styles.photo}
              source={require('../../Photos/Map/MovingPins.gif')} // Local GIF for Android using FastImage
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : null // In case FastImage is undefined for some reason
        ) : (
          <Image
            source={require('../../Photos/Map/MovingPins.gif')} // Local GIF for iOS using the default Image component
            style={styles.photo}
            resizeMode="contain"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pinkSection: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: screenWidth,
    height: '100%',
    position: 'absolute',
  },
});

export default InsideTopView;
