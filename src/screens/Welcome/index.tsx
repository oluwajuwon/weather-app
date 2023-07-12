import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import getStyles from "./styles";
import Weather from "../../assets/images/rainy.jpg";
import Arrow from "../../assets/icons/right-arrow.png";
import { useLocation } from "../../hooks/useLocation";
import { useApp } from "../../context/app-context";

const Welcome = ({ ...props }) => {
  const styles = getStyles();
  const { location } = useLocation();
  const { handleUpdateUserLocation } = useApp();
  const navigation = useNavigation();
  console.log(location);

  const handleNextScreen = () => {
    if (location) {
      navigation.navigate("Home" as never);
    }
  };

  useEffect(() => {
    if (location && Object.keys(location).length > 0) {
    }
  }, [location]);

  return (
    <SafeAreaView style={styles.safeArea}>
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
