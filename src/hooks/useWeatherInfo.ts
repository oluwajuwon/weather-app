import { useState, useEffect } from "react";
import {
  generateFeelsLikeDesc,
  getSunriseandSunsetTime,
  getVisibilityInfo,
} from "../utils";
import { CurrentWeather } from "../types";
import { fetChCurrentLocationWeather } from "../api/weather";

export const useWeatherInfo = (location: any) => {
  const [loading, setLoading] = useState(false);

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
