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
import {Button, Provider, Toast, View} from "@ant-design/react-native";
import fillPoemStyle from "../../styles/filePoem";
import Loading from "../../components/loading";
import {CheckInputCommand} from "../../types/command";
import {Title} from "../../styles";
import {RealmContext} from "../../../App";

export const StrContext: Context<string> = createContext("");

function FillPoem({route}: any): React.JSX.Element {
  const {format, name, key}: {format: CiFormat; name: string; key: number} =
    route.params;
  const [tunes, setTunes] = useState<Array<Array<CiTuneItem>>>([]);
  const [command, setCommand] = useState<CheckInputCommand>();
  const [foucsElement, setFoucsElement] = useState(0);
  const [chars, setChars] = useState(""); // 多出的文字，自动填充到下一个block
  const [rhymeWord, setRhymeWord] = useState(""); // 韵脚
  const [content, setContent] = useState<Array<string>>([]); // 保存真正的内容
  const {useRealm} = useContext(RealmContext);
  const realm = useRealm();
  const writeContentId = useRef<Realm.BSON.ObjectId>(new Realm.BSON.ObjectId());

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
  /** 监听command变化 */
  useEffect(() => {
    /** 为添加内容添加后缀 */
    const addContentChar = (word: string, index: number): string => {
      const {rhythm} = format.tunes[index];
      if (rhythm) {
        if (rhythm === "韵") {
          return `${word} `;
        } else {
          return `${word}，`;
        }
      }
      return word;
    };
    if (command && command.name === "input") {
      // 添加到内容
      setContent(e => {
        console.log(e);
        e[command.callarIndex] = addContentChar(
          command.additionalValue || "",
          command.callarIndex,
        );
        return [...e];
      });
      if (command.callarIndex === format.tunes.length - 1) {
        return;
      }
      setFoucsElement(command.callarIndex + 1);
      setChars(command.value || "");
    } else if (command && command.name === "back") {
      setContent(e => {
        console.log(e);
        e[command.callarIndex] = "";
        return [...e];
      });
      if (command.callarIndex === 0) {
        return;
      }
      setFoucsElement(command.callarIndex - 1);
    } else if (command && command.name === "rhythm") {
      setRhymeWord(e => {
        if (!e) {
          return command.value || "";
        }
        return e;
      });
    }
  }, [command, format.tunes, format.tunes.length]);
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
          <Text>{format.sketch}</Text>
          <View>
            {tunes.map((arr, index) => {
              return (
                <StrContext.Provider key={index} value={chars}>
                  <View style={fillPoemStyle.inlineContainer} key={index}>
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
