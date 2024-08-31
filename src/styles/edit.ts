import {StyleSheet} from "react-native";
import {COLORS} from "./theme";
import {inline} from ".";
import fillPoemStyle from "./filePoem";

const editStyle = StyleSheet.create({
  bottonLine: {
    marginTop: 8,
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
  mt12: {marginTop: 12},
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
    marginTop: 12,
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
  // 草稿箱预览操作容器
  opratorContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  // 草稿箱预览操作文字
  opratorText: {
    marginVertical: 16,
    color: "#6688ff",
    textDecorationLine: "underline",
    width: 48,
  },
  // 预览页编辑按钮
  editButton: {
    backgroundColor: "#66cdaa",
    borderColor: "#0dbf8c",
    ...fillPoemStyle.submitBtn,
  },
});

export default editStyle;
