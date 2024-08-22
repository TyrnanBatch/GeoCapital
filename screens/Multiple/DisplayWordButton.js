import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Platform } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');


const DisplayWordButton = ({ Word}) => {
    const squareHeight =  Platform.isPad ? screenWidth * 0.02 : screenWidth * 0.03;

    const [characterCount, setCharacterCount] = useState(0);

    useEffect(() => {
        if (Word) {
            setCharacterCount(Word.length);
        }
    }, [Word]);

    return (
        <View style={{backgroundColor: 'lightgreen', 
        paddingTop: Platform.isPad ? screenWidth * 0.012 : screenWidth * 0.02,
        paddingLeft: Platform.isPad ? screenWidth * 0.012 : screenWidth * 0.02,
        paddingBottom: Platform.isPad ? screenWidth * 0.012 : screenWidth * 0.02,
        paddingRight: Platform.isPad ? screenWidth * 0.012 : screenWidth * 0.02,

        borderRadius: screenWidth * 0.028, }}>
            <View style={[styles.container, { height: squareHeight, justifyContent: 'center',
           
           width: Platform.isPad ? screenWidth * 0.03 * 0.45 * characterCount : screenWidth * 0.03 * 0.62 * characterCount 
            
            
            }]}>

<Text style={{color: 'black',fontSize: Platform.isPad ? screenWidth * 0.022 : screenWidth * 0.03, alignSelf: 'center', 
                            fontFamily: 'Chalkboard SE',marginTop: -screenWidth * 0.008, }} >{(Word).toUpperCase()}</Text> 


            </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default DisplayWordButton;


