import {View} from '@ant-design/react-native';
import {Text, TextInput} from 'react-native';
import React from 'react';
import fillPoemStyle from '../styles/filePoem';

type propsType = {
  tune: string;
  rhythm?: string;
};

function InputCheck({tune, rhythm}: propsType): React.JSX.Element {
  if (rhythm) {
    return (
      <View style={fillPoemStyle.inline}>
        <View style={fillPoemStyle.centerContainer}>
          <Text>{tune}</Text>
          <TextInput style={fillPoemStyle.textInput} />
        </View>
        <Text style={fillPoemStyle.warp}>{rhythm}</Text>
      </View>
    );
  }
  return (
    <View style={fillPoemStyle.centerContainer}>
      <Text>{tune}</Text>
      <TextInput style={fillPoemStyle.textInput} />
    </View>
  );
}

export default InputCheck;
