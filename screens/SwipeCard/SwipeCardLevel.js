import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions  } from 'react-native';
import FlagImage from '../Multiple/FlagImage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SwipeCardLevel = ({ country, capital,  }) => {
    return (
        <View style={styles.container}>
            <View style={styles.cardShadow}></View>
            <View style={styles.card}>

                <Text style={{color: 'black',fontSize: screenWidth * 0.036, alignSelf: 'center',
                    marginTop: -screenWidth * 0.01,   fontFamily: 'Chalkboard SE', }}>{capital}</Text>

                <Text style={{color: 'black',fontSize: screenWidth * 0.02, alignSelf: 'center',
                    marginTop: -screenWidth * 0.01,   fontFamily: 'Chalkboard SE', }} >{country}</Text>


                <View style={{backgroundColor: 'black', width: screenWidth * 0.37, height: screenWidth * 0.26,
                    justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: screenWidth * 0.015,}}>
                    <View style={styles.flagContainer}>
                        <FlagImage country={country} />
                    </View>
                </View>
            </View>
            <View style={styles.bottomLeftEffect}></View>
            <View style={styles.topRightEffect}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.46,
        height: screenWidth * 0.4,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    card: {
        position: 'absolute',
        width: screenWidth * 0.44,
        height: screenWidth * 0.38,
        borderWidth: screenWidth * 0.004,
        borderColor: 'black',
        zIndex: 100,
        overflow: 'hidden',
        borderRadius: screenWidth * 0.04,
        top: 0,
        left: 0,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
        backgroundColor: 'white',
        justifyContent: 'space-evenly'
    },
    cardShadow: {
        backgroundColor: 'lightgray',
        position: 'absolute',
        width: screenWidth * 0.44,
        height: screenWidth * 0.38,
        borderWidth: screenWidth * 0.004,
        borderColor: 'black',
        borderRadius: screenWidth * 0.04,
        top: screenWidth * 0.02,
        left: screenWidth * 0.02,
    },
    topRightEffect: {
        width: screenWidth * 0.034,
        height: screenWidth * 0.01,
        zIndex: 10,
        position: 'absolute',
        marginTop: screenWidth * 0.018,
        marginLeft: screenWidth * 0.415,
        borderTopWidth: screenWidth * 0.004,
        borderTopColor: 'black',
        transform: [{ rotate: '45deg' }],
        backgroundColor: 'lightgray',
    },
    bottomLeftEffect: {
        width: screenWidth * 0.034,
        height: screenWidth * 0.01,
        zIndex: 10,
        position: 'absolute',
        marginTop: screenWidth * 0.37,
        marginLeft: screenWidth * 0.0095,
        borderBottomWidth: screenWidth * 0.004,
        borderBottomColor: 'black',
        transform: [{ rotate: '45deg' }],
        backgroundColor: 'lightgray',
    },
    flagContainer: {
        width: screenWidth * 0.36,
        height: screenWidth * 0.25,
    },
});

export default SwipeCardLevel;