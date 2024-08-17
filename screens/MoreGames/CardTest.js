// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import CarouselCardOne from './CarouselCardOne';
// import CarouselCardTwo from './CarouselCardTwo';

// const { width: screenWidth } = Dimensions.get('window');

// const CardTest = ({ name, backgroundColor, backgroundColor2 }) => {


//   const renderCarousel = (name) => {
//     switch (name) {
//       case 'CapitalsGame':
//       case 'FlagGame':
//       case 'LocationGame':
//         return <CarouselCardOne name={name} />;
//       case 'PopulationGame':
//       case 'SizeGame':
//         return <CarouselCardTwo name={name} />;
//       default:
//         return null;
//     }
//   };


//   return (
//     <View style={styles.container}>
//       <View style={[styles.cardShadow, { backgroundColor: backgroundColor2 }]}></View>
//       <View style={[styles.card, { backgroundColor: backgroundColor,  }]}>

//      {renderCarousel(name)}

//       </View>
//       <View style={[styles.topRightEffect, { backgroundColor: backgroundColor2 }]}></View>
//       <View style={[styles.bottomLeftEffect, { backgroundColor: backgroundColor2 }]}></View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: screenWidth * 0.75,
//     height: screenWidth * 1.2,
//   },
//   card: {
//     position: 'absolute',
//     width: screenWidth * 0.72,
//     height: screenWidth * 1.17,
//     borderWidth: screenWidth * 0.004, // Thin border
//     borderColor: 'black', // Black color
//     zIndex: 100,
//     borderRadius: screenWidth * 0.04,
//     top: 0,
//     left: 0,
//   },
//   cardShadow: {
//     position: 'absolute',
//     width: screenWidth * 0.72,
//     height: screenWidth * 1.17,
//     borderWidth: screenWidth * 0.004, // Thin border
//     borderColor: 'black', // Black color
//     borderRadius: screenWidth * 0.04,
//     top: screenWidth * 0.03,
//     left: screenWidth * 0.03,
//   },
//   topRightEffect: {
//     width: screenWidth * 0.045,
//     height: screenWidth * 0.01,
//     zIndex: 10,
//     position: 'absolute',
//     marginTop: screenWidth * 0.0229,
//     marginLeft: screenWidth * 0.695,
//     borderTopWidth: screenWidth * 0.004, // Thin top border
//     borderTopColor: 'black', // 
//     transform: [{ rotate: '45deg' }]
//   },
//   bottomLeftEffect: {
//     width: screenWidth * 0.045,
//     height: screenWidth * 0.01,
//     zIndex: 10,
//     position: 'absolute',
//     marginTop: screenWidth * 1.166,
//     marginLeft: screenWidth * 0.0095,
//     borderBottomWidth: screenWidth * 0.004,
//     borderBottomColor: 'black', // 
//     transform: [{ rotate: '45deg' }]
//   },
// });

// export default CardTest;




// import React from 'react';
// import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
// import CarouselCardOne from './CarouselCardOne';
// import CarouselCardTwo from './CarouselCardTwo';

// const { width: screenWidth } = Dimensions.get('window');

// const CardTest = ({ name, backgroundColor, backgroundColor2, toggleGif }) => {

