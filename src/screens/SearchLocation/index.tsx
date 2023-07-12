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

const SearchLocation = () => {
  const styles = getStyles();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>search</Text>
    </SafeAreaView>
  );
};

export default SearchLocation;
