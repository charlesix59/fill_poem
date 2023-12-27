import {StyleProp, StyleSheet} from "react-native";
import {COLORS} from "./theme";

const WFull: StyleProp<any> = {
  width: "100%",
};

const Title: StyleProp<any> = {
  marginTop: 8,
  fontSize: 24,
  alignSelf: "center",
};

// 水平垂直居中
const HVCenter: StyleProp<any> = {
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
};

const HCenter: StyleProp<any> = {
  alignSelf: "center",
};

const mx8: StyleProp<any> = {
  marginHorizontal: 8,
};

const my8: StyleProp<any> = {
  marginVertical: 8,
};

// marginTop: 24
const mt24: StyleProp<any> = {
  marginTop: 24,
};

const inline: StyleProp<any> = {
  display: "flex",
  flexDirection: "row",
};

const pdy16: StyleProp<any> = {
  paddingVertical: 16,
};

const pdb8: StyleProp<any> = {
  paddingBottom: 8,
};

const pd8: StyleProp<any> = {
  padding: 8,
};

const colorBlack: StyleProp<any> = {
  color: "#000",
};

const catalogStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  textItem: {
    width: 140,
    marginTop: 8,
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
    flexWrap: "wrap",
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

export {
  WFull,
  catalogStyles,
  Title,
  formatStyles,
  HVCenter,
  mt24,
  inline,
  pdy16,
  pdb8,
  pd8,
  HCenter,
  mx8,
  my8,
  colorBlack,
};
