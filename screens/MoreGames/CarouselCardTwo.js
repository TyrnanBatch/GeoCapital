import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayWord from '../Multiple/DisplayWord';
import DisplayNumber from '../Multiple/DisplayNumber';

const { width: screenWidth } = Dimensions.get('window');

const Card = ({ name, backgroundColor, toggleGifTwo}) => {
  const navigation = useNavigation();
  const [highScore, setHighScore] = useState(0); // Default to 0

  useFocusEffect(
    React.useCallback(() => {
      fetchHighScore();
    }, [])
  );

  const fetchHighScore = async () => {
    const score = await getHighScore(name);
    if (score !== null) {
      setHighScore(score);
    }
  };

 

  const getHighScore = async (gameName) => {
    console.log(gameName);
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
        navigation.navigate('MiniGameTwo', { game: name});
    }, 800);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>

{/* <View style={{backgroundColor: 'red', width: '100%', height: '100%'}}></View> */}


<ImageBackground 
        source={require('../../Photos/BackgroundLines.png')}  // path to your image in the photos folder
        style={{ width: '100%', height: '100%', justifyContent: 'space-evenly',}}>

{name === 'SizeGame' && (
          <View>
          <DisplayWord Word={'countries'} sizeW={0.72} sizeH={0.1} left={0} />
            <DisplayWord Word={'size game'} sizeW={0.72} sizeH={0.07} left={0} />
          </View>
        )}
        {name === 'PopulationGame' && (
          <View>
          <DisplayWord Word={'countries'} sizeW={0.72} sizeH={0.1} left={0} />
            <DisplayWord Word={'population game'} sizeW={0.72} sizeH={0.07} left={0} />
          </View>
        )}

<View style={{ 
    width: screenWidth * 0.72,
    height: screenWidth * 0.34,}}>
<TouchableOpacity style={styles.touchableOpacity} onPress={handlePress}>
      <Image source={require('../../Photos/buttonTwo.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover',  }} />
      </TouchableOpacity>
      </View>

      <View style={{ 
    width: screenWidth * 0.72,
    height: screenWidth * 0.4, alignItems: 'center'}}>
      <View style={{backgroundColor: '#F7A858',height: screenWidth * 0.4, width: screenWidth * 0.62, 
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,borderRadius: screenWidth * 0.03, opacity: 0.8, justifyContent: 'space-evenly', alignItems: 'center' }}>




<View style={{ width: screenWidth * 0.62, alignItems: 'center', justifyContent: 'center', }}>
      <View><DisplayWord Word={"high score:"} sizeW={0.5} sizeH={0.07} left={0} /></View>
    </View>

    <View style={{ width: screenWidth * 0.62, alignItems: 'center', justifyContent: 'center',}}>
        <DisplayNumber number={highScore} sizeH={0.25} left={0} />  
    </View>


      </View>
      </View>
      </ImageBackground>


      {/* <View>

        {name === 'SizeGame' && (
          <>
          <DisplayWord Word={'countries'} sizeW={0.75} sizeH={0.1} left={0} />
            <DisplayWord Word={'size game'} sizeW={0.75} sizeH={0.07} left={0} />
          </>
        )}
        {name === 'PopulationGame' && (
          <>
          <DisplayWord Word={'countries'} sizeW={0.75} sizeH={0.1} left={0} />
            <DisplayWord Word={' population game'} sizeW={0.75} sizeH={0.07} left={1} />
          </>
        )}
      </View>


      <TouchableOpacity style={styles.touchableOpacity} onPress={handlePress}>
      <Image source={require('../../Photos/PlayMini.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover',  }} />
      </TouchableOpacity>

      <View style={{ width: screenWidth * 0.265, alignItems: 'center', justifyContent: 'center', }}>
      <View><DisplayWord Word={"high score:"} sizeW={0.5} sizeH={0.07} left={0} /></View>
    </View>

    <View style={{ width: screenWidth * 0.265, alignItems: 'center', justifyContent: 'center',}}>
        <DisplayNumber number={highScore} sizeH={0.25} left={0} />  
    </View>
 */}




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
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
});





export default Card;