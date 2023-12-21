import {StyleSheet} from "react-native";
import COLORS from "./theme";

const editStyle = StyleSheet.create({
  bottonLine: {
    marginBottom: 8,
  },
  lineInput: {
    width: "100%",
    borderColor: COLORS.IGNORE_COLOR,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 3,
    margin: 20,
  },
  alignLeft: {alignSelf: "flex-start"},
});

export default editStyle;
