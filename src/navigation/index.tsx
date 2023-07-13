import React, { useRef, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Welcome from "../screens/Welcome";
import Forecast from "../screens/Forecast";
import MyLocations from "../screens/MyLocations";

const Stack = createNativeStackNavigator();

export const NavContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Welcome"}
      >
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Forecast" component={Forecast} />
          <Stack.Screen name="MyLocations" component={MyLocations} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
