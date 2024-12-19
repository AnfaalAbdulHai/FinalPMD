import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useProfileContext } from './ContextCode'; // Make sure to import the ProfileContext
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const AccountScreen = ({ navigation }) => {
  const { profileData, updateProfileData } = useProfileContext(); // Fetch profile data and update function from context

  const perks = [
    { title: 'Become a Pro', icon: 'crown' },
    { title: 'Vouchers', icon: 'ticket-alt' },
    { title: 'Panda Rewards', icon: 'trophy' },
    { title: 'Invite Friends', icon: 'gift' },
  ];

  const general = [
    { title: 'Help Center', icon: 'help-circle' },
    { title: 'Foodpanda for Business', icon: 'briefcase' },
    { title: 'Terms & Policies', icon: 'file-text' },
  ];

  // Set some dummy data if profileData is null
  useEffect(() => {
    if (!profileData) {
      const dummyData = {
        name: 'John Doe',
        about: 'Lorem ipsum dolor sit amet',
        phoneNumber: '123-456-7890',
        profileImage: 'https://via.placeholder.com/100',
      };
      updateProfileData(dummyData);
    }
  }, [profileData, updateProfileData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.profileContainer}>
                <Image
                  source={{ uri: profileData?.profileImage || 'https://via.placeholder.com/100' }}
                  style={styles.profileImage}
                />
              </View>
              <Text style={styles.name}>{profileData?.name || 'Your Name'}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.viewProfile}>View Profile</Text>
              </TouchableOpacity>
            </View>

            {/* Menu Section */}
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuBox} onPress={() => navigation.navigate('Orders')}>
                <Icon name="shopping-cart" size={24} color="#FF69B4" />
                <Text style={styles.menuText}>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuBox} onPress={() => navigation.navigate('Favourites')}>
                <Icon name="favorite" size={24} color="#FF69B4" />
                <Text style={styles.menuText}>Favourites</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuBox} onPress={() => navigation.navigate('AddressScreen')}>
                <Icon name="location-on" size={24} color="#FF69B4" />
                <Text style={styles.menuText}>Addresses</Text>
              </TouchableOpacity>
            </View>

            {/* Perks Section */}
            <Text style={styles.sectionTitle}>Perks for You</Text>
          </>
        }
        renderItem={() => null} // Placeholder render to prevent rendering an empty list
        ListFooterComponent={
          <>
            {/* Render Perks with FlatList */}
            <FlatList
              data={perks}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listItem}>
                  <FontAwesome5Icon name={item.icon} size={20} color="#FF69B4" />
                  <Text style={styles.listText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />

            {/* General Section */}
            <Text style={styles.sectionTitle}>General</Text>
            <FlatList
              data={general}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listItem}>
                  <FeatherIcon name={item.icon} size={20} color="#FF69B4" />
                  <Text style={styles.listText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileContainer: {
    marginBottom: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FF69B4',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewProfile: {
    fontSize: 16,
    color: '#FF69B4',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  menuBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 3,
  },
  menuText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  listText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 0,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#FF69B4',
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 100,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AccountScreen;
