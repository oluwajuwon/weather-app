import { useState, useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import GetLocation, {
  GeoError,
  GeoPosition,
} from "react-native-geolocation-service";

export const useLocation = () => {
  const [locationLoading, setLocationLoading] = useState(true);
  const [location, setLocation] = useState<GeoPosition>();

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    setLocationLoading(true);
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location",
          message: "SmartSpacial would like to use your location",
          buttonPositive: "Grant",
        }
      );
      if (!granted) {
        setLocationLoading(false);
        console.log("Location permission denied");
      }
      return getCurrentPosition();
    } else if (Platform.OS === "ios") {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
        if (result === "granted") {
          return getCurrentPosition();
        }
      });
    }
  };

  const handleLocationSuccess = (position: GeoPosition) => {
    setLocation(position);
    setLocationLoading(false);
  };

  const handleLocationError = (error: GeoError) => {
    console.log(error, "HHHH");
    setLocationLoading(false);
  };

  const getCurrentPosition = () => {

    try {
      GetLocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
        {
          enableHighAccuracy: true,
          timeout: 15000,
        }
      );
    } catch (e) {
      setLocationLoading(false);
      console.log("GeoLocation Error: ", e);
    }
  };

  return { locationLoading, location };
};
