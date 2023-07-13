import React, { useEffect, useState } from "react";
import { GeoPosition } from "react-native-geolocation-service";
import {
  AppContextType,
  Coords,
  CurrentWeather,
  SavedUserLocation,
} from "../types";
import { getDataFromMemory, storeDataInMemory } from "../utils";

export const AppContext = React.createContext<AppContextType>({
  userLocation: {
    lat: 0,
    lon: 0,
  },
  savedLocations: [],
  handleUpdateUserLocation(position) {},
  handleAddtoUserLocations(location) {},
  handleRemoveUserLocation(location) {},
});

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [userLocation, setUserLocation] = useState<Coords>({
    lat: 0,
    lon: 0,
  });
  const [savedLocations, setSavedLocations] = useState<SavedUserLocation[]>([]);

  const getUserLocations = async () => {
    const locationListString = await getDataFromMemory("userLocations");
    if (locationListString) {
      const locationList: SavedUserLocation[] = JSON.parse(locationListString);
      setSavedLocations(locationList);
    }
  };

  useEffect(() => {
    getUserLocations();
  }, []);

  const handleUpdateUserLocation = (location: Coords) => {
    setUserLocation(location);
  };

  const handleAddtoUserLocations = async (location: CurrentWeather) => {
    const toSavelocation = {
      ...location?.coord,
      name: location?.name,
      country: location?.sys?.country,
      id: location?.sys?.id,
    };

    if (savedLocations.length === 0 && location) {
      setSavedLocations([toSavelocation]);
      await storeDataInMemory("userLocations", [toSavelocation]);
    }

    if (location && savedLocations.length > 0) {
      const locations = [...Array.from(savedLocations)];
      locations.push(toSavelocation);
      setSavedLocations(locations);
      await storeDataInMemory("userLocations", locations);
    }
  };

  const handleRemoveUserLocation = async (location: CurrentWeather) => {
    if (location && savedLocations.length !== 0) {
      const filteredLocations = [...Array.from(savedLocations)].filter(
        (item: SavedUserLocation) => item.id !== location?.sys.id
      );

      setSavedLocations(filteredLocations);
      await storeDataInMemory("userLocations", filteredLocations);
    }
  };
  return (
    <AppContext.Provider
      value={{
        userLocation,
        savedLocations,
        handleUpdateUserLocation,
        handleAddtoUserLocations,
        handleRemoveUserLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useApp() {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error(`useApp must be used within a AppProvider`);
  }
  return context;
}

export { AppProvider, useApp };
