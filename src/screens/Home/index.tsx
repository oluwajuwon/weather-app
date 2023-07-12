import React, { Fragment, useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import getStyles from "./styles";
import { useLocation } from "../../hooks/useLocation";
import TemperatureBanner from "../../components/TemperatureBanner";
import { RootStackParamList } from "../../types";
import WeatherStats from "../../components/WeatherStats";
import Visibility from "../../assets/icons/visibility.png";
import Thermometer from "../../assets/icons/thermometer.png";
import Sun from "../../assets/images/sun.png";
import Sunset from "../../assets/images/sunset.png";
import StatsBox from "../../components/StatsBox";
import { useWeatherInfo } from "../../hooks/useWeatherInfo";

const { width } = Dimensions.get("screen");
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, "Forecast">;

const Home = () => {
  const styles = getStyles();
  const { location } = useLocation();

  const {
    currentWeatherInfo,
    loading,
    sunrise,
    sunset,
    tempDesc,
    visibility,
    description,
    getWeatherInfo,
  } = useWeatherInfo(location);
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <Text style={styles.date}>{new Date().toDateString()}</Text>
        <Text style={styles.location}>
          {currentWeatherInfo?.name}, {currentWeatherInfo?.sys.country}
        </Text>
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
                onPress={() =>
                  navigation.navigate("Forecast", {
                    location,
                  })
                }
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
