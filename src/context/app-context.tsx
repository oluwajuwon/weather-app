import React, { useEffect, useState } from "react";
import { GeoPosition } from "react-native-geolocation-service";
import { AppContextType, Coords } from "../types";

export const AppContext = React.createContext<AppContextType>({
  userLocation: {
    lat: 0,
    lon: 0,
  },
  savedLocations: [],
  handleUpdateUserLocation(position) {},
});

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [userLocation, setUserLocation] = useState<Coords>({
    lat: 0,
    lon: 0,
  });
  const [savedLocations, setSavedLocations] = useState<GeoPosition[]>([]);

  const handleUpdateUserLocation = (location: Coords) => {
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
