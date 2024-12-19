import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import ShopItems from './ShopItems';
import { Menu } from 'react-native-popup-menu';
import RestaurantMenu from './RestaurantMenu';
import LocationScreen from './LocationScreen';
import ProfileScreen from './ProfileScreen';


const Stack =createNativeStackNavigator();

const StackNavigation = ()=>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component= {TabNavigation} options={{headerShown: false,}}/>
            <Stack.Screen name="Items" component={ShopItems}/>
            <Stack.Screen name="Menu" component={RestaurantMenu}/>
            <Stack.Screen name="Location" component={LocationScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
    );
}

export default StackNavigation;
