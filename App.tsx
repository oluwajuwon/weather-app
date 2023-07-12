/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { NavContainer } from "./src/navigation";
import { AppProvider } from "./src/context/app-context";

function App(): JSX.Element {
  return (
    <AppProvider>
      <NavContainer />
    </AppProvider>
  );
}
export default App;
