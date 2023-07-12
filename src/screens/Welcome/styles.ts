import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");
export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111d3b",
      paddingHorizontal: 30,
      justifyContent: "center",
    },
    safeArea: {
      backgroundColor: "#111d3b",
      flex: 1,
    },
    welcomeImage: {
      height: width + 40,
      width: width - 60,
      borderRadius: 40,
    },
    title: {
      color: "#b0bad3",
      fontSize: 36,
      fontWeight: "600",
      fontFamily: "Outfit-Bold",
      marginTop: 16,
    },
    subtitle: {
      color: "#fff",
      fontFamily: "Outfit-Regular",
      fontSize: 14,
      marginTop: 10,
      lineHeight: 28,
    },
    nextBtn: {
      backgroundColor: "#b0bad3",
      height: 45,
      width: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 40,
      alignSelf: "flex-end",
      marginTop: 15,
    },
    nextImg: {
      width: 30,
      height: 30,
    },
  });
};
