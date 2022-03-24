import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./screens/RootStack";
import { LogContextProvider } from "./context/LogContext";
import "react-native-get-random-values";
import { SearchContextProvieder } from "./context/SearchContext";

function App() {
  return (
    <NavigationContainer>
      <SearchContextProvieder>
        <LogContextProvider>
          <RootStack />
        </LogContextProvider>
      </SearchContextProvieder>
    </NavigationContainer>
  );
}

export default App;
