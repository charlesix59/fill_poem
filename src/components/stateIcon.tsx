import {Icon} from "@ant-design/react-native";
import React, {useContext} from "react";
import {ColorsContext} from "../../App";
import {ReturnType} from "../types/main";

function StateIcon({state}: {state: string}): React.JSX.Element {
  const COLORS = useContext(ColorsContext);
  if (state === ReturnType.ERROR) {
    return <Icon name="close-circle" size="md" color={COLORS.ERROR} />;
  } else if (state === ReturnType.INFO) {
    return <Icon name="info-circle" size="md" color={COLORS.INFO} />;
  } else if (state === ReturnType.SUCCESS) {
    return <Icon name="check-circle" size="md" color={COLORS.SUCCESS} />;
  }
  return <></>;
}

export default StateIcon;
