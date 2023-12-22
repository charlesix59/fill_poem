import React from "react";
import Container from "../../components/container";
import ButtonItem from "../../components/buttonItem";

function WordMenu({navigation}: any): React.JSX.Element {
  return (
    <Container>
      <ButtonItem
        onPress={() => {
          navigation.navigate("WordCatalog", {type: "shi"});
        }}>
        平水韵
      </ButtonItem>
      <ButtonItem
        onPress={() => {
          navigation.navigate("WordCatalog", {type: "ci"});
        }}>
        词林正韵
      </ButtonItem>
      <ButtonItem>中华新韵</ButtonItem>
    </Container>
  );
}

export default WordMenu;
