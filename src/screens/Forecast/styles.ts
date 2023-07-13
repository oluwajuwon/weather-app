import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    safeArea: {
      backgroundColor: "#111d3b",
      flex: 1,
    },
    cityContainer: {
      backgroundColor: "#111d3b",
      paddingHorizontal: 24,
      paddingTop: 10,
    },
    cityName: {
      color: "#ffffff",
      fontSize: 25,
      fontFamily: "Outfit-Bold",
      textAlign: "center",
    },
    forecastList: {
      paddingHorizontal: 24,
    },
    dateHeader: {
      color: "#7b8daf",
      fontSize: 15,
      fontFamily: "Outfit-Medium",
      paddingVertical: 5,
      backgroundColor: "#111d3b",
    },
  });
};
