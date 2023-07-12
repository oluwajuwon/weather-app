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
} from "react-native";
import getStyles from "./styles";

type ForecastProps = {
  navigation: any;
};

const Forecast = ({ navigation, ...props }: ForecastProps) => {
  const styles = getStyles();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>forecase</Text>
    </SafeAreaView>
  );
};

export default Forecast;
