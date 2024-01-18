import React from "react";
import Catalog from "./catalog";
import Tune from "./tune";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FillPoem from "./fillPoem";

const Stack = createNativeStackNavigator();

function Tunes(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Catalog">
      <Stack.Screen
        name="Catalog"
        component={Catalog}
        options={{title: "词谱"}}
      />
      <Stack.Screen name="Tune" component={Tune} options={{title: "词谱"}} />
      <Stack.Screen
        name="FillPoem"
        component={FillPoem}
        options={{title: "填词"}}
      />
    </Stack.Navigator>
  );
}
export default Tunes;
