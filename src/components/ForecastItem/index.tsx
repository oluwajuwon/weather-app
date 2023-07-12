import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import getStyles from "./styles";
import { ForecastItemWeather, Temperature, WindData } from "../../types";
import TemperatureBanner from "../TemperatureBanner";
import { getTimeFromTimestamp } from "../../utils";

type ForeCastItemProps = {
  forecast: ForecastItemWeather;
};

const ForeCastItem = ({ forecast, ...props }: ForeCastItemProps) => {
  const styles = getStyles();

  const timeStamp = useMemo(
    () => getTimeFromTimestamp(forecast.dt),
    [forecast]
  );
  return (
    <View style={styles.container}>
      <View style={styles.boxContent}>
        <TemperatureBanner
          weather={forecast.weather}
          temperature={forecast.main}
          timeStamp={forecast.dt}
          type="small"
          containerStyles={styles.bannerContainer}
          contentStyles={{ marginLeft: 10 }}
          extraDescription={` at ${timeStamp}`}
        />
        <View style={styles.minmaxTemp}>
          <Text style={styles.temp}>Max: {forecast.main.temp_max}°</Text>
          <Text style={styles.temp}>Min: {forecast.main.temp_min}°</Text>
        </View>
      </View>
    </View>
  );
};

export default ForeCastItem;
