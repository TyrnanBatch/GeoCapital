import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions,ScrollView,Animated,
   Image, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { data } from '../../files/capitalData';
import DisplayWordButton from '../Multiple/DisplayWordButton';
import EndGameTwo from '../EndGame/EndGameTwo';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import useSoundPlayer from '../Multiple/useSoundPlayer';
import LocationImage from '../Multiple/LocationImage';
import FlagImage from '../Multiple/FlagImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MiniGameOne = ({ route }) => {
    const { continent,  game } = route.params;
    const navigation = useNavigation();
    const [pressedLetters, setPressedLetters] = useState(true);
    const [chosenLetter, setChosenLetter] = useState('');
    const [randomCapital, setRandomCapital] = useState({});
    const [displayedItems, setDisplayedItems] = useState([]);
    const [counter, setCounter] = useState(0);
    const [score, setScore] = useState(0);
    const [EndGame, setEndGame] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(null)
    const [keyBoard, setKeyBoard] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const { playSoundCorrect, playSoundWrong } = useSoundPlayer();
    const [randomCountry, setRandomCountry] = useState('');
    const [randomCapitalName, setRandomCapitalName] = useState('');

    const CapitalfilteredData = continent === 'The World' ? data : data.filter(item => item.continent === continent);

    const incrementGamesPlayed = async () => {
      try {
        const gamesPlayed = parseInt(await AsyncStorage.getItem('gamesPlayed')) || 0;
        await AsyncStorage.setItem('gamesPlayed', (gamesPlayed + 1).toString());
      } catch (error) {
        console.error('Error updating gamesPlayed:', error);
      }
    };
    
    useEffect(() => { incrementGamesPlayed(); }, []);

    useEffect(() => {
        getNextCapital();
    }, []);

    const getNextCapital = () => {
        if (displayedItems.length >= CapitalfilteredData.length) {
          setEndGame(true)
            return;
        }else{
          setPressedLetters(true)
        }
        let randomIndex;
        let newCapital;

        do {
            randomIndex = Math.floor(Math.random() * CapitalfilteredData.length);
            newCapital = CapitalfilteredData[randomIndex];
        } while (displayedItems.includes(newCapital));

        setRandomCapital(newCapital);
        setRandomCountry(newCapital.country);
        setRandomCapitalName(newCapital.capital);
        setDisplayedItems([...displayedItems, newCapital]);
        setCounter(displayedItems.length + 1);
    };

    const handleBackPress = () => {
        navigation.navigate('MoreGame');
    };

    const handleLetterPressLeave = () => {
        setPressedLetters(true);
    };

    const handleWordPress = (capital) => {
        if (capital === randomCapital.capital) {
            setShowAnswer(true)
            setTimeout(() => {
                setShowAnswer(false)
                getNextCapital();
                }, 1000);
            setScore(score + 1);
            playSoundCorrect()
            setBackgroundColor('green'); 
            setTimeout(() => {
setBackgroundColor(null);
}, 600);
        } else {
          setEndGame(true)
          playSoundWrong()
          setBackgroundColor('red'); 
        }
    };

    const handleLetterPress = (letter) => {
        setChosenLetter(letter);
        setPressedLetters(false);
    };

    const handleBackPressKeyboard = () => {
        setKeyBoard(!keyBoard)
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWYZ'.split('');

if (game === 'CapitalsGame') {
    filteredData = data.filter(item => item.capital.startsWith(chosenLetter)).sort((a, b) => a.capital.localeCompare(b.capital));
} else if (game === 'FlagGame') {
    filteredData = data.filter(item => item.country.startsWith(chosenLetter)).sort((a, b) => a.country.localeCompare(b.country));
} else {
    filteredData = data.filter(item => item.country.startsWith(chosenLetter)).sort((a, b) => a.country.localeCompare(b.country));
}

      const [input, setInput] = useState('');
      const inputRef = useRef(null);
    
      const sanitizeInput = (text) => {
        return text.normalize('NFD')
                   // Remove diacritics
                   .replace(/[\u0300-\u036f]/g, '')
                   // Remove non-alphanumeric characters
                   .replace(/[^a-zA-Z0-9]/g, '')
                   // Convert to uppercase
                   .toUpperCase();
      };
    
      const handleSubmitEditing = () => {
        const sanitizedInput = sanitizeInput(input);
    const country1 = randomCapital.country1.replace(/\s/g, '');
    const country2 = randomCapital.country2.replace(/\s/g, '');
    const country3 = randomCapital.country3.replace(/\s/g, '');
    const capital1 = randomCapital.capital1.replace(/\s/g, '');
    const capital2 = randomCapital.capital2.replace(/\s/g, '');
    const capital3 = randomCapital.capital3.replace(/\s/g, '');
    const isCorrect = (game === "CapitalsGame" && 
    (sanitizedInput === capital1 || sanitizedInput === capital2 || sanitizedInput === capital3)) || 
    ((game === "CountriesGame" || game === "FlagGame" || game === "LocationGame") && 
    (sanitizedInput === country1 || sanitizedInput === country2 || sanitizedInput === country3));

if (isCorrect) {
    setShowAnswer(true)
    setTimeout(() => {
        setShowAnswer(false)
        getNextCapital();
        }, 1000);
            setScore(score + 1);
            playSoundCorrect()
            setBackgroundColor('green'); 
    setTimeout(() => {
setBackgroundColor(null);
}, 600);
        }else{
            setEndGame(true)
            setKeyBoard(false)
            playSoundWrong()
          setBackgroundColor('red'); 
        }
        setInput('');
        inputRef.current.focus();
      };



      const [isSplashVisible, setSplashVisible] = useState(true);
      const opacity = new Animated.Value(1);
    
      useEffect(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }).start(() => {
            setSplashVisible(false);
          });
        }, 200);
      }, [opacity]);

    return (
        <>

<LinearGradient
        colors={['rgb(184, 223, 252)', 'rgb(100, 140, 230)']}
        style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />


{isSplashVisible && (
        <Animated.View
          style={{
            backgroundColor: '#ec6ab1',
            position: 'absolute',
            width: screenWidth,
            height: screenHeight,
            zIndex: 100,
            opacity: opacity,
          }}
        />
      )}


     <SafeAreaView style={{ backgroundColor: backgroundColor, flex: 1, width: '100%', alignItems: 'center',  }}>

   
        <View style={{ width: '100%', height: Platform.isPad ? screenWidth * 0.65 : screenWidth * 0.87, 
        justifyContent: 'space-between', alignItems: 'center',
        shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,}}>

          <View style={{backgroundColor: 'lightgray', width: '97%', height: '100%', 
            borderRadius: screenWidth * 0.04, 
          }}>
          <View style={{backgroundColor: 'white', width: '100%', height: '97%', 
          borderColor: 'black', 
            borderRadius: screenWidth * 0.04,padding: screenWidth * 0.007,   }}>

 <View style={{ width: '100%', height: Platform.isPad ? screenWidth * 0.06 : screenWidth * 0.12, flexDirection: 'row',}}>
  <View style={{ width: screenWidth * 0.1, height: Platform.isPad ? screenWidth * 0.06 : screenWidth * 0.12}}></View>
  <View style={{ width: Platform.isPad ? screenWidth * 0.79 : screenWidth * 0.74, height: Platform.isPad ? screenWidth * 0.06 : screenWidth * 0.12, justifyContent: 'center'}}>

  { game === "LocationGame" ? ( 
  <>
  <Text style={{color: 'black',fontSize: screenWidth * 0.033, alignSelf: 'center',
fontFamily: 'Chalkboard SE', marginTop: -screenWidth * 0.01}} >{'WHAT COUNTRY IS HIGHLIGHTED ON THE MAP'}</Text> 
  <View style={{height: Platform.isPad ? screenWidth * 0.03 : screenWidth * 0.07}}/></>
) : null}

  </View>
  <View style={{ width: Platform.isPad ? screenWidth * 0.06 : screenWidth * 0.1, height: Platform.isPad ? screenWidth * 0.06 : screenWidth * 0.12, }}>
  <TouchableOpacity onPress={handleBackPress} style={{
    alignItems: 'center',justifyContent: 'center',
    height: Platform.isPad ? screenWidth * 0.06 : screenWidth * 0.12,width: Platform.isPad ? screenWidth * 0.06 : screenWidth * 0.12,
   }}>
      <Image
        resizeMode="stretch"
        source={require("../../Photos/closeX.png")}
        style={{width: '100%', height: '100%'}}
      /> 
      </TouchableOpacity>
  </View>

  </View> 
 <View style={{ width: '100%', height: Platform.isPad ? screenWidth * 0.45 : screenWidth * 0.58,}}>
  
  


{ game === "CapitalsGame" ? ( 
    <View style={{ width: '96%',marginLeft: screenWidth * 0.02, height: Platform.isPad ? screenWidth * 0.45 : screenWidth * 0.58, justifyContent: 'space-evenly', alignItems: 'center',
    backgroundColor: 'rgba(128, 0, 128, 0.2)', marginTop: screenWidth * 0.005, borderRadius: screenWidth * 0.03
    }}>
     <Text style={{color: 'black',fontSize: screenWidth * 0.06, alignSelf: 'center',
fontFamily: 'Chalkboard SE', }} >{'WHAT IS THE CAPITAL OF'}</Text> 
 <Text style={{color: 'black',fontSize: screenWidth * 0.08, alignSelf: 'center',
fontFamily: 'Chalkboard SE', }} >{randomCountry}</Text> 
   
   <View style={{backgroundColor: 'orange',borderRadius: screenWidth * 0.04, width: screenWidth * 0.7, height: screenWidth * 0.1, justifyContent: 'space-evenly', alignItems: 'center'}}>
     {showAnswer && ( 
        <Text style={{color: 'black',fontSize: screenWidth * 0.06, alignSelf: 'center', marginTop: -screenWidth * 0.01,
fontFamily: 'Chalkboard SE', }} >{randomCapitalName}</Text> 
)}
</View>

    </View>
) : game === "FlagGame" ? ( 

    <View style={{ width: '96%',marginLeft: screenWidth * 0.02, height: Platform.isPad ? screenWidth * 0.45 : screenWidth * 0.58, justifyContent: 'space-evenly', alignItems: 'center',
    backgroundColor: 'rgba(128, 0, 128, 0.2)', marginTop: screenWidth * 0.005, borderRadius: screenWidth * 0.03
     }}>
    <Text style={{color: 'black',fontSize: screenWidth * 0.046, alignSelf: 'center',
fontFamily: 'Chalkboard SE', }} >{'THIS IS THE FLAG OF WHAT COUNTRY ?'}</Text> 
<View style={styles.flagContainer}>
        <FlagImage country={randomCapital.country} />
  </View>
  <View style={{backgroundColor: 'orange',borderRadius: screenWidth * 0.045, width: screenWidth * 0.7, height: screenWidth * 0.1, justifyContent: 'space-evenly', alignItems: 'center'}}>
    {showAnswer && ( 
      <Text style={{color: 'black',fontSize: screenWidth * 0.04, alignSelf: 'center', marginTop: -screenWidth * 0.01,
fontFamily: 'Chalkboard SE', }} >{randomCountry}</Text> 
   )} 
</View>
   </View>

) : game === "LocationGame" ? ( 
  <View style={{marginTop: Platform.isPad ? -screenWidth * 0.02 : -screenWidth * 0.07, width: Platform.isPad ? screenWidth * 0.5 : screenWidth * 0.7, height: Platform.isPad ? screenWidth * 0.5 : screenWidth * 0.7, alignSelf: 'center'}}>
<LocationImage country={randomCountry}/>
</View>
) : null}


  
  </View> 
 <View style={{ width: '100%', height: Platform.isPad ? screenWidth * 0.115 : screenWidth * 0.12, flexDirection: 'row', justifyContent: 'space-evenly',
  bottom: game === "LocationGame"
      ? (Platform.isPad ? -screenWidth * 0.015 : -screenWidth * 0.033)
      : (Platform.isPad ? 0 : -screenWidth * 0.01),
   }}>
  

<View style={{width: screenWidth * 0.484, height: Platform.isPad ? screenWidth * 0.115 : screenWidth * 0.12, alignItems: 'center', justifyContent: 'center'}}>
<Text style={{color: 'black',fontSize: screenWidth * 0.05, alignSelf: 'center', 
fontFamily: 'Chalkboard SE', }} >{('score: ' + score + '/' + CapitalfilteredData.length).toUpperCase()}</Text> 
</View>
<View style={{ width: screenWidth * 0.484, height: Platform.isPad ? screenWidth * 0.115 : screenWidth * 0.12,alignItems: 'center', justifyContent: 'center'}}>

<TouchableOpacity 
      style={{ 
        backgroundColor: '#98FB98', 
        width: screenWidth * 0.4, 
        height:     game === "LocationGame" ? screenWidth * 0.07 : screenWidth * 0.08, 
        justifyContent: 'space-evenly', 
        alignItems: 'center', 
        borderRadius: screenWidth * 0.04,
      }} 
      onPress={handleBackPressKeyboard}
    >
      { keyBoard  ? ( 
      <Text style={{color: 'black',fontSize: screenWidth * 0.04, alignSelf: 'center', 
fontFamily: 'Chalkboard SE', marginTop: -screenWidth * 0.01,}} >{('use keypad ?').toUpperCase()}</Text> 
) :  ( 
  <Text style={{color: 'black',fontSize: screenWidth * 0.04, alignSelf: 'center', 
fontFamily: 'Chalkboard SE', marginTop: -screenWidth * 0.01,}} >{('use keyboard ?').toUpperCase()}</Text> 
)}
    </TouchableOpacity>
</View>

  </View> 

</View>
          </View>

     </View>

<View style={{width: '100%', flex:1}}> 


{keyBoard  ? (
       <KeyboardAvoidingView
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     >
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSubmitEditing}
          placeholder="Type here..."
          returnKeyType="done"
          placeholderTextColor="#999"
          blurOnSubmit={false}
          autoFocus={true}
        />
      </View>
    </KeyboardAvoidingView>
) : (<></>)}

