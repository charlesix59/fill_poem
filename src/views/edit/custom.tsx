import {
  Button,
  Icon,
  Modal,
  Provider,
  Text,
  View,
} from "@ant-design/react-native";
import React, {useContext} from "react";
import Container from "../../components/container";
import editStyle from "../../styles/edit";
import {inline} from "../../styles";
import {ColorsContext} from "../../../App";
import {TextInput} from "react-native";

function Custom(): React.JSX.Element {
  const COLORS = useContext(ColorsContext);
  const questionPressHandler = () => {
    Modal.alert(
      "关于自定义韵律",
      "诗词的律支持【平】，【仄】，【多】三种，停顿处用【，】隔开，一句结束时请用【。】",
      [{text: "明白啦"}],
    );
  };
  return (
    <Provider>
      <Container>
        <View style={inline}>
          <Text style={editStyle.alignLeft}>自定义韵律</Text>
          <Icon
            name="question-circle"
            color={COLORS.SIDE_COLOR}
            onPress={() => {
              questionPressHandler();
            }}
          />
        </View>
        <TextInput style={editStyle.lineInput} placeholder="自定义名称" />
        <TextInput
          multiline={true}
          textAlignVertical="top"
          numberOfLines={5}
          placeholder="输入韵律"
          style={editStyle.textAreaInput}
        />
        <Button onPress={() => {}}>开始填词！</Button>
      </Container>
    </Provider>
  );
}

export default Custom;
