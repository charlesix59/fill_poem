import {List, Modal, Switch, Text} from "@ant-design/react-native";
import Item from "@ant-design/react-native/lib/list/ListItem";
import React, {useContext, useState} from "react";
import {Settings, settingOrder} from "../../types/setting";
import {checkUpdate} from "../../api/common";
import {RealmContext} from "../../../App";

function System(): React.JSX.Element {
  const {useRealm, useQuery, useObject} = useContext(RealmContext);
  const realm = useRealm();
  const data = useQuery(Settings);
  const signature = useObject(Settings, settingOrder.NO_SIGNATURE);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [switchFlash, setSwitchFlash] = useState(true);
  const version = useObject(Settings, settingOrder.VERSION);
  return (
    <>
      <List renderHeader="系统">
        <Item
          extra={
            <Switch
              onChange={e => {
                setSwitchFlash(status => !status);
                realm.write(() => {
                  data[settingOrder.RAINBOW_EXPLAIN].value = String(e);
                });
              }}
              defaultChecked={
                data[settingOrder.RAINBOW_EXPLAIN].value === "true"
              }
            />
          }>
          彩虹词义
        </Item>
        <Item
          extra={
            <Switch
              onChange={e => {
                setSwitchFlash(status => !status);
                realm.write(() => {
                  realm.create(
                    "Settings",
                    {
                      _id: 5,
                      name: "imageSignature",
                      value: String(e),
                    },
                    true,
                  );
                });
              }}
              defaultChecked={!!signature && signature.value === "true"}
            />
          }>
          关闭图片分享标识
        </Item>
        <Item
          onPress={() => {
            checkUpdate(version?.value || "");
          }}
          extra={<Text>{version?.value}</Text>}>
          检查更新
        </Item>
        <Item
          onPress={() => {
            Modal.alert(
              "警告",
              "清除缓存将删除您的所有草稿与自定义设置，此行为不可逆，请确认是否要清除缓存",
              [
                {text: "取消"},
                {
                  text: "确认",
                  onPress: () => {
                    realm.write(() => {
                      realm.deleteAll();
                    });
                  },
                },
              ],
            );
          }}>
          清除缓存
        </Item>
      </List>
    </>
  );
}

export default System;
