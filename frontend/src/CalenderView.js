import { View, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "react-native-calendars";

const baseUrl = "http://localhost:3001/";

export default function CalenderView() {
  const [selected, setSelected] = useState("");
  const [dateData, setDateData] = useState([
    {
      name: "dwa",
      begin: "gr",
      end: "gr",
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
          console.log("this is the error ", error);
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
          data={dateData}
          renderItem={(item) => (
            <View className="flex flex-col my-1">
              <Text className="text-lg">{item["item"].name} </Text>
              <Text className="text-gray-400 ">
                {item["item"].begin} - {item["item"].end}{" "}
              </Text>
              <View
              className='h-px mt-2 bg-gray-200 border-0 dark:bg-gray-700'
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}
