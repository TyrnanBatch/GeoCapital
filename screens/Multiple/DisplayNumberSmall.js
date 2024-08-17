// import React from 'react';
// import { View, StyleSheet, Dimensions, Image } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');

// const numberImageMap = {
//     0: require('../../Photos/Numbers/numberss.png'),
//     1: require('../../Photos/Numbers/numberss.png'),
//     2: require('../../Photos/Numbers/numberss.png'),
//     3: require('../../Photos/Numbers/numberss.png'),
//     4: require('../../Photos/Numbers/numberss.png'),
//     5: require('../../Photos/Numbers/numberss.png'),
//     6: require('../../Photos/Numbers/numberss.png'),
//     7: require('../../Photos/Numbers/numberss.png'),
//     8: require('../../Photos/Numbers/numberss.png'),
//     9: require('../../Photos/Numbers/numberss.png'),
// };

// const DisplayNumberSmall = ({ number }) => {
//     const baseImageHeight = screenWidth * 0.22;
//     const baseImageWidth = screenWidth * 0.15;
//     const numberString = number.toString();
//     const numberOfDigits = numberString.length;

//     let imageHeight = baseImageHeight;
//     let imageWidth = baseImageWidth;

//     if (numberOfDigits === 2) {
//         imageHeight *= 0.8;
//         imageWidth *= 0.8;
//     } else if (numberOfDigits === 3) {
//         imageHeight *= 0.49;
//         imageWidth *= 0.49;
//     } else if (numberOfDigits >= 4) {
//         imageHeight *= 0.4;
//         imageWidth *= 0.4;
//     } else if (numberOfDigits >= 5) {
//         imageHeight *= 0.02;
//         imageWidth *= 0.02;
//     }

//     return (
//         <View style={[styles.container, { height: imageHeight }]}>
//             <View style={[styles.innerContainer, { width: imageWidth * numberOfDigits }]}>
//                 {numberString.split('').map((char, index) => (
//                     <View key={index} style={[styles.imageContainer, { height: imageHeight, width: imageWidth }]}>
//                         <Image
//                             source={numberImageMap[char] || require('../../Photos/Letters/Blank.png')}
//                             style={styles.image}
//                         />
//                     </View>
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         height: screenWidth * 0.2,
//         backgroundColor: 'red',
//     },
//     innerContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     imageContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         resizeMode: 'contain',
//         height: '100%',
//         width: '100%',
//     },
// });

// export default DisplayNumberSmall;


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
};

const DisplayNumberSmall = ({ number }) => {
    const baseImageHeight = screenWidth * 0.2;
    const baseImageWidth = screenWidth * 0.14;
    const numberString = number.toString();
    const numberOfDigits = numberString.length;

    let imageHeight = baseImageHeight;
    let imageWidth = baseImageWidth;
    let marginTop = 0;

    if (numberOfDigits === 2) {
        imageHeight *= 0.9;
        imageWidth *= 0.9;
        marginTop = screenWidth * 0.02;
    } else if (numberOfDigits === 3) {
        imageHeight *= 0.6;
        imageWidth *= 0.6;
        marginTop = screenWidth * 0.04;
    } else if (numberOfDigits >= 4) {
        imageHeight *= 0.4;
        imageWidth *= 0.4;
        marginTop = screenWidth * 0.05;
    } else if (numberOfDigits >= 5) {
        imageHeight *= 0.02;
        imageWidth *= 0.02;
        marginTop = screenWidth * 0.05;
    }

    return (
        <View style={[styles.container, { height: imageHeight, marginTop: marginTop }]}>
            <View style={[styles.innerContainer, { width: imageWidth * numberOfDigits }]}>
                {numberString.split('').map((char, index) => (
                    <View key={index} style={[styles.imageContainer, { height: imageHeight, width: imageWidth }]}>
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
        // backgroundColor: 'red',
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

export default DisplayNumberSmall;
