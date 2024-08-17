import React, {useState} from 'react';
import { View, Text, TouchableOpacity,Dimensions, StyleSheet, Image, } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DisplayWord from '../Multiple/DisplayWord';
import ListDropDown from './ListDropDown';
import UpArrow from '../../Photos/UpTog.png';
import DownArrow from '../../Photos/DownTog.png';
import CustomButton from './CustomButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function ListPage() {
  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate('Home');
  }

  const [SortByVal, setSortByVal] = useState('FURTHEST NORTH');
  const [SortByVal2, setSortByVal2] = useState('THE WORLD');

  const [buttonState, setButtonState] = useState(0);
  const [buttonState2, setButtonState2] = useState(0);


  const handleButtonPress = () => {
    setButtonState(1 - buttonState);
  };

  const handleButtonPress2 = () => {
    setButtonState2(1 - buttonState2);
  };


  return (

   
    <SafeAreaView style={{backgroundColor: 'rgb(184, 223, 252)', flex: 1}}>

       <View style={{ 
         position: 'absolute',
         height: useSafeAreaInsets().top, 
         width: '100%',
         backgroundColor:'white',
         top: 0,  
         zIndex: 100,          
      }} />


    <View style={styles.container}>


<View style={{width: screenWidth, height: screenWidth * 0.125,flexDirection: 'row',backgroundColor: 'white', zIndex: 80, }}>
<View style={{ width: screenWidth * 0.8, height: '100%', marginLeft: screenWidth * 0.08, alignItems: 'center', backgroundColor: 'white' ,}}>


<View style={{marginTop: screenWidth * 0.03,}}><DisplayWord Word={'list of capitals'} sizeW={0.96} sizeH={0.068} left={0} /></View>
 
</View>
 <TouchableOpacity style={{ postion: 'absoulte',top: 0, width: screenWidth, height: screenWidth * 0.12, justifyContent: 'center' }} onPress={navigate}>
          <Image 
            source={require('../../Photos/closeX.png')} // local photo
            style={styles.photo}
            resizeMode="contain" // make the image fit the screen
          />
        </TouchableOpacity>  
</View>


      <View style={[styles.container, { width: screenWidth * 1, borderRadius: screenWidth * 0.014, }]}>
      <View style={[styles.topContainer, { width: screenWidth, 
      borderBottomLeftRadius: screenWidth * 0.022,
        borderBottomRightRadius: screenWidth * 0.022,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: screenWidth * 0.008 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
         }]}>
        <View style={{ marginTop: screenWidth * 0.001,paddingBottom: screenWidth * 0.01,borderBottomColor: 'rgb(207, 204, 204)',  }}>
          <DisplayWord Word={'The united nations 195 countries and capitals'} sizeW={0.96} sizeH={0.028} left={0} />
        </View>

        <View style={{ width: screenWidth * 0.96, flexDirection: 'row', paddingTop: screenWidth * 0.01, 
        marginBottom: screenWidth * 0.01, borderTopColor: 'rgb(207, 204, 204)', borderTopWidth: screenWidth * 0.0025, backgroundColor: 'white', zIndex: 100 }}>
          <View style={{ width: screenWidth * 0.28, justifyContent: 'center', borderRightColor: 'rgb(207, 204, 204)', borderRightWidth: screenWidth * 0.0025, }}>
            <DisplayWord Word={' sort by:'} sizeW={0.25} sizeH={0.045} left={1} />
          </View>
          <View style={{ width: screenWidth * 0.48, justifyContent: 'center', }}>
            <DisplayWord Word={" " + SortByVal} sizeW={0.49} sizeH={0.043} left={1} />
          </View>
          <View style={{ width: screenWidth * 0.21, alignItems: 'center', justifyContent: 'center' }}>
            
            <TouchableOpacity onPress={handleButtonPress} style={{ width: screenWidth * 0.16, flexDirection: 'row', justifyContent: 'space-evenly',
             height: screenWidth * 0.06,  borderRadius: screenWidth * 0.012, justifyContent: 'center',
              alignItems: 'center', shadowColor: 'black',
              shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4,
              shadowRadius: 3,elevation: 3, }}>
<Image  source={buttonState === 1 ? UpArrow : DownArrow} 
style={{ width: "100%", height: "100%", }} 
resizeMode="contain"/>
            </TouchableOpacity>
          </View>
        </View>
         <View style={{ backgroundColor: 'white' , width: screenWidth * 0.96,
         borderTopColor: 'rgb(207, 204, 204)', borderBottomColor: 'rgb(207, 204, 204)', borderBottomWidth: screenWidth * 0.0025, flexDirection: 'row',
         flexWrap: 'wrap',}} >


{buttonState === 1 ? (
<View style={{ backgroundColor: 'white' , width: screenWidth * 0.96, height: screenWidth * 0.3,
         borderTopColor: 'rgb(207, 204, 204)', borderTopWidth: screenWidth * 0.0025, borderBottomColor: 'rgb(207, 204, 204)',  flexDirection: 'row',
         flexWrap: 'wrap',}} >


<View style={{width: '100%', marginTop: screenWidth * 0.02}}></View>

<CustomButton
        onPress={() => setSortByVal('ALPHEBETICAL')}
        isSelected={SortByVal === 'ALPHEBETICAL'}
        label="ALPHEBETICAL"
      />

<CustomButton
        onPress={() => setSortByVal('FURTHEST NORTH')}
        isSelected={SortByVal === 'FURTHEST NORTH'}
        label="Furthest North"
      />

<CustomButton
        onPress={() => setSortByVal('FURTHEST EAST')}
        isSelected={SortByVal === 'FURTHEST EAST'}
        label="Furthest EAST"
      />

<CustomButton
        onPress={() => setSortByVal('FURTHEST SOUTH')}
        isSelected={SortByVal === 'FURTHEST SOUTH'}
        label="FURTHEST SOUTH"
      />

<CustomButton
        onPress={() => setSortByVal('FURTHEST WEST')}
        isSelected={SortByVal === 'FURTHEST WEST'}
        label="FURTHEST WEST"
      />

<CustomButton
        onPress={() => setSortByVal('LARGEST')}
        isSelected={SortByVal === 'LARGEST'}
        label="LARGEST"
      />

<CustomButton
        onPress={() => setSortByVal('SMALLEST')}
        isSelected={SortByVal === 'SMALLEST'}
        label="SMALLEST"
      />
     
      <CustomButton
        onPress={() => setSortByVal('MOST POPULOUS')}
        isSelected={SortByVal === 'MOST POPULOUS'}
        label="MOST POPULOUS"
      />

<CustomButton
        onPress={() => setSortByVal('LEAST POPULOUS')}
        isSelected={SortByVal === 'LEAST POPULOUS'}
        label="LEAST POPULOUS"
      />


          </View>
    ) : (<></>)}

         </View> 

        <View style={{ width: screenWidth * 0.96, flexDirection: 'row', marginTop: screenWidth * 0.01, 
        marginBottom: screenWidth * 0.01,backgroundColor: 'white' , zIndex: 100, }}>
          <View style={{ width: screenWidth * 0.28, justifyContent: 'center' , borderRightColor: 'rgb(207, 204, 204)', borderRightWidth: screenWidth * 0.002,}}>
            <DisplayWord Word={' show:'} sizeW={0.25} sizeH={0.045} left={1} />
          </View>
          <View style={{ width: screenWidth * 0.48, justifyContent: 'center', }}>
            <DisplayWord Word={" " + SortByVal2} sizeW={0.49} sizeH={0.043} left={1} />
          </View>
          <View style={{ width: screenWidth * 0.21, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={handleButtonPress2} style={{ width: screenWidth * 0.16, flexDirection: 'row', justifyContent: 'space-evenly',
             height: screenWidth * 0.06,  borderRadius: screenWidth * 0.012, justifyContent: 'center', 
             shadowOffset: { width: 1, height: 1 }, 
              shadowOpacity: 0.4,
              shadowRadius: 3,
              elevation: 3,alignItems: 'center' }}>
             <Image  source={buttonState2 === 1 ? UpArrow : DownArrow} 
style={{ width: "100%", height: "100%", }} 
resizeMode="contain"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: 'white' , width: screenWidth * 0.96, 
        marginBottom: screenWidth * 0.01,  borderBottomColor: 'rgb(207, 204, 204)', borderBottomWidth: screenWidth * 0.0025, marginBottom: screenWidth * 0.02, flexDirection: 'row',
        flexWrap: 'wrap',borderTopColor: 'rgb(207, 204, 204)',  }} >
          
          {buttonState2 === 1 ? (
<View style={{ backgroundColor: 'white' , width: screenWidth * 0.96, height: screenWidth * 0.22,
         borderTopColor: 'rgb(207, 204, 204)', borderTopWidth: screenWidth * 0.0025, borderBottomColor: 'rgb(207, 204, 204)', flexDirection: 'row',
         flexWrap: 'wrap',   }} >
        
        <View style={{width: '100%', marginTop: screenWidth * 0.02}}></View>

        <CustomButton
        onPress={() => setSortByVal2('THE WORLD')}
        isSelected={SortByVal2 === 'THE WORLD'}
        label="THE WORLD"
      />
<CustomButton
        onPress={() => setSortByVal2('NORTH AMERICA')}
        isSelected={SortByVal2 === 'NORTH AMERICA'}
        label="NORTH AMERICA"
      />
<CustomButton
        onPress={() => setSortByVal2('SOUTH AMERICA')}
        isSelected={SortByVal2 === 'SOUTH AMERICA'}
        label="SOUTH AMERICA"
      />
<CustomButton
        onPress={() => setSortByVal2('AFRICA')}
        isSelected={SortByVal2 === 'AFRICA'}
        label="AFRICA"
      />

<CustomButton
        onPress={() => setSortByVal2('ASIA')}
        isSelected={SortByVal2 === 'ASIA'}
        label="ASIA"
      />

<CustomButton
        onPress={() => setSortByVal2('OCEANIA')}
        isSelected={SortByVal2 === 'OCEANIA'}
        label="OCEANIA"
      />

<CustomButton
        onPress={() => setSortByVal2('EUROPE')}
        isSelected={SortByVal2 === 'EUROPE'}
        label="EUROPE"
      />


          </View>
    ) : (<></>)}

          </View>
      
      </View>

      </View>
   </View>

   <View style={{flex: 1, width: '100%',  }}>

   <View style={{ width: screenWidth, height: screenWidth * 0.07, marginTop: screenWidth * 0.16, flexDirection:'row', alignItems: 'center',  postion: 'absoulte', }}>
 
<View style={{width: screenWidth * 0.25, height: screenWidth * 0.05, alignItems: 'center', }}>
      <View style={{borderRadius:screenWidth * 0.1, backgroundColor: '#F7A858', width: screenWidth * 0.2, height: '100%', alignItems: 'center', justifyContent: "space-evenly",
      shadowOffset: { width: 2, height: 2 }, 
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,}}>
          <DisplayWord Word={"flag"} sizeW={0.2} sizeH={0.022} left={0} /></View>
  </View>

  <View style={{width: screenWidth * 0.365, height: screenWidth * 0.05, alignItems: 'center', }}>
      <View style={{borderRadius: screenWidth * 0.1, backgroundColor: '#F7A858', width: screenWidth * 0.28, height: '100%', alignItems: 'center', justifyContent: "space-evenly",
      shadowOffset: { width: 2, height: 2 }, 
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,}}>
          <DisplayWord Word={"Capital City"} sizeW={0.28} sizeH={0.022} left={0} /></View>
  </View>

  <View style={{width: screenWidth * 0.2, height: screenWidth * 0.05, alignItems: 'center',  }}>
      <View style={{borderRadius: screenWidth * 0.1, backgroundColor: '#F7A858', width: screenWidth * 0.18, height: '100%', alignItems: 'center', justifyContent: "space-evenly",
      shadowOffset: { width: 2, height: 2 }, 
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,}}>
          <DisplayWord Word={"continent"} sizeW={0.15} sizeH={0.022} left={0} /></View>
  </View>

  <View style={{width: screenWidth * 0.18, height: screenWidth * 0.05, alignItems: 'center',  }}>
      <View style={{borderRadius: screenWidth * 0.1, backgroundColor: '#F7A858', width: screenWidth * 0.18, height: '100%', alignItems: 'center', justifyContent: "space-evenly",
      shadowOffset: { width: 2, height: 2 }, 
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,}}>
          <DisplayWord Word={"more info"} sizeW={0.17} sizeH={0.022} left={0} /></View>
  </View> 
  </View>
  <View style={{flex: 1, width: '100%',  }}>
  <ListDropDown SortByVal={SortByVal} SortByVal2={SortByVal2} />  
  </View>
   </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   height: screenWidth * 0.195,
    backgroundColor: 'white',
    borderRadiusBottom: screenWidth * 0.014,
    zIndex: 50,
  },
  topBar: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    zIndex: 1000,
  },
  swipeIndicator: {
    width: 40,
    height: 5,
    backgroundColor: 'grey',
    borderRadius: 2.5,
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeImage: {
    width: 20,
    height: 20,
  },
  content: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'red',
  },
  photo: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    position: 'absolute',
  },
  topContainer: {
    backgroundColor: 'white' ,
    alignItems: 'center',
  },
});

