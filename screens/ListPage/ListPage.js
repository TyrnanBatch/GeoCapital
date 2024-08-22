import React, {useState} from 'react';
import { View, Text, TouchableOpacity,Dimensions, StyleSheet, Image, } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
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
<View style={{marginTop: screenWidth * 0.01,}}>
  <Text style={{color: 'black',fontSize: screenWidth * 0.07, alignSelf: 'center',
fontFamily: 'Chalkboard SE',}}>{'LIST OF CAPITALS'}</Text>
  </View>
</View>
 <TouchableOpacity style={{ postion: 'absoulte',top: 0, width: screenWidth, height: screenWidth * 0.12, justifyContent: 'center' }} onPress={navigate}>
          <Image 
            source={require('../../Photos/closeX.png')}
            style={styles.photo}
            resizeMode="contain"
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
        <View style={{ marginTop: -screenWidth * 0.015,paddingBottom: screenWidth * 0.01,borderBottomColor: 'rgb(207, 204, 204)', justifyContent: 'center' }}>
          <Text style={{color: 'black',fontSize: screenWidth * 0.03, alignSelf: 'center',marginTop: screenWidth * 0.01,
fontFamily: 'Chalkboard SE',}}>{'THE UNITED NATIONS 195 COUNTRIES AND CAPITALS'}</Text>
        </View>
        <View style={{ width: screenWidth * 0.96, flexDirection: 'row', paddingTop: screenWidth * 0.01, 
        marginBottom: screenWidth * 0.01, borderTopColor: 'rgb(207, 204, 204)', borderTopWidth: screenWidth * 0.0025, backgroundColor: 'white', zIndex: 100 }}>
          <View style={{ width: screenWidth * 0.28, justifyContent: 'center', borderRightColor: 'rgb(207, 204, 204)', borderRightWidth: screenWidth * 0.0025, }}>
            <Text style={{color: 'black',fontSize: screenWidth * 0.042, alignSelf: 'center',
fontFamily: 'Chalkboard SE',}}>{' SORT BY  : '}</Text>
          </View>
          <View style={{ width: screenWidth * 0.48, justifyContent: 'center', }}>
            <Text style={{color: 'black',fontSize: screenWidth * 0.042, 
fontFamily: 'Chalkboard SE',}}>{" " + SortByVal}</Text>
          </View>
          <View style={{ width: screenWidth * 0.21, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={handleButtonPress} style={{ width: screenWidth * 0.16, flexDirection: 'row', justifyContent: 'space-evenly',
             height: screenWidth * 0.06,  borderRadius: screenWidth * 0.012, justifyContent: 'center',
              alignItems: 'center',
               }}>
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
          <Text style={{color: 'black',fontSize: screenWidth * 0.042, alignSelf: 'center',
fontFamily: 'Chalkboard SE',}}>{' SHOW     : '}</Text>
          </View>
          <View style={{ width: screenWidth * 0.48, justifyContent: 'center', }}>
          <Text style={{color: 'black',fontSize: screenWidth * 0.042, 
fontFamily: 'Chalkboard SE',}}>{" " + SortByVal2}</Text>
          </View>
          <View style={{ width: screenWidth * 0.21, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={handleButtonPress2} style={{ width: screenWidth * 0.16, flexDirection: 'row', justifyContent: 'space-evenly',
             height: screenWidth * 0.06,  borderRadius: screenWidth * 0.012, justifyContent: 'center', 
             alignItems: 'center' }}>
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
      <View style={{borderRadius:screenWidth * 0.1, backgroundColor: '#F7A858', width: screenWidth * 0.2, height: '100%', alignItems: 'center', justifyContent: "space-evenly",}}>
          <Text style={{color: 'black',fontSize: screenWidth * 0.03, marginTop: -screenWidth * 0.005,
fontFamily: 'Chalkboard SE',}}>{'FLAG'}</Text>
          </View>
  </View>

  <View style={{width: screenWidth * 0.365, height: screenWidth * 0.05, alignItems: 'center', }}>
      <View style={{borderRadius: screenWidth * 0.1, backgroundColor: '#F7A858', width: screenWidth * 0.28, height: '100%', alignItems: 'center', justifyContent: "space-evenly",}}>
          <Text style={{color: 'black',fontSize: screenWidth * 0.03, marginTop: -screenWidth * 0.005,
fontFamily: 'Chalkboard SE',}}>{'CAPITAL CITY'}</Text></View>
  </View>

  <View style={{width: screenWidth * 0.2, height: screenWidth * 0.05, alignItems: 'center',  }}>
      <View style={{borderRadius: screenWidth * 0.1, backgroundColor: '#F7A858', width: screenWidth * 0.18, height: '100%', alignItems: 'center', justifyContent: "space-evenly",}}>
          <Text style={{color: 'black',fontSize: screenWidth * 0.029, marginTop: -screenWidth * 0.005,
fontFamily: 'Chalkboard SE',}}>{'CONTINENT'}</Text>
          </View>
  </View>

  <View style={{width: screenWidth * 0.18, height: screenWidth * 0.05, alignItems: 'center',  }}>
      <View style={{borderRadius: screenWidth * 0.1, backgroundColor: '#F7A858', width: screenWidth * 0.18, height: '100%', alignItems: 'center', justifyContent: "space-evenly",}}>
          <Text style={{color: 'black',fontSize: screenWidth * 0.029, marginTop: -screenWidth * 0.005,
fontFamily: 'Chalkboard SE',}}>{'MORE INFO'}</Text></View>
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
   height: screenWidth * 0.2,
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


