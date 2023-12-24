import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Layout from "./src/layout";
import {Settings, settingOrder} from "./src/types/setting";
import Realm from "realm";
import {createRealmContext} from "@realm/react";

const realmConfig: Realm.Configuration = {
  schema: [Settings],
};
const {RealmProvider, useRealm, useQuery} = createRealmContext(realmConfig);

function App(): React.JSX.Element {
  return (
    <RealmProvider>
      <LayoutWarp />
    </RealmProvider>
  );
}

export const ColorsContext = createContext({
  PRIMARY_COLOR: "#FFA07A",
  SIDE_COLOR: "#1CA2E1",
  IGNORE_COLOR: "#6A7174",
  BACKGROUND_COLOR: "#f2f4fb",
  ERROR: "#d64828",
  SUCCESS: "#19d929",
  INFO: "#1888d8",
});
function LayoutWarp(): React.JSX.Element {
  const data = useQuery(Settings);
  const realm = useRealm();
  const [colors, setColors] = useState({
    PRIMARY_COLOR: "#FFA07A",
    SIDE_COLOR: "#1CA2E1",
    IGNORE_COLOR: "#6A7174",
    BACKGROUND_COLOR: "#f2f4fb",
    ERROR: "#d64828",
    SUCCESS: "#19d929",
    INFO: "#1888d8",
  });
  useEffect(() => {
    if (data.length === 0) {
      realm.write(() => {
        realm.create("Settings", {
          _id: new Realm.BSON.ObjectId(),
          name: "rainbowExplain",
          value: "true",
        });
        realm.create("Settings", {
          _id: new Realm.BSON.ObjectId(),
          name: "primaryColor",
          value: "#FFA07A",
        });
        realm.create("Settings", {
          _id: new Realm.BSON.ObjectId(),
          name: "sideColor",
          value: "#1CA2E1",
        });
      });
    }
  }, [data.length, realm]);
  useLayoutEffect(() => {
    setColors({
      PRIMARY_COLOR: data[settingOrder.PRIMARY_COLOR].value,
      SIDE_COLOR: data[settingOrder.SIDE_COLOR].value,
      IGNORE_COLOR: "#6A7174",
      BACKGROUND_COLOR: "#f2f4fb",
      ERROR: "#d64828",
      SUCCESS: "#19d929",
      INFO: "#1888d8",
    });
  }, [data, realm]);
  return (
    <ColorsContext.Provider value={colors}>
      <Layout />
    </ColorsContext.Provider>
  );
}
export default App;
