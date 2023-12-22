import React, {useEffect, useState} from "react";
import {WordCatalogType} from "../../types/main";
import Loading from "../../components/loading";
import {getCilinCatalog, getPingshuiCatalog} from "../../api/word";
import Container from "../../components/container";
import {ScrollView, Text} from "react-native";
import {View} from "@ant-design/react-native";
import {Title, WFull, catalogStyles} from "../../styles";

function WordCatalog({route, navigation}: any): React.JSX.Element {
  const {type}: {type: string} = route.params;
  const [catalog, setCatalog] = useState<WordCatalogType>();
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
        {Object.keys(catalog).map((key, index) => {
          return (
            <View key={index}>
              <Text style={Title}>{key}</Text>
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
                    style={catalogStyles.textItem}
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
