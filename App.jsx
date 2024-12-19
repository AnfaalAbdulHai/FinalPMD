import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
// import TabNavigation from './config/TabNavigation'
import {MenuProvider} from 'react-native-popup-menu'
import StackNavigation from './Components/StackNavigation'
import { ProfileContextProvider } from './Components/ContextCode'; 

const App = () => {
  return (
    // <MenuProvider>
    <ProfileContextProvider>
    <NavigationContainer>
     <StackNavigation/>
    </NavigationContainer>
    </ProfileContextProvider>
    // </MenuProvider>
  );
}

export default App