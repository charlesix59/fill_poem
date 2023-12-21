import React from "react";
import Container from "../../components/container";
import ButtonItem from "../../components/buttonItem";

function EditMenu({navigation}: any): React.JSX.Element {
  return (
    <Container>
      <ButtonItem
        onPress={() => {
          navigation.navigate("Inspect");
        }}>
        韵律检查
      </ButtonItem>
      <ButtonItem>草稿箱</ButtonItem>
      <ButtonItem>自定韵律</ButtonItem>
    </Container>
  );
}

export default EditMenu;
