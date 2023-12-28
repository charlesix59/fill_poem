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
import {Linking, ScrollView, TextInput} from "react-native";
import ColorPicker from "./components/colorPicker";
import {COLORS, colors} from "../../styles/theme";
import {pdy16} from "../../styles";
import {Settings, settingOrder} from "../../types/setting";
import {RealmContext} from "../../../App";
import Input from "@ant-design/react-native/lib/input-item/Input";
import settingStyles from "../../styles/setting";
import {isHexColor} from "../../utils/appearance";

function Setting({navigation}: any): React.JSX.Element {
  const {useRealm, useQuery, useObject} = useContext(RealmContext);
  const realm = useRealm();
  const data = useQuery(Settings);
  const [colorModelVisible, setColorModelVisible] = useState<boolean>(false);
  const [nameModelVisible, setNamModelVisible] = useState<boolean>(false);
  const [authorInput, setAuthorInput] = useState<string>("");
  const [title, setTitle] = useState<string>("设置主颜色");
  const [selectedColor, setSelectedColor] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [switchFlash, setSwitchFlash] = useState(true);
  const [customColorInput, setCustomColorInput] = useState<string>("");
  const signature = useObject(Settings, settingOrder.NO_SIGNATURE);
  const author = useObject(Settings, settingOrder.AUTHOR);
  /** 设置颜色dialog的footer */
  const footerButtons = [
    {
      text: "我选好啦",
      onPress: () => {
        // 如果时自定义颜色，则处理
        if (selectedColor === "custom") {
          if (isHexColor(customColorInput)) {
            realm.write(() => {
              data[title === "设置主颜色" ? 1 : 2].value =
                customColorInput || COLORS.PRIMARY_COLOR;
            });
          } else {
            Toast.info({content: "输入的颜色值不正确哦", duration: 1});
          }
        } else {
          realm.write(() => {
            // 1是主颜色，2是副颜色
            data[title === "设置主颜色" ? 1 : 2].value =
              `${selectedColor}` || COLORS.PRIMARY_COLOR;
          });
        }
        setColorModelVisible(false);
      },
    },
  ];
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
  // 判断是否是自定义颜色
  const isCustom = (colorHex: string): boolean => {
    return !colors.map(item => item.colorHex).includes(colorHex);
  };
  // 处理颜色点击事件
  const colorPressHandler = (type: string) => {
    let color: string;
    if (type === "primary") {
      setTitle("设置主颜色");
      color = data[settingOrder.PRIMARY_COLOR].value;
    } else {
      setTitle("设置副颜色");
      color = data[settingOrder.SIDE_COLOR].value;
    }
    const custom = isCustom(color);
    setSelectedColor(custom ? "custom" : color);
    if (custom) {
      setCustomColorInput(color);
    }
    setColorModelVisible(true);
  };
  const darkChangeHandler = async (e: boolean) => {
    setSwitchFlash(status => !status);
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
              colorPressHandler("primary");
            }}>
            主颜色
          </Item>
          <Item
            onPress={() => {
              colorPressHandler("side");
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
          <Item>检查更新</Item>
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
        <List renderHeader="常规">
          <Item
            onPress={() => {
              setNamModelVisible(true);
            }}>
            署名信息
          </Item>
          <Item>意见与反馈</Item>
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
        {/* 设置颜色的model */}
        <Modal
          title={title}
          transparent
          maskClosable
          visible={colorModelVisible}
          footer={footerButtons}>
          <View style={pdy16}>
            <Radio.Group
              onChange={e => {
                setSelectedColor(e.target.value as string);
              }}
              value={selectedColor}>
              {/* TODO: 自定义颜色，想想咋实现捏 */}
              {colors.map((item, index) => (
                <Radio value={item.colorHex} key={index}>
                  <ColorPicker colorHex={item.colorHex} text={item.text} />
                </Radio>
              ))}
              <Radio value={"custom"}>自定义颜色</Radio>
              <View>
                <TextInput
                  style={settingStyles.colorInput}
                  placeholder="HEX值"
                  onChange={e => {
                    setCustomColorInput(e.nativeEvent.text);
                    console.log(e.nativeEvent.text);
                  }}
                  value={customColorInput}
                />
              </View>
            </Radio.Group>
          </View>
        </Modal>
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
      </ScrollView>
    </Provider>
  );
}

export default Setting;
