import React, {
  Context,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {ScrollView, Text} from "react-native";
import {CiFormat, CiTuneItem} from "../../types/main";
import Container from "../../components/container";
import InputCheck from "../../components/inputCheck";
import {Button, View} from "@ant-design/react-native";
import fillPoemStyle from "../../styles/filePoem";
import Loading from "../../components/loading";
import {CheckInputCommand} from "../../types/command";
import {useRealm} from "@realm/react";
import {Title} from "../../styles";

export const StrContext: Context<string> = createContext("");

function FillPoem({route}: any): React.JSX.Element {
  const {format, name, key}: {format: CiFormat; name: string; key: number} =
    route.params;
  const [tunes, setTunes] = useState<Array<Array<CiTuneItem>>>([]);
  const [command, setCommand] = useState<CheckInputCommand>();
  const [foucsElement, setFoucsElement] = useState(0);
  const [chars, setChars] = useState(""); // 多出的文字，自动填充到下一个block
  const [rhymeWord, setRhymeWord] = useState(""); // 韵脚
  const [content, setContent] = useState("");
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
    if (command && command.name === "input") {
      setContent(e => e.concat(command.additionalValue || ""));
      if (command.callarIndex === format.tunes.length - 1) {
        return;
      }
      setFoucsElement(command.callarIndex + 1);
      setChars(command.value || "");
    } else if (command && command.name === "back") {
      setContent(e => e.substring(0, e.length));
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
  }, [command, format.tunes.length]);
  const saveDarft = () => {
    realm.write(() => {
      realm.create(
        "DarftSchema",
        {
          _id: writeContentId.current,
          name: name,
          content: content,
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
            saveDarft();
          }}>
          保存草稿
        </Button>
      </ScrollView>
    </Container>
  );
}

export default FillPoem;
