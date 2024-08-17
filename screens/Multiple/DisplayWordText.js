import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const DisplayWordText = ({ Word, sizeW, sizeH, left }) => {
    const textSize = screenWidth * sizeH;

    return (
        <View style={[styles.container, { justifyContent: left === 0 ? 'flex-start' : 'flex-start' }]}>
            <Text style={[styles.text, {textAlign: left === 0 ? 'left' : 'center', fontSize: textSize, lineHeight: textSize, width: screenWidth * sizeW }]}>
                {Word}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'green',
        flexDirection: 'row',
    },
    text: {
        fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
        color: '#000',
    },
});

export default DisplayWordText;
