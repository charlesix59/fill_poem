import React, {useEffect, useState} from "react";
import {getWordMeanings} from "../../../api/word";
import {WordMeaning} from "../../../types/main";
import Loading from "../../../components/loading";
import {Text, View} from "@ant-design/react-native";
import {COLORS} from "../../../styles/theme";
import {generateRandomHexColor} from "../../../utils/appearance";
import wordStyles from "../../../styles/word";

type PropsType = {
  word: string;
};

function Word({word}: PropsType): React.JSX.Element {
  const [rainbowExplain] = useState(true);
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
    return (
      <>
        <Text style={{color: COLORS.PRIMARY_COLOR}}>{word}</Text>
        <Text>暂无释义</Text>
      </>
    );
  }
  return (
    <>
      <Text style={{color: COLORS.PRIMARY_COLOR}}>{word}</Text>
      {(meanings as WordMeaning[]).map((item, index) => (
        <View key={index}>
          <Text>拼音：{item.pronunciation}</Text>
          <View style={wordStyles.explainContainer}>
            {item.explains.map((str, key) => (
              <Text
                // 这一行比较贴别，允许行内style
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: rainbowExplain
                    ? generateRandomHexColor()
                    : "rgb(129,130,134)",
                }}
                key={`${index}-${key}`}>
                {str}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </>
  );
}

export default Word;
