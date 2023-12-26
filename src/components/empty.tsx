import {Icon, Text, View} from "@ant-design/react-native";
import React, {useContext} from "react";
import {HVCenter} from "../styles";
import {ColorsContext} from "../../App";
import {pdy16} from "../styles";

function Empty(): React.JSX.Element {
  const COLORS = useContext(ColorsContext);
  return (
    <View style={HVCenter}>
      <Icon size={50} color={COLORS.SIDE_COLOR} name="dropbox" />
      <Text style={pdy16}>这里空空如也</Text>
    </View>
  );
}

export default Empty;
