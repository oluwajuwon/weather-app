import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111d3b",
      paddingHorizontal: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    safeArea: {
      backgroundColor: "#111d3b",
      flex: 1,
    },
    errorTxt: {
      color: "#ffffff",
      fontSize: 16,
      fontFamily: "Outfit-Bold",
    },
    btn: {
      backgroundColor: "#4795eb",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 30,
      position: "relative",
      marginTop: 10,
    },
  });
};
