import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111d3b",
      paddingHorizontal: 24,
      justifyContent: "center",
    },
    weatherimage: {
      height: 150,
      width: 150,
    },
    tempDash: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 20,
    },
    temp: {
      fontSize: 65,
      fontFamily: "Outfit-Bold",
      color: "#b0bad3",
    },
    tempunit: {
      fontFamily: "Outfit-Bold",
      color: "#b0bad3",
      fontSize: 16,
    },
    description: {
      color: "#fff",
      fontFamily: "Outfit-Medium",
      fontSize: 16,
      textTransform: "capitalize",
    },
  });
};
