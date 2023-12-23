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
import React, {useState} from "react";
import {ScrollView} from "react-native";
import {Settings} from "./index";
import ColorPicker from "./components/colorPicker";
import COLORS from "../../styles/theme";
import {pdy16} from "../../styles";

const colors = [
  {colorHex: "#FFA07A", text: "默认主颜色"},
  {colorHex: "#1CA2E1", text: "默认副颜色"},
  {colorHex: "#66CCFF", text: "天依蓝"},
  {colorHex: "#39C5BB", text: "初音绿"},
  {colorHex: "#EE0000", text: "绫红"},
  {colorHex: "#9999FF", text: "星紫"},
];

function Setting({useQuery, useRealm}: any): React.JSX.Element {
  const realm = useRealm();
  const data: Settings[] = useQuery(Settings);
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("设置主颜色");
  const [selectedColor, setSelectedColor] = useState<string>();
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
  if (data.length === 0) {
    realm.write(() => {
      realm.create("Settings", {
        _id: new Realm.BSON.ObjectId(),
        name: "rainbowExplain",
        value: "true",
      });
      realm.create("Settings", {
        _id: new Realm.BSON.ObjectId(),
        name: "primaryColor",
        value: "#FFA07A",
      });
      realm.create("Settings", {
        _id: new Realm.BSON.ObjectId(),
        name: "sideColor",
        value: "#1CA2E1",
      });
    });
  }
  const darkChangeHandler = () => {
    Toast.info({content: "开发中~(点也没用，哼)", duration: 0.5});
  };
  return (
    <Provider>
      <ScrollView>
        <List renderHeader="外观">
          <Item
            onPress={() => {
              setSelectedColor(data[1].value);
              colorPressHandler("设置主颜色");
            }}>
            主颜色
          </Item>
          <Item
            onPress={() => {
              setSelectedColor(data[2].value);
              colorPressHandler("设置副颜色");
            }}>
            副颜色
          </Item>
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
          <Item
            extra={
              <Switch
                onChange={e => {
                  realm.write(() => {
                    data[0].value = String(e);
                  });
                }}
                checked={data[0].value === "true"}
              />
            }>
            彩虹词义
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
