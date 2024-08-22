import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContinentButtons from './ContinentButtons';

const { width: screenWidth } = Dimensions.get('window');

const CapitalGameContinents = [
  { name: 'North America', key: 'CapitalNorthAmericaHighScore' },
  { name: 'South America', key: 'CapitalSouthAmericaHighScore' },
  { name: 'Europe', key: 'CapitalEuropeHighScore' },
  { name: 'Asia', key: 'CapitalAsiaHighScore' },
  { name: 'Africa', key: 'CapitalAfricaHighScore' },
  { name: 'Oceania', key: 'CapitalOceaniaHighScore' },
  { name: 'TheWorld', key: 'CapitalTheWorldHighScore' }
];

const FlagGameContinents = [
  { name: 'North America', key: 'FlagNorthAmericaHighScore' },
  { name: 'South America', key: 'FlagSouthAmericaHighScore' },
  { name: 'Europe', key: 'FlagEuropeHighScore' },
  { name: 'Asia', key: 'FlagAsiaHighScore' },
  { name: 'Africa', key: 'FlagAfricaHighScore' },
  { name: 'Oceania', key: 'FlagOceaniaHighScore' },
  { name: 'TheWorld', key: 'FlagTheWorldHighScore' }
];

const LocationContinents = [
  { name: 'North America', key: 'LocationNorthAmericaHighScore' },
  { name: 'South America', key: 'LocationSouthAmericaHighScore' },
  { name: 'Europe', key: 'LocationEuropeHighScore' },
  { name: 'Asia', key: 'LocationAsiaHighScore' },
  { name: 'Africa', key: 'LocationAfricaHighScore' },
  { name: 'Oceania', key: 'LocationOceaniaHighScore' },
  { name: 'TheWorld', key: 'LocationTheWorldHighScore' }
];

const totalCountries = {
  'The World': 195,
  'North America': 23,
  'South America': 12,
  'Europe': 47,
  'Asia': 46,
  'Africa': 54,
  'Oceania': 14
};

