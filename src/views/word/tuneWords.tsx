import React, {useRef, useState} from "react";
import {ScrollView, Text} from "react-native";
import {getWordsByPart} from "../../api/word";
import Container from "../../components/container";
import {View} from "@ant-design/react-native";
import {WFull, catalogStyles} from "../../styles";
import COLORS from "../../styles/theme";
import wordStyles from "../../styles/word";
import Word from "./components/word";

function TuneWords({route}: any): React.JSX.Element {
  const {type, part1, part2}: {type: string; part1: string; part2: string} =
    route.params;
  const wordsRef = useRef(getWordsByPart(type, part1, part2));
  const [selectedWord, setSelectedWord] = useState<string>("");
  return (
    <Container>
      <ScrollView style={WFull}>
        <Text style={{color: COLORS.PRIMARY_COLOR}}>
          {part1} {part2}
        </Text>
        <View style={catalogStyles.container}>
          {wordsRef.current.map((word, index) => (
            <Text
              style={wordStyles.wordText}
              key={index}
              onPress={() => {
                setSelectedWord(word);
              }}>
              {word}
            </Text>
          ))}
        </View>
      </ScrollView>
      {selectedWord ? <Word word={selectedWord} /> : <></>}
    </Container>
  );
}

export default TuneWords;
