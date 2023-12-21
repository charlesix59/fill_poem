import {Button, Text, TextareaItem} from "@ant-design/react-native";
import React, {useState} from "react";
import Container from "../../components/container";
import {ScrollView, TextInput} from "react-native";
import editStyle from "../../styles/edit";

function Inspect(): React.JSX.Element {
  const [inspected, setInspected] = useState(false);
  return (
    <Container>
      <Text style={editStyle.alignLeft}>输入词牌名</Text>
      <TextInput style={editStyle.lineInput} />
      <Text style={editStyle.alignLeft}>输入内容</Text>
      <TextareaItem rows={4} placeholder="输入你的作品" autoHeight />
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
  );
}

export default Inspect;
