import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';

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

const DisplayWordReturn = ({ Word, sizeW, sizeH, left, length, maxLength }) => {
    const squareLength = screenWidth * sizeW;
    const squareHeight = screenWidth * sizeH;
    const imageWidth = squareHeight * 0.625;

    const splitWord = (word, length, maxLength) => {
        if (word.length <= length) {
            return { lines: [word], split: false };
        }
        const indexOfSpace = word.lastIndexOf(' ', length);
        if (indexOfSpace === -1 || indexOfSpace <= 0 || indexOfSpace === word.length - 1) {
            return { lines: [word], split: false }; // No appropriate space found, cannot split
        }
        const firstLine = word.slice(0, indexOfSpace);
        const secondLineContent = word.slice(indexOfSpace + 1);
        const secondLine = secondLineContent.length > maxLength ? "" + secondLineContent : "         " + secondLineContent;
        return { lines: [firstLine, secondLine], split: true };
    };

    const { lines, split } = splitWord(Word, length, maxLength);

    return (
        <View style={[styles.container, { width: squareLength, height: squareHeight * (split ? 2 : 1), justifyContent: left === 0 ? 'center' : 'flex-start' }]}>
            {lines.map((line, lineIndex) => (
                <View key={lineIndex} style={styles.line}>
                    {line.split('').map((char, index) => (
                        <Image
                            key={index}
                            source={imageMap[char.toUpperCase()] || require('../../Photos/Letters/Blank.png')}
                            style={[styles.image, { width: imageWidth, height: squareHeight }]}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'green',
        flexDirection: 'column',
    },
    line: {
        flexDirection: 'row',
    },
    image: {
        resizeMode: 'contain',
    },
});

export default DisplayWordReturn;
