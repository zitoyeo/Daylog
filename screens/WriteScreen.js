import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WriteHeader from "../components/WriteHeader";
import WrtieEditor from "../components/WriteEditor";
import LogContext from "../context/LogContext";

//textinput에서 enter를 여러번 치면 화면에서 기본적으로 보여줄 수 있는 줄 수 를 초과하면 안드로이드는 별 문제없지만
// ios의 경우 하단 내용이 잘리기 때문에 keyboardavoidingview로 내부의 내용을 감싸야 함.

function WriteScreen({ route }) {
  const log = route.params?.log; // log의 param값 받아오기

  const [title, setTitle] = useState(log?.title ?? "");
  const [body, setBody] = useState(log?.body ?? "");
  const navigation = useNavigation();
  const [date, setDate] = useState(log ? new Date(log.date) : new Date()); //writer헤더에서 날짜 및 시간 보여주기

  const { onCreate, onModify, onRemove } = useContext(LogContext);

  const onAskRemove = () => {
    Alert.alert(
      "삭제",
      "정말로 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          onPress: () => {
            onRemove(log?.id);
            navigation.pop();
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const onSave = () => {
    if (log) {
      onModify({
        id: log.id,
        date: date.toISOString(),
        title,
        body,
      });
    } else {
      onCreate({
        title,
        body,
        //날짜를 문자열로 변환
        date: new Date().toISOString(),
      });
    }

    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
          date={date}
          onChangeDate={setDate}
        />
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
