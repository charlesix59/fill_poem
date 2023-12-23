import {Text, View} from "@ant-design/react-native";
import React from "react";
import {inline} from "../../../styles";
import settingStyles from "../../../styles/setting";

type PropsType = {
  colorHex: string;
  text: string;
};

function ColorPicker({colorHex, text}: PropsType): React.JSX.Element {
  return (
    <View style={inline}>
      <Text>{text}</Text>
      <View style={{...settingStyles.colorBlock, backgroundColor: colorHex}}>
        <Text style={settingStyles.whiteText}>{colorHex}</Text>
      </View>
    </View>
  );
}

export default ColorPicker;
