import {StyleProp, StyleSheet} from "react-native";
import COLORS from "./theme";

const WFull: StyleProp<any> = {
  width: "100%",
};

const Title: StyleProp<any> = {
  fontSize: 24,
  color: COLORS.PRIMARY_COLOR,
  alignSelf: "center",
};

const catalogStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textItem: {
    width: 140,
    marginTop: 8,
    color: COLORS.SIDE_COLOR,
  },
  noteText: {fontSize: 12, color: COLORS.IGNORE_COLOR},
});

const formatStyles = StyleSheet.create({
  container: {
    width: "80%",
    marginLeft: "10%",
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  inline: {
    display: "flex",
    flexDirection: "row",
  },
  line: {
    marginTop: 8,
  },
  // TODO: 显示存在bug，部分词不知道什么原因会显示不全（最后一行的字体高度缺失），故用此属性抵抗此bug
  antiLine: {
    marginTop: 8,
    marginBottom: 16,
  },
});

export {WFull, catalogStyles, Title, formatStyles};
