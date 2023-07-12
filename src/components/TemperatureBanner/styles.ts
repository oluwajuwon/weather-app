import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 20,
    },
    weatherimage: {
      height: 150,
      width: 150,
    },
    weatherImageSmall: {
      height: 50,
      width: 50,
    },
    content: {},
    temp: {
      fontSize: 65,
      fontFamily: "Outfit-Bold",
      color: "#b0bad3",
    },
    tempSmall: {
      fontSize: 28,
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
    descriptionSmall: {
      fontSize: 12,
    },
  });
};
