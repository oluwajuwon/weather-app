import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#1e2b47",
      borderRadius: 20,
      marginBottom: 20,
      paddingVertical: 25,
      paddingHorizontal: 10,
    },
    boxContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    timestamp: {
      color: "#ffffff",
    },
    temp: {
      color: "#b0bad3",
      fontWeight: "700",
      fontSize: 13,
    },
    minmaxTemp: {
      paddingLeft: 15,
      width: "30%",
    },
    bannerContainer: {
      marginTop: 0,
      justifyContent: "flex-start",
      borderRightWidth: 1,
      paddingLeft: 10,
      borderRightColor: "#b0bad3",
      width: "70%",
    },
  });
};
