import {
  List,
  Provider,
  Toast,
  Switch,
  Modal,
  View,
  Radio,
} from "@ant-design/react-native";
import Item from "@ant-design/react-native/lib/list/ListItem";
import React, {useContext, useState} from "react";
import {ScrollView} from "react-native";
import ColorPicker from "./components/colorPicker";
import {COLORS, colors} from "../../styles/theme";
import {pdy16} from "../../styles";
import {Settings, settingOrder} from "../../types/setting";
import {RealmContext} from "../../../App";

function Setting(): React.JSX.Element {
  const {useRealm, useQuery, useObject} = useContext(RealmContext);
  const realm = useRealm();
  const data = useQuery(Settings);
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("设置主颜色");
  const [selectedColor, setSelectedColor] = useState<string>();
  const signature = useObject(Settings, 5);
  const footerButtons = [
    {
      text: "我选好啦",
      onPress: () => {
        realm.write(() => {
          // 1是主颜色，2是副颜色
          data[title === "设置主颜色" ? 1 : 2].value =
            `${selectedColor}` || COLORS.PRIMARY_COLOR;
        });
        setVisible(false);
      },
    },
  ];
  const colorPressHandler = (newTitle: string) => {
    setTitle(newTitle);
    setVisible(true);
  };
  const darkChangeHandler = (e: boolean) => {
    realm.write(() => {
      data[settingOrder.DARK_MODE].value = String(e);
    });
    Toast.info({content: "开发中~(点也没用，哼)", duration: 0.5});
  };
  return (
    <Provider>
      <ScrollView>
        <List renderHeader="外观">
          <Item
            onPress={() => {
              setSelectedColor(data[settingOrder.PRIMARY_COLOR].value);
              colorPressHandler("设置主颜色");
            }}>
            主颜色
          </Item>
          <Item
            onPress={() => {
              setSelectedColor(data[settingOrder.SIDE_COLOR].value);
              colorPressHandler("设置副颜色");
            }}>
            副颜色
          </Item>
          <Item
            extra={
              <Switch
                onChange={e => {
                  darkChangeHandler(e);
                }}
              />
            }>
            黑暗模式
          </Item>
        </List>
        <List renderHeader="系统">
          <Item
            extra={
              <Switch
                onChange={e => {
                  realm.write(() => {
                    data[settingOrder.RAINBOW_EXPLAIN].value = String(e);
                  });
                }}
                checked={data[settingOrder.RAINBOW_EXPLAIN].value === "true"}
              />
            }>
            彩虹词义
          </Item>
          <Item
            extra={
              <Switch
                onChange={e => {
                  realm.write(() => {
                    data[settingOrder.RAINBOW_EXPLAIN].value = String(e);
                  });
                }}
                checked={data[settingOrder.RAINBOW_EXPLAIN].value === "true"}
              />
            }>
            图片分享标识
          </Item>
          <Item>检查更新</Item>
          <Item>清除缓存</Item>
        </List>
        <List renderHeader="常规">
          <Item>GitHub仓库</Item>
        </List>
        <Modal
          title={title}
          transparent
          maskClosable
          visible={visible}
          footer={footerButtons}>
          <View style={pdy16}>
            <Radio.Group
              onChange={e => {
                // console.log(e);
                setSelectedColor(e.target.value as string);
              }}
              value={selectedColor}>
              {/* TODO: 自定义颜色，想想咋实现捏 */}
              {colors.map((item, index) => (
                <Radio value={item.colorHex} key={index}>
                  <ColorPicker colorHex={item.colorHex} text={item.text} />
                </Radio>
              ))}
            </Radio.Group>
          </View>
        </Modal>
      </ScrollView>
    </Provider>
  );
}

export default Setting;
