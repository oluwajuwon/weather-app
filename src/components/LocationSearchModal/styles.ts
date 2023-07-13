import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111d3b",
      paddingHorizontal: 24,
      justifyContent: "center",
    },
    location: {
      color: "#ffffff",
      fontSize: 18,
      fontFamily: "Outfit-Bold",
      marginTop: 10,
    },
    mapsContainer: {
      position: "absolute",
      top: 80,
      right: 0,
      left: 0,
      marginHorizontal: 24,
      zIndex: 1,
    },
    btn: {
      backgroundColor: "#4795eb",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 30,
      position: "relative",
    },
    btnRed: {
      backgroundColor: "#eb4757",
    },
    saveTxt: {
      color: "#ffffff",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "500",
    },
  });
};
