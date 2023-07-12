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
import { useNavigation } from "@react-navigation/native";
import getStyles from "./styles";
import { Temperature, Weather } from "../../types";
import Cloudy from "../../assets/images/cloudy-transparent.png";
import Sunny from "../../assets/images/sunny-transparent.png";
import Rainy from "../../assets/images/rainy-transparent.png";
import Night from "../../assets/images/night-transparent.png";
import { isDayTime } from "../../utils";

type TemperatureBannerProps = {
  temperature: Temperature;
  weather: Weather[];
  timeStamp: number;
};

const TemperatureBanner = ({
  temperature,
  weather,
  timeStamp,
}: TemperatureBannerProps) => {
  const styles = getStyles();
  const navigation = useNavigation();

  const renderWeatherImage = () => {
    const weatherConditions = weather[0].main;
    const date = new Date(timeStamp * 1000);

    if (weatherConditions === "Clear" && isDayTime(date)) {
      return <Image source={Sunny} style={styles.weatherimage} />;
    } else if (weatherConditions === "Clear" && !isDayTime(date)) {
      return <Image source={Night} style={styles.weatherimage} />;
    } else if (weatherConditions === "Clouds") {
      return <Image source={Cloudy} style={styles.weatherimage} />;
    } else if (
      weatherConditions === "Rain" ||
      weatherConditions === "Drizzle"
    ) {
      return <Image source={Rainy} style={styles.weatherimage} />;
    }
  };

  return (
    <View style={styles.tempDash}>
      {renderWeatherImage()}
      <View>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Text style={styles.temp}>{temperature.temp}</Text>
          <Text style={styles.tempunit}>°C</Text>
        </View>
        <Text style={styles.description}>{weather[0].description}</Text>
      </View>
    </View>
  );
};

export default TemperatureBanner;
