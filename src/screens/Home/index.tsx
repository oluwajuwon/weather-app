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
import getStyles from "./styles";
import { useLocation } from "../../hooks/useLocation";
import { fetChCurrentLocationWeather } from "../../api/weather";
import TemperatureBanner from "../../components/TemperatureBanner";
import { CurrentWeather } from "../../types";
import WeatherStats from "../../components/WeatherStats";
import Visibility from "../../assets/icons/visibility.png";
import Thermometer from "../../assets/icons/thermometer.png";
import Sun from "../../assets/images/sun.png";
import Sunset from "../../assets/images/sunset.png";
import {
  convertMetersToMiles,
  generateFeelsLikeDesc,
  generateVisitbilityDesc,
  getSunriseandSunsetTime,
  getVisibilityInfo,
} from "../../utils";
import StatsBox from "../../components/StatsBox";

const { width } = Dimensions.get("screen");

const Home = () => {
  const styles = getStyles();
  const [loading, setLoading] = useState(false);
  const { location } = useLocation();
  const [currentWeatherInfo, setCurrentWeatherInfo] =
    useState<CurrentWeather | null>();

  const getWeatherInfo = async () => {
    if (location && Object.keys(location).length > 0) {
      setLoading(true);
      const weatherinfo = await fetChCurrentLocationWeather({
        lat: location?.coords.latitude,
        lon: location?.coords.longitude,
      });
      setLoading(false);
      setCurrentWeatherInfo(weatherinfo);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, [location]);

  const handleRefresh = () => {};

  console.log(currentWeatherInfo);

  const { visibility, description } = currentWeatherInfo
    ? getVisibilityInfo(currentWeatherInfo?.visibility)
    : { visibility: "", description: "" };

  const tempDesc = currentWeatherInfo
    ? generateFeelsLikeDesc(
        currentWeatherInfo?.main.feels_like,
        currentWeatherInfo.dt
      )
    : "";

  const { sunrise, sunset } = currentWeatherInfo
    ? getSunriseandSunsetTime(
        currentWeatherInfo.sys.sunrise,
        currentWeatherInfo?.sys.sunset
      )
    : { sunrise: "", sunset: "" };

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
              weather={currentWeatherInfo.weather}
              temperature={currentWeatherInfo.main}
              timeStamp={currentWeatherInfo.dt}
            />
            <WeatherStats
              wind={currentWeatherInfo.wind}
              temperature={currentWeatherInfo.main}
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
