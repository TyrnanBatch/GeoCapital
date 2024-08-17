
import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, Animated, StyleSheet, TouchableOpacity, Text, Image, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import DisplayWord from '../Multiple/DisplayWord';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct package
import LinearGradient from 'react-native-linear-gradient';
import FlagImage from '../Multiple/FlagImage';
import LottieView from 'lottie-react-native';
import DisplayNumber from '../Multiple/DisplayNumber';
import DisplayWordReturnNew from '../Multiple/DisplayWordReturnNew';

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

const EndgameTwo = ({ country, capital, score, totalScore, continent, game,  }) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isIpad = Platform.isPad;
  const translateYDown = useRef(new Animated.Value(-screenHeight / 2)).current;
  const translateYUp = useRef(new Animated.Value(screenHeight / 2)).current;
  const [showContent, setShowContent] = useState(false);
  const [showContent2, setShowContent2] = useState(false);

  const [onHighScore, setOnHighScore] = useState(false);

  const [storedHighScore, setStoredHighScore] = useState(0);

  const updateHighScore = async (score) => {
    try {
      let continentKey;
      if (game === 'CapitalsGame') {
        continentKey = CapitalGameContinents.find(c => c.name === continent)?.key || 'CapitalTheWorldHighScore';
      }else if (game === 'FlagGame') {
        continentKey = FlagGameContinents.find(c => c.name === continent)?.key || 'FlagTheWorldHighScore';
      }else{
        continentKey = LocationContinents.find(c => c.name === continent)?.key || 'LocationTheWorldHighScore';
      }

      const storedHighScore = await AsyncStorage.getItem(continentKey);
      let highScore = storedHighScore ? parseInt(storedHighScore) : 0;

      if (score > highScore) {
        highScore = score;
        await AsyncStorage.setItem(continentKey, highScore.toString());
        setOnHighScore(true);
      } else {
        console.log('Score is not higher than the current high score.');
      }
      setStoredHighScore(highScore);
    } catch (error) {
      console.error('Error updating high score:', error);
    }
  };
  

  useEffect(() => {
    updateHighScore(score)
    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(translateYDown, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(translateYUp, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start(() => {
          setShowContent(true);
        setTimeout(() => {
          setShowContent2(true);
        }, 1200);
      });
    };
    setTimeout(startAnimation, 1200);
  }, [translateYDown, translateYUp]);
  
  const navigation = useNavigation();


  const handleNavigateHome = () => {
      navigation.navigate('MoreGame'); // Ensure 'Home' matches your route name
  };

  const [isPerfectScore, setIsPerfectScore] = useState(false);

  useEffect(() => {
    if (totalScore > 0 && (score / totalScore) === 1) {
      setIsPerfectScore(true);
    }
  }, [score, totalScore]);

  const highScoreImage = require('../../Photos/HighScore.png');
const completedGameImage = require('../../Photos/CompletedGame.png');

const [showFirst, setShowFirst] = useState(false);
const hasShownRef = useRef(false);

useEffect(() => {
  if (!hasShownRef.current) {
    const firstTimeout = setTimeout(() => setShowFirst(true), 200); // Waits 2 seconds to show the first one
    const hideTimeout = setTimeout(() => {
      setShowFirst(false);
    }, 5000); // All animations disappear after 5.8 seconds (2s delay + 3s visibility + 0.8s delay)

    hasShownRef.current = true; // Set this to true after the animation has been shown

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(hideTimeout);
    };
  }
}, []);


  return (
    <View style={{ width: screenWidth, height: screenHeight, position: 'absolute', zIndex: 100 }}>
        
        {showContent === false ? (
             <>
             <Animated.View style={[styles.blurContainer, { top: 0, transform: [{ translateY: translateYDown }] }]}>
             <BlurView style={[styles.absolute, { width: screenWidth }]} blurType="light" blurAmount={6} overlayColor="rgba(255, 255, 255, 0.2)" />
           </Animated.View>
           <Animated.View style={[styles.blurContainer, { bottom: 0, transform: [{ translateY: translateYUp }] }]}>
             <BlurView style={[styles.absolute, { width: screenWidth }]} blurType="light" blurAmount={6} overlayColor="rgba(255, 255, 255, 0.2)" />
           </Animated.View>
     </>
      ):(


<BlurView style={styles.content} blurType="light" blurAmount={6} >
           {showContent2 && (

<>

<View style={{ 
    position: 'absolute', 
    width: screenWidth * 0.902, 
    height: screenWidth * 1.2, 
    justifyContent: 'space-between', 
    alignItems: 'center',
    top: isIpad ? screenWidth * 0.1 : null,
}}>

{score > 3 && onHighScore && (
        <Image  
        resizeMode="stretch" 
        source={isPerfectScore ? completedGameImage : highScoreImage}
        style={{ 
            width: screenWidth * 0.9,
            height: screenWidth * 0.2,
            marginTop: Platform.OS === 'android' ? -screenWidth * 0.14 : -screenWidth * 0.098,
            zIndex: 100,
            position: 'absolute',
        }} /> )}



    <View style={{ 
        position: 'relative', 
        width: '100%', 
        height: screenWidth * 1.2, 
        backgroundColor: '#2c8ed7',
        borderRadius: screenWidth * 0.055,
        overflow: 'hidden',
        borderWidth: screenWidth * 0.01,
        borderColor: 'black'
    }}>
       
        <LinearGradient

           
colors={['#2c8ed7', '#2cd37c']}
            
            style={{ 
                width: '100%', 
                height: '100%', 
                justifyContent: 'space-evenly', 
                alignItems: 'center',
                // borderRadius: screenWidth * 0.055,  
                overflow: 'hidden' // Keep overflow hidden here
            }}
        >
            
<View style={{width: '100%', height: screenWidth * 0.22,}}>
<DisplayNumber number={`${score}/${totalScore}`} sizeW={0.9} sizeH={0.22} left={0} />
</View>

<View style={{width: '100%', height: screenWidth * 0.6,  flexDirection: 'row', justifyContent: 'space-evenly',  }}>


<View style={{backgroundColor: '#8d5da2', width: screenWidth * 0.7, height: screenWidth * 0.6, borderRadius: screenWidth * 0.02, justifyContent: 'space-evenly'}}>

<DisplayWordReturnNew Word={`$country: ${country}`} sizeW={0.68} sizeH={0.04} left={1} />

<DisplayWordReturnNew Word={`$capital: ${capital}`} sizeW={0.68} sizeH={0.04} left={1} />


<View style={{width: screenWidth * 0.50544,
    height: screenWidth * 0.35424, alignSelf: 'center',}}>
        <FlagImage country={country} />
  </View>

    
 
    </View> 

    
</View>




<View style={{       width: '100%', height: screenWidth * 0.14, alignItems: 'center', 
                justifyContent: 'space-evenly', flexDirection: 'row',  }}>
            <TouchableOpacity onPress={handleNavigateHome}>
                <Image
                    source={require('../../Photos/Done.png')}
                    style={{ 
                        width: screenWidth * 0.32, 
                        height: screenWidth * 0.14 
                    }}
                />
            </TouchableOpacity>
</View>


        </LinearGradient>


        {score > 3 && onHighScore && showFirst && (
        <LottieView
          source={require('../../Photos/Confettie.json')}
          autoPlay
          style={{ 
            width: screenWidth,
            position: 'absolute',
            height: screenWidth,
            zIndex: 100,
          }}
        />)}

    </View>
</View>

</>    
)}
        </BlurView>



      )}
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    width: '100%',
    height: '50%',
  },
  absolute: {
    position: 'absolute',
    height: '100%',
  },
  content: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EndgameTwo;











