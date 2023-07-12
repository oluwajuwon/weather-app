import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import getStyles from "./styles";
import { Temperature, WindData } from "../../types";

type WeatherStatsProps = {
  temperature: Temperature;
  wind: WindData;
};

const WeatherStats = ({ temperature, wind, ...props }: WeatherStatsProps) => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <View style={styles.statBox}>
        <Text style={styles.statsHeader}>Temp</Text>
        <Text style={styles.stat}>{temperature.temp}°</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statsHeader}>Humidity</Text>
        <Text style={styles.stat}>{temperature.humidity}%</Text>
      </View>
      <View style={[styles.statBox, { borderRightWidth: 0 }]}>
        <Text style={styles.statsHeader}>Wind</Text>
        <Text style={styles.stat}>{wind.speed}m/s</Text>
      </View>
    </View>
  );
};

export default WeatherStats;
