import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayNumber from '../Multiple/DisplayNumber';

const {width: screenWidth} = Dimensions.get('window');

const Card = ({name, backgroundColor, toggleGifTwo}) => {
  const navigation = useNavigation();
  const [highScore, setHighScore] = useState(0); // Default to 0

  useFocusEffect(
    React.useCallback(() => {
      fetchHighScore();
    }, []),
  );

  const fetchHighScore = async () => {
    const score = await getHighScore(name);
    if (score !== null) {
      setHighScore(score);
    }
  };

  const getHighScore = async gameName => {
    try {
      let value;
      if (gameName === 'SizeGame') {
        value = await AsyncStorage.getItem('highScoreSizeGame');
      } else {
        value = await AsyncStorage.getItem('highScorePopulationGame');
      }
      if (value !== null) {
        return parseInt(value);
      }
      return null; // Return null if no high score found
    } catch (error) {
      console.error('Failed to retrieve high score:', error);
      return null;
    }
  };

  const handlePress = () => {
    toggleGifTwo();
    setTimeout(() => {
      navigation.navigate('MiniGameTwo', {game: name});
    }, 800);
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ImageBackground
        source={require('../../Photos/BackgroundLines.png')} // path to your image in the photos folder
        style={{width: '100%', height: '100%', justifyContent: 'space-evenly'}}>
        {name === 'SizeGame' && (
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: screenWidth * 0.1,
                alignSelf: 'center',
                fontFamily: 'Chalkboard SE',
                marginTop: -screenWidth * 0.02,
              }}>
              {'BIGGER AND '}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: screenWidth * 0.1,
                alignSelf: 'center',
                fontFamily: 'Chalkboard SE',
                marginTop: -screenWidth * 0.02,
              }}>
              {'SMALLER '}
            </Text>
          </View>
        )}
        {name === 'PopulationGame' && (
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: screenWidth * 0.1,
                alignSelf: 'center',
                fontFamily: 'Chalkboard SE',
                marginTop: -screenWidth * 0.02,
              }}>
              {'POPULATION '}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: screenWidth * 0.1,
                alignSelf: 'center',
                fontFamily: 'Chalkboard SE',
                marginTop: -screenWidth * 0.02,
              }}>
              {'GAME '}
            </Text>
          </View>
        )}

        <View
          style={{
            width: screenWidth * 0.72,
            height: screenWidth * 0.34,
          }}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={handlePress}>
            <Image
              source={require('../../Photos/buttonTwo.png')}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: screenWidth * 0.72,
            height: screenWidth * 0.4,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#F7A858',
              height: screenWidth * 0.4,
              width: screenWidth * 0.62,
              shadowOffset: {width: 3, height: 3},
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 5,
              borderRadius: screenWidth * 0.03,
              opacity: 0.8,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: screenWidth * 0.62,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: screenWidth * 0.08,
                    alignSelf: 'center',
                    fontFamily: 'Chalkboard SE',
                    marginTop: -screenWidth * 0.02,
                  }}>
                  {'HIGH SCORE'}
                </Text>
              </View>
            </View>

            <View
              style={{
                width: screenWidth * 0.62,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <DisplayNumber number={highScore} sizeH={0.25} left={0} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.75,
    height: screenWidth * 1.18,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: screenWidth * 0.04,
  },
  touchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: screenWidth * 0.187,
    width: screenWidth * 0.34,
    height: screenWidth * 0.34,
    shadowColor: 'black',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default Card;
