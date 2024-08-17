// import React, { useState, useRef, useEffect } from 'react';
// import { View, Dimensions, Animated, PanResponder, Text, TouchableOpacity, Image, Easing } from 'react-native';
// import { data } from '../../files/capitalData';
// import { useNavigation } from '@react-navigation/native';
// import DisplayWord from './DisplayWord';
// import DisplayCount from './DisplayCount';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// const { width: screenWidth } = Dimensions.get('window');

// const GameTopBar = ({ direction, count, game }) => {
  
//   const rotation = useRef(new Animated.Value(0)).current;
  
// //   const [counter, setCounter] = useState(0);
//   const [previousEntries, setPreviousEntries] = useState([]);
//   const [randomEntry, setRandomEntry] = useState(null);
//   const [secondRandomEntry, setSecondRandomEntry] = useState(null);
//   const [gifUrl, setGifUrl] = useState(require('../../assets/Photos/10second.gif'));
//   const [key, setKey] = useState(Date.now());
//   const [isGifPlaying, setIsGifPlaying] = useState(true);
// //   const [direction, setDirection] = useState('North');
//   const [backgroundColor, setBackgroundColor] = useState('rgb(184, 223, 252)')

//   const [isAnimating, setIsAnimating] = useState(false);




//  useEffect(() => {
//   let rotationValue = 0;
//   switch (direction) {
//     case 'North':
//     case 'Higher':
//       rotationValue = 90;
//       break;
//     case 'East':
//       rotationValue = 180;
//       break;
//       case 'South':
//       case 'Lower':
//       rotationValue = 270; 
//       break;
//     case 'West':
//       rotationValue = 0;
//       break;
//   }
//     Animated.timing(rotation, {
//       toValue: rotationValue,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   }, [direction]);

//   const rotationInterpolate = rotation.interpolate({
//     inputRange: [0, 90, 180, 270, 360],
//     outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
//   });
//   const insets = useSafeAreaInsets();
//   const slideAnim = useRef(new Animated.Value(-screenWidth * 0.25 - insets.top)).current;

//   useEffect(() => {
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   }, [slideAnim]);

//   return (
//     <>
//     <Text>{game}</Text>
//       <Animated.View style={{ 
//         position: 'absolute',
//         height: insets.top, 
//         width: '100%',
//         backgroundColor: 'white',
//         top: 0,  
//         zIndex: 100,
//         transform: [{ translateY: slideAnim }],
//       }} />
//       <Animated.View style={{ 
//         height: screenWidth * 0.25, 
//         width: screenWidth, 
//         backgroundColor: 'white', 
//         flexDirection: 'row', 
//         borderBottomRightRadius: screenWidth * 0.02,
//         borderBottomLeftRadius: screenWidth * 0.02,  
//         shadowColor: 'black',
//         shadowOffset: { width: 4, height: 4 }, 
//         shadowOpacity: 0.8,
//         shadowRadius: 10,
//         elevation: 10,
//         transform: [{ translateY: slideAnim }],
//       }}>
//                  <View style={{ height: screenWidth * 0.25, width: screenWidth * 0.25, }}>
//            <DisplayCount count={count} size={0}/>
//          </View>

// {game === 'PopulationGame' ? (
//         <View style={{ height: screenWidth * 0.25, width: screenWidth * 0.5, justifyContent: 'space-evenly' }}>
//           <View>
//             <DisplayWord Word={'what country has a'} sizeW={0.5} sizeH={0.04} left={0} />
//           </View>
//           <DisplayWord Word={direction} sizeW={0.5} sizeH={0.1} left={0} />
//           <View>
//             <DisplayWord Word={'population'} sizeW={0.5} sizeH={0.04} left={0} />
//           </View>
//         </View>
//       ) : game === 'SizeGame' ? (
//         <View style={{ height: screenWidth * 0.25, width: screenWidth * 0.5, justifyContent: 'space-evenly' }}>
//           <View>
//             <DisplayWord Word={'what country is'} sizeW={0.5} sizeH={0.04} left={0} />
//           </View>
//           <DisplayWord Word={direction} sizeW={0.5} sizeH={0.1} left={0} />
//         </View>
//       ) : (
//         <View style={{ height: screenWidth * 0.25, width: screenWidth * 0.5, justifyContent: 'space-evenly' }}>
//           <View>
//             <DisplayWord Word={'what capital is'} sizeW={0.5} sizeH={0.04} left={0} />
//             <DisplayWord Word={'furthest'} sizeW={0.5} sizeH={0.04} left={0} />
//           </View>
//           <DisplayWord Word={direction} sizeW={0.5} sizeH={0.1} left={0} />
//         </View>
//       )}




//         <View style={{ height: screenWidth * 0.25, width: screenWidth * 0.25, justifyContent: 'center', alignItems: 'center' }}>
//            <Animated.Image
//             source={require('../../assets/Photos/arrow.png')}
//             style={{
//               width: '80%',
//               height: '80%',
//               transform: [{ rotate: rotationInterpolate }],
//             }}
//             resizeMode="contain"
//           />
//         </View>

//       </Animated.View> 
//     </>
//   );
// };

// export default GameTopBar;






import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Animated, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DisplayWord from './DisplayWord';
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
      {/* <Text>{game}</Text> */}
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
          <View style={{ height: screenWidth * 0.22, width: screenWidth * 0.45, justifyContent: 'space-evenly' }}>
            <View>
              <DisplayWord Word={'what country has a'} sizeW={0.45} sizeH={0.047} left={0} />
            </View>
            <DisplayWord Word={direction} sizeW={0.45} sizeH={0.1} left={0} />
            <View>
              <DisplayWord Word={'population'} sizeW={0.45} sizeH={0.047} left={0} />
            </View>
          </View>
        ) : game === 'SizeGame' ? (
          <View style={{ height: screenWidth * 0.22, width: screenWidth * 0.45, justifyContent: 'space-evenly' }}>
            <View>
              <DisplayWord Word={'what country is'} sizeW={0.45} sizeH={0.047} left={0} />
            </View>
            <DisplayWord Word={getDirectionWord(direction, game)} sizeW={0.45} sizeH={0.1} left={0} />
          </View>
        ) : (
          <View style={{ height: screenWidth * 0.22, width: screenWidth * 0.45, justifyContent: 'space-evenly',  }}>
            <View>
              <DisplayWord Word={'what capital is'} sizeW={0.45} sizeH={0.047} left={0} />
              <DisplayWord Word={'furthest'} sizeW={0.45} sizeH={0.047} left={0} />
            </View>
            <DisplayWord Word={direction} sizeW={0.45} sizeH={0.1} left={0} />
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


