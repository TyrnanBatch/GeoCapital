import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image, Platform  } from 'react-native';
import RadarChartPart from './RadarChartPart';
import CustomButton from './CustomButton';
import DisplayWord from '../Multiple/DisplayWord';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const InsideView = ({ toggleSlide2 }) => {
  const [displayMode, setDisplayMode] = useState('all'); // 'green', 'blue', 'orange', or 'all'

  const isPad = Platform.isPad;

  const handleButtonPress = (mode) => {
    setDisplayMode(prevMode => prevMode === mode ? 'all' : mode);
  };

  const additionalHighScores = [
    { name: 'Easy Level', key: 'highScoreEasy' },
    { name: 'Medium Level', key: 'highScoreMedium' },
    { name: 'Hard Level', key: 'highScoreHard' },
    { name: 'Population Game', key: 'highScorePopulationGame' },
    { name: 'Size Game', key: 'highScoreSizeGame' },
  ];
  

    const [highScores, setHighScores] = useState({});
  
    useFocusEffect(
      useCallback(() => {
        const fetchHighScores = async () => {
          try {
            const scores = {};
            for (const item of additionalHighScores) {
              const value = await AsyncStorage.getItem(item.key);
              scores[item.key] = value !== null ? value : '0';
            }
            setHighScores(scores);
          } catch (e) {
            console.error('Failed to fetch high scores', e);
          }
        };
  
        fetchHighScores();
      }, [])
    );

  return (
    <SafeAreaView>
      <View style={styles.greenSection}>
<View style={{width: screenWidth, borderBottomWidth: screenWidth * 0.006,borderBottomColor: 'black',height: screenWidth * 0.125,flexDirection: 'row', }}>
<View style={{ width: screenWidth * 0.5, height: '100%', marginLeft: screenWidth * 0.25, justifyContent: 'center', alignItems: 'center'}}>
<DisplayWord Word={'stats page'} sizeW={0.6} sizeH={0.07} left={0} />
</View>
 <TouchableOpacity style={{ postion: 'absoulte',top: 0,width: screenWidth * 0.25, marginLeft: screenWidth * 0.02,height: screenWidth * 0.12, justifyContent: 'center' }} onPress={toggleSlide2}>
          <Image 
            source={require('../../Photos/Home.png')} // local photo
            style={styles.photo}
            resizeMode="contain" // make the image fit the screen
          />
        </TouchableOpacity>  
</View>
        <View style={{ flex: 1, width: screenWidth, justifyContent: 'space-evenly', alignItems: 'center' }}>

          {/* <View style={{ width: '100%', height: isPad ? screenWidth * 0.02 : screenWidth * 0.02}}>
          <DisplayWord Word={'this is not good enough "smh" !!'} sizeW={1} sizeH={isPad ? 0.02 : 0.02} left={0} />
          </View> */}
          
          <View style={{ width: screenWidth, height: Platform.isPad ? screenWidth * 0.52 : screenWidth * 0.76 }}>
            <RadarChartPart displayMode={displayMode} />
          </View>
          <View style={{  width: screenWidth, height: isPad ? screenWidth * 0.05 : screenWidth * 0.1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <CustomButton text="flag game" color1="#7f6ff2" color2="#4930EE" onPress={() => handleButtonPress('green')} />
            <CustomButton text="countries and capitals" color1="#fd6f72" color2="#F32F2F" onPress={() => handleButtonPress('blue')} />
            <CustomButton text="location game" color1="#ffe368" color2="#F2C81F" onPress={() => handleButtonPress('orange')} />
          </View>




          <View style={{  width: screenWidth, height: screenWidth * 0.2, flexDirection: 'row' }}>

<View style={{width: screenWidth * 0.55, height: screenWidth * 0.2, borderRightWidth: screenWidth * 0.006, borderRightColor: 'black', alignItems: 'center'}}>
<View style={{width: '80%', height: screenWidth * 0.06,  justifyContent: 'center', borderBottomColor: 'black',borderBottomWidth: screenWidth * 0.006,}}>
  <DisplayWord Word={'main games'} sizeW={0.435} sizeH={0.045} left={0} />
  </View>
  <View style={{width: '100%', height: screenWidth * 0.14,  justifyContent: 'space-evenly', alignItems: 'center', }}>
  <DisplayWord Word={'Easy mode    ' + highScores['highScoreEasy']} sizeW={0.4} sizeH={0.032} left={0} /> 
  <DisplayWord Word={'Medium mode  ' + highScores['highScoreMedium']} sizeW={0.4} sizeH={0.032} left={0} />
  <DisplayWord Word={'hard mode    ' + highScores['highScoreHard']} sizeW={0.4} sizeH={0.032} left={0} /> 
  </View>
</View>
<View style={{width: screenWidth * 0.45, height: screenWidth * 0.2, alignItems: 'center'}}>
  <View style={{width: '80%', height: screenWidth * 0.06,  justifyContent: 'center', borderBottomColor: 'black',borderBottomWidth: screenWidth * 0.006,}}>
  <DisplayWord Word={'other games'} sizeW={0.36} sizeH={0.045} left={0} />
  </View>
  <View style={{width: '100%', height: screenWidth * 0.14,  justifyContent: 'space-evenly', alignItems: 'center',}}>
  <DisplayWord Word={'population  ' + highScores['highScorePopulationGame']} sizeW={0.45} sizeH={0.03} left={0} />
  <DisplayWord Word={'size        ' + highScores['highScoreSizeGame']} sizeW={0.45} sizeH={0.03} left={0} />
  <DisplayWord Word={' '} sizeW={0.45} sizeH={0.03} left={0} />
  </View>
</View>

  </View>   
      

          </View>
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greenSection: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: screenWidth * 0.06,
    borderTopRightRadius: screenWidth * 0.06,
  },
  photo: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    position: 'absolute',
  },
});

export default InsideView;


