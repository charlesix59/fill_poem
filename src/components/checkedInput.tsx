import {TextInput} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import fillPoemStyle from "../styles/filePoem";
import {CheckInputCommand} from "../types/command";
import {verifyCharIsChinese} from "../utils/comman";
import {StrContext} from "../views/tunes/fillPoem";
import {checkTune} from "../api/check";

const str2styleName = {
  success: fillPoemStyle.successInput,
  error: fillPoemStyle.errorInput,
  info: fillPoemStyle.infoInput,
};

type propsType = {
  tune: string;
  setCommand: Dispatch<SetStateAction<CheckInputCommand | undefined>>;
  index: number;
  focus: boolean;
  rhythm?: string;
  setRhymeChar?: Dispatch<SetStateAction<string>>;
};

function CheckedInput({
  tune,
  setCommand,
  index,
  focus,
  rhythm,
  setRhymeChar,
}: propsType): React.JSX.Element {
  const [char, setChar] = useState("");
  const [TuneStyle, setTuneStyle] = useState(fillPoemStyle.textInput);
  const inputRef = useRef<any>();
  const value = useContext(StrContext);
  const sendCommand = useCallback(
    (name: string, commandValue?: string, additionalValue?: string) => {
      const command: CheckInputCommand = {
        name: name,
        value: commandValue,
        callarIndex: index,
        additionalValue: additionalValue,
      };
      setCommand(command);
    },
    [index, setCommand],
  );
  /** 韵律检查 */
  const check = useCallback(async () => {
    if (rhythm && rhythm === "韵") {
      sendCommand("rhythm", char);
    }
    if (!char) {
      setTuneStyle(fillPoemStyle.textInput);
      return;
    }
    const res = await checkTune(char, tune);
    setTuneStyle((str2styleName as any)[res]);
  }, [char, rhythm, sendCommand, tune]);
  /** 真正处理输入的逻辑 */
  const setInputValue = useCallback(
    (str: string) => {
      if (!str) {
        setChar("");
        sendCommand("delete");
        return;
      }
      if (!verifyCharIsChinese(str)) {
        return;
      }
      let displayChar = str.substring(0, 1);
      let commandStr = str.substring(1);
      setChar(displayChar);
      // 发送命令
      sendCommand("input", commandStr, displayChar);
    },
    [sendCommand],
  );
  /** 监听char变化 */
  useEffect(() => {
    check();
    // 将char同步父组件检查韵脚（如果有）
    if (setRhymeChar) {
      setRhymeChar(char);
    }
  }, [char, check, setRhymeChar]);
  /** 自动移动字符 */
  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
      inputRef.current.setSelection(1, 1);
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
    if (keyName === "Backspace" && !char) {
      sendCommand("back");
    }
  };
  return (
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
  );
}

export default CheckedInput;
