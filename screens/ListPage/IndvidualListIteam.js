import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { data } from '../../files/capitalData';
import FlagImage from '../Multiple/FlagImage';

const { height, width } = Dimensions.get('window');

// Utility to parse the population into a numeric value
const parsePopulation = (population) => {
    let numericPopulation = parseInt(population.replace(/[^0-9.]/g, ''));
    if (population.includes('billion')) {
        numericPopulation *= 1000000000;
    } else if (population.includes('million')) {
        numericPopulation *= 1000000;
    }
    return numericPopulation;
};

// Sorting function for various criteria
const sortData = (data, sortBy) => {
    switch (sortBy) {
        case 'ALPHABETICAL':
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

// Filter function to apply filters
const filterData = (data, filterBy) => {
    if (filterBy === 'THE WORLD') return data;
    return data.filter(item => item.continent.toUpperCase() === filterBy.toUpperCase());
};

// Main component
const IndvidualListIteam = ({ SortByVal, SortByVal2 }) => {
    const navigation = useNavigation(); 

    const handleButtonPress = useCallback((country) => {
        navigation.navigate('CapitalInfo', { country: country });
    }, [navigation]);

    // Memoize the filtered and sorted data for performance
    const filteredData = useMemo(() => filterData(data, SortByVal2), [SortByVal2]);
    const sortedData = useMemo(() => sortData(filteredData, SortByVal), [filteredData, SortByVal]);

    // Function to render each item in the list
    const renderItem = useCallback(({ item, index }) => (
        <View style={{
            width: width,
            height: width * 0.16,
            flexDirection: 'row',
            backgroundColor: index % 2 === 0 ? 'rgb(220, 250, 250)' : 'rgb(255, 255, 255)', 
        }}>
            <View style={{ width: width * 0.25, height: width * 0.16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  }}>
                <View style={{ width: width * 0.05, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'black',fontSize: width * 0.024, fontFamily: 'Chalkboard SE',}}>
                        {(index + 1).toString()}
                    </Text>
                </View>
                <View style={{width: width * 0.2, height: width * 0.14, }}>
                    <FlagImage country={item.country} /> 
                </View>
            </View>
            <View style={{ width: width * 0.4, height: width * 0.16, justifyContent: 'center', alignItems: 'center',}}>
                <View style={{ width: width * 0.36 ,height: width * 0.055,  }}>
                    <Text style={{color: 'black',fontSize: width * 0.03, fontFamily: 'Chalkboard SE',}}>
                        {item.capital}
                    </Text>
                </View> 
                <View style={{ width: width * 0.38, marginLeft: width * 0.02, height: width * 0.055, justifyContent: 'center'}}>
                    <Text style={{color: 'black', fontSize: width * 0.022, fontFamily: 'Chalkboard SE',}}>
                        {item.country}
                    </Text>
                </View> 
            </View>
            <View style={{ width: width * 0.16, height: width * 0.16, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{color: 'black',fontSize: width * 0.022, fontFamily: 'Chalkboard SE',}}>
                    {(item.continent).toUpperCase()}
                </Text>
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
            // Optimization Props
            initialNumToRender={10} // Number of items initially loaded
            maxToRenderPerBatch={10} // Number of items to render in a batch
            windowSize={5} // Number of screens worth of content to pre-render
            removeClippedSubviews={true} // Unmount components outside of view for memory optimization
        />
    );
};

export default IndvidualListIteam;
