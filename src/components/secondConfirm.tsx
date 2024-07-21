import {Modal, Text, Toast, View} from "@ant-design/react-native";
import React, {useContext, useRef, useState} from "react";
import {pv20} from "../styles/common";
import {genFourBitNumber} from "../utils/math";
import Input from "@ant-design/react-native/lib/input-item/Input";
import {RealmContext} from "../../App";
import {stdInput, Title} from "../styles";
import {BackHandler} from "react-native";

function SecondConfirm(props: {
  visible: boolean;
  setVisible: Function;
}): React.JSX.Element {
  const {visible = false, setVisible} = props;
  const {useRealm} = useContext(RealmContext);
  const realm = useRealm();
  const verifyCode = useRef<string>(genFourBitNumber());
  const [inputText, setInputText] = useState<string>("");
  const onClose = () => setVisible(false);
  const footerButtons = [
    {text: "Cancel", onPress: onClose},
    {
      text: "Ok",
      onPress: () => {
        if (inputText === verifyCode.current) {
          realm.write(() => {
            realm.deleteAll();
          });
          // TODO: 这个方法只有在Android上存在
          BackHandler.exitApp();
        } else {
          Toast.info("输入内容错误哦");
        }
      },
    },
  ];
  return (
    <Modal
      title="确认"
      transparent
      onClose={onClose}
      maskClosable
      visible={visible}
      closable
      footer={footerButtons}>
      <View style={pv20}>
        <Text>您当前要进行的操作非常危险，请输入以下数字以继续操作</Text>
        <Text style={Title}>{verifyCode.current}</Text>
        <Input
          style={stdInput}
          onChange={e => setInputText(e.nativeEvent.text)}
        />
      </View>
    </Modal>
  );
}

export default SecondConfirm;
