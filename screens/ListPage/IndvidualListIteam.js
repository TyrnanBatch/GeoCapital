import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Image,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { data } from '../../files/capitalData';
import DisplayWordText from '../Multiple/DisplayWordText';
import FlagImage from '../Multiple/FlagImage';

const { height, width } = Dimensions.get('window');

const parsePopulation = (population) => {
    let numericPopulation = parseInt(population.replace(/[^0-9.]/g, ''));
    if (population.includes('billion')) {
        numericPopulation *= 1000000000;
    } else if (population.includes('million')) {
        numericPopulation *= 1000000;
    }
    return numericPopulation;
};

const sortData = (data, sortBy) => {
    switch (sortBy) {
        case 'ALPHEBETICAL':
            return [...data].sort((a, b) => a.capital.localeCompare(b.capital));
        case 'FURTHEST NORTH':
            return [...data].sort((a, b) => b.latitude - a.latitude);
        case 'FURTHEST EAST':
            return [...data].sort((a, b) => b.longitude - a.longitude);
        case 'FURTHEST SOUTH':
            return [...data].sort((a, b) => a.latitude - b.latitude);
        case 'FURTHEST WEST':
            return [...data].sort((a, b) => a.longitude - b.longitude);
        case 'LARGEST':
            return [...data].sort((a, b) => parseFloat(b.size.replace(/[^0-9.-]/g, '')) - parseFloat(a.size.replace(/[^0-9.-]/g, '')));
        case 'SMALLEST':
            return [...data].sort((a, b) => parseFloat(a.size.replace(/[^0-9.-]/g, '')) - parseFloat(b.size.replace(/[^0-9.-]/g, '')));
        case 'MOST POPULOUS':
            return [...data].sort((a, b) => parsePopulation(b.population) - parsePopulation(a.population));
        case 'LEAST POPULOUS':
            return [...data].sort((a, b) => parsePopulation(a.population) - parsePopulation(b.population));
        default:
            return data;
    }
};

const filterData = (data, filterBy) => {
    if (filterBy === 'THE WORLD') return data;
    return data.filter(item => item.continent.toUpperCase() === filterBy.toUpperCase());
};

const IndvidualListIteam = ({ SortByVal, SortByVal2 }) => {
    const navigation = useNavigation(); 

    const handleButtonPress = useCallback((country) => {
        navigation.navigate('CapitalInfo', { country: country });
    }, [navigation]);

    const filteredData = useMemo(() => filterData(data, SortByVal2), [SortByVal2]);
    const sortedData = useMemo(() => sortData(filteredData, SortByVal), [filteredData, SortByVal]);

    const renderItem = useCallback(({ item, index }) => (
        <View style={{
            width: width,
            height: width * 0.16,
            flexDirection: 'row',
            backgroundColor: index % 2 === 0 ? 'rgb(220, 250, 250)' : 'rgb(255, 255, 255)', 
        }}>
            <View style={{ width: width * 0.25, height: width * 0.16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  }}>
                <DisplayWordText Word={(index + 1).toString()} sizeW={0.05} sizeH={0.025} left={1} />
                <View style={{width: width * 0.2, height: width * 0.14, }}>
                <FlagImage country={item.country} /> 
                </View>
            </View>

            <View style={{ width: width * 0.4, height: width * 0.16, justifyContent: 'center', alignItems: 'center',}}>
                <View style={{ marginBottom: width * 0.01 ,marginLeft: width * 0.03,}}>
                    {item.capital === "BANDAR SERI BEGAWAN" ? (
                        <>
                            <DisplayWordText Word={"Bandar Seri"} sizeW={0.38} sizeH={0.035} left={0} />
                            <DisplayWordText Word={"Begawan"} sizeW={0.38} sizeH={0.035} left={0} />
                        </>
                    ) : (
                        <DisplayWordText Word={item.capital} sizeW={0.38} sizeH={0.035} left={0} />
                    )} 
                </View>
                <View style={{ marginTop: width * 0.01, marginLeft: width * 0.03 }}>
                    {item.country === "DEMOCRATIC REPUBLIC OF THE CONGO" ? (
                        <>
                            <DisplayWordText Word={"DEMOCRATIC REPUBLIC"} sizeW={0.38} sizeH={0.025} left={0} />
                            <DisplayWordText Word={"OF THE CONGO"} sizeW={0.38} sizeH={0.025} left={0} />
                        </>
                    ) : item.country === 'THE FEDERATED STATES OF MICRONESIA' ? (
                        <>
                            <DisplayWordText Word={"THE FEDERATED STATES"} sizeW={0.38} sizeH={0.025} left={0} />
                            <DisplayWordText Word={"OF MICRONESIA"} sizeW={0.38} sizeH={0.025} left={0} />
                        </>
                    ) : item.country === 'SAINT VINCENT & THE GRENADINES' ? (
                        <>
                            <DisplayWordText Word={"SAINT VINCENT &"} sizeW={0.38} sizeH={0.025} left={0} />
                            <DisplayWordText Word={"THE GRENADINES"} sizeW={0.38} sizeH={0.025} left={0} />
                        </>
                    ) : (
                        <DisplayWordText Word={item.country} sizeW={0.38} sizeH={0.025} left={0} />
                    )} 
                </View>
            </View>
            <View style={{ width: width * 0.16, height: width * 0.16, justifyContent: 'center', alignItems: 'center', }}>
                {item.continent === "North America" ? (
                    <>
                        <DisplayWordText Word={"North"} sizeW={0.14} sizeH={0.03} left={1} />
                        <DisplayWordText Word={"America"} sizeW={0.14} sizeH={0.03} left={1} />
                    </>
                ) : item.continent === 'South America' ? (
                    <>
                        <DisplayWordText Word={"South"} sizeW={0.14} sizeH={0.03} left={1} />
                        <DisplayWordText Word={"America"} sizeW={0.14} sizeH={0.03} left={1} />
                    </>
                ) : (
                    <DisplayWordText Word={item.continent} sizeW={0.14} sizeH={0.03} left={1} />
                )}
            </View>
            <View style={{ width: width * 0.18, height: width * 0.16, justifyContent: 'center', alignItems: 'center',  }}>
                <TouchableOpacity onPress={() => handleButtonPress(item.country)} style={{  width: '100%',justifyContent: 'center', alignItems: 'center',  }}>
                    <Image 
                source={require('../../Photos/More.png')} // local photo
                style={{width: '80%', height: '100%'}}
                resizeMode="contain"
              />
                </TouchableOpacity>
            </View>
        </View>
    ), [width, handleButtonPress]);

    const ListFooterComponent = () => (
        <View style={{ height: width * 0.05 }} />
    );

    return (
        <FlatList
            data={sortedData}
            renderItem={renderItem}
            keyExtractor={(item) => item.country}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={ListFooterComponent}
        />
    );
};

