import axios from "axios";

const API_KEY = "bfe03cbadacd8f0df903cd22c25403ea";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetChCurrentLocationWeather = async (options: {
  lat: number;
  lon: number;
}) => {
  const { lat, lon } = options;
  //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const currentWeather = response.data;

    return currentWeather;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCityWeather = (city: string) => {
  try {
    let cityWeather;
    fetch(`${BASE_URL}/weather?q=${city}&APPID=${API_KEY}`);
  } catch (error) {}
};

export const fetchWeatherForecast = async (options: {
  lat: number;
  lon: number;
}) => {
  const { lat, lon } = options;

  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const currentWeather = response.data;

    return currentWeather;
  } catch (error) {}
};
