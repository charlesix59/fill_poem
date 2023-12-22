import {StyleSheet} from "react-native";
import {catalogStyles} from "./index";
import COLORS from "./theme";

const wordStyles = StyleSheet.create({
  wordText: {
    ...catalogStyles.textItem,
    width: 24,
  },
  explainContainer: {
    backgroundColor: COLORS.BACKGROUND_COLOR,
    width: "90%",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: "5%",
    padding: 8,
  },
});

export default wordStyles;
