import React from "react";
import {ScrollView} from "react-native";
import Appearance from "./appearance";
import System from "./system";
import Common from "./common";

function Setting({navigation}: any): React.JSX.Element {
  return (
    <ScrollView>
      <Appearance />
      <System />
      <Common navigation={navigation} />
    </ScrollView>
  );
}

export default Setting;
