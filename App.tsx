import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import InitialScreen from './screens/InitalScreen/InitialScreen';
import HomeScreen from './screens/HomePage/HomeScreen';
import MainGameIos from './screens/MainGame/MainGameIos';
import MainGameLevel from './screens/MainGame/MainGameLevel';
import ListPage from './screens/ListPage/ListPage';
import MoreGamePage from './screens/MoreGames/MoreGamePage';
import MiniGameOne from './screens/MoreGames/MiniGameOne';
import MiniGameTwo from './screens/MoreGames/MiniGameTwo';
import CapitalInfo from './screens/ListPage/CapitalInfo'
import Instruction from './screens/InitalScreen/Instructions';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

export type RootStackParamList = {
  Initial: undefined;
  Home: undefined;
  MainGame: undefined;
  List: undefined;
  MoreGame: undefined;
  CapitalInfo: undefined;
};

// const Stack = createStackNavigator<RootStackParamList>();

const Stack = createSharedElementStackNavigator();

export default function App() {





  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen name="Initial" 
        options={{ headerShown: false, animationEnabled: false }}
        component={InitialScreen} />
        <Stack.Screen name="Home" 
        options={{ headerShown: false, animationEnabled: false }}
        component={HomeScreen} />
      <Stack.Screen 
          name="MainGameIos" 
          options={{ headerShown: false, animationEnabled: false }}
          component={MainGameIos} 
        />
          <Stack.Screen 
          name="List" 
          component={ListPage}
          options={{ headerShown: false, animationEnabled: false }}
        />
         <Stack.Screen 
          name="CapitalInfo" 
          component={CapitalInfo}
          options={{
            headerShown: false,
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="MoreGame" 
          options={{ headerShown: false, animationEnabled: false }}
          component={MoreGamePage} 
        />
         <Stack.Screen 
          name="MainGameLevel" 
          options={{ headerShown: false, animationEnabled: false }}
          component={MainGameLevel} 
        />
         <Stack.Screen
          name="MiniGameOne"
          component={MiniGameOne}
          options={{ headerShown: false, animationEnabled: false }}
        />
          <Stack.Screen
          name="MiniGameTwo"
          component={MiniGameTwo}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="Instruction"
          component={Instruction}
          options={{ headerShown: false, animationEnabled: false }}
        />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