export default IndvidualListIteam;



// import React, { useMemo, useCallback } from 'react';
// import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { data } from '../../files/capitalData';
// import DisplayWordText from '../Multiple/DisplayWordText';
// import FlagImage from '../Multiple/FlagImage';

// const { height, width } = Dimensions.get('window');

// // Helper function outside of the component, no hooks here
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
//     case 'ALPHEBETICAL':
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

// const IndvidualListIteam = ({ SortByVal, SortByVal2 }) => {
//   const navigation = useNavigation();

//   // Memoize the filtered and sorted data
//   const filteredData = useMemo(() => filterData(data, SortByVal2), [SortByVal2]);
//   const sortedData = useMemo(() => sortData(filteredData, SortByVal), [filteredData, SortByVal]);

//   // Memoize the event handler to avoid unnecessary re-creations
//   const handleButtonPress = useCallback((country) => {
//     navigation.navigate('CapitalInfo', { country: country });
//   }, [navigation]);

//   // Memoize the render item to avoid unnecessary re-renders
//   const renderItem = useCallback(({ item, index }) => (
//     <View style={{
//       width: width,
//       height: width * 0.16,
//       flexDirection: 'row',
//       backgroundColor: index % 2 === 0 ? 'rgb(220, 250, 250)' : 'rgb(255, 255, 255)',
//     }}>
//       <View style={styles.flagContainer}>
//         <DisplayWordText Word={(index + 1).toString()} sizeW={0.05} sizeH={0.025} left={1} />
//         <View style={styles.flagImage}>
//           <FlagImage country={item.country} />
//         </View>
//       </View>

//       <View style={styles.capitalContainer}>
//         <View style={styles.capitalName}>
//           {item.capital === "BANDAR SERI BEGAWAN" ? (
//             <>
//               <DisplayWordText Word={"Bandar Seri"} sizeW={0.38} sizeH={0.035} left={0} />
//               <DisplayWordText Word={"Begawan"} sizeW={0.38} sizeH={0.035} left={0} />
//             </>
//           ) : (
//             <DisplayWordText Word={item.capital} sizeW={0.38} sizeH={0.035} left={0} />
//           )}
//         </View>

//         <View style={styles.countryName}>
//           {item.country === "DEMOCRATIC REPUBLIC OF THE CONGO" ? (
//             <>
//               <DisplayWordText Word={"DEMOCRATIC REPUBLIC"} sizeW={0.38} sizeH={0.025} left={0} />
//               <DisplayWordText Word={"OF THE CONGO"} sizeW={0.38} sizeH={0.025} left={0} />
//             </>
//           ) : (
//             <DisplayWordText Word={item.country} sizeW={0.38} sizeH={0.025} left={0} />
//           )}
//         </View>
//       </View>

//       <View style={styles.continentContainer}>
//         {item.continent === "North America" ? (
//           <>
//             <DisplayWordText Word={"North"} sizeW={0.14} sizeH={0.03} left={1} />
//             <DisplayWordText Word={"America"} sizeW={0.14} sizeH={0.03} left={1} />
//           </>
//         ) : (
//           <DisplayWordText Word={item.continent} sizeW={0.14} sizeH={0.03} left={1} />
//         )}
//       </View>

//       <View style={styles.moreInfoContainer}>
//         <TouchableOpacity onPress={() => handleButtonPress(item.country)} style={styles.moreButton}>
//           <Image
//             source={require('../../Photos/More.png')}
//             style={styles.moreImage}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   ), [width, handleButtonPress]);

//   // Define footer for the FlatList
//   const ListFooterComponent = useMemo(() => (
//     <View style={styles.footer} />
//   ), []);

//   return (
//     <FlatList
//       data={sortedData}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.country}
//       showsVerticalScrollIndicator={false}
//       ListFooterComponent={ListFooterComponent}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   flagContainer: {
//     width: width * 0.25,
//     height: width * 0.16,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flagImage: {
//     width: width * 0.2,
//     height: width * 0.14,
//   },
//   capitalContainer: {
//     width: width * 0.4,
//     height: width * 0.16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   capitalName: {
//     marginBottom: width * 0.01,
//     marginLeft: width * 0.03,
//   },
//   countryName: {
//     marginTop: width * 0.01,
//     marginLeft: width * 0.03,
//   },
//   continentContainer: {
//     width: width * 0.16,
//     height: width * 0.16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   moreInfoContainer: {
//     width: width * 0.18,
//     height: width * 0.16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   moreButton: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   moreImage: {
//     width: '80%',
//     height: '100%',
//   },
//   footer: {
//     height: width * 0.05,
//   },
// });

// export default IndvidualListIteam;
