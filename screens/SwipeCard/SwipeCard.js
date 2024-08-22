import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions  } from 'react-native';
import FlagImage from '../Multiple/FlagImage';

const { width: screenWidth, height: height } = Dimensions.get('window');

const SwipeCard = ({ country, capital, latitude, longitude, position, game }) => {
  return (


<View style={styles.container}>

<View style={[styles.cardShadow, { backgroundColor: 'lightgray' }]}>
</View>
      <View style={[styles.card, { backgroundColor: 'white' }]}>

{game === 'country' ? (  
<View style={{ height: screenWidth * 0.28, width: '100%',  justifyContent: 'center'}}>
<Text style={{color: 'black',fontSize: screenWidth * 0.038, alignSelf: 'center',
    marginTop: -screenWidth * 0.01,   fontFamily: 'Chalkboard SE', }} >{country}</Text> 
</View>
 ):(
  <>
<View style={{ height: screenWidth * 0.18, width: '100%', justifyContent: 'center'}}>

<Text style={{color: 'black',fontSize: screenWidth * 0.04, alignSelf: 'center',
    marginTop: -screenWidth * 0.01,   fontFamily: 'Chalkboard SE', }} >{capital}</Text> 

</View>
<View style={{ height: screenWidth * 0.1, width: '100%',  justifyContent: 'center'}}>
<Text style={{color: 'black',fontSize: screenWidth * 0.023, alignSelf: 'center',
    marginTop: -screenWidth * 0.01,   fontFamily: 'Chalkboard SE', }} >{country}</Text> 
</View></>
 )}

<View style={{height: screenWidth * 0.3, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
<View style={styles.flagContainer}>
        <FlagImage country={country} />
  </View>
</View>
<View style={{ height: screenWidth * 0.18, width: '100%', justifyContent: 'center'}}>
{position === "left" ? (
    <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'space-evenly',}}>
      <Image source={require('../../Photos/arrowBlackLeft.png')} style={{ width: screenWidth * 0.04, height: screenWidth * 0.04,  }} />
      <Text style={{color: 'black',fontSize: screenWidth * 0.025, alignSelf: 'center',
    fontFamily: 'Chalkboard SE', }} >{'swipe card to the left'}</Text> 
    </View>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'space-evenly',}}>
    <Text style={{color: 'black',fontSize: screenWidth * 0.025, alignSelf: 'center',
    fontFamily: 'Chalkboard SE', }} >{'swipe card to the right'}</Text> 
      <Image source={require('../../Photos/arrowBlackRight.png')} style={{ width: screenWidth * 0.04, height: screenWidth * 0.04, }} />
  </View>
  )}
</View>

      </View>
      <View style={[styles.topRightEffect, { backgroundColor: 'lightgray' }]}></View>
      <View style={[styles.bottomLeftEffect, { backgroundColor: 'lightgray' }]}></View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.46,
    height: screenWidth * 0.8,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  card: {
    position: 'absolute',
    width: screenWidth * 0.44,
    height: screenWidth * 0.78,
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
  },
  cardShadow: {
    position: 'absolute',
    width: screenWidth * 0.44,
    height: screenWidth * 0.78,
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
    transform: [{ rotate: '45deg' }]
  },
  bottomLeftEffect: {
    width: screenWidth * 0.034,
    height: screenWidth * 0.01,
    zIndex: 10,
    position: 'absolute',
    marginTop: screenWidth * 0.77,
    marginLeft: screenWidth * 0.0095,
    borderBottomWidth: screenWidth * 0.004,
    borderBottomColor: 'black',
    transform: [{ rotate: '45deg' }]
  },
  flagContainer: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.28,
},

});

export default SwipeCard;

