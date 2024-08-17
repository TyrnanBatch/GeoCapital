import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DisplayWord from '../Multiple/DisplayWord';
import AnimatedButton from './AnimatedButton';
import DisplayNumber from '../Multiple/DisplayNumber';
import ButtonComponent from './ButtonComponent';
import LevelButton from './LevelButton';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

const InsideView = ({ toggleSlideMain, toggleSlideGame, toggleSlideList, toggleSlidePress, selectedLevel, setSelectedLevel,gamesPlayed,toggleMainInstruction }) => {

  const handlePressStats = () => {
    toggleSlidePress();
  };

  const handlePressGames = () => {
    toggleSlideGame();
  };

  const handlePressList = () => {
    toggleSlideList();
  };

  const mainHandlePress = () => {
    if(gamesPlayed < 1){
      toggleMainInstruction()
    }else{
      toggleSlideMain();
    }
  };

  const [highScoreEasy, setHighScoreEasy] = useState(0);
  const [highScoreMedium, setHighScoreMedium] = useState(0);
  const [highScoreHard, setHighScoreHard] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchHighScores = async () => {
        try {
          const storedHighScoreEasy = await AsyncStorage.getItem('highScoreEasy');
          const storedHighScoreMedium = await AsyncStorage.getItem('highScoreMedium');
          const storedHighScoreHard = await AsyncStorage.getItem('highScoreHard');

          if (storedHighScoreEasy !== null) setHighScoreEasy(parseInt(storedHighScoreEasy));
          if (storedHighScoreMedium !== null) setHighScoreMedium(parseInt(storedHighScoreMedium));
          if (storedHighScoreHard !== null) setHighScoreHard(parseInt(storedHighScoreHard));
        } catch (error) {
          console.error('Error fetching high scores:', error);
        }
      };

      fetchHighScores();
    }, [])
  );

  const getHighScoreForSelectedLevel = () => {
    switch (selectedLevel) {
      case 'Easy':
        return highScoreEasy;
      case 'Medium':
        return highScoreMedium;
      case 'Hard':
        return highScoreHard;
      default:
        return 0;
    }
  };


  return (
    <SafeAreaView style={{  borderTopLeftRadius: screenWidth * 0.06,
      borderTopRightRadius: screenWidth * 0.06,  width: '100%', height: '100%'}}>

     
         
      <LinearGradient
        colors={['#FFFDD0','#ddfed9','#ddfed9',   ]}
        style={styles.greenSection}
      >
       
       
    


        <View style={{ width: screenWidth, flex: 3, justifyContent: 'space-evenly', alignItems: 'center',}}>



        {Platform.isPad ? (
          <View style={{ width: screenWidth, height: screenWidth * 0.12, justifyContent: 'center', alignItems: 'center' }}>
            <DisplayNumber number={getHighScoreForSelectedLevel()} sizeW={0.8} sizeH={0.12} left={0} />
          </View>
        ) : (
          <View style={{ width: screenWidth, height: screenWidth * 0.22, justifyContent: 'center', alignItems: 'center' }}>
            <DisplayNumber number={getHighScoreForSelectedLevel()} sizeW={0.8} sizeH={0.22} left={0} />
          </View>
        )}


<ButtonComponent mainHandlePress={mainHandlePress} />


{Platform.isPad ? (
          <View style={{ width: screenWidth * 0.4, height: screenWidth * 0.04 }}>
            <DisplayWord Word={'games played ' + gamesPlayed.toString()} sizeW={0.4} sizeH={0.04} left={0} />
          </View>
        ) : (
          <View style={{ width: screenWidth * 0.8, height: screenWidth * 0.06 }}>
            <DisplayWord Word={'games played ' + gamesPlayed.toString()} sizeW={0.8} sizeH={0.06} left={0} />
          </View>
        )}



        </View>


        <View style={{width: screenWidth * 1.01, flex: 2, backgroundColor: 'black',
        borderTopLeftRadius: screenWidth * 0.06,borderTopRightRadius: screenWidth * 0.06, bottom: -screenWidth * 0.005, justifyContent: 'space-evenly', alignItems: 'center'}}>



<AnimatedButton onPress={handlePressList} text="list page" />
        <AnimatedButton onPress={handlePressGames} text="other games" />
        <AnimatedButton onPress={handlePressStats} text="your stats" />
 
     
           <LevelButton
          easyScore={highScoreEasy}
          mediumScore={highScoreMedium}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        /> 
      
      

        <View/>



        </View>





      </LinearGradient> 





    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greenSection: {
    borderTopLeftRadius: screenWidth * 0.06,
    borderTopRightRadius: screenWidth * 0.06,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default InsideView;
