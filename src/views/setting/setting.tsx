import React, {useState} from "react";
import {ScrollView} from "react-native";
import Appearance from "./appearance";
import System from "./system";
import Common from "./common";
import SecondConfirm from "../../components/secondConfirm";

function Setting({navigation}: any): React.JSX.Element {
  const [secondConfirmVisible, setSecondConfirmVisible] = useState(false);
  return (
    <>
      <ScrollView>
        <Appearance />
        <System setSecondConfirmVisible={setSecondConfirmVisible} />
        <Common navigation={navigation} />
      </ScrollView>
      <SecondConfirm
        visible={secondConfirmVisible}
        setVisible={setSecondConfirmVisible}
      />
    </>
  );
}

export default Setting;