</View> 

{keyBoard  ? (
       <></>
) : (
            <View style={styles.buttonsContainer}>
                {pressedLetters ? (
                    <>
                        {alphabet.map((letter, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleLetterPress(letter)}
                                style={styles.button}
                            >

                                <View style={styles.layer2} />
                                    
                                
        <View style={styles.layer1}>

        {Platform.isPad ? (
                            <Text style={{color: 'black',fontSize: screenWidth * 0.06, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', marginTop: -screenWidth * 0.01,}} >{(letter).toUpperCase()}</Text> 
                            ):(
                              <Text style={{color: 'black',fontSize: screenWidth * 0.07, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', marginTop: -screenWidth * 0.01,}} >{(letter).toUpperCase()}</Text> 
                            )}
        </View>

                            </TouchableOpacity>
                           
                        ))}
                    </>
                ) : (
                    <>
                        <View style={{
                            width: screenWidth, height: screenWidth * 0.1, borderBottomColor: 'black',
                            borderBottomWidth: screenWidth * 0.007, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row',
                            
                        }}>
                    
                              <Text style={{color: 'black',fontSize: screenWidth * 0.06, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE', marginTop: -screenWidth * 0.01,}} >{('The letter : ' + chosenLetter).toUpperCase()}</Text> 
                            

                            <TouchableOpacity onPress={handleLetterPressLeave} style={{
    alignItems: 'center',justifyContent: 'center',borderColor: 'white',borderWidth: screenWidth * 0.0032,
    height: screenWidth * 0.08,width: screenWidth * 0.08,backgroundColor: 'rgb(184, 223, 252)',borderRadius: screenWidth,elevation: 5,
    }}>
       <Image
        resizeMode="stretch"
        source={require("../../Photos/BackArrow.png")}
        style={{width: screenWidth * 0.055, height: screenWidth * 0.055}}
      /> 
      </TouchableOpacity>
                        </View>
                    <View style={{ width: screenWidth, height: screenWidth * 0.63, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {filteredData.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleWordPress(item.capital)}
                                style={styles.CapitalButton}
                            >
                                {game === "CapitalsGame" ? (
                                    <DisplayWordButton Word={item.capital} />
                                ) : game === "FlagGame" ? (
                                    <DisplayWordButton Word={item.country} />
                                ) :
                                    <DisplayWordButton Word={item.country} />}


                            </TouchableOpacity>
                        ))}
                    </View>
                    </>
                )}
            </View>

)}

            {EndGame && (

      <EndGameTwo
      country={randomCapital.country}
      capital={randomCapital.capital}
      score={score}
      totalScore={CapitalfilteredData.length}
      continent={continent}
      game={game}
    />
    )}

 </SafeAreaView>
 <View
        style={{
          position: 'absolute',
          height: useSafeAreaInsets().bottom,
          width: '100%',
          backgroundColor: 'white',
          bottom: 0,
          zIndex: 50,
        }}
      />
       
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        width: screenWidth,
        height: Platform.isPad ? screenWidth * 0.5 : screenWidth * 0.84,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        borderTopColor: 'black',
        borderTopWidth: screenWidth * 0.007,
    },
    button: {
        width: Platform.isPad ? screenWidth * 0.17 : screenWidth * 0.18,
        height: Platform.isPad ? screenWidth * 0.08 : screenWidth * 0.15,
        marginTop: screenWidth * 0.013,
    },
    CapitalButton: {
        marginTop: screenWidth * 0.02,
        marginLeft: screenWidth * 0.02,
    },

    inputContainer: {
      width: screenWidth * 0.9,
      height: screenWidth * 0.12, // Increased height for better usability
      marginLeft: screenWidth * 0.05,
      marginTop: screenWidth * 0.02,
      borderWidth: 0, // Removing border for a cleaner look
      borderRadius: screenWidth * 0.03, // Increased for a more modern, rounded appearance
      paddingHorizontal: screenWidth * 0.04, // Adjusted for more padding inside
      backgroundColor: '#f5f5f5', // Light grey background for a softer feel
      shadowColor: 'black',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 10,
    },
      input: {
        flex: 1,
        fontSize: screenWidth * 0.05,
      },
      layer1: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '85%',
        backgroundColor: '#98FB98', // Light green color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: screenWidth * 0.025,
      },
      layer2: {
        position: 'absolute',
        top: Platform.isPad ? screenWidth * 0.019 : screenWidth * 0.03,
        left: 0,
        width: '100%',
        height: '80%',
        backgroundColor: '#6ECB6E', // Slightly darker green
        borderRadius: screenWidth * 0.025,
      },
      flagContainer: {
        width: screenWidth * 0.4,
        height: screenWidth * 0.28,
      
      },
});

export default MiniGameOne;