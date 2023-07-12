import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111d3b",
      paddingHorizontal: 24,
      justifyContent: "center",
    },
    stats: {
      backgroundColor: "#1e2b47",
      borderRadius: 20,
      padding: 15,
      justifyContent: "space-between",
    },
    statsHeader: {
      flexDirection: "row",
    },
    statsIcon: {
      width: 20,
      height: 20,
    },
    statsHeaderText: {
      color: "#b0bad3",
      fontSize: 15,
      fontFamily: "Outfit-Medium",
      marginLeft: 5,
    },
    statsText: {
      color: "#ffffff",
      fontSize: 32,
      marginTop: 7,
      fontWeight: "400",
    },
    statsSubtext: {
      color: "#ffffff",
      fontWeight: "400",
      fontSize: 18,
      marginBottom: 4,
    },
    statsDescription: {
      color: "#ffffff",
      fontSize: 13,
      fontFamily: "Outfit-Medium",
    },
  });
};
