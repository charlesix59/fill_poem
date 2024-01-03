import {List, Modal, Toast, View} from "@ant-design/react-native";
import Input from "@ant-design/react-native/lib/input-item/Input";
import Item from "@ant-design/react-native/lib/list/ListItem";
import React, {useContext, useState} from "react";
import {Linking, Text, TextInput} from "react-native";
import {pdy16} from "../../styles";
import {Settings, sendFeedbackResult, settingOrder} from "../../types/setting";
import {RealmContext} from "../../../App";
import settingStyles from "../../styles/setting";

function Common({navigation}: {navigation: any}): React.JSX.Element {
  const {useRealm, useObject} = useContext(RealmContext);
  const realm = useRealm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [switchFlash, setSwitchFlash] = useState(true);
  const [nameModelVisible, setNamModelVisible] = useState<boolean>(false);
  const [feedbackModelvisible, setFeedbackModelvisible] =
    useState<boolean>(false);
  const [authorInput, setAuthorInput] = useState<string>("");
  const [feedbackContent, setFeedbackContent] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const author = useObject(Settings, settingOrder.AUTHOR);

  /** 设置作者Dialog的footer */
  const authorFooter = [
    {
      text: "取消",
      onPress: () => {
        setNamModelVisible(false);
      },
    },
    {
      text: "确认",
      onPress: () => {
        realm.write(() => {
          realm.create(
            Settings,
            {
              _id: settingOrder.AUTHOR,
              name: "author",
              value: authorInput,
            },
            true,
          );
        });
        setNamModelVisible(false);
      },
    },
  ];
  const feedbackFooter = [
    {
      text: "发送反馈",
      onPress: () => {
        if (!feedbackContent && !contact) {
          Toast.info("啥都不填不会发送反馈哦~", 1);
        } else {
          sendFeedback();
        }
        setFeedbackModelvisible(false);
      },
    },
  ];
  // 发送反馈
  const sendFeedback = () => {
    const toastKey = Toast.loading("请求中...");
    fetch(
      "https://lovely-faun-65de4d.netlify.app/.netlify/functions/sendMail",
      {
        method: "POST",
        body: JSON.stringify({content: feedbackContent, connectWay: contact}),
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then(res => {
        res.json().then((body: sendFeedbackResult) => {
          Toast.info({content: body.msg, duration: 1});
        });
      })
      .catch(err => {
        Toast.info({content: `发送失败:${err}`, duration: 1});
      })
      .finally(() => {
        Toast.remove(toastKey);
      });
  };
  return (
    <>
      <List renderHeader="常规">
        <Item
          onPress={() => {
            setNamModelVisible(true);
          }}>
          署名信息
        </Item>
        <Item
          onPress={() => {
            setFeedbackModelvisible(true);
          }}>
          意见与反馈
        </Item>
        <Item
          onPress={() => {
            Linking.openURL("https://github.com/charlesix59/fill_poem").catch(
              () => {
                Toast.info("打开外部浏览器失败了TAT", 1);
              },
            );
          }}>
          GitHub仓库
        </Item>
        <Item
          onPress={() => {
            navigation.navigate("About");
          }}>
          关于
        </Item>
      </List>
      {/* 设置作者署名的model */}
      <Modal
        title={"设置作者署名"}
        transparent
        maskClosable
        visible={nameModelVisible}
        footer={authorFooter}>
        <View style={pdy16}>
          <Input
            style={settingStyles.settingInput}
            onChange={e => {
              setAuthorInput(e.nativeEvent.text);
            }}
            defaultValue={author?.value}
          />
        </View>
      </Modal>
      <Modal
        title="发送反馈"
        transparent
        maskClosable
        visible={feedbackModelvisible}
        footer={feedbackFooter}>
        <View style={pdy16}>
          <Text>您想反馈的内容</Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            placeholder="反馈内容"
            style={settingStyles.settingInput}
            onChange={e => setFeedbackContent(e.nativeEvent.text)}
            textAlignVertical="top"
          />
          <Text>可以的话留下您的联系方式w</Text>
          <TextInput
            placeholder="联系方式"
            style={settingStyles.settingInput}
            onChange={e => setContact(e.nativeEvent.text)}
            textAlignVertical="top"
          />
        </View>
      </Modal>
    </>
  );
}

export default Common;