// <BlurView style={styles.content} blurType="light" blurAmount={6} overlayColor="rgba(255, 255, 255, 0.2)">
//            {showContent2 && (

// <>
// {onHighScore && (
// <View style={{ position: 'absolute', width: screenWidth, height: screenHeight, zIndex: 100,  }}>
//       {showFirst && (
//         <LottieView
//           source={require('../../Photos/Confettie.json')}
//           autoPlay
//           style={{ 
//             width: screenWidth,
//             position: 'absolute',
//             height: screenWidth,
//           }}
//         />
//       )}
//     </View>
// )}


// <View style={{ 
//     position: 'absolute', 
//     height: '100%', 
//     width: screenWidth * 0.9, 
//     height: screenWidth * 1.2, 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
// }}>
//     <View style={{ 
//         position: 'relative', 
//         width: '100%', 
//         height: screenWidth * 1.2, 
//     }}>
//         <LinearGradient

           
// colors={isPerfectScore ? ['#FFD700', '#FFA500', '#FF8C00'] : ['#DDA0DD', '#7B1FA2', '#9932CC']}
            
//             style={{ 
//                 width: '100%', 
//                 height: '100%', 
//                 justifyContent: 'space-between', 
//                 alignItems: 'center',
//                 borderRadius: screenWidth * 0.055,  
//                 overflow: 'hidden' // Keep overflow hidden here
//             }}
//         >

