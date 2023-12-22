import React, {useEffect, useRef, useState} from "react";
import Container from "../../../components/container";
import {getWordMeanings} from "../../../api/word";
import {WordMeaning} from "../../../types/main";
import Loading from "../../../components/loading";
import {Text, View} from "@ant-design/react-native";

type PropsType = {
  word: string;
};

function Word({word}: PropsType): React.JSX.Element {
  const rainbowExplain = useRef(true);
  const [meanings, setMeanings] = useState<WordMeaning[] | string>();
  useEffect(() => {
    const getData = async () => {
      const data = await getWordMeanings(word);
      setMeanings(data || "暂无释义");
    };
    getData();
  }, [word]);
  if (!meanings) {
    return <Loading />;
  }
  if (meanings === "暂无释义") {
    return <Text>暂无释义</Text>;
  }
  return (
    <Container>
      {(meanings as WordMeaning[]).map((item, index) => (
        <View key={index}>
          <Text>拼音：{item.pronunciation}</Text>
          <View>
            {item.explains.map((str, key) => (
              <Text key={`${index}-${key}`}>{str}</Text>
            ))}
          </View>
        </View>
      ))}
    </Container>
  );
}

export default Word;
