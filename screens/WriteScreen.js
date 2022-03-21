import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WriteHeader from "../components/WriteHeader";
import WrtieEditor from "../components/WriteEditor";
import LogContext from "../context/LogContext";

//textinput에서 enter를 여러번 치면 화면에서 기본적으로 보여줄 수 있는 줄 수 를 초과하면 안드로이드는 별 문제없지만
// ios의 경우 하단 내용이 잘리기 때문에 keyboardavoidingview로 내부의 내용을 감싸야 함.

function WriteScreen() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigation = useNavigation();

  const { onCreate } = useContext(LogContext);
  const onSave = () => {
    onCreate({
      title,
      body,
      //날짜를 문자열로 변환
      date: new Date().toISOString(),
    });
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <WriteHeader onSave={onSave} />
        <WrtieEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: "white",
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
