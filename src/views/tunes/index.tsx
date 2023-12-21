import React from "react";
import Catalog from "./catalog";
import Tune from "./tune";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FillPoem from "./fillPoem";

const Stack = createNativeStackNavigator();

function Tunes(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Catalog">
        <Stack.Screen name="Catalog" component={Catalog} />
        <Stack.Screen name="Tune" component={Tune} />
        <Stack.Screen name="FillPoem" component={FillPoem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Tunes;
