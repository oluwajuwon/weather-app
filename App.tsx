/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { StatusBar } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { NavContainer } from "./src/navigation";
import { AppProvider } from "./src/context/app-context";

function App(): JSX.Element {
  return (
    <ToastProvider
      placement="top"
      animationType="slide-in"
      animationDuration={250}
      successColor="green"
      dangerColor="red"
      warningColor="orange"
      normalColor="gray"
    >
      <AppProvider>
        <StatusBar barStyle="light-content" />
        <NavContainer />
      </AppProvider>
    </ToastProvider>
  );
}
export default App;
