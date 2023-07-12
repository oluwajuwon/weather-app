import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import getStyles from "./styles";

type StatsBoxProps = {
  headerTitle: any;
  headerImage: any;
  stat: any;
  statsSubtext?: any;
  description?: any;
  width: number;
  height: number;
  statsTextContainerStyles?: any;
  statsSubTestStyles?: any;
  footer?: any;
};

const StatsBox = ({
  headerTitle,
  headerImage,
  stat,
  statsSubtext,
  description,
  width,
  height,
  statsTextContainerStyles,
  statsSubTestStyles,
  footer,
  ...props
}: StatsBoxProps) => {
  const styles = getStyles();

  return (
    <View style={[styles.stats, { width, height }]}>
      <View>
        <View style={styles.statsHeader}>
          <Image source={headerImage} style={styles.statsIcon} />
          <Text style={styles.statsHeaderText}>{headerTitle}</Text>
        </View>
        <View style={[{ flexDirection: "row" }, statsTextContainerStyles]}>
          <Text style={styles.statsText}>{stat}</Text>
          {statsSubtext && (
            <Text style={[styles.statsSubtext, statsSubTestStyles]}>{statsSubtext}</Text>
          )}
        </View>
      </View>
      {description && (
        <Text style={styles.statsDescription}>{description}</Text>
      )}
      {footer && footer}
    </View>
  );
};

export default StatsBox;