//             {onHighScore ?  ( 
//            <View style={{ 
//             width: screenWidth * 0.85, 
//             height: screenWidth * 0.1, 
//         }}>
//             <View style={{ 
//                 width: screenWidth * 0.85, 
//                 height: screenWidth * 0.2, 
//                 position: 'absolute',
//                 top: -screenWidth * 0.05, // Adjust this value to control how much the image goes over the top
//                 overflow: 'visible'
//             }}>
//                 <Image  
//                     resizeMode="stretch" 
//                     source={isPerfectScore ? completedGameImage : highScoreImage}
//                     style={{ 
//                         width: '100%',
//                         height: '100%',
//                     }} 
//                 /> 
//             </View>
//         </View>
//            ):(
//  <View/>
// )}

// <View style={{ 
//                 width: '100%', 
//                 height: screenWidth * 0.091, 
//             }}>
//       <DisplayWord Word={"country"} sizeW={0.9} sizeH={0.03} left={0} />
//       <View style={{ 
//         width: '20%', 
//         height: screenWidth * 0.004, 
//         backgroundColor: 'black', 
//         alignSelf: 'center', 
//         marginTop: screenWidth * 0.003,
//         marginBottom: screenWidth * 0.01
//     }} />
//       <DisplayWord Word={country} sizeW={0.9} sizeH={0.045} left={0} />
//       <View style={{  marginBottom: screenWidth * 0.02
//     }} />
//             </View>



// <View style={{ 
//                 width: '100%', 
//                 height: screenWidth * 0.091,   
//             }}>
//       <DisplayWord Word={"capital"} sizeW={0.9} sizeH={0.03} left={0} />
//       <View style={{ 
//         width: '20%', 
//         height: screenWidth * 0.004, 
//         backgroundColor: 'black', 
//         alignSelf: 'center', 
//         marginTop: screenWidth * 0.003,
//         marginBottom: screenWidth * 0.01
//     }} />
//       <DisplayWord Word={capital} sizeW={0.9} sizeH={0.045} left={0} />
//             </View>

//             <View style={{ 
//                 width: '100%', 
//                 height: screenWidth * 0.336, 
//                 alignItems: 'center'
//             }}>
//                <View style={{width: screenWidth * 0.48,
//     height: screenWidth * 0.336,}}>
//         <FlagImage country={country} />
//   </View>
//             </View>
            
//             <View style={{ 
//                 width: '100%', 
//                 height: screenWidth * 0.15, 
//                 flexDirection: 'row', 
//                 justifyContent: 'space-evenly',
//             }}>


//               <View style={{ 
//                 width: '25%', 
//                 height: screenWidth * 0.15, 
//                 backgroundColor: 'white',
//                 borderRadius: screenWidth * 0.015,
//                 justifyContent: 'space-evenly'
//             }}>

