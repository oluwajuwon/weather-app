import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import getStyles from "./styles";
import Weather from "../../assets/images/rainy.jpg";
import Arrow from "../../assets/icons/right-arrow.png";
import { useLocation } from "../../hooks/useLocation";
import { useApp } from "../../context/app-context";
import SearchLocation from "../../components/LocationSearchModal";
import { Coords } from "../../types";

const Welcome = ({ ...props }) => {
  const styles = getStyles();
  const [showModal, setShowModal] = useState(false);

  const { location } = useLocation();
  const { handleUpdateUserLocation } = useApp();
  const navigation = useNavigation();

  useEffect(() => {
    if (location && Object.keys(location).length > 0) {
      const coords = {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      };
      handleUpdateUserLocation(coords);
    }
  }, [location]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleNextScreen = () => {
    if (location) {
      navigation.navigate("Home" as never);
    } else {
      handleToggleModal();
    }
  };

  const handleLocationSelect = (location: Coords) => {
    handleUpdateUserLocation(location);
    handleToggleModal();
    setTimeout(() => navigation.navigate("Home" as never), 100);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchLocation
        showSearchModal={showModal}
        handleSelectLocation={handleLocationSelect}
        onClose={handleToggleModal}
        boxHeader="Enter your Location"
      />
      <View style={styles.container}>
        <Image source={Weather} style={styles.welcomeImage} />
        <Text style={styles.title}>WedarApp</Text>
        <Text style={styles.subtitle}>
          Check the weather in your location and other locations, as well as the
          forecast for the next 5 days in your location.
        </Text>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNextScreen}>
          <Image source={Arrow} style={styles.nextImg} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
