import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import getStyles from "./styles";

type ErrorScreenProps = {
  errorMsg: string;
  hasBtn: boolean;
  btnText: string;
  handleBtnClick: () => void;
};
const ErrorScreen = ({
  errorMsg,
  hasBtn,
  btnText,
  handleBtnClick,
  ...props
}: ErrorScreenProps) => {
  const styles = getStyles();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.errorTxt}>{errorMsg}</Text>
        {hasBtn && (
          <TouchableOpacity onPress={handleBtnClick} style={styles.btn}>
            <Text style={styles.errorTxt}>{btnText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ErrorScreen;
