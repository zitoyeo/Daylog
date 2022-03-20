import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function FloatingWriteButton() {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("Write");
  };
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          Platform.OS === "ios" && {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
        android_ripple={{ color: "white" }}
        onPress={onPress}
      >
        <Icon name="plus-circle" size={24} style={styles.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    // ios 전용 그림자 설정,
    shadowColor: "#4d4d4d",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    //안드로이드 전용 그림자 설정

    elevation: 5,
    //안드로이드에서는 물결 효가가 영역 밖으로 나가지 않도록 설정
    //ios에서는 overflow가 hidden일 경우 그림자가 보여지지 않음.
    overflow: Platform.select({ android: "hidden" }),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#009688",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "white",
  },
});

export default FloatingWriteButton;
