import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WordMenu from "./menu";
import WordCatalog from "./catalog";
import TuneWords from "./tuneWords";

const Stack = createNativeStackNavigator();

function Word(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Menu" component={WordMenu} />
      <Stack.Screen name="WordCatalog" component={WordCatalog} />
      <Stack.Screen name="TuneWords" component={TuneWords} />
    </Stack.Navigator>
  );
}
export default Word;
