import { format } from "date-fns";
import React, { useContext, useState, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import LogContext from "../context/LogContext";
import FeedList from "../components/FeedList";
import CalendarView from "../components/CalendarView";

function CalendarScreen() {
  const { logs } = useContext(LogContext);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-mm-dd")
  );

  const markedDates = useMemo(() =>
    logs.reduce((acc, current) => {
      const formattedDate = format(new Date(current.date), "yyyy-mm-dd");
      acc[formattedDate] = { marked: true };
      return acc;
    }, [])
  );

  const filteredLogs = logs.filter(
    (log) => format(new Date(log.date), "yyyy-MM-dd") === selectedDate
  );

  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  block: {},
});

export default CalendarScreen;
