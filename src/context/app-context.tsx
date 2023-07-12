import React, { useEffect, useState } from "react";
import { GeoPosition } from "react-native-geolocation-service";
import { AppContextType } from "../types";

export const AppContext = React.createContext<AppContextType>({
  userLocation: {
    coords: {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      altitude: 0,
      heading: 0,
      speed: 0,
    },
    timestamp: 0,
  },
  savedLocations: [],
  handleUpdateUserLocation(position) {},
});

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [userLocation, setUserLocation] = useState<GeoPosition>({
    coords: {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      altitude: 0,
      heading: 0,
      speed: 0,
    },
    timestamp: 0,
  });
  const [savedLocations, setSavedLocations] = useState<GeoPosition[]>([]);

  const handleUpdateUserLocation = (location: GeoPosition) => {
    setUserLocation(location);
  };

  const handleUpdateSavedLocations = (location: GeoPosition) => {
    const newSavedLocations = savedLocations;
    setSavedLocations(newSavedLocations);
  };

  return (
    <AppContext.Provider
      value={{
        userLocation,
        savedLocations,
        handleUpdateUserLocation,
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