// <DisplayWord Word={'game'} sizeW={0.223} sizeH={0.02} left={0} />
// <View style={{ 
//         width: '96%', 
//         height: screenWidth * 0.004, 
//         backgroundColor: 'black', 
//         alignSelf: 'center', 
//         marginBottom: screenWidth * 0.005,
//     }} />


// {game === 'CapitalsGame' ? (
//         <DisplayWord Word={'countries and capitals'} sizeW={0.223} sizeH={0.016} left={0} />
//       ) : game === 'FlagGame' ? (
//         <DisplayWord Word={'countrie flags game'} sizeW={0.223} sizeH={0.016} left={0} />
//       ) : (
//         <DisplayWord Word={'countrie location game'} sizeW={0.223} sizeH={0.016} left={0} />
//       )}



// <View style={{ 
//         alignSelf: 'center', 
//         marginBottom: screenWidth * 0.02,
//     }} />
// <DisplayWord Word={'location'} sizeW={0.223} sizeH={0.02} left={0} />
// <View style={{ 
//         width: '96%', 
//         height: screenWidth * 0.004, 
//         backgroundColor: 'black', 
//         alignSelf: 'center', 
//         marginBottom: screenWidth * 0.005,
//     }} />
// <DisplayWord Word={continent} sizeW={0.223} sizeH={0.016} left={0} />


//             </View>

//             <View style={{ 
//                 width: '40%', 
//                 height: screenWidth * 0.15, 
//                 backgroundColor: 'white', 
//                 justifyContent: 'center',
//                 borderRadius: screenWidth * 0.015,
//             }}>
//               <DisplayWord Word={(score + '/' + totalScore).toString()} sizeW={0.36} sizeH={0.077} left={0} />
//             </View>

// <View style={{ 
//                 width: '25%', 
//                 height: screenWidth * 0.15, 
//                 backgroundColor: 'white',
//                 borderRadius: screenWidth * 0.015,
//                 justifyContent: 'space-evenly'
//             }}>
//                <DisplayWord Word={'current high score'} sizeW={0.225} sizeH={0.018} left={0} />

//                <View style={{ 
//         width: '96%', 
//         height: screenWidth * 0.004, 
//         backgroundColor: 'black', 
//         alignSelf: 'center', 
//         marginBottom: screenWidth * 0.004,
//     }} />

//                <DisplayWord Word={storedHighScore.toString()} sizeW={0.225} sizeH={0.1} left={0} />
//             </View>


//             </View>

//             <View style={{ 
//                 width: '100%', 
//                 height: screenWidth * 0.14, 
//                 alignItems: 'center', 
//                 justifyContent: 'space-evenly', 
//                 flexDirection: 'row', 
//             }}>


//             <TouchableOpacity onPress={handleNavigateHome}>
//                 <Image
//                     source={require('../../Photos/Done.png')}
//                     style={{ 
//                         width: screenWidth * 0.32, 
//                         height: screenWidth * 0.14 
//                     }}
//                 />
//             </TouchableOpacity>
//             </View>
//             <View/>
//         </LinearGradient>

//       {onHighScore ?  ( 
//         <View style={{ 
//             position: 'absolute', 
//             top: -screenWidth * 0.05, // Adjust this value to control how much the image goes over the top
//             width: screenWidth * 0.85,
//             height: screenWidth * 0.2,
//             marginLeft: screenWidth * 0.025,
//             justifyContent: 'center',
//             alignItems: 'center',
//         }}>
//             <Image  
//                 resizeMode="stretch" 
//                 source={isPerfectScore ? completedGameImage : highScoreImage} 
//                 style={{ 
//                     width: '100%',
//                     height: '100%',
//                 }} 
//             /> 
//         </View>
//            ):(
// <></>
// )}


//     </View>
// </View>

// </>
// )}
//         </BlurView>