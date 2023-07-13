import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import getStyles from "./styles";

type LoadingScreenProps = {};
const LoadingScreen = ({ ...props }: LoadingScreenProps) => {
  const styles = getStyles();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ActivityIndicator color={"#ffffff"} />
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
