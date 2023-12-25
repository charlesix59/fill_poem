import React from "react";
import Container from "../../components/container";
import {Text} from "react-native";
import {extractDateTime} from "../../utils/comman";

type PropsType = {
  title: string;
  content: string;
  createTime: Date;
};

function Preview({route}: any): React.JSX.Element {
  const {title, content, createTime}: PropsType = route.params;
  return (
    <Container>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <Text>{extractDateTime(createTime)}</Text>
    </Container>
  );
}

export default Preview;
