import React, {useContext, useEffect, useState} from "react";
import {WordCatalogType} from "../../types/main";
import Loading from "../../components/loading";
import {getCilinCatalog, getPingshuiCatalog} from "../../api/word";
import Container from "../../components/container";
import {ScrollView, Text} from "react-native";
import {Button, Icon, View} from "@ant-design/react-native";
import {Title, WFull, catalogStyles} from "../../styles";
import Input from "@ant-design/react-native/lib/input-item/Input";
import wordStyles from "../../styles/word";
import {ColorsContext} from "../../../App";

function WordCatalog({route, navigation}: any): React.JSX.Element {
  const {type}: {type: string} = route.params;
  const [catalog, setCatalog] = useState<WordCatalogType>();
  const [searchText, setSearchText] = useState<string>();
  const COLORS = useContext(ColorsContext);
  useEffect(() => {
    const getData = async () => {
      let data: WordCatalogType;
      if (type === "shi") {
        data = await getPingshuiCatalog();
      } else {
        data = await getCilinCatalog();
      }
      setCatalog(data);
    };
    getData();
  }, [type]);
  if (!catalog) {
    return <Loading />;
  }
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
            placeholder="搜索文字"
          />
          <Button
            onPress={() => {
              if (!searchText) {
                return;
              }
              navigation.navigate("WordSearch", {
                type: type,
                word: searchText[0],
              });
            }}
            style={wordStyles.searchBotton}
            type="primary">
            <Icon name="search" />
          </Button>
        </View>
        {Object.keys(catalog).map((key, index) => {
          return (
            <View key={index}>
              <Text style={{...Title, color: COLORS.PRIMARY_COLOR}}>{key}</Text>
              <View style={catalogStyles.container}>
                {catalog[key].map((str, no) => (
                  <Text
                    onPress={() => {
                      navigation.navigate("TuneWords", {
                        type: type,
                        part1: key,
                        part2: str,
                      });
                    }}
                    style={{
                      ...catalogStyles.textItem,
                      color: COLORS.SIDE_COLOR,
                    }}
                    key={`${index}-${no}`}>
                    {str || ""}
                  </Text>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </Container>
  );
}

export default WordCatalog;
