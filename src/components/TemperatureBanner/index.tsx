import React, { useEffect, useState } from "react";
import { View, Text, Image, ViewStyle } from "react-native";
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
  type?: "small" | "normal";
  extraDescription?: string;
  containerStyles?: ViewStyle;
  contentStyles?: ViewStyle;
};

const TemperatureBanner = ({
  temperature,
  weather,
  timeStamp,
  type = "normal",
  extraDescription,
  containerStyles,
  contentStyles,
}: TemperatureBannerProps) => {
  const styles = getStyles();

  const mainStyles = {
    image: { small: styles.weatherImageSmall, normal: styles.weatherimage },
    temp: { small: [styles.temp, styles.tempSmall], normal: styles.temp },
    description: {
      small: [styles.description, styles.descriptionSmall],
      normal: styles.description,
    },
  };

  const renderWeatherImage = () => {
    const weatherConditions = weather[0].main;
    const date = new Date(timeStamp * 1000);

    if (weatherConditions === "Clear" && isDayTime(date)) {
      return <Image source={Sunny} style={mainStyles.image[type]} />;
    } else if (weatherConditions === "Clear" && !isDayTime(date)) {
      return <Image source={Night} style={mainStyles.image[type]} />;
    } else if (weatherConditions === "Clouds") {
      return <Image source={Cloudy} style={mainStyles.image[type]} />;
    } else if (
      weatherConditions === "Rain" ||
      weatherConditions === "Drizzle"
    ) {
      return <Image source={Rainy} style={mainStyles.image[type]} />;
    }
  };

  return (
    <View style={[styles.container, containerStyles]}>
      {renderWeatherImage()}
      <View style={[styles.content, contentStyles]}>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Text style={mainStyles.temp[type]}>{temperature.temp}</Text>
          <Text style={styles.tempunit}>°C</Text>
        </View>
        <Text style={mainStyles.description[type]}>
          {weather[0].description}
          {extraDescription}
        </Text>
      </View>
    </View>
  );
};

export default TemperatureBanner;
