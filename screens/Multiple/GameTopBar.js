import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Animated, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DisplayNumberSmall from '../Multiple/DisplayNumberSmall';

const { width: screenWidth } = Dimensions.get('window');

const GameTopBar = ({ direction, count, game }) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const [backgroundColor, setBackgroundColor] = useState('rgb(184, 223, 252)');
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-screenWidth * 0.25 - insets.top)).current;

  useEffect(() => {
    let rotationValue = 0;
    switch (direction) {
      case 'North':
      case 'Higher':
        rotationValue = 180;
        break;
      case 'East':
        rotationValue = 270;
        break;
      case 'South':
      case 'Lower':
        rotationValue = 0; 
        break;
      case 'West':
        rotationValue = 90;
        break;
    }
    Animated.timing(rotation, {
      toValue: rotationValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [direction]);

  const rotationInterpolate = rotation.interpolate({
    inputRange: [0, 90, 180, 270, 360],
    outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
  });

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const getDirectionWord = (direction, game) => {
    if (game === 'SizeGame') {
      if (direction === 'Higher') return 'Bigger';
      if (direction === 'Lower') return 'Smaller';
    }
    return direction;
  };

  return (
    <>
      <Animated.View style={{ 
        position: 'absolute',
        height: insets.top, 
        width: '100%',
        backgroundColor: 'white',
        top: 0,  
        zIndex: 100,
        transform: [{ translateY: slideAnim }],
      }} />
      <Animated.View style={{ 
        height: screenWidth * 0.25, 
        width: screenWidth, 
        backgroundColor: 'white', 
        flexDirection: 'row', 
        borderBottomRightRadius: screenWidth * 0.04,
        borderBottomLeftRadius: screenWidth * 0.04,  
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 }, 
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
        transform: [{ translateY: slideAnim }],
      }}>

        <View style={{width: '100%', height: '100%', backgroundColor: 'lightgray',borderBottomRightRadius: screenWidth * 0.04,
        borderBottomLeftRadius: screenWidth * 0.04,}}>
           <View style={{width: '100%', height: '90%', backgroundColor: 'white',borderBottomRightRadius: screenWidth * 0.04,
        borderBottomLeftRadius: screenWidth * 0.04,flexDirection: 'row',justifyContent: 'space-evenly' }}>
          

          <View style={{ height: screenWidth * 0.2, width: screenWidth * 0.25,marginTop: screenWidth * 0.005 }}>
           <DisplayNumberSmall number={count} left={0} /> 
        </View> 

        {game === 'PopulationGame' ? (
          <View style={{ height: screenWidth * 0.22, width: screenWidth * 0.45, justifyContent: 'space-evenly',  }}>
            <Text style={{color: 'black',fontSize: screenWidth * 0.04, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{'WHAT COUNTRY HAS A'}</Text> 
                            <Text style={{color: 'black',fontSize: screenWidth * 0.08, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{(direction).toUpperCase()}</Text> 
                            <Text style={{color: 'black',fontSize: screenWidth * 0.04, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{'POPULATION'}</Text> 
          </View>
        ) : game === 'SizeGame' ? (
          <View style={{ height: screenWidth * 0.22, width: screenWidth * 0.45, justifyContent: 'space-evenly',  }}>
          
             <Text style={{color: 'black',fontSize: screenWidth * 0.048, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{'WHAT COUNTRY IS'}</Text> 
<Text style={{color: 'black',fontSize: screenWidth * 0.08, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{(getDirectionWord(direction, game)).toUpperCase()}</Text>  

          </View>
        ) : (
          <View style={{ height: screenWidth * 0.22, width: screenWidth * 0.45, justifyContent: 'space-evenly',  }}>
           
<Text style={{color: 'black',fontSize: screenWidth * 0.048, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{'WHAT CAPITAL IS'}</Text> 
                            <Text style={{color: 'black',fontSize: screenWidth * 0.048, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{'FURTHEST'}</Text>
<Text style={{color: 'black',fontSize: screenWidth * 0.08, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', }} >{(direction).toUpperCase()}</Text> 

          </View>
        )}

<View style={{ height: screenWidth * 0.22, width: screenWidth * 0.22, justifyContent: 'center', alignItems: 'center',  }}>
          <Animated.Image
            source={require('../../Photos/Arrow.png')}
            style={{
              width: '85%',
              height: '85%',
              transform: [{ rotate: rotationInterpolate }],
            }}
            resizeMode="contain"
          /> 
        </View> 

        </View>
        </View>


      
      </Animated.View> 
    </>
  );
};

export default GameTopBar;


