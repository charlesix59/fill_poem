import {Button, View} from "@ant-design/react-native";
import React, {ReactNode} from "react";
import editStyle from "../styles/edit";
import {GestureResponderEvent} from "react-native";
import COLORS from "../styles/theme";

type propsType = {
  onPress?: (event: GestureResponderEvent) => void;
  children: ReactNode | string;
};

function ButtonItem({onPress, children}: propsType): React.JSX.Element {
  return (
    <Button onPress={onPress} style={editStyle.bottonLine}>
      <View style={{color: COLORS.SIDE_COLOR}}>{children}</View>
    </Button>
  );
}

export default ButtonItem;
