import React, { Fragment, useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import getStyles from "./styles";
import WedarModal, { ModalTypes } from "../Modal";
import { Coords, CurrentWeather } from "../../types";
import TemperatureBanner from "../TemperatureBanner";
import WeatherStats from "../WeatherStats";
import { firstenv, secondenv, thirdenv } from "../../utils";

type LocationSearchModalProps = {
  showSearchModal: boolean;
  onClose: () => void;
  handleSelectLocation: (coords: Coords) => void;
  boxHeader: string;
  searchedWeatherInfo?: CurrentWeather;
  saveLocation?: () => void;
  removeLocation?: () => void;
  isLocationSaved?: boolean;
};

const LocationSearchModal = ({
  showSearchModal,
  handleSelectLocation,
  onClose,
  boxHeader,
  searchedWeatherInfo,
  saveLocation,
  removeLocation,
  isLocationSaved,
  ...props
}: LocationSearchModalProps) => {
  const styles = getStyles();

  const handleLocationSelect = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    const lat = details?.geometry?.location.lat ?? 0;
    const lon = details?.geometry?.location.lng ?? 0;
    const coords = {
      lat,
      lon,
    };
    handleSelectLocation && handleSelectLocation(coords);
  };
  return (
    <WedarModal
      boxStyles={{
        container: {
          padding: 24,
          marginTop: 20,
          height: 500,
        },
      }}
      isVisible={showSearchModal}
      boxType={ModalTypes.BOTTOM_FULL}
      onClose={onClose}
      backdropOpacity={0.9}
      showCloseIcon
      allowScroll
      boxHeader={boxHeader}
    >
      <View style={styles.mapsContainer}>
        <GooglePlacesAutocomplete
          placeholder="Enter address or post code"
          onPress={handleLocationSelect}
          fetchDetails={true}
          query={{
            key: `${firstenv}${secondenv}${thirdenv}`,
            language: "en",
          }}
          textInputProps={{
            placeholderTextColor: "#7b8daf",
          }}
        />
      </View>
      {searchedWeatherInfo && (
        <View style={{ marginTop: 80 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.location}>
              {searchedWeatherInfo?.name}, {searchedWeatherInfo?.sys.country}
            </Text>
            {!isLocationSaved ? (
              <TouchableOpacity style={styles.btn} onPress={saveLocation}>
                <Text style={styles.saveTxt}>Save Location</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.btn, styles.btnRed]}
                onPress={removeLocation}
              >
                <Text style={styles.saveTxt}>Remove Location</Text>
              </TouchableOpacity>
            )}
          </View>
          <TemperatureBanner
            weather={searchedWeatherInfo?.weather}
            temperature={searchedWeatherInfo?.main}
            timeStamp={searchedWeatherInfo?.dt}
          />
          <WeatherStats
            wind={searchedWeatherInfo?.wind}
            temperature={searchedWeatherInfo?.main}
          />
        </View>
      )}
    </WedarModal>
  );
};

export default LocationSearchModal;
