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
  colorInput: {
    width: 80,
    height: 30,
    borderWidth: 1,
    padding: 1,
    marginTop: 8,
    marginRight: 8,
  },
});

export default settingStyles;
