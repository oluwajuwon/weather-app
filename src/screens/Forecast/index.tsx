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
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { ForecastWeather } from "../../types";
import { fetchWeatherForecast } from "../../api/weather";
import { convertToDateSections, getDatePeriodWithoutTime } from "../../utils";
import ForeCastItem from "../../components/ForecastItem";
import { useApp } from "../../context/app-context";
import LoadingScreen from "../../components/LoadingScreen";

type ForecastProps = {};

const Forecast = ({ ...props }: ForecastProps) => {
  const styles = getStyles();
  const [loading, setLoading] = useState(false);
  const [weatherForecastInfo, setWeatherForecastInfo] =
    useState<ForecastWeather | null>();

  const navigation = useNavigation();
  const { userLocation: location } = useApp();
  const toast = useToast();

  const getWeatherForecast = async () => {
    if (location) {
      setLoading(true);
      fetchWeatherForecast({
        lat: location.lat,
        lon: location?.lon,
      })
        .then((weatherinfo) => {
          setLoading(false);
          setWeatherForecastInfo(weatherinfo);
        })
        .catch((error) => {
          setLoading(false);
          toast.show(`Error fetching forecasts: ${error}`, {
            type: "danger",
          });
        });
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

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="5-day Weather Forecast"
        navigation={navigation}
        hasBackBtn
        containerStyles={{ height: 40 }}
      />
      <View style={styles.cityContainer}>
        {weatherForecastInfo && (
          <Text style={styles.cityName}>
            {weatherForecastInfo?.city.name},{" "}
            {weatherForecastInfo?.city.country}
          </Text>
        )}
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
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Text style={styles.emptyTxt}>No data</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Forecast;
