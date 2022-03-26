import React from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";

function CalendarView({ markedDates, selectedDate, onSelectDate }) {
  //현재 연/월 사용하기

  const markedSelectedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDate}
      onDayPress={(day) => { //클릭된 날짜에 표시가 됨
        onSelectDate(day.dateString);
      }}
      theme={{
        selectedDayBackgroundColor: "#009688",
        arrowColor: "#009688",
        dotColor: "#009688",
        todayTextColor: "#009688",
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});

export default CalendarView;
