import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WordMenu from "./menu";
import WordCatalog from "./catalog";
import TuneWords from "./tuneWords";
import WordSearch from "./search";

const Stack = createNativeStackNavigator();

function Word(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen
        name="Menu"
        component={WordMenu}
        options={{title: "字典"}}
      />
      <Stack.Screen
        name="WordCatalog"
        component={WordCatalog}
        options={{title: "字典索引"}}
      />
      <Stack.Screen
        name="TuneWords"
        component={TuneWords}
        options={{title: "字典"}}
      />
      <Stack.Screen
        name="WordSearch"
        component={WordSearch}
        options={{title: "搜索"}}
      />
    </Stack.Navigator>
  );
}
export default Word;
