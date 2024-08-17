import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions  } from 'react-native';
import DisplayWord from '../Multiple/DisplayWord';
import DisplayWordReturnNew from '../Multiple/DisplayWordReturnNew';
import FlagImage from '../Multiple/FlagImage';

const { width: width, height: height } = Dimensions.get('window');

const SwipeCardLevel = ({ country, capital,  }) => {
  return (
<View style={styles.container}>
      <View style={styles.cardShadow}></View>
      <View style={styles.card}>
<DisplayWordReturnNew Word={capital} sizeW={0.43} sizeH={0.04} left={1} />
<DisplayWordReturnNew Word={country} sizeW={0.43} sizeH={0.02} left={1} />


<View style={{backgroundColor: 'black', width: width * 0.37, height: width * 0.26, 
justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: width * 0.015,}}>


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
    width: width * 0.46,
    height: width * 0.4,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    
  },
  card: {
    position: 'absolute',
    justifyContent: 'space-evenly',
    width: width * 0.445,
    height: width * 0.385,
    backgroundColor: 'white',
    zIndex: 100,
    overflow: 'hidden',
    borderRadius: width * 0.03,
    top: 0,
    left: 0,
  },
  cardShadow: {
    position: 'absolute',
    width: width * 0.445,
    height: width * 0.385,
    borderColor: 'black',
    backgroundColor: 'lightgray',
    borderRadius: width * 0.03,
    top: width * 0.015,
    left: width * 0.015,
  },
  bottomLeftEffect: {
    width: width * 0.035,
    height: width * 0.01,
    zIndex: 10,
    position: 'absolute',
    marginTop: width * 0.375,
    marginLeft: width * 0.0025,
    transform: [{ rotate: '45deg' }],
    backgroundColor: 'lightgray'
  },
  topRightEffect: {
    width: width * 0.035,
    height: width * 0.01,
    zIndex: 10,
    position: 'absolute',
    marginTop: width * 0.015,
    marginLeft: width * 0.422,
    transform: [{ rotate: '45deg' }],
    backgroundColor: 'lightgray'
  },
  flagContainer: {
    width: width * 0.36,
    height: width * 0.25,
  
  },

});

export default SwipeCardLevel;

