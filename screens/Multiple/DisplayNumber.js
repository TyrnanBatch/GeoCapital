import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const numberImageMap = {
    0: require('../../Photos/Numbers/Zero.png'),
    1: require('../../Photos/Numbers/One.png'),
    2: require('../../Photos/Numbers/Two.png'),
    3: require('../../Photos/Numbers/Three.png'),
    4: require('../../Photos/Numbers/Four.png'),
    5: require('../../Photos/Numbers/Five.png'),
    6: require('../../Photos/Numbers/Six.png'),
    7: require('../../Photos/Numbers/Seven.png'),
    8: require('../../Photos/Numbers/Eight.png'),
    9: require('../../Photos/Numbers/Nine.png'),
    '/': require('../../Photos/Numbers/Slash.png'),
};

const DisplayNumber = ({ number, sizeH }) => {
    const containerHeight = screenWidth * sizeH;
    const numberString = number.toString();
    const numberOfDigits = numberString.length;
    const imageWidth = containerHeight * 0.72; // Adjusted aspect ratio 3:2

    return (
        <View style={[styles.container, { height: containerHeight }]}>
            <View style={[styles.innerContainer, { width: imageWidth * numberOfDigits }]}>
                {numberString.split('').map((char, index) => (
                    <View key={index} style={[styles.imageContainer, { height: containerHeight, width: imageWidth }]}>
                        <Image
                            source={numberImageMap[char] || require('../../Photos/Letters/Blank.png')}
                            style={styles.image}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
    },
});

export default DisplayNumber;
