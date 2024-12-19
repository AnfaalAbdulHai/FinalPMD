import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native'
import FontIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import {Menu, MenuProvider, MenuTrigger, MenuOptions, MenuOption} from 'react-native-popup-menu';
import FoodScreen from './FoodScreen';
import ShopScreen from './ShopScreen';
import SearchScreen from './SearchScreen';
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();

const HeaderLeft = () => (
  <View style={style.headerLeft}>
    <Text style={style.headerTitle}>FoodPanda</Text>
  </View> 
);

const HeaderRight = () => {
    const navigation = useNavigation();
return (
  <View style={style.Icons}>
    <Menu>
      <MenuTrigger>
        <IonIcon name="ellipsis-vertical" size={25} color="black" style={style.ellipsisIcon} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => alert("New grocery")}>
          <Text style={style.menuText}>New grocery</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert("New Restaurant")}>
          <Text style={style.menuText}>New Restaurant</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert("Shops")}>
          <Text style={style.menuText}>Shops</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert("Messages")}>
          <Text style={style.menuText}>Messages</Text>
        </MenuOption>
        <MenuOption onSelect={() => navigation.navigate('Location')}>
          <Text style={style.menuText}>Location</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  </View>
);
};

const TabNavigation = () => {
  return (
    <MenuProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FF4162',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            color: 'black',
            fontWeight: 'bold',
            paddingTop: 3,
            marginTop: 13,
          },
          tabBarStyle: {
            paddingBottom: 0,
            height: 70,
          },
          headerStyle: {
            borderBottomWidth: 0, // Removes the separator line
            elevation: 0, // Removes shadow on Android
            shadowOpacity: 0, // Removes shadow on iOS
          },
        }}>
        <Tab.Screen
          name="Food"
          component={FoodScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={[style.iconContainer, focused && style.ActiveIcon]}>
                <MaterialCommunityIcon name="food-fork-drink" size={size} color={color} />
              </View>
            ),
            headerTitle: '',
            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight/>
          }}
        />
        <Tab.Screen
          name="Grocery"
          component={ShopScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={[style.iconContainer, focused && style.ActiveIcon]}>
                <FontAwesome name="shop" size={size} color={color} />
              </View>
            ),
          }}
        />
         <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={[style.iconContainer, focused && style.ActiveIcon]}>
                <IonIcon name="search" size={size} color={color} />
              </View>
            ),
          }}
        />
         <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={[style.iconContainer, focused && style.ActiveIcon]}>
                <MaterialCommunityIcon name="account" size={size} color={color} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </MenuProvider>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    borderRadius: 75,
    padding: 6,
    height: 40,
    marginTop: 10,
  },
  ActiveIcon: {
    alignItems: 'center',
    width: 65,
    alignContent: 'center',
    backgroundColor: 'rgba(255, 192, 203, 0.5)',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 50,
  },
  headerTitle: {
    color: '#FF4162',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  Icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  IconStyle: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    padding: 10,
  },
  ellipsisIcon: {
    marginRight: 10, // Separate style just for ellipsis icon
  },
});

export default TabNavigation;