export default ListPage;




// import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList, Linking, Platform, Animated } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import DisplayWord from '../Multiple/DisplayWord';
// import DisplayWordText from '../Multiple/DisplayWordText';
// import FlagImage from '../Multiple/FlagImage';
// import LocationImage from '../Multiple/LocationImage';
// import { data } from '../../files/capitalData';
// import AnimatedButton from './AnimatedButtons';
// import CustomButton from './CustomButton';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// // Parsing population with memoization
// const parsePopulation = (population) => {
//   let numericPopulation = parseInt(population.replace(/[^0-9.]/g, ''));
//   if (population.includes('billion')) {
//     numericPopulation *= 1000000000;
//   } else if (population.includes('million')) {
//     numericPopulation *= 1000000;
//   }
//   return numericPopulation;
// };

// const sortData = (data, sortBy) => {
//   switch (sortBy) {
//     case 'ALPHABETICAL':
//       return [...data].sort((a, b) => a.capital.localeCompare(b.capital));
//     case 'FURTHEST NORTH':
//       return [...data].sort((a, b) => b.latitude - a.latitude);
//     case 'FURTHEST EAST':
//       return [...data].sort((a, b) => b.longitude - a.longitude);
//     case 'FURTHEST SOUTH':
//       return [...data].sort((a, b) => a.latitude - b.latitude);
//     case 'FURTHEST WEST':
//       return [...data].sort((a, b) => a.longitude - b.longitude);
//     case 'LARGEST':
//       return [...data].sort((a, b) => parseFloat(b.size.replace(/[^0-9.-]/g, '')) - parseFloat(a.size.replace(/[^0-9.-]/g, '')));
//     case 'SMALLEST':
//       return [...data].sort((a, b) => parseFloat(a.size.replace(/[^0-9.-]/g, '')) - parseFloat(b.size.replace(/[^0-9.-]/g, '')));
//     case 'MOST POPULOUS':
//       return [...data].sort((a, b) => parsePopulation(b.population) - parsePopulation(a.population));
//     case 'LEAST POPULOUS':
//       return [...data].sort((a, b) => parsePopulation(a.population) - parsePopulation(b.population));
//     default:
//       return data;
//   }
// };

