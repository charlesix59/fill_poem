import {View} from "@ant-design/react-native";
import {Text} from "react-native";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import fillPoemStyle from "../styles/filePoem";
import {CheckInputCommand} from "../types/command";
import CheckedInput from "./checkedInput";
import {checkRhyme} from "../api/check";
import {mx8} from "../styles";
import StateIcon from "./stateIcon";
import {isRhythmWord} from "../utils/comman";

type propsType = {
  tune: string;
  rhythm?: string;
  setCommand: Dispatch<SetStateAction<CheckInputCommand | undefined>>;
  index: number;
  focus: boolean;
  value?: string;
  rhymeWord?: string;
};

function InputCheck({
  tune,
  rhythm,
  setCommand,
  index,
  focus,
  rhymeWord,
}: propsType): React.JSX.Element {
  const [rhymeChar, setRhymeChar] = useState(""); // 用于向上传输的韵字
  const [rhymeState, setRhtmeState] = useState("");
  /** 如果是韵并且存在韵则检查韵 */
  useEffect(() => {
    if (!rhymeWord || !isRhythmWord(rhythm) || !rhymeChar) {
      return;
    }
    async function check() {
      const state = await checkRhyme(rhymeChar, rhymeWord || "");
      setRhtmeState(state);
    }
    check();
  }, [rhymeChar, rhymeWord, rhythm]);
  if (rhythm) {
    return (
      <View style={fillPoemStyle.inline}>
        <View style={fillPoemStyle.centerContainer}>
          <Text>{tune}</Text>
          <CheckedInput
            tune={tune}
            setCommand={setCommand}
            index={index}
            focus={focus}
            rhythm={rhythm}
            setRhymeChar={setRhymeChar}
          />
        </View>
        <Text style={mx8}>{rhythm}</Text>
        {rhymeState ? <StateIcon state={rhymeState} /> : <></>}
      </View>
    );
  }
  return (
    <View style={fillPoemStyle.centerContainer}>
      <Text>{tune}</Text>
      <CheckedInput
        tune={tune}
        setCommand={setCommand}
        index={index}
        focus={focus}
      />
    </View>
  );
}

export default InputCheck;
