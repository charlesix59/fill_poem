import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WordMenu from "./menu";

const Stack = createNativeStackNavigator();

function Word(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Menu" component={WordMenu} />
    </Stack.Navigator>
  );
}
export default Word;
