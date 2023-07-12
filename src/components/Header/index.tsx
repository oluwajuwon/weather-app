import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import getStyles from "./styles";
import Arrow from "../../assets/icons/left-arrow.png";

type HeaderProps = {
  title: string;
  rightContent?: any;
  titleStyles?: any;
  hasBackBtn: boolean;
  navigation: any;
  containerStyles?: any;
};

const Header = ({
  title,
  rightContent,
  titleStyles,
  hasBackBtn,
  navigation,
  containerStyles,
  ...props
}: HeaderProps) => {
  const styles = getStyles();

  const handleGoBack = () => {
    if (navigation && navigation.canGoBack()) navigation && navigation.goBack();
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.leftContainer}>
        {hasBackBtn && (
          <TouchableOpacity
            hitSlop={{ top: 30, right: 30, left: 30, bottom: 30 }}
            onPress={handleGoBack}
          >
            <Image source={Arrow} style={{ height: 18, width: 18 }} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerContainer}>
        {Boolean(title) && (
          <Text style={[styles.title, titleStyles]}>{title}</Text>
        )}
      </View>
      <View style={styles.rightContainer}>{rightContent}</View>
    </View>
  );
};

export default Header;
