import React, { useContext } from "react";
import {
  StyleSheet,
  Pressable,
  useWindowDimensions,
  View,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SearchContext from "../context/SearchContext";

function SearchHeader() {
  const { width } = useWindowDimensions();
  const { keyword, onChangeText } = useContext(SearchContext);

  return (
    <View style={[styles.block, { width: width - 32 }]}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChangeText={onChangeText}
        autoFocus
      />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
        onPress={() => onChangeText("")}
      >
        <Icon name="alpha-x-circle" size={20} color="#9e9e9e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 8,
  },
});

export default SearchHeader;
