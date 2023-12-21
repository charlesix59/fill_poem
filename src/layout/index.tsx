import {Icon, TabBar, Text, View} from "@ant-design/react-native";
import React, {useState} from "react";
import Tunes from "../views/tunes";

function Layout(): React.JSX.Element {
  const [selectTab, setSelectTab] = useState("firstTab");

  const renderContent = (pageText: any) => {
    return (
      <View style={{flex: 1, alignItems: "center", backgroundColor: "white"}}>
        <Text style={{margin: 50}}>{pageText}</Text>
      </View>
    );
  };
  const onChangeTab = (tabName: any) => {
    setSelectTab(tabName);
  };

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="#f5f5f5">
      <TabBar.Item
        title="创作"
        icon={<Icon name="edit" />}
        selected={selectTab === "firstTab"}
        onPress={() => onChangeTab("firstTab")}>
        {renderContent("Life Tab")}
      </TabBar.Item>
      <TabBar.Item
        icon={<Icon name="book" />}
        title="词谱"
        badge={2}
        selected={selectTab === "secondTab"}
        onPress={() => onChangeTab("secondTab")}>
        <Tunes />
      </TabBar.Item>
      <TabBar.Item
        icon={<Icon name="translation" />}
        title="字典"
        selected={selectTab === "thirdTab"}
        onPress={() => onChangeTab("thirdTab")}>
        {renderContent("Friend Tab")}
      </TabBar.Item>
      <TabBar.Item
        icon={<Icon name="setting" />}
        title="设置"
        selected={selectTab === "fourthTab"}
        onPress={() => onChangeTab("fourthTab")}>
        {renderContent("My Tab")}
      </TabBar.Item>
    </TabBar>
  );
}

export default Layout;
