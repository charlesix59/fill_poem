import React from "react";
import Container from "../../components/container";
import ButtonItem from "../../components/buttonItem";
import {Provider} from "@ant-design/react-native";

function WordMenu({navigation}: any): React.JSX.Element {
  return (
    <Provider>
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
        <ButtonItem
          onPress={() => {
            navigation.navigate("WordCatalog", {type: "xinyun"});
          }}>
          中华新韵
        </ButtonItem>
      </Container>
    </Provider>
  );
}

export default WordMenu;
