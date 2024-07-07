import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Layout from "./src/layout";
import {Settings, settingOrder} from "./src/types/setting";
import {createRealmContext} from "@realm/react";
import {DarftSchema} from "./src/types/edit";
import Realm from "realm";
import {checkUpdate} from "./src/api/common";
import {Provider} from "@ant-design/react-native";

const config: Realm.Configuration = {
  schema: [Settings, DarftSchema],
  schemaVersion: 1, // if the version change, the onMigration method will be called
  onMigration: (oldRealm, newRealm) => {
    newRealm.deleteAll();
  },
};

const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(config); // get used hook from new realm context

export const ColorsContext = createContext({
  PRIMARY_COLOR: "#FFA07A",
  SIDE_COLOR: "#1CA2E1",
  IGNORE_COLOR: "#6A7174",
  BACKGROUND_COLOR: "#f2f4fb",
  ERROR: "#d64828",
  SUCCESS: "#19d929",
  INFO: "#1888d8",
});

// make children can get realm from react context
export const RealmContext = createContext({
  useRealm,
  useObject,
  useQuery,
});

function App(): React.JSX.Element {
  return (
    <RealmProvider>
      <RealmContext.Provider value={{useRealm, useObject, useQuery}}>
        <LayoutWarp />
      </RealmContext.Provider>
    </RealmProvider>
  );
}

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
  // if there are no data in realm, set init data
  useEffect(() => {
    if (data?.length === 0) {
      realm.write(() => {
        realm.create("Settings", {
          _id: 0,
          name: "rainbowExplain",
          value: "true",
        });
        realm.create("Settings", {
          _id: 1,
          name: "primaryColor",
          value: "#FFA07A",
        });
        realm.create("Settings", {
          _id: 2,
          name: "sideColor",
          value: "#1CA2E1",
        });
        realm.create("Settings", {
          _id: 3,
          name: "darkMode",
          value: "false",
        });
      });
    }
  }, [data.length, realm]);
  // TODO: if it's neccessary?
  // overwrite version data every launch
  useEffect(() => {
    realm.write(() => {
      realm.create(
        "Settings",
        {
          _id: 4,
          name: "version",
          value: "0.0.4",
        },
        true,
      );
    });
  }, [realm]);
  // TODO: need toast container
  useLayoutEffect(() => {
    checkUpdate("0.0.4", true);
  }, []);
  useLayoutEffect(() => {
    if (!data || data.length === 0) {
      return;
    }
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
  // transmit color as a property of component to make it change once the color state is changed
  return (
    <ColorsContext.Provider value={colors}>
      <Provider>
        <Layout />
      </Provider>
    </ColorsContext.Provider>
  );
}
export default App;
