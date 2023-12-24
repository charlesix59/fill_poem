import React, {useContext, useEffect, useState} from "react";
import {Text} from "react-native";
import {searchWord} from "../../api/word";
import Container from "../../components/container";
import {View} from "@ant-design/react-native";
import Loading from "../../components/loading";
import {formatStyles} from "../../styles";
import {ColorsContext} from "../../../App";

function WordSearch({route, navigation}: any): React.JSX.Element {
  const COLORS = useContext(ColorsContext);
  const {type, word}: {type: string; word: string} = route.params;
  const [result, setResult] = useState<string[][]>();
  useEffect(() => {
    const getData = async () => {
      const data = await searchWord(type, word);
      setResult(data);
    };
    getData();
  }, [type, word]);
  if (!result) {
    return <Loading />;
  }
  return (
    <Container>
      {result.map((item, key) => {
        const [part1, part2] = item;
        return (
          <View style={formatStyles.container} key={key}>
            <Text
              style={{color: COLORS.SIDE_COLOR}}
              onPress={() => {
                navigation.navigate("TuneWords", {
                  type: type,
                  part1: part1,
                  part2: part2,
                  searchWord: word,
                });
              }}>
              {part1} {part2}
            </Text>
          </View>
        );
      })}
    </Container>
  );
}

export default WordSearch;
