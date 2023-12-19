import {StyleSheet} from 'react-native';
import COLORS from './theme';

const fillPoemStyle = StyleSheet.create({
  container: {
    width: '100%',
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  centerContainer: {
    alignItems: 'center',
  },
  textInput: {
    width: 30,
    height: 30,
    borderStyle: 'solid',
    borderColor: COLORS.IGNORE_COLOR,
    borderWidth: 2,
    borderRadius: 3,
    padding: 2,
    textAlign: 'center',
  },
  inline: {
    flexDirection: 'row',
  },
  warp: {
    flexBasis: '50%',
    flexShrink: 0,
    textAlign: 'left',
  },
});

export default fillPoemStyle;
