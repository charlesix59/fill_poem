/* eslint-disable react/no-unstable-nested-components */
import {Icon} from "@ant-design/react-native";
import React from "react";
import Tunes from "../views/tunes";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Edit from "../views/edit";
import COLORS from "../styles/theme";
import Word from "../views/word";
import Setting from "../views/setting";
import {NavigationContainer} from "@react-navigation/native";
const Tab = createBottomTabNavigator();

function Layout(): React.JSX.Element {
  const size = "sm";
  const color = COLORS.SIDE_COLOR;
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Edit"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
          headerShown: false,
        }}>
        <Tab.Screen
          name="Edit"
          component={Edit}
          options={{
            tabBarLabel: "创作",
            tabBarIcon: () => <Icon name="edit" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="book"
          component={Tunes}
          options={{
            tabBarLabel: "词谱",
            tabBarIcon: () => <Icon name="book" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="word"
          component={Word}
          options={{
            tabBarLabel: "字典",
            tabBarIcon: () => (
              <Icon name="translation" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="setting"
          component={Setting}
          options={{
            tabBarLabel: "设置",
            tabBarIcon: () => <Icon name="setting" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Layout;
