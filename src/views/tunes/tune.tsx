import React, {useContext, useRef} from "react";
import {ScrollView, Text} from "react-native";
import {getTuneByName} from "../../api/tunes";
import Container from "../../components/container";
import TuneCard from "../../components/tuneCard";
import {Title} from "../../styles";
import {ColorsContext} from "../../../App";

function Tune({route, navigation}: any): React.JSX.Element {
  const {name} = route.params;
  const ciRef = useRef(getTuneByName(name));
  const COLORS = useContext(ColorsContext);
  return (
    <Container>
      <ScrollView>
        <Text style={{...Title, color: COLORS.PRIMARY_COLOR}}>{name}</Text>
        <Text>{`　　${ciRef.current.desc}`}</Text>
        <>
          {ciRef.current.formats.map((format, index) => {
            return (
              <TuneCard
                name={name}
                format={format}
                key={index}
                index={index + 1}
                navigation={navigation}
                keyIndex={index}
              />
            );
          })}
        </>
      </ScrollView>
    </Container>
  );
}

export default Tune;
