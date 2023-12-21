import {Button} from "@ant-design/react-native";
import React from "react";
import Container from "../../components/container";
import editStyle from "../../styles/edit";

function EditMenu({navigation}: any): React.JSX.Element {
  return (
    <Container>
      <Button
        style={editStyle.bottonLine}
        onPress={() => {
          navigation.navigate("Inspect");
        }}>
        韵律检查
      </Button>
      <Button style={editStyle.bottonLine}>草稿箱</Button>
      <Button style={editStyle.bottonLine}>自定韵律</Button>
    </Container>
  );
}

export default EditMenu;