const CarouselCardOne = ({ name, backgroundColor, toggleGif }) => {
  const navigation = useNavigation();

  const [continent, setContinent] = useState('Europe');
  const [highScore, setHighScore] = useState(0);
  const [continentScores, setContinentScores] = useState([]);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const fetchHighScores = async (gameType) => {
    let gameContinents;
    switch (gameType) {
      case 'CapitalsGame':
        gameContinents = CapitalGameContinents;
        break;
      case 'FlagGame':
        gameContinents = FlagGameContinents;
        break;
      case 'LocationGame':
        gameContinents = LocationContinents;
        break;
      default:
        return;
    }

    try {
      const scores = await Promise.all(
        gameContinents.map(async (continent) => {
          const storedScore = await AsyncStorage.getItem(continent.key);
          const score = storedScore ? parseInt(storedScore) : 0;
          return { continent: continent.name, score };
        })
      );
      setContinentScores(scores);
    } catch (error) {
      console.error('Error fetching high scores:', error);
    }
  };

  const fetchHighScoreForSelectedContinent = async () => {
    let gameContinents;
    switch (name) {
      case 'CapitalsGame':
        gameContinents = CapitalGameContinents;
        break;
      case 'FlagGame':
        gameContinents = FlagGameContinents;
        break;
      case 'LocationGame':
        gameContinents = LocationContinents;
        break;
      default:
        return;
    }

    const selectedContinent = gameContinents.find((c) => c.name === continent);
    const storedScore = await AsyncStorage.getItem(selectedContinent.key);
    setHighScore(storedScore ? parseInt(storedScore) : 0);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchHighScores(name);
      fetchHighScoreForSelectedContinent();
      setIsButtonPressed(false); // Reset button press state when the screen regains focus
    }, [name, continent])
  );

  const handlePress = () => {
    setIsButtonPressed(true);
    toggleGif();

    setTimeout(() => {
      navigation.navigate('MiniGameOne', { game: name, continent: continent });
    }, 3200);
  };

  const getImageSource = () => {
    switch (continent) {
      case 'North America':
        return require('../../Photos/Map/North_America.png');
      case 'South America':
        return require('../../Photos/Map/South_America.png');
      case 'Europe':
        return require('../../Photos/Map/Europe.png');
      case 'Africa':
        return require('../../Photos/Map/Africa.png');
      case 'Asia':
        return require('../../Photos/Map/Asia.png');
      case 'Oceania':
        return require('../../Photos/Map/Oceania.png');
      case 'The World':
      default:
        return require('../../Photos/Map/Complete_World.png');
    }
  };

  const calculatePercentage = () => {
    const totalScore = continentScores.reduce((accumulator, current) => {
      return accumulator + current.score;
    }, 0);
    const percentage = ((totalScore / 195) * 100).toFixed(2);
    return percentage;
  };

  const totalCountryCount = totalCountries[continent];

  const scalingFactor = Platform.isPad ? 0.053 : 0.053;

  return (
    <View style={styles.container}>
      <View/>
      <View style={{ height: Platform.isPad ? screenWidth * 0.12 : screenWidth * 0.14, justifyContent: 'center'}}>
        {name === 'CapitalsGame' && (
            <Text style={{color: 'black',fontSize: screenWidth * scalingFactor, 
fontFamily: 'Chalkboard SE',}} >{'COUNTRIES AND CAPITALS'}</Text>
        )}
        {name === 'FlagGame' && (
          <Text style={{color: 'black',fontSize: screenWidth * scalingFactor, 
fontFamily: 'Chalkboard SE',}} >{'COUNTRY FLAGS'}</Text>
        )}
        {name === 'LocationGame' && (
          <Text style={{color: 'black',fontSize: screenWidth * scalingFactor, 
fontFamily: 'Chalkboard SE',}} >{'COUNTRY LOCATION'}</Text>
        )}
      </View>

      <View style={{ backgroundColor: 'lightblue', width: '100%', height: screenWidth * 0.39, justifyContent: 'center', alignItems: 'center', borderColorTop: 'black', borderTopWidth: screenWidth * 0.004, borderColorBottom: 'black', borderBottomWidth: screenWidth * 0.004 }}>
        <Image source={getImageSource()} style={{ width: screenWidth * 0.72, height: screenWidth * 0.37 }} />
      </View>

      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={isButtonPressed ? styles.touchableOpacityHidden : styles.touchableOpacity} onPress={handlePress} activeOpacity={1}>
          {!isButtonPressed && <View style={styles.playSymbol} />}
        </TouchableOpacity>
      </View>

      {Platform.isPad ? (
        <>
          <Text style={{color: 'black',fontSize: screenWidth * scalingFactor, 
fontFamily: 'Chalkboard SE',}} >{'HIGH SCORE'}</Text>
<Text style={{color: 'black',fontSize: screenWidth * scalingFactor, 
fontFamily: 'Chalkboard SE', marginTop: -screenWidth * 0.02}} >{`${highScore}/${totalCountryCount}`}</Text>
        </>
      ) : (
        <Text style={{color: 'black',fontSize: screenWidth * scalingFactor, 
fontFamily: 'Chalkboard SE', marginTop: -screenWidth * 0.02}} >{`HIGH SCORE ${highScore}/${totalCountryCount}`}</Text>
      )}

      <ContinentButtons selectedContinent={continent} setContinent={setContinent} calculatePercentage={calculatePercentage} />

      <View style={{ width: '100%', backgroundColor: 'lightgray', height: screenWidth * 0.1 }}>
        <View style={{
          backgroundColor: calculatePercentage() >= 100 ? 'gold' :
            (calculatePercentage() >= 75 ? 'green' :
              (calculatePercentage() >= 25 ? 'orange' : 'red')),
          width: `${calculatePercentage()}%`,
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0
        }}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchableOpacity: {
    backgroundColor: '#b2d7ad',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.19, // Adjusted size to accommodate border
    height: screenWidth * 0.19, // Adjusted size to accommodate border
    marginLeft: screenWidth * 0.029,
    borderRadius: screenWidth * 0.095, // Adjusted radius to accommodate border
    borderWidth: screenWidth * 0.005, // Thin border width
    borderColor: 'black', // White border color
  },
  touchableOpacityHidden: {
    backgroundColor: '#b2d7ad',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.19, // Adjusted size to accommodate border
    height: screenWidth * 0.19, // Adjusted size to accommodate border
    marginLeft: screenWidth * 0.029,
    borderRadius: screenWidth * 0.095, // Adjusted radius to accommodate border
    borderWidth: screenWidth * 0.005, // Thin border width
    borderColor: '#b2d7ad', // Same as background color to hide border
  },
  playSymbol: {
    width: 0,
    height: 0,
    borderLeftWidth: screenWidth * 0.07,
    borderTopWidth: screenWidth * 0.05,
    borderBottomWidth: screenWidth * 0.05,
    marginLeft: screenWidth * 0.02,
    borderLeftColor: 'white',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});

export default CarouselCardOne;
