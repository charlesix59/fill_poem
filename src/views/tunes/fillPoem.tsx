import React, {Context, createContext, useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {CiFormat, CiTuneItem} from '../../types/main';
import Container from '../../components/container';
import InputCheck from '../../components/inputCheck';
import {View} from '@ant-design/react-native';
import fillPoemStyle from '../../styles/filePoem';
import Loading from '../../components/loading';
import {CheckInputCommand} from '../../types/command';

export const StrContext: Context<string> = createContext('');

function FillPoem({route}: any): React.JSX.Element {
  const {format}: {format: CiFormat} = route.params;
  const [tunes, setTunes] = useState<Array<Array<CiTuneItem>>>([]);
  const [command, setCommand] = useState<CheckInputCommand>();
  const [foucsElement, setFoucsElement] = useState(0);
  const [chars, setChars] = useState('');

  /** 提供可换行的词韵数组 */
  useEffect(() => {
    const res: Array<Array<CiTuneItem>> = [];
    let arr: Array<CiTuneItem> = [];
    format.tunes.forEach((item, index) => {
      item.index = index;
      arr.push(item);
      if (item.rhythm) {
        res.push(arr);
        arr = [];
      }
    });
    setTunes(res);
  }, [format.tunes]);
  /** 监听command变化 */
  useEffect(() => {
    if (command && command.name === 'input') {
      setFoucsElement(command.callarIndex + 1);
      setChars(command.value || '');
    }
  }, [command]);
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
              <StrContext.Provider value={chars}>
                <View style={fillPoemStyle.inlineContainer} key={index}>
                  {arr.map((item, key) => {
                    return (
                      <InputCheck
                        tune={item.tune}
                        rhythm={item.rhythm}
                        key={`${index}-${key}`}
                        setCommand={setCommand}
                        index={item.index as number}
                        focus={foucsElement === item.index}
                      />
                    );
                  })}
                </View>
              </StrContext.Provider>
            );
          })}
        </View>
      </ScrollView>
    </Container>
  );
}

export default FillPoem;
