import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#111d3b",
      paddingHorizontal: 24,
      justifyContent: "center",
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
      zIndex: 1000,
    },
    rightContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    centerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    title: {
      fontSize: 18,
      color: "#ffffff",
      textAlign: "center",
      fontWeight: "700",
    },
  });
};