// const filterData = (data, filterBy) => {
//   if (filterBy === 'THE WORLD') return data;
//   return data.filter(item => item.continent.toUpperCase() === filterBy.toUpperCase());
// };

// const ListPage = () => {
//   const navigation = useNavigation();

//   const [sortByVal, setSortByVal] = useState('FURTHEST NORTH');
//   const [sortByVal2, setSortByVal2] = useState('THE WORLD');
//   const [buttonState, setButtonState] = useState(0);
//   const [buttonState2, setButtonState2] = useState(0);

//   const handleButtonPress = () => setButtonState(1 - buttonState);
//   const handleButtonPress2 = () => setButtonState2(1 - buttonState2);

//   const navigate = () => navigation.navigate('Home');

//   return (
//     <SafeAreaView style={{ backgroundColor: 'rgb(184, 223, 252)', flex: 1 }}>
//       <View style={styles.topSafeArea} />

//       <View style={styles.container}>
//         <View style={styles.header}>
//           <View style={styles.headerTextContainer}>
//             <DisplayWord Word={'list of capitals'} sizeW={0.96} sizeH={0.068} left={0} />
//           </View>
//           <TouchableOpacity style={styles.closeButton} onPress={navigate}>
//             <Image source={require('../../Photos/closeX.png')} style={styles.photo} resizeMode="contain" />
//           </TouchableOpacity>
//         </View>

