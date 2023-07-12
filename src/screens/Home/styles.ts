import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111d3b",
      paddingHorizontal: 24,
    },
    safeArea: {
      backgroundColor: "#111d3b",
      flex: 1,
    },
    date: {
      color: "#7b8daf",
      fontSize: 14,
      fontFamily: "Outfit-Medium",
      marginTop: 16,
    },
    location: {
      color: "#ffffff",
      fontSize: 17,
      fontFamily: "Outfit-Medium",
      // marginTop: 16,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
    },
    statsImage: {
      height: 50,
      width: 50
    }
  });
};
