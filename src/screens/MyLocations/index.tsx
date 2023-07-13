import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import getStyles from "./styles";
import Header from "../../components/Header";
import { getDataFromMemory } from "../../utils";
import { CurrentWeather, SavedUserLocation } from "../../types";
import { fetchMultipleLocationsData } from "../../api/weather";
import MyLocationItem from "../../components/MyLocationItem";

const MyLocations = () => {
  const styles = getStyles();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<CurrentWeather[] | null>();

  const getLocations = async () => {
    setLoading(true);
    const locationListString = await getDataFromMemory("userLocations");

    if (locationListString) {
      const locationList = JSON.parse(locationListString);
      const allLocationsData = await fetchMultipleLocationsData(locationList);

      console.log(allLocationsData);
      setLocations(allLocationsData);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="My Locations"
        navigation={navigation}
        hasBackBtn
        containerStyles={{ height: 40 }}
      />
      <FlatList
        style={styles.locationsList}
        data={locations}
        renderItem={({ item }) => <MyLocationItem weather={item} />}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <View
            style={styles.emptyView}
          >
            <Text style={styles.emptyTxt}>You don't have any saved locations</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default MyLocations;
