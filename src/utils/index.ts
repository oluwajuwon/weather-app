import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";
dayjs.extend(calendar);

export const isDayTime = (date: number | Date) => {
  const hours = new Date(date).getHours();
  const isDayTime = hours > 6 && hours < 20;

  return isDayTime;
};

export const convertMetersToMiles = (meters: number) => {
  const miles = meters / 1609.34;
  return Number(miles).toFixed(2);
};

export const generateVisitbilityDesc = (meters: number) => {
  if (meters < 1000) {
    return `It's not very clear`;
  }
  if (meters >= 1000 && meters < 6000) {
    return `It's fairly clear`;
  }
  if (meters >= 6000) {
    return `It's perfectly clear`;
  }
  return `It's visible enough`;
};

export const getVisibilityInfo = (meters: number) => {
  const visibility = convertMetersToMiles(meters);
  const description = generateVisitbilityDesc(meters);

  return { visibility, description };
};

export const generateFeelsLikeDesc = (
  temperature: number,
  timestamp: number
) => {
  const hours = new Date(timestamp * 1000).getHours();
  if (temperature < 11) {
    return `It's kinda chilly`;
  }
  if (temperature >= 11 && temperature < 15 && hours < 6) {
    return `Pretty chill night`;
  }
  if (temperature >= 11 && temperature < 15) {
    return `It's getting warmer`;
  }
  if (temperature >= 21) {
    return `Phew it's warm`;
  }
  return `It's feels perfect`;
};

export const getTimeFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const getSunriseandSunsetTime = (
  sunriseTime: number,
  sunsetTime: number
) => {
  const sunrise = getTimeFromTimestamp(sunriseTime);
  const sunset = getTimeFromTimestamp(sunsetTime);

  return { sunrise, sunset };
};

export const convertToDateSections = (arr: any[]) => {
  const dateObject = () => {
    let dates = {};

    for (let i = 0; i < arr.length; i++) {
      dates = {
        ...dates,
        [`${arr[i].dt_txt.split(" ")[0]}`]: `${arr[i].dt_txt.split(" ")[0]}`,
      };
    }

    return dates;
  };

  const sortDates = (a: Date | string, b: Date | string) => {
    const lateDate = new Date(b).getTime();
    const earlierDate = new Date(a).getTime();
    return earlierDate - lateDate;
  };

  const sectionalizedData = Object.keys(dateObject())
    .sort(sortDates)
    .map((item) => ({
      date: item,
      data: [...arr].filter((obj) => obj.dt_txt.split(" ")[0] === item),
    }));

  return sectionalizedData;
};

export const getDatePeriodWithoutTime = (date: string) => {
  return dayjs(date).calendar(null, {
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "dddd",
    sameElse: "DD-MM-YYYY",
  });
};

export const storeDataInMemory = async (key: string, value: any) => {
  try {
    if (typeof value === "object") {
      const jsonValue = JSON.stringify(value);
      return await AsyncStorage.setItem(key, jsonValue);
    }
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getDataFromMemory = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log(value);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const removeDataFromMemory = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
};
