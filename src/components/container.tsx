import {View} from "@ant-design/react-native";
import React from "react";
import {ViewStyle} from "react-native";

function Container(props: {children: React.JSX.Element}): React.JSX.Element {
  const containerStyle: ViewStyle = {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 12,
    paddingRight: 12,
  };
  return <View style={containerStyle}>{props.children}</View>;
}

export default Container;
