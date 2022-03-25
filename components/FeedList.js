import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FeedListItem from "./FeedListItem";

function FeedList({ logs, onScrolledToBottom, ListHeaderComponent }) {
  const onScroll = (e) => {
    if (!onScrolledToBottom) {
      return;
    }
    //스크롤 움직일 때마다 바닥과 가까워지고 멀어지고 값을 측정
    const { contentSize, layoutMeasurement, contentOffset } = e.nativeEvent;
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (
      contentSize.height > layoutMeasurement.height &&
      distanceFromBottom < 72
    ) {
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
    }
  };

  return (
    <FlatList
      data={logs}
      styles={styles.block}
      renderItem={({ item }) => <FeedListItem log={item} />}
      keyExtractor={(log) => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  block: { flex: 1 },
  separator: {
    backgroundColor: "#e0e0e0",
    height: 1,
    width: "100%",
  },
});

export default FeedList;