//         <View style={[styles.container, { width: screenWidth * 1, borderRadius: screenWidth * 0.014 }]}>
//           <View style={styles.topContainer}>
//             <View style={styles.titleContainer}>
//               <DisplayWord Word={'The united nations 195 countries and capitals'} sizeW={0.96} sizeH={0.028} left={0} />
//             </View>

//             <View style={styles.sortContainer}>
//               <View style={styles.sortLabel}>
//                 <DisplayWord Word={'sort by:'} sizeW={0.25} sizeH={0.045} left={1} />
//               </View>
//               <View style={styles.sortValue}>
//                 <DisplayWord Word={` ${sortByVal}`} sizeW={0.49} sizeH={0.043} left={1} />
//               </View>
//               <View style={styles.sortToggle}>
//                 <TouchableOpacity onPress={handleButtonPress} style={styles.sortButton}>
//                   <Image source={buttonState === 1 ? require('../../Photos/UpTog.png') : require('../../Photos/DownTog.png')} style={styles.toggleIcon} resizeMode="contain" />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {buttonState === 1 && (
//               <View style={styles.sortOptionsContainer}>
//                 <CustomButton onPress={() => setSortByVal('ALPHABETICAL')} isSelected={sortByVal === 'ALPHABETICAL'} label="ALPHABETICAL" />
//                 <CustomButton onPress={() => setSortByVal('FURTHEST NORTH')} isSelected={sortByVal === 'FURTHEST NORTH'} label="FURTHEST NORTH" />
//                 <CustomButton onPress={() => setSortByVal('FURTHEST EAST')} isSelected={sortByVal === 'FURTHEST EAST'} label="FURTHEST EAST" />
//                 <CustomButton onPress={() => setSortByVal('FURTHEST SOUTH')} isSelected={sortByVal === 'FURTHEST SOUTH'} label="FURTHEST SOUTH" />
//                 <CustomButton onPress={() => setSortByVal('FURTHEST WEST')} isSelected={sortByVal === 'FURTHEST WEST'} label="FURTHEST WEST" />
//                 <CustomButton onPress={() => setSortByVal('LARGEST')} isSelected={sortByVal === 'LARGEST'} label="LARGEST" />
//                 <CustomButton onPress={() => setSortByVal('SMALLEST')} isSelected={sortByVal === 'SMALLEST'} label="SMALLEST" />
//                 <CustomButton onPress={() => setSortByVal('MOST POPULOUS')} isSelected={sortByVal === 'MOST POPULOUS'} label="MOST POPULOUS" />
//                 <CustomButton onPress={() => setSortByVal('LEAST POPULOUS')} isSelected={sortByVal === 'LEAST POPULOUS'} label="LEAST POPULOUS" />
//               </View>
//             )}

