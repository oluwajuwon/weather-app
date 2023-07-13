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
  });
};
