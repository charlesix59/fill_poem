import {ActivityIndicator, View} from "@ant-design/react-native";
import React from "react";
import {HVCenter} from "../styles";

function Loading(): React.JSX.Element {
  return (
    <View style={HVCenter}>
      <ActivityIndicator size="large" text="加载中请稍后..." />
    </View>
  );
}

export default Loading;
