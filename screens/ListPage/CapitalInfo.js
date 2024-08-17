import React,{ useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Linking, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayWord from '../Multiple/DisplayWord';
import FlagImage from '../Multiple/FlagImage';
import LocationImage from '../Multiple/LocationImage';
import { data } from '../../files/capitalData';
import AnimatedButton from './AnimatedButtons';
import LinearGradient from 'react-native-linear-gradient';
import DisplayWordText from '../Multiple/DisplayWordText';

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

  useEffect(() => {
    const worldData = [...data];
    worldData.sort((a, b) => parsePopulation(b.population) - parsePopulation(a.population));
    const ukPosition = worldData.findIndex(item => item.country === country) + 1;
    setPopulationPosition(ukPosition);
  }, []);
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

    {/* <View style={{width: screenWidth, height: screenWidth * 0.125,flexDirection: 'row',backgroundColor: 'white', zIndex: 80 }}>
    <View style={{ width: screenWidth * 0.8, height: '100%', marginLeft: screenWidth * 0.08, alignItems: 'center', backgroundColor: 'white' ,}}>
    {Platform.OS ? (
     <View style={{backgroundColor: 'gray', width: screenWidth * 0.2, height: screenWidth * 0.015, marginTop: screenWidth * 0.02, borderRadius: screenWidth}}>
    </View>
    ) : null}
    </View>
      <TouchableOpacity style={{ postion: 'absoulte',top: 0, zIndex: 100,width: screenWidth, height: screenWidth * 0.12, justifyContent: 'center' }} onPress={navigate}>
              <Image 
                source={require('../../Photos/closeX.png')} // local photo
                style={styles.photo}
                resizeMode="contain" // make the image fit the screen
              />
            </TouchableOpacity>   
    </View>
    <View style={{ backgroundColor: 'white',top: -screenWidth * 0.019,zIndex: 80, width: screenWidth, height: screenWidth * 0.15, 
    justifyContent: 'space-between', borderBottomLeftRadius: screenWidth * 0.022, borderBottomRightRadius: screenWidth * 0.022}}>
{country === "DEMOCRATIC REPUBLIC OF THE CONGO" ? (
                        <>
                            <DisplayWordText Word={"DEMOCRATIC REPUBLIC"} sizeW={1} sizeH={0.051} left={1} />
                            <DisplayWordText Word={"OF THE CONGO"} sizeW={1} sizeH={0.051} left={1} />
                        </>
                    ) : country === 'THE FEDERATED STATES OF MICRONESIA' ? (
                        <>
                            <DisplayWordText Word={"THE FEDERATED STATES"} sizeW={1} sizeH={0.051} left={1} />
                            <DisplayWordText Word={"OF MICRONESIA"} sizeW={1} sizeH={0.051} left={1} />
                        </>
                    ) : country === 'SAINT VINCENT & THE GRENADINES' ? (
                        <>
                            <DisplayWordText Word={"SAINT VINCENT &"} sizeW={1} sizeH={0.051} left={1} />
                            <DisplayWordText Word={"THE GRENADINES"} sizeW={1} sizeH={0.051} left={1} />
                        </>
                    ) : (
                        <DisplayWordText Word={country} sizeW={1} sizeH={0.072} left={1} />
                    )} 
<DisplayWord Word={'capital - ' + countryInfo.capital} sizeW={1} sizeH={0.037} left={0} />
<View/>
</View> */}


<View style={{width: screenWidth, height: screenWidth * 0.26,flexDirection: 'row',backgroundColor: 'white', 
zIndex: 80, borderBottomRightRadius: screenWidth * 0.03,borderBottomLeftRadius: screenWidth * 0.03 }}>

<View style={{ width: screenWidth, height: screenWidth * 0.11, alignItems: 'center'}}>
{Platform.OS ? (
     <View style={{backgroundColor: 'gray', width: screenWidth * 0.25, height: screenWidth * 0.015, marginTop: screenWidth * 0.02, borderRadius: screenWidth}}>
    </View>
    ) : null}
    <TouchableOpacity style={{ width: screenWidth * 0.1, height: screenWidth * 0.1, position: 'absolute', right: screenWidth * 0.013, top: screenWidth * 0.013 }} onPress={navigate}>
              <Image 
                source={require('../../Photos/closeX.png')} // local photo
                style={styles.photo}
                resizeMode="contain" // make the image fit the screen
              />
            </TouchableOpacity>    


            <View style={{ width: screenWidth, height: screenWidth * 0.142, marginTop: screenWidth * 0.078, justifyContent: 'space-evenly'}}>


            {country === "DEMOCRATIC REPUBLIC OF THE CONGO" ? (
                        <>
                            <DisplayWordText Word={"DEMOCRATIC REPUBLIC"} sizeW={1} sizeH={0.051} left={1} />
                            <DisplayWordText Word={"OF THE CONGO"} sizeW={1} sizeH={0.051} left={1} />
                        </>
                    ) : country === 'THE FEDERATED STATES OF MICRONESIA' ? (
                        <>
                            <DisplayWordText Word={"THE FEDERATED STATES"} sizeW={1} sizeH={0.051} left={1} />
                            <DisplayWordText Word={"OF MICRONESIA"} sizeW={1} sizeH={0.051} left={1} />
                        </>
                    ) : country === 'SAINT VINCENT & THE GRENADINES' ? (
                        <>
                            <DisplayWordText Word={"SAINT VINCENT &"} sizeW={1} sizeH={0.051} left={1} />
                            <DisplayWordText Word={"THE GRENADINES"} sizeW={1} sizeH={0.051} left={1} />
                        </>
                    ) : (
                        <DisplayWordText Word={country} sizeW={1} sizeH={0.072} left={1} />
                    )} 

<DisplayWord Word={'capital - ' + countryInfo.capital} sizeW={1} sizeH={0.037} left={0} />

            </View>
            
</View>

</View>








<View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center',}}>


{/* <View style={styles.container}> */}

{/* <View style={{width: '100%',  height: '100%', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'red'}}> */}



<View style={{width: screenWidth * 0.94, 
   backgroundColor: 'white',
   height: screenWidth * 0.34, justifyContent: 'space-evenly', flexDirection: 'row',
   alignItems: 'center',
   borderRadius: screenWidth * 0.02,}}>
  <View style={styles.flagContainer}>
        <FlagImage country={country} />
  </View>
        <View style={{ width: screenWidth * 0.44, height: screenWidth * 0.34, justifyContent: 'space-evenly'}}>
        <DisplayWord Word={countryInfo.continent} sizeW={0.44} sizeH={0.054} left={0} />

<View>
        <DisplayWord Word={'the capital ' + countryInfo.capital} sizeW={0.44} sizeH={0.02} left={1} />
        <View style={{margin: screenWidth * 0.002}}/>
        <DisplayWord Word={'is located at these corrdinets'} sizeW={0.44} sizeH={0.02} left={1} />
        </View>
        <DisplayWord Word={'longitude: ' + countryInfo.longitude} sizeW={0.44} sizeH={0.037} left={1} />
<DisplayWord Word={'latitude:  ' + countryInfo.latitude} sizeW={0.44} sizeH={0.037} left={1} />    
     </View>
     </View> 


 <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.94, }}>
     <View style={{width: screenWidth * 0.44, 
   backgroundColor: 'white',
   height: screenWidth * 0.2, justifyContent: 'space-evenly', 
   alignItems: 'center',
   borderRadius: screenWidth * 0.025,}}>
        <DisplayWord Word={'size'} sizeW={0.42} sizeH={0.027} left={0} />
        <DisplayWord Word={countryInfo.size} sizeW={0.42} sizeH={0.05} left={0} />
      <DisplayWord Word={' in ' + countryInfo.continent + ':  ' + continentPositionSize + '/' + contientDataSize} sizeW={0.42} sizeH={0.027} left={1} />
      <DisplayWord Word={' in world:   ' + SizePosition + "/195"} sizeW={0.42} sizeH={0.027} left={1} />
     </View>
     <View style={{width: screenWidth * 0.44, 
   backgroundColor: 'white',
   height: screenWidth * 0.2, justifyContent: 'space-evenly', 
   alignItems: 'center',
   borderRadius: screenWidth * 0.02, }}>

<DisplayWord Word={'population'} sizeW={0.42} sizeH={0.027} left={0} />
<DisplayWord Word={countryInfo.population} sizeW={0.42} sizeH={0.05} left={0} />
      <DisplayWord Word={' in ' + countryInfo.continent + ':  ' + continentPosition + '/' + contientDataSize} sizeW={0.42} sizeH={0.027} left={1} />
      <DisplayWord Word={' in world:   ' + PopulationPosition + "/195"} sizeW={0.42} sizeH={0.027} left={1} /> 
     </View>
     </View> 


<View style={styles.imageContainer}>
        <LocationImage country={country} />
      </View>
<View style={{ height: screenWidth * 0.127,}}>
   <AnimatedButton country={country}/>
   </View>
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
    width: Platform.isPad ? screenWidth * 0.4 : screenWidth * 0.7,
    height: Platform.isPad ? screenWidth * 0.4 : screenWidth * 0.7,
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