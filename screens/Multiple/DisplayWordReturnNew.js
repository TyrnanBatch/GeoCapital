import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const imageMap = {
    A: require('../../Photos/Letters/A.png'), B: require('../../Photos/Letters/B.png'),
    C: require('../../Photos/Letters/C.png'), D: require('../../Photos/Letters/D.png'),
    E: require('../../Photos/Letters/E.png'), F: require('../../Photos/Letters/F.png'),
    G: require('../../Photos/Letters/G.png'), H: require('../../Photos/Letters/H.png'),
    I: require('../../Photos/Letters/I.png'), J: require('../../Photos/Letters/J.png'),
    K: require('../../Photos/Letters/K.png'), L: require('../../Photos/Letters/L.png'),
    M: require('../../Photos/Letters/M.png'), N: require('../../Photos/Letters/N.png'),
    O: require('../../Photos/Letters/O.png'), P: require('../../Photos/Letters/P.png'),
    Q: require('../../Photos/Letters/Q.png'), R: require('../../Photos/Letters/R.png'),
    S: require('../../Photos/Letters/S.png'), T: require('../../Photos/Letters/T.png'),
    U: require('../../Photos/Letters/U.png'), V: require('../../Photos/Letters/V.png'),
    W: require('../../Photos/Letters/W.png'), X: require('../../Photos/Letters/X.png'),
    Y: require('../../Photos/Letters/Y.png'), Z: require('../../Photos/Letters/Z.png'),
    0: require('../../Photos/Letters/0.png'), 1: require('../../Photos/Letters/1.png'),
    2: require('../../Photos/Letters/2.png'), 3: require('../../Photos/Letters/3.png'),
    4: require('../../Photos/Letters/4.png'), 5: require('../../Photos/Letters/5.png'),
    6: require('../../Photos/Letters/6.png'), 7: require('../../Photos/Letters/7.png'),
    8: require('../../Photos/Letters/8.png'), 9: require('../../Photos/Letters/9.png'),
    '&': require('../../Photos/Letters/and.png'),'-': require('../../Photos/Letters/dash.png'), 
    '/': require('../../Photos/Letters/slash.png'),"'": require('../../Photos/Letters/apostrophe.png'),
    ':': require('../../Photos/Letters/Colon.png'),'.': require('../../Photos/Letters/FullStop.png'),
    ',': require('../../Photos/Letters/comma.png'),'=': require('../../Photos/Letters/equal.png'),
    '%': require('../../Photos/Letters/percentage.png'),'?': require('../../Photos/Letters/questionmark.png'),
    '!': require('../../Photos/Letters/exlamationmark.png'),'²': require('../../Photos/Letters/SmallTwo.png'), 
    Í: require('../../Photos/Letters/Islash.png'),Ü: require('../../Photos/Letters/Ü.png'),
    Ė: require('../../Photos/Letters/Ė.png'),É: require('../../Photos/Letters/Eslash.png'),
    Ô: require('../../Photos/Letters/Otop.png'),ȯ: require('../../Photos/Letters/ȯ.png'),
    Ó: require('../../Photos/Letters/Ó.png'),Ã: require('../../Photos/Letters/Ã.png'), 
    Ā: require('../../Photos/Letters/Atop.png'), Á: require('../../Photos/Letters/AComma.png'), 
};

const splitWord = (word) => {
    if (word.length <= 18) {
        return [word];
    }

    const middle = Math.floor(word.length / 2);

    let left = word.lastIndexOf(' ', middle);
    let right = word.indexOf(' ', middle + 1);

    if (left === -1) left = word.length;
    if (right === -1) right = word.length;

    let splitIndex = (middle - left <= right - middle) ? left : right;

    if (splitIndex === word.length) {
        splitIndex = middle;
    }

    const firstPart = word.slice(0, splitIndex).trim();
    const secondPart = word.slice(splitIndex).trim();

    return [firstPart, secondPart];
};

const DisplayWord = ({ Word, sizeW, sizeH, left }) => {
    const squareLength = screenWidth * sizeW;
    const wordParts = splitWord(Word);
    const isDoubleHeight = wordParts.length > 1;
    const squareHeight = screenWidth * sizeH * (isDoubleHeight ? 2 : 1);
    const adjustedHeight = squareHeight / wordParts.length;
    const imageWidth = adjustedHeight * 0.625;

    return (
        <View style={[styles.container, { width: squareLength, height: squareHeight, justifyContent: left === 0 ? 'center' : 'flex-start' }]}>
            {wordParts.map((part, partIndex) => (
                <View key={partIndex} style={styles.line}>
                    {part.split('').map((char, index) => (
                        <Image
                            key={index}
                            source={imageMap[char.toUpperCase()] || require('../../Photos/Letters/Blank.png')}
                            style={[styles.image, { width: imageWidth, height: adjustedHeight }]}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        // backgroundColor: 'green'
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        resizeMode: 'contain',
    },
});

export default DisplayWord;

