/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {SafeAreaView, useColorScheme} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";

import Layout from "./src/layout";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Layout />
    </SafeAreaView>
  );
}

export default App;
