import React, {useContext, useRef, useState} from "react";
import Container from "../../components/container";
import {Platform, Text} from "react-native";
import {extractDateTime, hasAndroidPermission} from "../../utils/comman";
import {Button, Provider, Toast, View} from "@ant-design/react-native";
import {ColorsContext, RealmContext} from "../../../App";
import {Settings, settingOrder} from "../../types/setting";
import fillPoemStyle from "../../styles/filePoem";
import editStyle from "../../styles/edit";
import ViewShot from "react-native-view-shot";
import {WFull} from "../../styles";
import {CameraRoll} from "@react-native-camera-roll/camera-roll";

type PropsType = {
  title: string;
  content: string;
  createTime: Date;
};

function Preview({route}: any): React.JSX.Element {
  const {title, content, createTime}: PropsType = route.params;
  const [splitedContent] = useState<string[]>(content.split(" "));
  const {useObject} = useContext(RealmContext);
  const AuthorName = useObject(Settings, settingOrder.AUTHOR);
  const noSignature = useObject(Settings, settingOrder.NO_SIGNATURE);
  const colors = useContext(ColorsContext);
  const shotRef = useRef<any>(null);

  const takeShotHandler = async () => {
    const uri = await shotRef.current.capture();
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    await CameraRoll.save(uri);
    Toast.info({content: "保存成功喵~", duration: 0.5});
  };
  return (
    <Provider>
      <Container>
        <ViewShot
          style={WFull}
          ref={shotRef}
          options={{
            fileName: createTime.getTime().toString(),
            format: "png",
            quality: 0.9,
          }}>
          <View style={editStyle.previewContainer}>
            <View
              style={{
                ...editStyle.previewBorder,
                borderColor: colors.SIDE_COLOR,
              }}>
              <Text style={editStyle.previewTitle}>{title}</Text>
              <View>
                {splitedContent.map((item, index) => (
                  <Text style={editStyle.previewContent} key={index}>
                    {item}
                  </Text>
                ))}
              </View>
              <View style={editStyle.inlineRight}>
                <Text>{AuthorName?.value}</Text>
                <Text style={editStyle.ml16}>
                  {extractDateTime(createTime)}
                </Text>
              </View>
            </View>
            {noSignature?.value === "false" ? (
              <Text
                style={{...editStyle.appSignature, color: colors.SIDE_COLOR}}>
                来自 奉纸填词APP
              </Text>
            ) : (
              <></>
            )}
          </View>
        </ViewShot>
        <View>
          <Button
            onPress={takeShotHandler}
            type="primary"
            style={fillPoemStyle.submitBtn}>
            保存图片
          </Button>
          <Button type="primary" style={fillPoemStyle.submitBtn}>
            复制文字
          </Button>
        </View>
      </Container>
    </Provider>
  );
}

export default Preview;
