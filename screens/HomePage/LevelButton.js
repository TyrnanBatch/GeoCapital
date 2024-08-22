import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Alert, Image, Platform, Text } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, withDelay } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const DURATION = 500;
const TRANSLATE_X_CAMERA = -screenWidth * 0.24;
const TRANSLATE_X_UPLOAD = -screenWidth * 0.48;
const TRANSLATE_X_CLOUD = -screenWidth * 0.72;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getHeightAdjustment = (height) => Platform.isPad ? height * 0.75 : height;

const LevelButton = ({ setSelectedLevel, selectedLevel, easyScore, mediumScore }) => {
  const isOpened = useRef(false);
  const transXCamera = useSharedValue(0);
  const transXUpload = useSharedValue(0);
  const transXCloud = useSharedValue(0);

  const rCameraAnimateStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: transXCamera.value },
        { scale: interpolate(transXCamera.value, [TRANSLATE_X_CAMERA, 0], [1, 0]) }
      ]
    };
  });

  const rUploadAnimateStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: transXUpload.value },
        { scale: interpolate(transXUpload.value, [TRANSLATE_X_UPLOAD, 0], [1, 0]) }
      ]
    };
  });

  const rCloudAnimateStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: transXCloud.value },
        { scale: interpolate(transXCloud.value, [TRANSLATE_X_CLOUD, 0], [1, 0]) }
      ]
    };
  });

  const getButtonStyle = (level) => ({
    backgroundColor: selectedLevel === level ? 'rgb(184, 223, 252)' : 'lightgreen',
  });

  const handlePress = () => {
    if (isOpened.current) {
      transXCamera.value = withDelay(DURATION, withTiming(0, { duration: DURATION }));
      transXUpload.value = withDelay(DURATION / 2, withTiming(0, { duration: DURATION }));
      transXCloud.value = withTiming(0, { duration: DURATION });
    } else {
      transXCamera.value = withTiming(TRANSLATE_X_CAMERA, { duration: DURATION });
      transXUpload.value = withDelay(DURATION / 2, withTiming(TRANSLATE_X_UPLOAD, { duration: DURATION }));
      transXCloud.value = withDelay(DURATION, withTiming(TRANSLATE_X_CLOUD, { duration: DURATION }));
    }
    isOpened.current = !isOpened.current;
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => pressed ? [styles.plusButton, { transform: [{ scale: 0.9 }] }] : [styles.plusButton]}>
         <Text style={{color: 'black',fontSize: screenWidth * 0.04, alignSelf: 'center',marginTop: -screenWidth * 0.01,
fontFamily: 'Chalkboard SE',}}>{'LEVEL'}</Text>
      </Pressable>
      <AnimatedPressable style={[styles.button, rCameraAnimateStyles, getButtonStyle('Hard')]}>
         {mediumScore >= 10 ? ( 
          <TouchableOpacity onPress={() => setSelectedLevel('Hard')}>
             <Text style={{color: 'black',fontSize: screenWidth * 0.04, alignSelf: 'center',marginTop: -screenWidth * 0.01,
fontFamily: 'Chalkboard SE',}}>{'HARD'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => Alert.alert('Unlock', 'To unlock, you need 10 in Medium')}
            style={styles.lockedButton}
          >
            <Image
              source={require('../../Photos/Padlock.png')}
              style={{ width: '100%', height: '75%', resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        )}
      </AnimatedPressable>
      <AnimatedPressable style={[styles.button, rUploadAnimateStyles, getButtonStyle('Medium')]}>
        {easyScore >= 10 ? ( 
          <TouchableOpacity onPress={() => setSelectedLevel('Medium')}>
             <Text style={{color: 'black',fontSize: screenWidth * 0.04, alignSelf: 'center',marginTop: -screenWidth * 0.01,
fontFamily: 'Chalkboard SE',}}>{'MEDIUM'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => Alert.alert('Unlock', 'To unlock, you need 10 in Easy')}
            style={styles.lockedButton}
          >
            <Image
              source={require('../../Photos/Padlock.png')}
              style={{ width: '100%', height: '75%', resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        )}
      </AnimatedPressable>
      <AnimatedPressable style={[styles.button, rCloudAnimateStyles, getButtonStyle('Easy')]}>
        <TouchableOpacity onPress={() => setSelectedLevel('Easy')}>

          <Text style={{color: 'black',fontSize: screenWidth * 0.04, alignSelf: 'center',marginTop: -screenWidth * 0.01,
fontFamily: 'Chalkboard SE',}}>{'EASY'}</Text>

        </TouchableOpacity>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: getHeightAdjustment(screenWidth * 0.09),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    width: screenWidth * 0.2,
    height: getHeightAdjustment(screenWidth * 0.09),
    backgroundColor: 'lightgreen',
    position: 'absolute',
    right: screenWidth * 0.04,
    bottom: 0,
    borderRadius: screenWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: screenWidth * 0.2,
    height: getHeightAdjustment(screenWidth * 0.09),
    backgroundColor: 'lightgreen',
    borderRadius: screenWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    right: screenWidth * 0.04,
    bottom: 0,
    position: 'absolute',
    zIndex: -1,
  },
  lockedButton: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: screenWidth * 0.22,
    height: getHeightAdjustment(screenWidth * 0.09),
    borderRadius: screenWidth * 0.3,
    backgroundColor: 'gray',
  }
});

export default LevelButton;