//             <View style={styles.showContainer}>
//               <View style={styles.showLabel}>
//                 <DisplayWord Word={'show:'} sizeW={0.25} sizeH={0.045} left={1} />
//               </View>
//               <View style={styles.showValue}>
//                 <DisplayWord Word={` ${sortByVal2}`} sizeW={0.49} sizeH={0.043} left={1} />
//               </View>
//               <View style={styles.showToggle}>
//                 <TouchableOpacity onPress={handleButtonPress2} style={styles.showButton}>
//                   <Image source={buttonState2 === 1 ? require('../../Photos/UpTog.png') : require('../../Photos/DownTog.png')} style={styles.toggleIcon} resizeMode="contain" />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {buttonState2 === 1 && (
//               <View style={styles.showOptionsContainer}>
//                 <CustomButton onPress={() => setSortByVal2('THE WORLD')} isSelected={sortByVal2 === 'THE WORLD'} label="THE WORLD" />
//                 <CustomButton onPress={() => setSortByVal2('NORTH AMERICA')} isSelected={sortByVal2 === 'NORTH AMERICA'} label="NORTH AMERICA" />
//                 <CustomButton onPress={() => setSortByVal2('SOUTH AMERICA')} isSelected={sortByVal2 === 'SOUTH AMERICA'} label="SOUTH AMERICA" />
//                 <CustomButton onPress={() => setSortByVal2('AFRICA')} isSelected={sortByVal2 === 'AFRICA'} label="AFRICA" />
//                 <CustomButton onPress={() => setSortByVal2('ASIA')} isSelected={sortByVal2 === 'ASIA'} label="ASIA" />
//                 <CustomButton onPress={() => setSortByVal2('OCEANIA')} isSelected={sortByVal2 === 'OCEANIA'} label="OCEANIA" />
//                 <CustomButton onPress={() => setSortByVal2('EUROPE')} isSelected={sortByVal2 === 'EUROPE'} label="EUROPE" />
//               </View>
//             )}
//           </View>
//         </View>

