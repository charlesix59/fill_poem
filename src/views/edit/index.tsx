import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import EditMenu from "./menu";
import Inspect from "./inspect";
import Darfts from "./drafts";
import Preview from "./preview";
import Custom from "./custom";
import FillPoem from "../tunes/fillPoem";

const Stack = createNativeStackNavigator();

function Edit(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Menu" component={EditMenu} />
      <Stack.Screen name="Inspect" component={Inspect} />
      <Stack.Screen name="Darfts" component={Darfts} />
      <Stack.Screen name="Preview" component={Preview} />
      <Stack.Screen name="Custom" component={Custom} />
      <Stack.Screen name="editPoem" component={FillPoem} />
    </Stack.Navigator>
  );
}
export default Edit;
