import {StyleSheet} from "react-native";
import {COLORS} from "./theme";

const baseStyle = StyleSheet.create({
  input: {
    width: 30,
    height: 30,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 3,
    padding: 2,
    textAlign: "center",
  },
});

const fillPoemStyle = StyleSheet.create({
  container: {
    width: "100%",
  },
  inlineContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  centerContainer: {
    alignItems: "center",
  },
  textInput: {
    ...baseStyle.input,
    borderColor: COLORS.IGNORE_COLOR,
  },
  successInput: {
    ...baseStyle.input,
    borderColor: COLORS.SUCCESS,
  },
  errorInput: {
    ...baseStyle.input,
    borderColor: COLORS.ERROR,
  },
  infoInput: {
    ...baseStyle.input,
    borderColor: COLORS.INFO,
  },
  inline: {
    flexDirection: "row",
  },
  submitBtn: {marginTop: 24, width: 150, alignSelf: "center"},
});

export default fillPoemStyle;