//         <ListDropDown SortByVal={sortByVal} SortByVal2={sortByVal2} />
//       </View>
//     </SafeAreaView>
//   );
// };

// const ListDropDown = ({ SortByVal, SortByVal2 }) => {
//   const filteredData = useMemo(() => filterData(data, SortByVal2), [SortByVal2]);
//   const sortedData = useMemo(() => sortData(filteredData, SortByVal), [filteredData, SortByVal]);

//   return (
//     <FlatList
//       data={sortedData}
//       renderItem={({ item, index }) => <IndvidualListIteam item={item} index={index} />}
//       keyExtractor={(item) => item.country}
//       showsVerticalScrollIndicator={false}
//       initialNumToRender={10}
//       windowSize={5}
//       removeClippedSubviews={true}
//     />
//   );
// };

// const IndvidualListIteam = React.memo(({ item, index }) => {
//   const navigation = useNavigation();

//   const handleButtonPress = useCallback(() => {
//     navigation.navigate('CapitalInfo', { country: item.country });
//   }, [navigation, item.country]);

//   return (
//     <View style={[styles.listItem, { backgroundColor: index % 2 === 0 ? 'rgb(220, 250, 250)' : 'rgb(255, 255, 255)' }]}>
//       <View style={styles.listItemLeft}>
//         <DisplayWordText Word={(index + 1).toString()} sizeW={0.05} sizeH={0.025} left={1} />
//         <FlagImage country={item.country} />
//       </View>
//       <View style={styles.listItemCenter}>
//         <DisplayWordText Word={item.capital} sizeW={0.38} sizeH={0.035} left={0} />
//         <DisplayWordText Word={item.country} sizeW={0.38} sizeH={0.025} left={0} />
//       </View>
//       <View style={styles.listItemRight}>
//         <DisplayWordText Word={item.continent} sizeW={0.14} sizeH={0.03} left={1} />
//         <TouchableOpacity onPress={handleButtonPress}>
//           <Image source={require('../../Photos/More.png')} style={styles.moreIcon} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// });

