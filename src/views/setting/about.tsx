import {Text, View} from "@ant-design/react-native";
import React from "react";
import Container from "../../components/container";
import {Image, Linking, ScrollView} from "react-native";
import {HCenter, Title, WFull, colorBlack, my8, pd8} from "../../styles";
import editStyle from "../../styles/edit";
import settingStyles from "../../styles/setting";

function About(): React.JSX.Element {
  return (
    <Container>
      <ScrollView style={{...WFull, ...pd8}}>
        <Text style={Title}>奉纸填词</Text>
        <Text style={{...colorBlack, ...my8}}>
          奉纸填词是一款开源的辅助诗词创作的移动端应用，希望能够为您的创作助力。
        </Text>
        <Text style={{...colorBlack, ...my8}}>
          没有搞懂如何使用？本软件的使用说明可能会帮到你：
        </Text>
        <View style={editStyle.ml16}>
          <Text style={{...my8, ...settingStyles.colorLink}}>
            软件文档 —— GitHub
          </Text>
          <Text style={{...my8, ...settingStyles.colorLink}}>
            软件文档 —— 博客
          </Text>
          <Text style={{...my8, ...settingStyles.colorLink}}>
            软件文档 —— bilibili
          </Text>
        </View>
        <Text style={{...colorBlack, ...my8}}>
          <Text>
            如果您在使用本应用时遇到任何问题或者有任何建议欢迎通过设置中的【意见与反馈】按钮或通过邮箱
          </Text>
          <Text
            style={settingStyles.colorLink}
            onPress={() => {
              Linking.openURL("mailto:CharlesMin@outlook.com");
            }}>
            CharlesMin@outlook.com
          </Text>
          <Text>进行反馈</Text>
        </Text>
        <Text style={{...colorBlack, ...my8}}>
          本软件为开源软件，开源证书为MIT LICENSE，其中数据源部分来自以下途径：
        </Text>
        <Text style={my8}>搜韵：sou-yun.cn</Text>
        <Text style={my8}>Wiki 文库：wikisource.org</Text>
        <Image
          source={require("../../asset/yoyo.png")}
          style={settingStyles.banner}
        />
        <Text style={HCenter}>本软件属于 yoyo project</Text>
      </ScrollView>
    </Container>
  );
}

export default About;
