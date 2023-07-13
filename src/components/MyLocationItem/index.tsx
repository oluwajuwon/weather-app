import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import getStyles from "./styles";
import { CurrentWeather } from "../../types";
import TemperatureBanner from "../TemperatureBanner";
import Delete from "../../assets/icons/remove.png";

type MyLocationItemProps = {
  weather: CurrentWeather;
  onRemove: () => void;
};

const MyLocationItem = ({
  weather,
  onRemove,
  ...props
}: MyLocationItemProps) => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onRemove} style={styles.delete}>
        <Image source={Delete} style={styles.deleteImg} />
      </TouchableOpacity>
      <View style={styles.boxContent}>
        <View style={styles.minmaxTemp}>
          <Text style={styles.cityName}>
            {weather.name}, {weather.sys.country}
          </Text>
          <Text style={styles.temp}>
            H: {weather.main.temp_max}° L: {weather.main.temp_min}°
          </Text>
        </View>
        <TemperatureBanner
          weather={weather.weather}
          temperature={weather.main}
          timeStamp={weather.dt}
          type="small"
          containerStyles={styles.bannerContainer}
          contentStyles={{ marginLeft: 10 }}
        />
      </View>
    </View>
  );
};

export default MyLocationItem;
