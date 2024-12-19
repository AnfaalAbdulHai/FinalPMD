import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ShopScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setRestaurants(sortedData);
        setFilteredRestaurants(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = restaurants
        .filter((restaurant) =>
          restaurant.title.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => a.title.localeCompare(b.title));
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  };

  const handleRestaurantPress = (id) => {
    navigation.navigate('Items', { RestaurantId: id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleRestaurantPress(item.id)}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading Restaurants...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5f5f5',
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchBar: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    listContainer: {
      paddingBottom: 20,
    },
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 15,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    price: {
      fontSize: 14,
      color: '#666',
    },
    description: {
      fontSize: 12,
      color: '#999',
    },
  });

export default ShopScreen;
