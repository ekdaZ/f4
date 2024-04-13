import {
  View,
  Text,
  FlatList,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { Calendar } from "react-native-calendars";

const baseUrl = "http://localhost:3001/";

export default function CalenderView() {
  const [selected, setSelected] = useState("");
  return (
    <View>
      <Calendar
        className="bg-gray-50"
        current={selected}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
      ></Calendar>
      <View className="px-[50px] mt-5">
        <FlatList
          data={getCalenderDayData(selected)}
          renderItem={({ item }) => (
            <View className="flex flex-col my-1">
                <Text className="text-lg">{item.title} </Text>
                <Text className="text-gray-500"> {item.time} </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

function getCalenderDayData(date) {
  console.log("the date ", date);
  const options = {
    method: "POST",
    url: baseUrl + "get_timetable_day",
    headers: {
      "content-type": "application/json",
    },
    data: {
      day: "2024-02-24",
    },
  };

  const gettingData = async () => {
    return await axios
      .request(options)
      .then((response) => {
        console.log("resposne", response);
        return response;
      })
      .catch((error) => {
        console.log("this is the error ", error);
      });
  };

  const result = gettingData();
  console.log("the result", result)

  return [
    { title: "Devin", time: "9:00 - 12:00" },
    { title: "Dan", time: "9:00 - 12:00" },
    { title: "Dominic", time: "9:00 - 12:00" },
    { title: "Jackson", time: "9:00 - 12:00" },
  ]
}
