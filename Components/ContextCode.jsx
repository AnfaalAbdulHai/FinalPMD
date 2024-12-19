import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext(null);
const useProfileContext = () => useContext(ProfileContext);

const ProfileContextProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    name: 'Dummy Name',
    about: 'Dummy About',
    phoneNumber: '1234567890',
    profileImage: 'https://via.placeholder.com/100',
  }); // Set dummy data as the initial state

  useEffect(() => {
    AsyncStorage.getItem('profile').then((data) => {
      if (data) {
        setProfileData(JSON.parse(data));
      } else {
        // If no data is found in AsyncStorage, retain the dummy data
        setProfileData({
          name: 'Dummy Name',
          about: 'Dummy About',
          phoneNumber: '1234567890',
          profileImage: 'https://via.placeholder.com/100',
        });
      }
    });
  }, []);

  const updateProfileData = (data) => {
    setProfileData(data);
    AsyncStorage.setItem('profile', JSON.stringify(data));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContextProvider, useProfileContext };