// const styles = StyleSheet.create({
//   topSafeArea: {
//     backgroundColor: 'white',
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     height: useSafeAreaInsets().top,
//     zIndex: 100,
//   },
//   container: {
//     backgroundColor: 'white',
//     zIndex: 50,
//     borderBottomRadius: screenWidth * 0.014,
//   },
//   header: {
//     flexDirection: 'row',
//     width: screenWidth,
//     height: screenWidth * 0.125,
//     backgroundColor: 'white',
//     zIndex: 80,
//   },
//   headerTextContainer: {
//     width: screenWidth * 0.8,
//     height: '100%',
//     marginLeft: screenWidth * 0.08,
//     alignItems: 'center',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 0,
//     width: screenWidth,
//     height: screenWidth * 0.12,
//     justifyContent: 'center',
//   },
//   photo: {
//     width: screenWidth * 0.1,
//     height: screenWidth * 0.1,
//     position: 'absolute',
//   },
//   topContainer: {
//     width: screenWidth,
//     borderBottomLeftRadius: screenWidth * 0.022,
//     borderBottomRightRadius: screenWidth * 0.022,
//     backgroundColor: 'white',
//     elevation: 10,
//   },
//   titleContainer: {
//     marginTop: screenWidth * 0.001,
//     paddingBottom: screenWidth * 0.01,
//     borderBottomColor: 'rgb(207, 204, 204)',
//   },
//   sortContainer: {
//     flexDirection: 'row',
//     paddingTop: screenWidth * 0.01,
//     borderTopColor: 'rgb(207, 204, 204)',
//     borderTopWidth: screenWidth * 0.0025,
//     marginBottom: screenWidth * 0.01,
//     backgroundColor: 'white',
//   },
//   sortLabel: {
//     width: screenWidth * 0.28,
//     justifyContent: 'center',
//     borderRightColor: 'rgb(207, 204, 204)',
//     borderRightWidth: screenWidth * 0.0025,
//   },
//   sortValue: {
//     width: screenWidth * 0.48,
//     justifyContent: 'center',
//   },
//   sortToggle: {
//     width: screenWidth * 0.21,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sortButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     height: screenWidth * 0.06,
//     borderRadius: screenWidth * 0.012,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   toggleIcon: {
//     width: '100%',
//     height: '100%',
//   },
//   sortOptionsContainer: {
//     backgroundColor: 'white',
//     width: screenWidth * 0.96,
//     borderTopColor: 'rgb(207, 204, 204)',
//     borderBottomColor: 'rgb(207, 204, 204)',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   showContainer: {
//     flexDirection: 'row',
//     marginTop: screenWidth * 0.01,
//     backgroundColor: 'white',
//   },
//   showLabel: {
//     width: screenWidth * 0.28,
//     justifyContent: 'center',
//     borderRightColor: 'rgb(207, 204, 204)',
//     borderRightWidth: screenWidth * 0.002,
//   },
//   showValue: {
//     width: screenWidth * 0.48,
//     justifyContent: 'center',
//   },
//   showToggle: {
//     width: screenWidth * 0.21,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   showButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     height: screenWidth * 0.06,
//     borderRadius: screenWidth * 0.012,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   showOptionsContainer: {
//     backgroundColor: 'white',
//     width: screenWidth * 0.96,
//     height: screenWidth * 0.22,
//     borderTopColor: 'rgb(207, 204, 204)',
//     borderBottomColor: 'rgb(207, 204, 204)',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   listItem: {
//     width: screenWidth,
//     height: screenWidth * 0.16,
//     flexDirection: 'row',
//   },
//   listItemLeft: {
//     width: screenWidth * 0.25,
//     height: screenWidth * 0.16,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   listItemCenter: {
//     width: screenWidth * 0.4,
//     height: screenWidth * 0.16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   listItemRight: {
//     width: screenWidth * 0.16,
//     height: screenWidth * 0.16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   moreIcon: {
//     width: '80%',
//     height: '100%',
//   },
// });

// export default ListPage;
