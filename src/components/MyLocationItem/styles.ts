import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#1e2b47",
      borderRadius: 20,
      marginBottom: 20,
      paddingVertical: 25,
      paddingHorizontal: 10,
      position: "relative",
    },
    boxContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    timestamp: {
      color: "#ffffff",
    },
    cityName: {
      color: "#ffffff",
      fontWeight: "700",
      fontSize: 14,
    },
    temp: {
      color: "#b0bad3",
      fontWeight: "700",
      fontSize: 12,
    },
    minmaxTemp: {
      paddingLeft: 15,
      width: "45%",
    },
    bannerContainer: {
      marginTop: 0,
      justifyContent: "flex-start",
      paddingLeft: 10,
      width: "55%",
    },
    delete: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    deleteImg: {
      height: 20,
      width: 20,
    },
  });
};
