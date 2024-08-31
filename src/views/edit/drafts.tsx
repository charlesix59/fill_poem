import React, {useContext} from "react";
import Container from "../../components/container";
import {ScrollView, Text} from "react-native";
import {Card, Modal, Toast, View} from "@ant-design/react-native";
import {DarftSchema} from "../../types/edit";
import {extractDate} from "../../utils/comman";
import {ColorsContext, RealmContext} from "../../../App";
import editStyle from "../../styles/edit";
import {WFull} from "../../styles";
import Empty from "../../components/empty";
import {getCiFormat} from "../../api/tunes";

function Darfts({navigation}: any): React.JSX.Element {
  const {useQuery, useRealm} = useContext(RealmContext);
  const darfts = useQuery(DarftSchema, tasks => {
    return tasks.sorted("createTime", true);
  });
  const COLORS = useContext(ColorsContext);
  const realm = useRealm();
  /** 删除草稿 */
  const deleteDarft = (index: number) => {
    Modal.alert(
      "提示",
      "确定要删除嘛？",
      [
        {
          text: "点错了~",
          style: "cancle",
        },
        {
          text: "是的",
          style: "destructive",
          onPress: () => {
            realm.write(() => {
              realm.delete(darfts[index]);
            });
            Toast.info({content: "删除成功喵~", duration: 0.5});
          },
        },
      ],
      () => true,
    );
  };
  /** 跳转预览界面 */
  const toPerview = (index: number) => {
    const item = darfts[index];
    navigation.navigate("Preview", {
      title: item.name,
      content: item.content,
      createTime: item.createTime,
    });
  };
  /** 编辑草稿 */
  const editDarft = async (index: number) => {
    Toast.loading("加载中，请等待");
    const item = darfts[index];
    const format = await getCiFormat(item.name, item.ciFormat);
    navigation.navigate("editPoem", {
      name: item.name,
      key: item.ciFormat,
      format: format,
      initValue: item.content,
      editId: item._id,
    });
  };
  if (!darfts || darfts.length === 0) {
    return <Empty />;
  }
  return (
    <Container>
      <ScrollView style={WFull}>
        {darfts.map((item, index) => {
          return (
            <Card style={editStyle.mt12} key={index}>
              <Card.Header
                title={
                  <Text
                    style={{color: COLORS.PRIMARY_COLOR}}
                    onPress={() => toPerview(index)}>
                    {item.name}
                  </Text>
                }
                extra={extractDate(item.createTime)}
              />
              <Card.Body>
                <View style={editStyle.pd12}>
                  <Text
                    onPress={() => {
                      toPerview(index);
                    }}>
                    {JSON.parse(item.content).join("").trim()}
                  </Text>
                </View>
              </Card.Body>
              <Card.Footer
                content={
                  <View style={editStyle.opratorContainer}>
                    <Text
                      style={editStyle.opratorText}
                      onPress={() => {
                        editDarft(index);
                      }}>
                      编辑
                    </Text>
                    <Text
                      style={editStyle.opratorText}
                      onPress={() => {
                        deleteDarft(index);
                      }}>
                      删除
                    </Text>
                  </View>
                }
              />
            </Card>
          );
        })}
      </ScrollView>
    </Container>
  );
}

export default Darfts;
