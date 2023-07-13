import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111d3b",
      paddingHorizontal: 24,
      justifyContent: "center",
    },
    safeArea: {
      backgroundColor: "#111d3b",
      flex: 1,
    },
    locationsList: {
      paddingHorizontal: 24,
      marginTop: 10,
    },
    emptyView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 60,
    },
    emptyTxt: {
      color: "#ffffff",
      fontSize: 16,
      fontFamily: "Outfit-Bold",
    },
  });
};
