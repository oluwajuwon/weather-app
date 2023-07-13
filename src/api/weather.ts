import axios from "axios";
import { CurrentWeather, ForecastWeather, SavedUserLocation } from "../types";

const API_KEY = "bfe03cbadacd8f0df903cd22c25403ea";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentLocationWeather = async (options: {
  lat: number;
  lon: number;
}) => {
  const { lat, lon } = options;

  return new Promise<CurrentWeather>((resolve, reject) => {
    axios
      .get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(`${error}`);
      });
  });
};

export const fetchCityWeather = async (city: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/weather?q=${city}&APPID=${API_KEY}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(`${error}`);
      });
  });
};

export const fetchWeatherForecast = async (options: {
  lat: number;
  lon: number;
}) => {
  const { lat, lon } = options;

  return new Promise<ForecastWeather>((resolve, reject) => {
    axios
      .get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(`${error}`);
      });
  });
};

export const fetchMultipleLocationsData = async (
  locations: SavedUserLocation[]
) => {
  try {
    const locationDetails = await Promise.allSettled(
      locations.map(async (item) => {
        const details = await fetchCurrentLocationWeather({
          lat: item.lat,
          lon: item.lon,
        });
        return Object.assign({}, details);
      })
    );

    const fulfilledLocationData = extractFulfilledPromiseData(locationDetails);

    return fulfilledLocationData;
  } catch (error) {}
};

export const extractFulfilledPromiseData = (promiseArr: any[]) => {
  if (promiseArr && Array.isArray(promiseArr)) {
    const filteredPromiseArr = promiseArr
      .filter((item) => item.status === "fulfilled")
      .map((item) => item.value);

    return filteredPromiseArr;
  }
  return [];
};
