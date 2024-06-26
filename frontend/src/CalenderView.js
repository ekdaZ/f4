import { View, Text, FlatList, Pressable } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "react-native-calendars";

const baseUrl = "http://localhost:3001/";

export default function CalenderView() {
  const [selected, setSelected] = useState("");
  const [dateData, setDateData] = useState([
    {
      name: "",
      begin: "",
      end: "",
    },
  ]);

  useEffect(() => {
    const options = {
      method: "POST",
      url: baseUrl + "get_timetable_day",
      headers: {
        "content-type": "application/json",
      },
      data: {
        day: selected,
      },
    };
    const gettingData = async () => {
      return await axios
        .request(options)
        .then((response) => {
          const jsonData = JSON.parse(response.data);
          const dataList = [];
          for (let i = 0; i < jsonData.length; i++) {
            dataList.push({
              name: String(jsonData[i].name),
              begin: String(jsonData[i].begin.substring(11, 16)),
              end: String(jsonData[i].end.substring(11, 16)),
            });
          }
          setDateData(dataList);
        })
        .catch((error) => {
          console.log("error getting data: ", error);
        });
    };
    gettingData();
  }, [selected]);

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
          className="absolute ml-[50px]"
          data={dateData}
          renderItem={(item) => (
            <View className="flex flex-col my-1">
              <Pressable>
                <Text className="text-lg">{item["item"].name} </Text>
                <Text className="text-gray-400 ">
                  {item["item"].begin} - {item["item"].end}{" "}
                </Text>
              </Pressable>
              <View className="h-px mt-2 bg-gray-200 border-0 dark:bg-gray-700" />
            </View>
          )}
        />
      </View>
    </View>
  );
}
