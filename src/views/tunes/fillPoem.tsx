import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {ScrollView, Text} from "react-native";
import {CiFormat, CiTuneItem} from "../../types/main";
import Container from "../../components/container";
import InputCheck from "../../components/inputCheck";
import {Button, Modal, Provider, Toast, View} from "@ant-design/react-native";
import fillPoemStyle from "../../styles/filePoem";
import Loading from "../../components/loading";
import {CheckInputCommand} from "../../types/command";
import {HCenter, Title} from "../../styles";
import {RealmContext} from "../../../App";
import {transIntoPureString} from "../../utils/comman";
import Realm from "realm";

export const StrContext: Context<string> = createContext("");

type PropsType = {
  format: CiFormat; // 准确的词格
  name: string; // 词牌名
  key: number; // 第几词格
  initValue?: string; // 初始值（从编辑界面进入）
  editId?: Realm.BSON.ObjectId;
  isCustom?: boolean; // 是否是自定义词牌
};

function FillPoem({navigation, route}: any): React.JSX.Element {
  const {format, name, key, initValue, editId, isCustom}: PropsType =
    route.params;
  const [tunes, setTunes] = useState<Array<Array<CiTuneItem>>>([]);
  const [command, setCommand] = useState<CheckInputCommand>();
  const [foucsElement, setFoucsElement] = useState(0);
  const [chars, setChars] = useState(""); // 多出的文字，自动填充到下一个block
  const [rhymeWord, setRhymeWord] = useState(""); // 韵脚
  const [content, setContent] = useState<Array<string>>([]); // 保存真正的内容
  // 这个状态本体不应该被使用，只应该使用设置状态时提供的快照
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [firstRhymeWord, setFirstRhymeWord] = useState<number>(); // 保存第一个韵的下标
  const [modelVisibale, setModelVisible] = useState(false);
  const {useRealm} = useContext(RealmContext);
  const removeEventRef = useRef<any>(null);
  const realm = useRealm();
  const writeContentId = useRef<Realm.BSON.ObjectId>(
    editId || new Realm.BSON.ObjectId(),
  );

  /** 提供可换行的词韵数组 */
  useEffect(() => {
    const res: Array<Array<CiTuneItem>> = [];
    let arr: Array<CiTuneItem> = [];
    format.tunes.forEach((item, index) => {
      item.index = index;
      arr.push(item);
      if (item.rhythm) {
        res.push(arr);
        arr = [];
      }
    });
    setTunes(res);
  }, [format.tunes]);
  /** 阻止退出 */
  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      removeEventRef.current = e;
      setModelVisible(true);
    });
  }, [navigation]);
  useEffect(() => {
    if (modelVisibale) {
      Modal.alert("保存更改", "离开之前请确认所有的更改都已经保存哦~", [
        {
          text: "取消",
          style: "cancle",
          onPress: () => setModelVisible(false),
        },
        {
          text: "确认",
          onPress: () => {
            navigation.dispatch(removeEventRef.current.data.action);
            setModelVisible(false);
          },
        },
      ]);
    }
  }, [modelVisibale, navigation]);
  /** 如果传入initValue，则进行处理 */
  useEffect(() => {
    if (initValue) {
      setCommand({
        name: "input",
        callarIndex: -1,
        value: transIntoPureString(initValue),
        additionalValue: "",
      });
    }
  }, [initValue]);
  /** 监听command变化 */
  useEffect(() => {
    /** 为添加内容添加后缀 */
    const addContentChar = (word: string, index: number): string => {
      const {rhythm, shift} = format.tunes[index];
      let res = word;
      if (rhythm) {
        if (rhythm === "韵") {
          res = `${res} `;
        } else {
          res = `${res}，`;
        }
      }
      if (shift) {
        res += "\n";
      }
      return res;
    };
    /** 接收子组件发送的命令 */
    if (command && command.name === "input") {
      // 添加到内容
      if (command.callarIndex >= 0) {
        setContent(e => {
          e[command.callarIndex] = addContentChar(
            command.additionalValue || "",
            command.callarIndex,
          );
          return [...e];
        });
      }
      if (command.callarIndex === format.tunes.length - 1) {
        return;
      }
      setFoucsElement(command.callarIndex + 1);
      setChars(command.value || "");
    } else if (command && command.name === "delete") {
      setContent(e => {
        e[command.callarIndex] = "";
        return [...e];
      });
      // 如果将韵字删除了，韵字应该重新设置为undefinded
      setFirstRhymeWord(e => {
        if (e === command.callarIndex) {
          setRhymeWord("");
          return;
        }
        return e;
      });
    } else if (command && command.name === "back") {
      if (command.callarIndex === 0) {
        return;
      }
      setFoucsElement(command.callarIndex - 1);
    } else if (command && command.name === "rhythm") {
      setRhymeWord(e => {
        if (!e) {
          setFirstRhymeWord(command.callarIndex);
          return command.value || "";
        }
        return e;
      });
    }
  }, [command, format.tunes, format.tunes.length]);
  /** 保存草稿 */
  const saveDarft = () => {
    realm.write(() => {
      realm.create(
        "DarftSchema",
        {
          _id: writeContentId.current,
          name: name,
          content: content.join(""),
          lastEditTime: new Date(),
          createTime: new Date(),
          ciFormat: key,
        },
        true,
      );
    });
    return;
  };
  if (tunes.length === 0) {
    return <Loading />;
  }
  return (
    <Provider>
      <Container>
        <ScrollView style={fillPoemStyle.container}>
          <Text style={Title}>{name}</Text>
          <Text style={HCenter}>{format.sketch}</Text>
          <View>
            {tunes.map((arr, index) => {
              return (
                <StrContext.Provider key={index} value={chars}>
                  <View style={fillPoemStyle.inlineContainer}>
                    {arr.map((item, keyIndex) => {
                      return (
                        <InputCheck
                          tune={item.tune}
                          rhythm={item.rhythm}
                          key={`${index}-${keyIndex}`}
                          setCommand={setCommand}
                          index={item.index as number}
                          focus={foucsElement === item.index}
                          rhymeWord={rhymeWord}
                        />
                      );
                    })}
                  </View>
                </StrContext.Provider>
              );
            })}
          </View>
          <Button
            type="primary"
            style={fillPoemStyle.submitBtn}
            onPress={() => {
              if (isCustom) {
                Toast.info({content: "自定义韵律暂不支持保存哦", duration: 1});
                return;
              }
              Toast.info({content: "保存成功喵~", duration: 0.5});
              saveDarft();
            }}>
            保存草稿
          </Button>
        </ScrollView>
      </Container>
    </Provider>
  );
}

export default FillPoem;
