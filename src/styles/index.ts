import {StyleProp, StyleSheet} from 'react-native';

const WFull: StyleProp<any> = {
  width: '100%',
};

const Title: StyleProp<any> = {
  fontSize: 24,
  color: '#FFA07A',
};

const catalogStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textItem: {
    width: 140,
    marginTop: 8,
    color: '#1CA2E1',
  },
  noteText: {fontSize: 12, color: '#6A7174'},
});

export {WFull, catalogStyles, Title};
