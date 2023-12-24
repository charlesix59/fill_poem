import React, {useContext, useEffect, useState} from "react";
import {getTunesCatalog, searchTuneName} from "../../api/tunes";
import {Button, Icon, View, WhiteSpace} from "@ant-design/react-native";
import Container from "../../components/container";
import {ScrollView, Text} from "react-native";
import {Title, WFull, catalogStyles} from "../../styles";
import {TunesCatalog} from "../../types/main";
import Loading from "../../components/loading";
import wordStyles from "../../styles/word";
import Input from "@ant-design/react-native/lib/input-item/Input";
import {ColorsContext} from "../../../App";

function Catalog({navigation}: any): React.JSX.Element {
  const [tuneNames, setTuneName] = useState<TunesCatalog>();
  const [searchText, setSearchText] = useState<string>();
  const COLORS = useContext(ColorsContext);

  useEffect(() => {
    const getData = async () => {
      const data = await getTunesCatalog();
      setTuneName(data);
    };
    getData();
  }, []);

  if (!tuneNames) {
    return <Loading />;
  }

  const pressHandler = (ciName: string) => {
    navigation.navigate("Tune", {name: ciName});
  };
  const searchHandler = () => {
    const res = searchTuneName(searchText);
    setTuneName(res);
  };

  return (
    <Container>
      <ScrollView style={WFull}>
        <View style={wordStyles.searchContainer}>
          <Input
            style={wordStyles.searchInput}
            value={searchText}
            onChange={e => {
              setSearchText(e.nativeEvent.text);
            }}
            placeholder="搜索词牌"
          />
          <Button
            onPress={() => {
              searchHandler();
            }}
            style={wordStyles.searchBotton}
            type="primary">
            <Icon name="search" />
          </Button>
        </View>
        {Object.keys(tuneNames).map((item, index) => {
          return (
            <View key={index}>
              <Text style={{...Title, color: COLORS.PRIMARY_COLOR}}>
                {item}
              </Text>
              <WhiteSpace />
              <View style={catalogStyles.container}>
                {tuneNames[item].map((obj, key) => {
                  return (
                    <View key={`${index}-${key}`}>
                      <Text
                        style={{
                          ...catalogStyles.textItem,
                          color: COLORS.SIDE_COLOR,
                        }}
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
