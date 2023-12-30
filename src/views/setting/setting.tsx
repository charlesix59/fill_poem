import {Provider} from "@ant-design/react-native";
import React from "react";
import {ScrollView} from "react-native";
import Appearance from "./appearance";
import System from "./system";
import Common from "./common";

function Setting({navigation}: any): React.JSX.Element {
  return (
    <Provider>
      <ScrollView>
        <Appearance />
        <System />
        <Common navigation={navigation} />
      </ScrollView>
    </Provider>
  );
}

export default Setting;
