import {
  List,
  Modal,
  Radio,
  Switch,
  Toast,
  View,
} from "@ant-design/react-native";
import Item from "@ant-design/react-native/lib/list/ListItem";
import React, {useContext, useState} from "react";
import {TextInput} from "react-native";
import ColorPicker from "./components/colorPicker";
import {isHexColor} from "../../utils/appearance";
import {COLORS, colors} from "../../styles/theme";
import {Settings, settingOrder} from "../../types/setting";
import {RealmContext} from "../../../App";
import settingStyles from "../../styles/setting";
import {pdy16} from "../../styles";

function Appearance(): React.JSX.Element {
  const {useRealm, useQuery} = useContext(RealmContext);
  const data = useQuery(Settings);
  const realm = useRealm();
  const [title, setTitle] = useState<string>("设置主颜色");
  const [colorModelVisible, setColorModelVisible] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>();
  const [customColorInput, setCustomColorInput] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [switchFlash, setSwitchFlash] = useState(true);
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
  // 设置黑暗模式
  const darkChangeHandler = async (e: boolean) => {
    setSwitchFlash(status => !status);
    realm.write(() => {
      data[settingOrder.DARK_MODE].value = String(e);
    });
    Toast.info({content: "开发中~(点也没用，哼)", duration: 0.5});
  };
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
  return (
    <>
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
      {/* 设置颜色的model */}
      <Modal
        title={title}
        transparent
        maskClosable
        closable
        onClose={() => {
          setColorModelVisible(false);
        }}
        visible={colorModelVisible}
        footer={footerButtons}>
        <View style={pdy16}>
          <Radio.Group
            onChange={e => {
              setSelectedColor(e.target.value as string);
            }}
            value={selectedColor}>
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
                }}
                value={customColorInput}
              />
            </View>
          </Radio.Group>
        </View>
      </Modal>
    </>
  );
}

export default Appearance;
