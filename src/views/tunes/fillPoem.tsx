import React from 'react';
import {ScrollView, Text} from 'react-native';
import {CiFormat} from '../../types/main';
import Container from '../../components/container';
import InputCheck from '../../components/inputCheck';
import {View} from '@ant-design/react-native';
import fillPoemStyle from '../../styles/filePoem';

function FillPoem({route}: any): React.JSX.Element {
  const {format}: {format: CiFormat} = route.params;
  return (
    <Container>
      <ScrollView style={fillPoemStyle.container}>
        <Text>{format.sketch}</Text>
        <View style={fillPoemStyle.inlineContainer}>
          {format.tunes.map((item, index) => {
            return (
              <InputCheck tune={item.tune} rhythm={item.rhythm} key={index} />
            );
          })}
        </View>
      </ScrollView>
    </Container>
  );
}

export default FillPoem;
