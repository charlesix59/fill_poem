import {StyleSheet} from "react-native";
import {COLORS} from "./theme";
import {inline} from ".";

const editStyle = StyleSheet.create({
  bottonLine: {
    marginBottom: 8,
    width: 200,
    color: COLORS.SIDE_COLOR,
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
  mb12: {marginBottom: 12},
  pd12: {padding: 12},
  w48: {width: 48},
  textAreaInput: {
    width: "100%",
    borderStyle: "solid",
    borderColor: COLORS.IGNORE_COLOR,
    borderWidth: 1,
    borderRadius: 5,
    margin: 24,
  },
  previewContainer: {
    marginLeft: "10%",
    width: "80%",
    backgroundColor: COLORS.BACKGROUND_COLOR,
    padding: 16,
  },
  previewBorder: {
    borderWidth: 1,
    borderStyle: "solid",
    padding: 16,
  },
  previewTitle: {
    alignSelf: "center",
    color: "#000",
    fontWeight: "bold",
    marginBottom: 8,
  },
  previewContent: {color: "#000", marginBottom: 8},
  inlineRight: {...inline, justifyContent: "flex-end"},
  ml16: {marginLeft: 16},
  appSignature: {
    alignSelf: "center",
    marginTop: 8,
  },
});

export default editStyle;
