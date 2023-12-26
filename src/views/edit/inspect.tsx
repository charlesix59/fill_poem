import {
  Button,
  Icon,
  Modal,
  Provider,
  Text,
  View,
} from "@ant-design/react-native";
import React, {useContext, useState} from "react";
import Container from "../../components/container";
import {ScrollView, TextInput} from "react-native";
import editStyle from "../../styles/edit";
import {inline} from "../../styles";
import {ColorsContext} from "../../../App";

function Inspect(): React.JSX.Element {
  const [inspected, setInspected] = useState(false);
  const COLORS = useContext(ColorsContext);
  const questionPressHandler = () => {
    Modal.alert("关于词牌名", "目前只支持词律检查，诗律检查开发中", [
      {text: "明白啦"},
    ]);
  };
  return (
    <Provider>
      <Container>
        <View style={inline}>
          <Text style={editStyle.alignLeft}>输入词牌名</Text>
          <Icon
            name="question-circle"
            color={COLORS.SIDE_COLOR}
            onPress={() => {
              questionPressHandler();
            }}
          />
        </View>
        <TextInput style={editStyle.lineInput} placeholder="词牌名或诗体" />
        <Text style={editStyle.alignLeft}>输入内容</Text>
        <TextInput
          multiline={true}
          textAlignVertical="top"
          numberOfLines={4}
          placeholder="请输入你的作品"
          style={editStyle.textAreaInput}
        />
        <Button
          onPress={() => {
            setInspected(true);
          }}>
          检查
        </Button>
        {inspected ? (
          <ScrollView>
            <Text>检查结果</Text>
          </ScrollView>
        ) : (
          <></>
        )}
      </Container>
    </Provider>
  );
}

export default Inspect;
