import React, {useContext} from "react";
import Container from "../../components/container";
import {Easing, ScrollView, Text} from "react-native";
import {Card, Popover, Provider, Toast, View} from "@ant-design/react-native";
import {DarftSchema} from "../../types/edit";
import {extractDate} from "../../utils/comman";
import {ColorsContext, RealmContext} from "../../../App";
import editStyle from "../../styles/edit";
import {WFull, pd8} from "../../styles";

function Darfts({navigation}: any): React.JSX.Element {
  const {useQuery, useRealm} = useContext(RealmContext);
  const darfts = useQuery(DarftSchema);
  const COLORS = useContext(ColorsContext);
  const realm = useRealm();
  const deleteDarft = (index: number) => {
    realm.write(() => {
      realm.delete(darfts[index]);
    });
    Toast.info({content: "删除成功喵~", duration: 0.5});
  };
  const toPerview = (index: number) => {
    const item = darfts[index];
    navigation.navigate("Preview", {
      title: item.name,
      content: item.content,
      createTime: item.createTime,
    });
  };
  const nameArr = [
    {value: "preview", name: "预览"},
    {value: "edut", name: "编辑"},
    {value: "delete", name: "删除"},
  ];
  const overlay = nameArr.map((item, index) => (
    <Popover.Item key={index} value={item.value}>
      <Text>{item.name}</Text>
    </Popover.Item>
  ));
  if (!darfts || darfts.length === 0) {
    return <Text>这里空空如也</Text>;
  }
  return (
    <Provider>
      <Container>
        <ScrollView style={WFull}>
          {darfts.map((item, index) => {
            return (
              <Card style={editStyle.mb12} key={index}>
                <Card.Header
                  title={
                    <Text style={{color: COLORS.PRIMARY_COLOR}}>
                      {item.name}
                    </Text>
                  }
                  extra={extractDate(item.createTime)}
                />
                <Card.Body>
                  <View style={editStyle.pd12}>
                    <Text>{item.content}</Text>
                  </View>
                </Card.Body>
                <Card.Footer
                  content={
                    <View style={editStyle.w48}>
                      <Popover
                        overlay={overlay}
                        useNativeDriver
                        duration={200}
                        onSelect={e => {
                          if (e === "preview") {
                            toPerview(index);
                          } else if (e === "edit") {
                            console.log(e);
                          } else if (e === "delete") {
                            deleteDarft(index);
                          }
                        }}
                        easing={show =>
                          show ? Easing.in(Easing.ease) : Easing.step0
                        }>
                        <Text style={pd8}>操作</Text>
                      </Popover>
                    </View>
                  }
                />
              </Card>
            );
          })}
        </ScrollView>
      </Container>
    </Provider>
  );
}

export default Darfts;
