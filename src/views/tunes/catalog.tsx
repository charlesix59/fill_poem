import React, {useRef} from 'react';
import {getTunesCatalog} from '../../api/tunes';
import {View, WhiteSpace} from '@ant-design/react-native';
import Container from '../../components/container';
import {ScrollView, Text} from 'react-native';
import {Title, WFull, catalogStyles} from '../../styles';

function Catalog({navigation}: any): React.JSX.Element {
  const tuneNames = useRef(getTunesCatalog());
  const tuneKeys = useRef(['平韵格', '仄韵格', '平仄韵转换格', '平仄韵通叶格']);

  const pressHandler = (ciName: string) => {
    navigation.navigate('Tune', {name: ciName});
  };
  return (
    <Container>
      <ScrollView style={WFull}>
        {tuneKeys.current.map((item, index) => {
          return (
            <View key={index}>
              <Text style={Title}>{item}</Text>
              <WhiteSpace />
              <View style={catalogStyles.container}>
                {tuneNames.current[item].map((obj, key) => {
                  return (
                    <View key={`${index}-${key}`}>
                      <Text
                        style={catalogStyles.textItem}
                        onPress={() => pressHandler(obj.name)}>
                        {obj.name}
                      </Text>
                      <Text style={catalogStyles.noteText}>{obj.tunes}</Text>
                    </View>
                  );
                })}
              </View>
              <WhiteSpace />
            </View>
          );
        })}
      </ScrollView>
    </Container>
  );
}

export default Catalog;
