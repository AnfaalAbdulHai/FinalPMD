import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useProfileContext } from './ContextCode';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const ProfileScreen = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const { profileData, updateProfileData } = useProfileContext();
  const [name, setName] = useState(profileData?.name || '');
  const [about, setAbout] = useState(profileData?.about || '');
  const [phoneNumber, setPhoneNumber] = useState(profileData?.phoneNumber || '');
  const [profileImage, setProfileImage] = useState(profileData?.profileImage || '');
  const [isCameraActive, setIsCameraActive] = useState(false);

  const device = useCameraDevice('back');
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, []);

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({
          quality: 1,
        });

        // Save image to local storage
        const localPath = `${RNFS.DocumentDirectoryPath}/${Date.now()}.jpg`;
        await RNFS.copyFile(photo.path, localPath);

        // Convert image to Base64
        const base64Image = await RNFS.readFile(localPath, 'base64');
        const formattedBase64Image = `data:image/jpeg;base64,${base64Image}`;
        setProfileImage(formattedBase64Image);

        Alert.alert('Success', 'Image captured and saved successfully!');
      } catch (error) {
        console.error('Error capturing image:', error);
        Alert.alert('Error', 'Failed to capture image.');
      }
    }
    setIsCameraActive(false); // Deactivate camera after capturing
  };

  const selectFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      });

      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        const base64Image = `data:image/jpeg;base64,${selectedImage.base64}`;
        setProfileImage(base64Image);
        Alert.alert('Success', 'Image selected successfully!');
      }
    } catch (error) {
      console.error('Error selecting image from gallery:', error);
      Alert.alert('Error', 'Failed to select image.');
    }
  };

  const saveData = async () => {
    if (!name || !about || !phoneNumber || !profileImage) {
      Alert.alert('Error', 'All fields are required, including a profile image.');
      return;
    }

    const updatedProfile = { name, about, phoneNumber, profileImage };
    try {
      updateProfileData(updatedProfile); // Update context
      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  return (
    <View style={styles.container}>
      {!hasPermission ? (
        <Text style={styles.permissionText}>Camera permission is required</Text>
      ) : (
        <>
          {isCameraActive ? (
            <>
              <Camera
                style={styles.camera}
                device={device}
                isActive={true}
                ref={cameraRef}
                photo={true}
              />
              <TouchableOpacity onPress={captureImage} style={styles.captureButton}>
                <Text style={styles.captureButtonText}>Capture</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={[styles.profileImage, styles.placeholder]}>
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}
              <TouchableOpacity onPress={() => setIsCameraActive(true)} style={styles.button}>
                <Text style={styles.buttonText}>Capture Image</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={selectFromGallery} style={styles.button}>
                <Text style={styles.buttonText}>Select from Gallery</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      {/* Input Fields */}
      <Text style={styles.label}>Name:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>About:</Text>
      <TextInput value={about} onChangeText={setAbout} style={styles.input} />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />

      {!isCameraActive && (
        <TouchableOpacity onPress={saveData} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  camera: { width: '100%', height: '50%', marginBottom: 20 },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  captureButtonText: { color: 'white', fontSize: 16 },
  profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20 },
  placeholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0e0e0' },
  placeholderText: { color: '#777' },
  label: { fontSize: 16, color: 'gray', marginTop: 10 },
  input: { borderBottomWidth: 1, padding: 5, fontSize: 16, marginBottom: 15 },
  button: { marginTop: 20, backgroundColor: 'green', padding: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },
});

export default ProfileScreen;
