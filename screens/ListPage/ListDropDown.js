import React from 'react';
import { SafeAreaView, Dimensions, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import DisplayWord from '../Multiple/DisplayWord';
import { ScrollView } from 'react-native-gesture-handler';
import IndvidualListIteam from './IndvidualListIteam'
const {height, width} = Dimensions.get('window')
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ListDropDown = ({ SortByVal, SortByVal2 }) => {

  return (
    <View style={{ width: screenWidth, position: 'absolute', height: height - (width * 0.25),}}>
<View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
 {/*   */}
 <View style={{width: '100%', flex: 1}}>
  <IndvidualListIteam SortByVal={SortByVal} SortByVal2={SortByVal2}/> 
 </View>

<View style={{width: '100%',height: screenHeight * 0.13, }}></View> 
</View>
    </View>
  );
}

export default ListDropDown;


