import React from "react";
import {Text} from "react-native";

function WordSearch({route}: any): React.JSX.Element {
  const {type, word}: {type: string; word: string} = route.params;
  return (
    <Text>
      search {type} {word}
    </Text>
  );
}

export default WordSearch;