//   const renderCarousel = (name) => {
//     switch (name) {
//       case 'CapitalsGame':
//       case 'FlagGame':
//       case 'LocationGame':
//         return <CarouselCardOne name={name} />;
//       case 'PopulationGame':
//       case 'SizeGame':
//         return <CarouselCardTwo name={name} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={[styles.cardShadow, { backgroundColor: backgroundColor2 }]}></View>
//       <View style={[styles.card, { backgroundColor: backgroundColor }]}>
//         {renderCarousel(name)}
//       </View>
//       <View style={[styles.topRightEffect, { backgroundColor: backgroundColor2 }]}></View>
//       <View style={[styles.bottomLeftEffect, { backgroundColor: backgroundColor2 }]}></View>
//       <TouchableOpacity onPress={toggleGif} style={styles.toggleButton}>
//         <Text style={styles.toggleButtonText}>Toggle GIF</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: screenWidth * 0.75,
//     height: screenWidth * 1.2,
//   },
//   card: {
//     position: 'absolute',
//     width: screenWidth * 0.72,
//     height: screenWidth * 1.17,
//     borderWidth: screenWidth * 0.004, // Thin border
//     borderColor: 'black', // Black color
//     zIndex: 100,
//     borderRadius: screenWidth * 0.04,
//     top: 0,
//     left: 0,
//   },
//   cardShadow: {
//     position: 'absolute',
//     width: screenWidth * 0.72,
//     height: screenWidth * 1.17,
//     borderWidth: screenWidth * 0.004, // Thin border
//     borderColor: 'black', // Black color
//     borderRadius: screenWidth * 0.04,
//     top: screenWidth * 0.03,
//     left: screenWidth * 0.03,
//   },
//   topRightEffect: {
//     width: screenWidth * 0.045,
//     height: screenWidth * 0.01,
//     zIndex: 10,
//     position: 'absolute',
//     marginTop: screenWidth * 0.0229,
//     marginLeft: screenWidth * 0.695,
//     borderTopWidth: screenWidth * 0.004, // Thin top border
//     borderTopColor: 'black', // 
//     transform: [{ rotate: '45deg' }]
//   },
//   bottomLeftEffect: {
//     width: screenWidth * 0.045,
//     height: screenWidth * 0.01,
//     zIndex: 10,
//     position: 'absolute',
//     marginTop: screenWidth * 1.166,
//     marginLeft: screenWidth * 0.0095,
//     borderBottomWidth: screenWidth * 0.004,
//     borderBottomColor: 'black', // 
//     transform: [{ rotate: '45deg' }]
//   },
//   toggleButton: {
//     // position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     padding: 15,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   toggleButtonText: {
//     fontSize: 16,
//     color: 'black',
//   },
// });

// export default CardTest;



import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CarouselCardOne from './CarouselCardOne';
import CarouselCardTwo from './CarouselCardTwo';

const { width: screenWidth } = Dimensions.get('window');

const CardTest = ({ name, backgroundColor, backgroundColor2, toggleGif,toggleGifTwo }) => {

  const renderCarousel = (name) => {
    switch (name) {
      case 'CapitalsGame':
      case 'FlagGame':
      case 'LocationGame':
        return <CarouselCardOne name={name} toggleGif={toggleGif} />;
      case 'PopulationGame':
      case 'SizeGame':
        return <CarouselCardTwo name={name} toggleGifTwo={toggleGifTwo} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.cardShadow, { backgroundColor: backgroundColor2 }]}></View>
      <View style={[styles.card, { backgroundColor: backgroundColor }]}>
        {renderCarousel(name)}
      </View>
      <View style={[styles.topRightEffect, { backgroundColor: backgroundColor2 }]}></View>
      <View style={[styles.bottomLeftEffect, { backgroundColor: backgroundColor2 }]}></View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.75,
    height: screenWidth * 1.2,
  },
  card: {
    position: 'absolute',
    width: screenWidth * 0.72,
    height: screenWidth * 1.17,
    borderWidth: screenWidth * 0.004,
    borderColor: 'black',
    zIndex: 100,
    overflow: 'hidden', 
    borderRadius: screenWidth * 0.04,
    top: 0,
    left: 0,
  },
  cardShadow: {
    position: 'absolute',
    width: screenWidth * 0.72,
    height: screenWidth * 1.17,
    borderWidth: screenWidth * 0.004,
    borderColor: 'black',
    borderRadius: screenWidth * 0.04,
    top: screenWidth * 0.03,
    left: screenWidth * 0.03,
  },
  topRightEffect: {
    width: screenWidth * 0.045,
    height: screenWidth * 0.01,
    zIndex: 10,
    position: 'absolute',
    marginTop: screenWidth * 0.0229,
    marginLeft: screenWidth * 0.695,
    borderTopWidth: screenWidth * 0.004,
    borderTopColor: 'black',
    transform: [{ rotate: '45deg' }]
  },
  bottomLeftEffect: {
    width: screenWidth * 0.045,
    height: screenWidth * 0.01,
    zIndex: 10,
    position: 'absolute',
    marginTop: screenWidth * 1.166,
    marginLeft: screenWidth * 0.0095,
    borderBottomWidth: screenWidth * 0.004,
    borderBottomColor: 'black',
    transform: [{ rotate: '45deg' }]
  }
});

export default CardTest;
