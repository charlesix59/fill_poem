import {Icon, View} from "@ant-design/react-native";
import {Text} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import fillPoemStyle from "../styles/filePoem";
import {CheckInputCommand} from "../types/command";
import CheckedInput from "./checkedInput";
import {checkRhyme} from "../api/check";
import {ReturnType} from "../types/main";
import {ColorsContext} from "../../App";
import {mx8} from "../styles";

type propsType = {
  tune: string;
  rhythm?: string;
  setCommand: Dispatch<SetStateAction<CheckInputCommand | undefined>>;
  index: number;
  focus: boolean;
  value?: string;
  rhymeWord?: string;
};

// TODO: 优化一下样式，可以不用flex 的 space around
function InputCheck({
  tune,
  rhythm,
  setCommand,
  index,
  focus,
  rhymeWord,
}: propsType): React.JSX.Element {
  const [rhymeChar, setRhymeChar] = useState("");
  const [rhymeState, setRhtmeState] = useState("");
  useEffect(() => {
    if (!rhymeWord) {
      return;
    }
    async function check() {
      const state = await checkRhyme(rhymeChar, rhymeWord || "");
      setRhtmeState(state);
    }
    check();
  }, [rhymeChar, rhymeWord]);
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
        {rhythm === "韵" && rhymeChar ? (
          <StateIcon state={rhymeState} />
        ) : (
          <></>
        )}
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

function StateIcon({state}: {state: string}): React.JSX.Element {
  const COLORS = useContext(ColorsContext);
  if (state === ReturnType.ERROR) {
    return <Icon name="close-circle" size="md" color={COLORS.ERROR} />;
  } else if (state === ReturnType.INFO) {
    return <Icon name="info-circle" size="md" color={COLORS.INFO} />;
  } else if (state === ReturnType.SUCCESS) {
    return <Icon name="check-circle" size="md" color={COLORS.SUCCESS} />;
  }
  return <></>;
}

export default InputCheck;
