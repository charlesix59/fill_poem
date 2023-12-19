import {View} from '@ant-design/react-native';
import {Text, TextInput} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import fillPoemStyle from '../styles/filePoem';
import {CheckInputCommand} from '../types/command';
import {verifyCharIsChinese} from '../utils/comman';
import {StrContext} from '../views/tunes/fillPoem';

type propsType = {
  tune: string;
  rhythm?: string;
  setCommand: Dispatch<SetStateAction<CheckInputCommand | undefined>>;
  index: number;
  focus: boolean;
  value?: string;
};

function InputCheck({
  tune,
  rhythm,
  setCommand,
  index,
  focus,
}: propsType): React.JSX.Element {
  const [char, setChar] = useState('');
  const inputRef = useRef<any>();
  const value = useContext(StrContext);
  /** 真正处理逻辑 */
  const setInputValue = useCallback(
    (str: string) => {
      if (str && !verifyCharIsChinese(str)) {
        return;
      }
      let displayChar = str.substring(0, 1);
      let commandStr = str.substring(1);
      setChar(displayChar);
      // 发送命令
      const command: CheckInputCommand = {
        name: 'input',
        value: commandStr,
        callarIndex: index,
      };
      setCommand(command);
    },
    [index, setCommand],
  );
  /** 自动移动字符 */
  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
      inputRef.current.setNativeProps({selection: {start: 1, end: 1}});
      if (value) {
        setInputValue(value);
      }
    }
  }, [focus, setInputValue, value]);
  /** 处理输入 */
  const TextInputHandler = (inputChar: string) => {
    setInputValue(inputChar);
  };
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
        onChange={e => {
          TextInputHandler(e.nativeEvent.text);
        }}
        ref={inputRef}
      />
    </View>
  );
}

export default InputCheck;
