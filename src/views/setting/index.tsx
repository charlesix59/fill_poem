import React from "react";
import Setting from "./setting";
import {RealmProvider} from "@realm/react";
import {Settings} from "../../types/setting";

function SettingWarp(): React.JSX.Element {
  return (
    <RealmProvider schema={[Settings]}>
      <Setting />
    </RealmProvider>
  );
}
export default SettingWarp;
