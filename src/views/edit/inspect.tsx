import {Button, Icon, Modal, Text, View} from "@ant-design/react-native";
import React, {useContext, useState} from "react";
import Container from "../../components/container";
import {ScrollView, TextInput} from "react-native";
import editStyle from "../../styles/edit";
import {HCenter, Title, WFull, container, inline, mx8, my8} from "../../styles";
import {ColorsContext} from "../../../App";
import {verifyCi} from "../../utils/comman";
import {CheckedLetter} from "../../types/edit";
import StateIcon from "../../components/stateIcon";
import {COLORS} from "../../styles/theme";

const str2color = {
  success: COLORS.SUCCESS,
  info: COLORS.INFO,
  error: COLORS.ERROR,
};

function Inspect(): React.JSX.Element {
  const [inspectResult, setInspectResult] = useState<CheckedLetter[][]>();
  const colors = useContext(ColorsContext);
  const [inputName, setInputName] = useState("");
  const [inputText, setInputText] = useState("");
  const questionPressHandler = () => {
    Modal.alert(
      "关于词牌名",
      "目前只支持词律检查，诗律检查开发中\n作品内容请用【，】或【。】隔开",
      [{text: "明白啦"}],
      () => true,
    );
  };
  const verifyContent = async () => {
    const result = await verifyCi(inputName, inputText);
    const arr = [];
    let subArr = [];
    for (let item of result) {
      subArr.push(item);
      if (item.rhyme) {
        arr.push(subArr);
        subArr = [];
      }
    }
    setInspectResult(arr);
  };
  return (
    <Container>
      <ScrollView style={WFull}>
        <View style={container}>
          <View style={inline}>
            <Text style={editStyle.alignLeft}>输入词牌名</Text>
            <Icon
              name="question-circle"
              color={colors.SIDE_COLOR}
              onPress={() => {
                questionPressHandler();
              }}
            />
          </View>
          <TextInput
            style={editStyle.lineInput}
            placeholder="词牌名或诗体"
            onChange={e => setInputName(e.nativeEvent.text)}
          />
          <Text style={editStyle.alignLeft}>输入内容</Text>
          <TextInput
            multiline={true}
            textAlignVertical="top"
            numberOfLines={4}
            placeholder="请输入你的作品"
            style={editStyle.textAreaInput}
            onChange={e => setInputText(e.nativeEvent.text)}
          />
          <Button
            onPress={() => {
              verifyContent();
            }}>
            检查
          </Button>
          {inspectResult ? (
            <View>
              <Text style={Title}>检查结果</Text>
              {inspectResult.map((arr, index) => {
                return (
                  <View key={index} style={{...inline, ...HCenter, ...my8}}>
                    {arr.map((item, key) => {
                      if (item.rhymeMatch) {
                        return (
                          <View style={inline} key={`${index}-${key}`}>
                            <View style={mx8}>
                              <Text>{item.tune}</Text>
                              <Text
                                style={{
                                  color: (str2color as any)[item.match],
                                }}>
                                {item.letter}
                              </Text>
                            </View>
                            <View>
                              <StateIcon state={item.rhymeMatch} />
                            </View>
                          </View>
                        );
                      }
                      return (
                        <View key={`${index}-${key}`} style={mx8}>
                          <Text>{item.tune}</Text>
                          <Text style={{color: (str2color as any)[item.match]}}>
                            {item.letter}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}

export default Inspect;
