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

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
};

export const getSunriseandSunsetTime = (
  sunriseTime: number,
  sunsetTime: number
) => {
  const sunrise = getTimeFromTimestamp(sunriseTime);
  const sunset = getTimeFromTimestamp(sunsetTime);

  return { sunrise, sunset };
};
