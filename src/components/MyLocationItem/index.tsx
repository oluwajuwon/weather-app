import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import getStyles from "./styles";
import { CurrentWeather } from "../../types";
import TemperatureBanner from "../TemperatureBanner";
import { getTimeFromTimestamp } from "../../utils";

type MyLocationItemProps = {
  weather: CurrentWeather;
};

const MyLocationItem = ({ weather, ...props }: MyLocationItemProps) => {
  const styles = getStyles();

  const timeStamp = useMemo(() => getTimeFromTimestamp(weather.dt), [weather]);
  return (
    <View style={styles.container}>
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
