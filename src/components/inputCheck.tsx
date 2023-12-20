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
import {checkTune} from '../api/check';

const str2styleName = {
  success: fillPoemStyle.successInput,
  error: fillPoemStyle.errorInput,
  info: fillPoemStyle.infoInput,
};

type propsType = {
  tune: string;
  rhythm?: string;
  setCommand: Dispatch<SetStateAction<CheckInputCommand | undefined>>;
  index: number;
  focus: boolean;
  value?: string;
};

// TODO: 那天把那个input框和这个组件再解耦一下
function InputCheck({
  tune,
  rhythm,
  setCommand,
  index,
  focus,
}: propsType): React.JSX.Element {
  const [char, setChar] = useState('');
  const [TuneStyle, setTuneStyle] = useState(fillPoemStyle.textInput);
  const inputRef = useRef<any>();
  const value = useContext(StrContext);
  const check = useCallback(async () => {
    // TODO: 处理韵律，通过Command模式发送命令到上层然后上层通过参数传递
    // if (rhythm) {
    //   if (!firstRhyme) {
    //     setFirstRhyme(char);
    //   }
    //   checkRhyme(char, firstRhyme);
    // }
    if (!char) {
      setTuneStyle(fillPoemStyle.textInput);
      return;
    }
    const res = await checkTune(char, tune);
    setTuneStyle((str2styleName as any)[res]);
  }, [char, tune]);
  /** 真正处理输入的逻辑 */
  const setInputValue = useCallback(
    (str: string) => {
      if (!str) {
        setChar('');
        return;
      }
      if (!verifyCharIsChinese(str)) {
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
  /** 监听char变化 */
  useEffect(() => {
    check();
  }, [char, check]);
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
  /** 监听键盘事件，处理退格事件 */
  const backSpaceHandler = (keyName: string) => {
    if (keyName === 'Backspace' && !char) {
      setBackCommand();
    }
  };
  /** 发送退格命令 */
  const setBackCommand = () => {
    const command: CheckInputCommand = {
      name: 'back',
      callarIndex: index,
    };
    setCommand(command);
  };
  if (rhythm) {
    return (
      <View style={fillPoemStyle.inline}>
        <View style={fillPoemStyle.centerContainer}>
          <Text>{tune}</Text>
          <TextInput
            style={TuneStyle}
            value={char}
            onChange={e => {
              TextInputHandler(e.nativeEvent.text);
            }}
            onKeyPress={e => {
              backSpaceHandler(e.nativeEvent.key);
            }}
            ref={inputRef}
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
        style={TuneStyle}
        value={char}
        onChange={e => {
          TextInputHandler(e.nativeEvent.text);
        }}
        onKeyPress={e => {
          backSpaceHandler(e.nativeEvent.key);
        }}
        ref={inputRef}
      />
    </View>
  );
}

export default InputCheck;
