import React from "react";
import Container from "../../components/container";
import ButtonItem from "../../components/buttonItem";

function WordMenu({}: any): React.JSX.Element {
  return (
    <Container>
      <ButtonItem>平水韵</ButtonItem>
      <ButtonItem>词林正韵</ButtonItem>
      <ButtonItem>中华新韵</ButtonItem>
    </Container>
  );
}

export default WordMenu;
