import React from "react";
import {List, Provider, Switch, Toast} from "@ant-design/react-native";
import {ScrollView} from "react-native";
import Item from "@ant-design/react-native/lib/list/ListItem";

function Setting(): React.JSX.Element {
  const darkChangeHandler = () => {
    console.log("test");
    Toast.info({content: "开发中~(点也没用，哼)"});
  };
  return (
    <Provider>
      <ScrollView>
        <List renderHeader="外观">
          <Item>主颜色</Item>
          <Item>副颜色</Item>
          <Item
            extra={
              <Switch
                onChange={() => {
                  darkChangeHandler();
                }}
              />
            }>
            黑暗模式
          </Item>
        </List>
        <List renderHeader="系统">
          <Item extra={<Switch />}>彩虹词义</Item>
          <Item>清除缓存</Item>
        </List>
        <List renderHeader="常规">
          <Item>GitHub仓库</Item>
        </List>
      </ScrollView>
    </Provider>
  );
}
export default Setting;
