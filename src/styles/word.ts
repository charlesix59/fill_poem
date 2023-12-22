import {StyleSheet} from "react-native";
import {catalogStyles} from "./index";

const wordStyles = StyleSheet.create({
  wordText: {
    ...catalogStyles.textItem,
    width: 24,
  },
});

export default wordStyles;
