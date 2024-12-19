import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Dimensions, Button, Platform, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geolocation from '@react-native-community/geolocation'; // Using @react-native-community/geolocation
import "react-native-get-random-values"; // Fix for getRandomValues

const GOOGLE_API_KEY = "AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk"; // Replace with your API key

const FAST_NUCES_COORDS = {
  latitude: 24.860068944979993,
  longitude: 67.06998475396415,
};

const LocationScreen = () => {
  const [destination, setDestination] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: FAST_NUCES_COORDS.latitude,
    longitude: FAST_NUCES_COORDS.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01 * (Dimensions.get("window").width / Dimensions.get("window").height),
  });
  const mapRef = useRef(null);

  // Function to fetch current location
  useEffect(() => {
    // Request location permission and get the current position
    const getLocation = () => {
      if (Platform.OS === "ios") {
        Geolocation.requestAuthorization('whenInUse'); // Request permission for iOS
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(position.coords);
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01 * (Dimensions.get("window").width / Dimensions.get("window").height),
          });
        },
        (error) => {
          console.log(error.message); // Handle error if geolocation fails
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    getLocation();
  }, []);

  const handlePlaceSelect = (data, details) => {
    const { lat, lng } = details.geometry.location;

    setDestination({
      latitude: lat,
      longitude: lng,
    });

    // Fit map to include both the FAST NUCES location and the selected destination
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        [
          FAST_NUCES_COORDS, // Fixed FAST NUCES location
          { latitude: lat, longitude: lng }, // Selected destination
        ],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  };

  // Zoom in function
  const handleZoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  // Zoom out function
  const handleZoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  // Function to update map with current location
  const updateCurrentLocation = () => {
    if (currentLocation) {
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01 * (Dimensions.get("window").width / Dimensions.get("window").height),
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion} // Update region when user manually changes it
      >
        {/* Marker for FAST NUCES City Campus */}
        <Marker coordinate={FAST_NUCES_COORDS} title="FAST NUCES City Campus" />
        {/* Marker for current location */}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Your Location"
            pinColor="green"
          />
        )}
        {/* Marker for destination */}
        {destination && (
          <Marker coordinate={destination} title="Destination" pinColor="blue" />
        )}
        {/* Route drawing */}
        {destination && (
          <MapViewDirections
            origin={destination}
            destination={FAST_NUCES_COORDS}
            apikey={GOOGLE_API_KEY}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>

      {/* Search bar on top of the map */}
      <GooglePlacesAutocomplete
        placeholder="Search for a location"
        fetchDetails={true}
        onPress={handlePlaceSelect}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        styles={{
          container: styles.searchContainer,
          textInput: styles.searchInput,
        }}
      />

      {/* Current location button */}
      <TouchableOpacity style={styles.currentLocationButton} onPress={updateCurrentLocation}>
        <Text style={styles.currentLocationText}>📍</Text>
      </TouchableOpacity>

      {/* Zoom controls */}
      <View style={styles.zoomControls}>
        <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  searchInput: {
    height: 40,
    color: "#5d5d5d",
    fontSize: 16,
  },
  zoomControls: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 1,
    flexDirection: "column",
  },
  zoomButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  zoomText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  currentLocationButton: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  currentLocationText: {
    fontSize: 24,
    color: "#000",
  },
});

export default LocationScreen;