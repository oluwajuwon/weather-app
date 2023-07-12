import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  SectionList,
  RefreshControl,
} from "react-native";
import getStyles from "./styles";
import Header from "../../components/Header";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  CurrentWeather,
  ForecastWeather,
  RootStackParamList,
} from "../../types";
import { fetchWeatherForecast } from "../../api/weather";
import { convertToDateSections, getDatePeriodWithoutTime } from "../../utils";
import ForeCastItem from "../../components/ForecastItem";

type ForecastProps = {};
type ForecastRouteProp = RouteProp<RootStackParamList, "Forecast">;

const Forecast = ({ ...props }: ForecastProps) => {
  const styles = getStyles();
  const [loading, setLoading] = useState(false);
  const [weatherForecastInfo, setWeatherForecastInfo] =
    useState<ForecastWeather | null>();

  const navigation = useNavigation();
  const route = useRoute<ForecastRouteProp>();
  const { location } = route.params;

  const getWeatherForecast = async () => {
    if (location) {
      setLoading(true);
      const weatherinfo = await fetchWeatherForecast({
        lat: location?.coords.latitude,
        lon: location?.coords.longitude,
      });
      setLoading(false);
      setWeatherForecastInfo(weatherinfo);
    }
  };

  const revisedForecastData = useMemo(
    () =>
      convertToDateSections(
        weatherForecastInfo ? weatherForecastInfo?.list : []
      ),
    [weatherForecastInfo]
  );

  useEffect(() => {
    getWeatherForecast();
  }, [location]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Forecast" navigation={navigation} hasBackBtn />
      <View style={styles.cityContainer}>
        <Text style={styles.cityName}>
          {weatherForecastInfo?.city.name}, {weatherForecastInfo?.city.country}
        </Text>
      </View>
      <SectionList
        style={styles.forecastList}
        sections={revisedForecastData}
        renderItem={({ item }) => <ForeCastItem forecast={item} />}
        keyExtractor={(_, index) => index.toString()}
        renderSectionHeader={({ section: { date } }) => (
          <Text style={styles.dateHeader}>
            {getDatePeriodWithoutTime(date)}
          </Text>
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getWeatherForecast}
            tintColor="#b0bad3"
          />
        }
      />
    </SafeAreaView>
  );
};

export default Forecast;
