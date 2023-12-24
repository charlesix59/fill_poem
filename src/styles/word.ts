import {StyleSheet} from "react-native";
import {catalogStyles} from "./index";
import {COLORS} from "./theme";

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
  searchContainer: {
    flexDirection: "row",
    marginLeft: "10%",
    marginBottom: 8,
    width: "80%",
  },
  searchInput: {
    width: 48,
    flexGrow: 1,
    borderStyle: "solid",
    borderColor: COLORS.IGNORE_COLOR,
    borderWidth: 1,
  },
  searchBotton: {height: 50, borderRadius: 0},
});

export default wordStyles;
