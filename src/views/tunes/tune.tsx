import React, {useRef} from "react";
import {ScrollView, Text} from "react-native";
import {getTuneByName} from "../../api/tunes";
import Container from "../../components/container";
import TuneCard from "../../components/tuneCard";
import {Title} from "../../styles";

function Tune({route, navigation}: any): React.JSX.Element {
  const {name} = route.params;
  const ciRef = useRef(getTuneByName(name));
  return (
    <Container>
      <ScrollView>
        <Text style={Title}>{name}</Text>
        <Text>{`　　${ciRef.current.desc}`}</Text>
        <>
          {ciRef.current.formats.map((format, index) => {
            return (
              <TuneCard
                format={format}
                key={index}
                index={index + 1}
                navigation={navigation}
              />
            );
          })}
        </>
      </ScrollView>
    </Container>
  );
}

export default Tune;
