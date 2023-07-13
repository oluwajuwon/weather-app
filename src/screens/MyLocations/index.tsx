import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import getStyles from "./styles";
import Header from "../../components/Header";
import { CurrentWeather } from "../../types";
import { fetchMultipleLocationsData } from "../../api/weather";
import MyLocationItem from "../../components/MyLocationItem";
import LoadingScreen from "../../components/LoadingScreen";
import { useApp } from "../../context/app-context";

const MyLocations = () => {
  const styles = getStyles();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<CurrentWeather[] | null>();
  const { handleRemoveUserLocation, savedLocations } = useApp();
  const toast = useToast();

  const getLocations = async () => {
    if (locations?.length === 0) {
      setLoading(true);
    }

    if (savedLocations.length > 0) {
      fetchMultipleLocationsData(savedLocations)
        .then((allLocationsData) => {
          setLoading(false);
          setLocations(allLocationsData);
        })
        .catch((error) => {
          setLoading(false);
          toast.show(`Error fetching your locations: ${error}`, {
            type: "danger",
          });
        });
    } else {
      setLoading(false);
      setLocations([]);
    }
  };

  useEffect(() => {
    getLocations();
  }, [savedLocations]);

  const handleRemoveLocation = (location: CurrentWeather) => {
    handleRemoveUserLocation(location);
  };

  if (loading) {
    return <LoadingScreen />;
  }
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
        renderItem={({ item }) => (
          <MyLocationItem
            weather={item}
            onRemove={() => handleRemoveLocation(item)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Text style={styles.emptyTxt}>
              You don't have any saved locations
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default MyLocations;
