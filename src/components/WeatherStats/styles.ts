import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#1e2b47",
      justifyContent: "center",
      borderRadius: 20,
      flexDirection: "row",
      marginTop: 10,
      paddingVertical: 20,
      // borderWidth: 1,
      // borderColor: "#2a395e",
    },
    statBox: {
      alignItems: "center",
      borderRightWidth: 2,
      borderRightColor: "#111d3b",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    statsHeader: {
      color: "#ffffff",
      fontSize: 17,
      fontWeight: "600",
      fontFamily: "Outfit-Bold",
      marginBottom: 5,
    },
    stat: {
      color: "#b0bad3",
      fontSize: 13,
      fontWeight: "600",
    },
  });
};
