import {StyleSheet} from "react-native";
import {COLORS} from "./theme";

const settingStyles = StyleSheet.create({
  colorBlock: {
    width: 80,
    marginLeft: 12,
  },
  whiteText: {
    textAlign: "center",
    color: "white",
  },
  settingInput: {
    borderColor: COLORS.IGNORE_COLOR,
    borderStyle: "solid",
    borderLeftWidth: 1,
    margin: 8,
  },
  colorLink: {
    color: COLORS.INFO,
  },
  banner: {width: 300, height: 100, alignSelf: "center"},
});

export default settingStyles;
