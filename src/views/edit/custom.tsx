import {
  Button,
  Icon,
  Modal,
  Provider,
  Text,
  Toast,
  View,
} from "@ant-design/react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Container from "../../components/container";
import editStyle from "../../styles/edit";
import {inline} from "../../styles";
import {ColorsContext, RealmContext} from "../../../App";
import {TextInput} from "react-native";
import {CiFormat, CiTuneItem} from "../../types/main";
import {Settings, settingOrder} from "../../types/setting";

function Custom({navigation}: any): React.JSX.Element {
  const COLORS = useContext(ColorsContext);
  const {useRealm, useObject} = useContext(RealmContext);
  const realm = useRealm();
  const defaultName = useObject(Settings, settingOrder.CUSTOM_NAME);
  const defaultFormat = useObject(Settings, settingOrder.CUSTOM_FORMAT);
  const [name, setName] = useState<string>("");
  const [formatInput, setFormatInput] = useState<string>("");
  const [modelVisible, setModelVisible] = useState(false);
  const removeEventRef = useRef<any>(null);
  useEffect(() => {
    console.log(defaultFormat, defaultName);
    setName(defaultName?.value || "");
    setFormatInput(defaultFormat?.value || "");
  }, [defaultFormat, defaultFormat?.value, defaultName, defaultName?.value]);
  /** 点击问号时提示 */
  const questionPressHandler = () => {
    Modal.alert(
      "关于自定义韵律",
      "诗词的律支持【平】，【仄】，【多】三种，停顿处用【，】隔开，一句结束时请用【。】隔开，换阙请用回车换行",
      [{text: "明白啦"}],
    );
  };
  const writeData = useCallback(() => {
    realm.write(() => {
      realm.create(
        Settings,
        {
          _id: settingOrder.CUSTOM_NAME,
          name: "customName",
          value: name,
        },
        true,
      );
      realm.create(
        Settings,
        {
          _id: settingOrder.CUSTOM_FORMAT,
          name: "customFormat",
          value: formatInput,
        },
        true,
      );
    });
  }, [formatInput, name, realm]);
  /** 阻止退出界面 */
  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      removeEventRef.current = e;
      setModelVisible(true);
    });
  }, [navigation, writeData]);
  useEffect(() => {
    if (modelVisible) {
      Modal.alert("保存更改", "您的更改需要保存嘛？", [
        {
          text: "放弃",
          style: "destructive",
          onPress: () =>
            navigation.dispatch(removeEventRef.current.data.action),
        },
        {
          text: "保存",
          onPress: () => {
            writeData();
            navigation.dispatch(removeEventRef.current.data.action);
          },
        },
      ]);
    }
  }, [modelVisible, navigation, writeData]);
  /** 处理自定义韵律并跳转到填词界面 */
  const startFillPoem = () => {
    const tunes: CiTuneItem[] = [];
    const formatArr = formatInput.split("");
    try {
      for (let item of formatArr) {
        if ("平仄多".includes(item)) {
          const tune: CiTuneItem = {tune: item};
          tunes.push(tune);
        }
        if (item === "," || item === "，") {
          tunes[tunes.length - 1].rhythm = "句";
        }
        if (item === "." || item === "。") {
          tunes[tunes.length - 1].rhythm = "韵";
        }
        if (item === "\n") {
          tunes[tunes.length - 1].shift = true;
          tunes[tunes.length - 1].rhythm =
            tunes[tunes.length - 1].rhythm || "韵";
        }
      }
      tunes[tunes.length - 1].rhythm = tunes[tunes.length - 1].rhythm || "韵";
    } catch (e) {
      Toast.info({content: "没有解析到正确的格式捏...", duration: 1});
      return;
    }
    const format: CiFormat = {author: "", sketch: "", tunes: tunes};
    navigation.navigate("editPoem", {
      name: name,
      key: 0,
      format: format,
      isCustom: true,
    });
  };
  return (
    <Provider>
      <Container>
        <View style={inline}>
          <Text style={editStyle.alignLeft}>自定义韵律</Text>
          <Icon
            name="question-circle"
            color={COLORS.SIDE_COLOR}
            onPress={() => {
              questionPressHandler();
            }}
          />
        </View>
        <TextInput
          style={editStyle.lineInput}
          placeholder="自定义名称"
          onChange={e => {
            setName(e.nativeEvent.text);
          }}
          value={name}
        />
        <TextInput
          multiline={true}
          textAlignVertical="top"
          numberOfLines={5}
          placeholder="输入韵律"
          style={editStyle.textAreaInput}
          onChange={e => {
            setFormatInput(e.nativeEvent.text);
          }}
          value={formatInput}
        />
        <Button
          onPress={() => {
            startFillPoem();
          }}>
          开始填词！
        </Button>
      </Container>
    </Provider>
  );
}

export default Custom;
