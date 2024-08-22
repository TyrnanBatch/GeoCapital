import React,{ useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Linking, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FlagImage from '../Multiple/FlagImage';
import LocationImage from '../Multiple/LocationImage';
import { data } from '../../files/capitalData';
import AnimatedButton from './AnimatedButtons';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const CapitalInfo = ({ route }) => {
  const { country } = route.params;
  const navigation = useNavigation();
  const countryInfo = data.find(item => item.country.toUpperCase() === country.toUpperCase());

  const navigate = () => {
    navigation.navigate('List');
  };


  const [PopulationPosition, setPopulationPosition] = useState(null);
  const [continentPosition, setContinentPosition] = useState(null);
  const [contientDataSize, setContientDataSize] = useState(null);
  const [SizePosition, setSizePosition] = useState(null);
  const [continentPositionSize, setContinentPositionSize] = useState(null);

  // useEffect(() => {
  //   const worldData = [...data];
  //   worldData.sort((a, b) => parsePopulation(b.population) - parsePopulation(a.population));
  //   const ukPosition = worldData.findIndex(item => item.country === country) + 1;
  //   setPopulationPosition(ukPosition);
  // }, []);
  useEffect(() => {
    let isMounted = true;  // <-- Track if the component is mounted
    const worldData = [...data];
    worldData.sort((a, b) => parsePopulation(b.population) - parsePopulation(a.population));
    const ukPosition = worldData.findIndex(item => item.country === country) + 1;
    if (isMounted) {
      setPopulationPosition(ukPosition);  // <-- Update state only if component is still mounted
    }
    return () => {
      isMounted = false;  // <-- Cleanup function to mark component as unmounted
    };
  }, [country]);  // <-- Add country as a dependency to ensure the effect runs when country changes
  
  function parsePopulation(population) {
    let numericPopulation = parseInt(population.replace(/[^0-9.]/g, ''));
    if (population.includes('billion')) {
      numericPopulation *= 1000000000;
    } else if (population.includes('million')) {
      numericPopulation *= 1000000;
    }
    return numericPopulation;
  }
  useEffect(() => {
    const continentCountries = data.filter(item => item.continent === countryInfo.continent);
    const continentSorted = [...continentCountries].sort((a, b) => parsePopulation(b.population) - parsePopulation(a.population));
    const countryPosition = continentSorted.findIndex(item => item.country === country) + 1;
    setContinentPosition(countryPosition);
    setContientDataSize(continentCountries.length);
  }, [data, countryInfo.continent]);
  
  useEffect(() => {
    const filteredData = [...data];
    filteredData.sort((a, b) => parseFloat(b.size.replace(/[^0-9.-]/g, '')) - parseFloat(a.size.replace(/[^0-9.-]/g, '')));
    const countrySizePosition = filteredData.findIndex(item => item.country === country) + 1;
    setSizePosition(countrySizePosition);
  }, [data, country]);
  
  useEffect(() => {
    const continentCountries = data.filter(item => item.continent === countryInfo.continent);
    continentCountries.sort((a, b) => parseFloat(b.size.replace(/[^0-9.-]/g, '')) - parseFloat(a.size.replace(/[^0-9.-]/g, '')));
    const continentSizePosition = continentCountries.findIndex(item => item.country === country) + 1;
    setContinentPositionSize(continentSizePosition);
  }, [data, countryInfo.continent]);
  

  return (


    <LinearGradient colors={[ '#ff69b4', '#ffb6c1']} style={{ flex: 1 }}>

<View style={{width: screenWidth, height: screenWidth * 0.26,flexDirection: 'row',backgroundColor: 'white', 
zIndex: 80, borderBottomRightRadius: screenWidth * 0.03,borderBottomLeftRadius: screenWidth * 0.03,shadowOffset: { width: 1, height: 4 },
shadowOpacity: 0.4,
shadowRadius: 3,
elevation: 3,
shadowColor: 'black', }}>

<View style={{ width: screenWidth, height: screenWidth * 0.11, alignItems: 'center'}}>
     <View style={{backgroundColor: 'gray', width: screenWidth * 0.25, height: screenWidth * 0.015, marginTop: screenWidth * 0.02, borderRadius: screenWidth,}}>
    </View>
    <TouchableOpacity style={{ width: screenWidth * 0.1, height: screenWidth * 0.1, position: 'absolute', right: screenWidth * 0.013, top: screenWidth * 0.013 }} onPress={navigate}>
              <Image 
                source={require('../../Photos/closeX.png')}
                style={styles.photo}
                resizeMode="contain"
              />
            </TouchableOpacity>    
            <View style={{ width: screenWidth, height: screenWidth * 0.142, marginTop: screenWidth * 0.078, justifyContent: 'space-evenly', }}>
<Text style={{color: 'black',fontSize: screenWidth * 0.055, alignSelf: 'center',
fontFamily: 'Chalkboard SE',}}>{country}</Text>
<Text style={{color: 'black',fontSize: screenWidth * 0.055, alignSelf: 'center',
fontFamily: 'Chalkboard SE',}}>{'CAPITAL - ' + countryInfo.capital}</Text>
<View style={{height: screenWidth * 0.03}}/>
            </View>
</View>
</View>


<View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center',}}>

<View style={{width: screenWidth * 0.94, 
   backgroundColor: 'white',
   height: screenWidth * 0.34, justifyContent: 'space-evenly', flexDirection: 'row',
   alignItems: 'center',
   borderRadius: screenWidth * 0.02,shadowOffset: { width: 1, height: 4 },
   shadowOpacity: 0.4,
   shadowRadius: 3,
   elevation: 3,
   shadowColor: 'black',}}>
  <View style={styles.flagContainer}>
        <FlagImage country={country} />
  </View>
        <View style={{ width: screenWidth * 0.44, height: screenWidth * 0.34, justifyContent: 'space-evenly', }}>
        <Text style={{color: 'black',fontSize: screenWidth * 0.05, alignSelf: 'center',
fontFamily: 'Chalkboard SE',}}>{countryInfo.continent}</Text>
<View>
        <Text style={{color: 'black',fontSize: screenWidth * 0.0265, 
fontFamily: 'Chalkboard SE',}}>{'THE CAPITAL ' + countryInfo.capital}</Text>
        <Text style={{color: 'black',fontSize: screenWidth * 0.0265, 
fontFamily: 'Chalkboard SE',}}>{'IS LOCATED AT THESE CORRDINETS'}</Text>
        <Text style={{color: 'black',fontSize: screenWidth * 0.0265, 
fontFamily: 'Chalkboard SE',}}>{'LONGITUDE : ' + countryInfo.longitude}</Text>
 <Text style={{color: 'black',fontSize: screenWidth * 0.0265, 
fontFamily: 'Chalkboard SE',}}>{'LATITUDE   :  ' + countryInfo.latitude}</Text>
  </View>
     </View>


     </View> 


 <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.94, }}>
     <View style={{width: screenWidth * 0.44, 
   backgroundColor: 'white',
   height: screenWidth * 0.2, justifyContent: 'space-evenly', 
   alignItems: 'center',
   borderRadius: screenWidth * 0.025,shadowOffset: { width: 1, height: 4 },
   shadowOpacity: 0.4,
   shadowRadius: 3,
   elevation: 3,
   shadowColor: 'black',}}>
<Text style={{color: 'black',fontSize: screenWidth * 0.03, 
fontFamily: 'Chalkboard SE',}}>{'SIZE'}</Text>
<Text style={{color: 'black',fontSize: screenWidth * 0.03, 
fontFamily: 'Chalkboard SE',}}>{(countryInfo.size).toUpperCase()}</Text>
<Text style={{color: 'black',fontSize: screenWidth * 0.03, 
fontFamily: 'Chalkboard SE',}}>{(' IN ' + countryInfo.continent + ':  ' + continentPositionSize + ' / ' + contientDataSize).toUpperCase()}</Text>
<Text style={{color: 'black',fontSize: screenWidth * 0.03, 
fontFamily: 'Chalkboard SE',}}>{(' in world:   ' + SizePosition + " / 195").toUpperCase()}</Text>
<View/>
     </View>



     <View style={{width: screenWidth * 0.44, 
   backgroundColor: 'white',
   height: screenWidth * 0.2, justifyContent: 'space-evenly', 
   alignItems: 'center',
   borderRadius: screenWidth * 0.02, shadowOffset: { width: 1, height: 4 },
   shadowOpacity: 0.4,
   shadowRadius: 3,
   elevation: 3,
   shadowColor: 'black',}}>

<Text style={{color: 'black',fontSize: screenWidth * 0.03, 
fontFamily: 'Chalkboard SE',}}>{'POPULATION'}</Text>
<Text style={{color: 'black',fontSize: screenWidth * 0.03, 
fontFamily: 'Chalkboard SE',}}>{(countryInfo.population).toUpperCase()}</Text>
<Text style={{color: 'black',fontSize: screenWidth * 0.03, 
fontFamily: 'Chalkboard SE',}}>{(' IN ' + countryInfo.continent + ':  ' + continentPosition + ' / ' + contientDataSize).toUpperCase()}</Text>
<Text style={{color: 'black',fontSize: screenWidth * 0.03, 
fontFamily: 'Chalkboard SE',}}>{(' in world:   ' + PopulationPosition + " / 195").toUpperCase()}</Text>
<View/>

     </View>
     </View> 


<View style={styles.imageContainer}>
        <LocationImage country={country} />
      </View>



      {!Platform.isPad ? (
  <View style={{ height: screenWidth * 0.127 }}>
    <AnimatedButton country={country} />
  </View>
) : null}




 </View> 

    </LinearGradient > 

  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  imageContainer: {
    width: Platform.isPad ? screenWidth * 0.44 : screenWidth * 0.7,
    height: Platform.isPad ? screenWidth * 0.44 : screenWidth * 0.7,
  },
  flagContainer: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.28,
  
  },
  photo: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    position: 'absolute',
  },
});

export default CapitalInfo;