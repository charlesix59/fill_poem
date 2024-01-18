import React from "react";
import Setting from "./setting";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import About from "./about";

const Stack = createNativeStackNavigator();

function SettingWarp(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Setting">
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{title: "设置"}}
      />
      <Stack.Screen name="About" component={About} options={{title: "关于"}} />
    </Stack.Navigator>
  );
}
export default SettingWarp;
