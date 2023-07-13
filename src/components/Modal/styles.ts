import { StyleSheet, Dimensions } from "react-native";

export default () => {
  const screen = Dimensions.get("window");

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111d3b",
    },
    bottomContainerStyle: {
      borderRadius: 30,
      width: "100%",
      marginBottom: 24,
      maxHeight: screen.height - 100,
      alignSelf: "flex-end",
    },
    bottomFullContainerStyle: {
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      width: "100%",
      // paddingTop: 0,
      maxHeight: screen.height - 100,
      alignSelf: "flex-end",
    },
    middleContainerStyle: {
      borderRadius: 32,
      marginHorizontal: 24,
    },
    boxContainer: {
      margin: 0,
      backgroundColor: "#111d3b",
    },
    boxHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
    },
    boxHeaderText: {
      color: "#ffffff",
      fontSize: 20,
      fontFamily: "Outfit-Bold",
    },
  });
};
