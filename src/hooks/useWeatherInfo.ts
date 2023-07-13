import { useState, useEffect } from "react";
import {
  generateFeelsLikeDesc,
  getSunriseandSunsetTime,
  getVisibilityInfo,
} from "../utils";
import { CurrentWeather } from "../types";
import { fetchCurrentLocationWeather } from "../api/weather";

export const useWeatherInfo = (location: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | any>(false);

  const [currentWeatherInfo, setCurrentWeatherInfo] =
    useState<CurrentWeather | null>();

  const getWeatherInfo = async () => {
    try {
      if (location && Object.keys(location).length > 0) {
        setLoading(true);
        setError(false);
        await fetchCurrentLocationWeather({
          lat: location?.lat,
          lon: location?.lon,
        }).then((weatherinfo: any) => {
          setLoading(false);
          setCurrentWeatherInfo(weatherinfo);
        });
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, [location]);

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

  return {
    loading,
    error,
    location,
    sunrise,
    sunset,
    tempDesc,
    visibility,
    description,
    currentWeatherInfo,
    getWeatherInfo,
  };
};
