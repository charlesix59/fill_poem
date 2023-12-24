import React, {useContext} from "react";
import Container from "../../components/container";
import {ScrollView, Text} from "react-native";
import {Card, View} from "@ant-design/react-native";
import {DarftType} from "../../types/edit";
import {extractDate} from "../../utils/comman";
import {ColorsContext} from "../../../App";
import editStyle from "../../styles/edit";

function Darfts(): React.JSX.Element {
  const darfts: Array<DarftType> = [
    {
      name: "浣溪沙",
      content: "谁怨西风独自凉",
      lastEditTime: new Date("2023-12-23"),
      createTime: new Date("2023-12-22"),
      ciFormat: 1,
    },
    {
      name: "浣溪沙",
      content:
        "残雪凝辉冷画屏，落梅横笛已三更，更无人处月胧明。我是人间惆怅客，知君何事泪纵横，断肠声里忆平生。",
      lastEditTime: new Date("2023-12-21"),
      createTime: new Date("2023-12-20"),
      ciFormat: 1,
    },
  ];
  const COLORS = useContext(ColorsContext);
  return (
    <Container>
      <ScrollView>
        {darfts.map((item, index) => (
          <Card style={editStyle.mb12} key={index}>
            <Card.Header
              title={
                <Text style={{color: COLORS.PRIMARY_COLOR}}>{item.name}</Text>
              }
              extra={extractDate(item.createTime)}
            />
            <Card.Body>
              <View style={editStyle.pd12}>
                <Text>{item.content}</Text>
              </View>
            </Card.Body>
            <Card.Footer
              content={<Text style={{color: COLORS.SIDE_COLOR}}>预览</Text>}
              extra={<Text style={{color: COLORS.SIDE_COLOR}}>编辑</Text>}
            />
          </Card>
        ))}
      </ScrollView>
    </Container>
  );
}

export default Darfts;
