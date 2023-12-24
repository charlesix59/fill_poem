import React, {useContext} from "react";
import {CiFormat} from "../types/main";
import {number2Chinese} from "../utils/comman";
import {formatStyles} from "../styles";
import {ColorsContext} from "../../App";
import {Text, View} from "@ant-design/react-native";

type propsType = {
  format: CiFormat;
  index: number;
  navigation: any;
};

function TuneCard({format, index, navigation}: propsType): React.JSX.Element {
  const pressHandler = (ciFormat: CiFormat) => {
    navigation.navigate("FillPoem", {format: ciFormat});
  };
  const COLORS = useContext(ColorsContext);
  return (
    <View style={formatStyles.container}>
      <View>
        <View style={formatStyles.inline}>
          <Text
            style={{color: COLORS.SIDE_COLOR}}
            onPress={() => pressHandler(format)}>
            {`格${number2Chinese(index)}`}
          </Text>
          <Text style={{color: COLORS.PRIMARY_COLOR}}> {format.author}</Text>
        </View>
        <Text style={formatStyles.line}>{format.sketch}</Text>
      </View>
      <View style={{...formatStyles.inline, ...formatStyles.line}}>
        {format.tunes.map((item, key) => {
          if (item.rhythm) {
            return (
              <View key={`tune-${key}`} style={formatStyles.inline}>
                <Text>{item.tune}</Text>
                <Text style={{color: COLORS.PRIMARY_COLOR}}>{item.rhythm}</Text>
              </View>
            );
          } else {
            return <Text key={`tune-${key}`}>{item.tune}</Text>;
          }
        })}
      </View>
      <Text style={formatStyles.antiLine}>{format.desc}</Text>
    </View>
  );
}

export default TuneCard;
