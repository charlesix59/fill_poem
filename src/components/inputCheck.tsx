import {View} from '@ant-design/react-native';
import {Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import fillPoemStyle from '../styles/filePoem';

type propsType = {
  tune: string;
  rhythm?: string;
};

function InputCheck({tune, rhythm}: propsType): React.JSX.Element {
  const [char, setChar] = useState('');
  if (rhythm) {
    return (
      <View style={fillPoemStyle.inline}>
        <View style={fillPoemStyle.centerContainer}>
          <Text>{tune}</Text>
          <TextInput
            style={fillPoemStyle.textInput}
            value={char}
            onTextInput={e => {
              console.log(e.nativeEvent);
            }}
          />
        </View>
        <Text style={fillPoemStyle.warp}>{rhythm}</Text>
      </View>
    );
  }
  return (
    <View style={fillPoemStyle.centerContainer}>
      <Text>{tune}</Text>
      <TextInput
        style={fillPoemStyle.textInput}
        value={char}
        onTextInput={e => {
          setChar(e.nativeEvent.text);
        }}
      />
    </View>
  );
}

export default InputCheck;
