import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {CiFormat, CiTuneItem} from '../../types/main';
import Container from '../../components/container';
import InputCheck from '../../components/inputCheck';
import {View} from '@ant-design/react-native';
import fillPoemStyle from '../../styles/filePoem';
import Loading from '../../components/loading';

function FillPoem({route}: any): React.JSX.Element {
  const {format}: {format: CiFormat} = route.params;
  const [tunes, setTunes] = useState<Array<Array<CiTuneItem>>>([]);
  useEffect(() => {
    const res: Array<Array<CiTuneItem>> = [];
    let arr: Array<CiTuneItem> = [];
    format.tunes.forEach(item => {
      arr.push(item);
      if (item.rhythm) {
        res.push(arr);
        arr = [];
      }
    });
    setTunes(res);
  }, [format.tunes]);
  if (tunes.length === 0) {
    return <Loading />;
  }
  return (
    <Container>
      <ScrollView style={fillPoemStyle.container}>
        <Text>{format.sketch}</Text>
        <View>
          {tunes.map((arr, index) => {
            return (
              <View style={fillPoemStyle.inlineContainer} key={index}>
                {arr.map((item, key) => {
                  return (
                    <InputCheck
                      tune={item.tune}
                      rhythm={item.rhythm}
                      key={`${index}-${key}`}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Container>
  );
}

export default FillPoem;
