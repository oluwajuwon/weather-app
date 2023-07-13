import React, { Fragment, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import getStyles from "./styles";
import { useWeatherInfo } from "../../hooks/useWeatherInfo";
import { Coords, CurrentWeather, RootStackParamList } from "../../types";
import TemperatureBanner from "../../components/TemperatureBanner";
import StatsBox from "../../components/StatsBox";
import WeatherStats from "../../components/WeatherStats";
import Visibility from "../../assets/icons/visibility.png";
import Thermometer from "../../assets/icons/thermometer.png";
import Sun from "../../assets/images/sun.png";
import Sunset from "../../assets/images/sunset.png";
import Search from "../../assets/icons/search.png";
import List from "../../assets/icons/list.png";
import SearchLocation from "../../components/LocationSearchModal";
import { fetchCurrentLocationWeather } from "../../api/weather";
import { getDataFromMemory, storeDataInMemory } from "../../utils";
import { useApp } from "../../context/app-context";
import ErrorScreen from "../../components/ErrorScreen";
import LoadingScreen from "../../components/LoadingScreen";

const { width } = Dimensions.get("screen");
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, "Forecast">;

const Home = () => {
  const styles = getStyles();
  const [showModal, setShowModal] = useState(false);
  const [fetchedLocationWeather, setFetchedLocationWeather] =
    useState<CurrentWeather | null>();
  const { userLocation: location } = useApp();

  const {
    currentWeatherInfo,
    loading,
    error,
    sunrise,
    sunset,
    tempDesc,
    visibility,
    description,
    getWeatherInfo,
  } = useWeatherInfo(location);
  const navigation = useNavigation<ScreenNavigationProp>();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!currentWeatherInfo && !loading && error) {
    return (
      <ErrorScreen
        errorMsg={`${error}`}
        hasBtn
        btnText="Reload"
        handleBtnClick={getWeatherInfo}
      />
    );
  }
  const handleLocationSelect = async (data: Coords) => {
    const { lat, lon } = data;
    const locationDetails = await fetchCurrentLocationWeather({ lat, lon });
    setFetchedLocationWeather(locationDetails);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSaveSearchedLocation = async () => {
    const locationListString = await getDataFromMemory("userLocations");
    const location = {
      ...fetchedLocationWeather?.coord,
      name: fetchedLocationWeather?.name,
      country: fetchedLocationWeather?.sys?.country,
      id: fetchedLocationWeather?.sys?.id,
    };

    if (!locationListString && fetchedLocationWeather) {
      await storeDataInMemory("userLocations", [location]);
    }
    if (locationListString && fetchedLocationWeather) {
      const locationList = JSON.parse(locationListString);
      const foundLocation = Array.from(locationList).find(
        (item: any) => item.id === fetchedLocationWeather.sys.id
      );
      if (foundLocation) {
        return;
      }
      locationList.push(location);
      await storeDataInMemory("userLocations", locationList);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchLocation
        showSearchModal={showModal}
        handleSelectLocation={handleLocationSelect}
        onClose={handleToggleModal}
        boxHeader="Search Location"
        searchedWeatherInfo={fetchedLocationWeather!}
        saveLocation={handleSaveSearchedLocation}
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getWeatherInfo}
            tintColor="#b0bad3"
          />
        }
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 16,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.date}>{new Date().toDateString()}</Text>
            <Text style={styles.location}>
              {currentWeatherInfo?.name}, {currentWeatherInfo?.sys.country}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={handleToggleModal}
              style={{ marginRight: 10 }}
            >
              <Image source={Search} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyLocations" as never)}
            >
              <Image source={List} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
        {currentWeatherInfo && (
          <Fragment>
            <TemperatureBanner
              weather={currentWeatherInfo?.weather}
              temperature={currentWeatherInfo?.main}
              timeStamp={currentWeatherInfo?.dt}
            />
            <View style={styles.dateHeader}>
              <Text style={[styles.date, { fontSize: 18, marginTop: 0 }]}>
                Today
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Forecast" as never)}
              >
                <Text style={styles.forecastTxt}>View 5 day Forecast</Text>
              </TouchableOpacity>
            </View>
            <WeatherStats
              wind={currentWeatherInfo?.wind}
              temperature={currentWeatherInfo?.main}
            />
          </Fragment>
        )}
        {currentWeatherInfo && (
          <View style={styles.statsRow}>
            <StatsBox
              headerImage={Thermometer}
              headerTitle="Sunrise"
              stat={sunrise}
              height={(width - 72) / 2}
              width={(width - 72) / 2}
              footer={<Image source={Sun} style={styles.statsImage} />}
            />
            <StatsBox
              headerImage={Thermometer}
              headerTitle="Sunset"
              stat={sunset}
              height={(width - 72) / 2}
              width={(width - 72) / 2}
              footer={<Image source={Sunset} style={styles.statsImage} />}
            />
          </View>
        )}
        {currentWeatherInfo && (
          <View style={styles.statsRow}>
            <StatsBox
              headerImage={Visibility}
              headerTitle="Visibiity"
              description={description}
              stat={visibility}
              statsSubtext={"mi"}
              height={(width - 72) / 2}
              width={(width - 72) / 2}
              statsTextContainerStyles={{ alignItems: "flex-end" }}
            />
            <StatsBox
              headerImage={Thermometer}
              headerTitle="Feels Like"
              description={tempDesc}
              stat={currentWeatherInfo?.main.feels_like}
              statsSubtext={"°C"}
              height={(width - 72) / 2}
              width={(width - 72) / 2}
              statsTextContainerStyles={{ alignItems: "flex-start" }}
              statsSubTestStyles={{ marginTop: 10 }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
