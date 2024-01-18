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
      <Stack.Screen
        name="Menu"
        component={EditMenu}
        options={{title: "创作"}}
      />
      <Stack.Screen
        name="Inspect"
        component={Inspect}
        options={{title: "韵律检查"}}
      />
      <Stack.Screen
        name="Darfts"
        component={Darfts}
        options={{title: "草稿箱"}}
      />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{title: "预览"}}
      />
      <Stack.Screen
        name="Custom"
        component={Custom}
        options={{title: "自定义格律"}}
      />
      <Stack.Screen
        name="editPoem"
        component={FillPoem}
        options={{title: "填词"}}
      />
    </Stack.Navigator>
  );
}
export default Edit;
