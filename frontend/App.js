import { useState, useEffect } from "react";
import { View, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import InputModal from "./src/Input.js";
import { EventRegister } from 'react-native-event-listeners'


const baseUrl = "http://localhost:3001/";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=> {
    const modalCloseListener = EventRegister.addEventListener(
      'closeModal',
      data => {
        console.log(data)
      }
    );
    return () => {
      EventRegister.removeEventListener(modalCloseListener)
    };
  }, [])

  return (
    <View className="flex">
      <View className="flex top-4">
        <Pressable
          className="absolute top-10 rounded-full p-4 border left-5"
          onPress={() => onPressFunction("download")}
        >
          <Icon name="download" size={20} />
        </Pressable>
        <Pressable
          className="absolute top-10 right-10 rounded-full p-4 border justify-end"
          onPress={() => onPressFunction("download")}
        >
          <View>
            <Icon name="plus" size={20} />
          </View>
        </Pressable>
      </View>
      <View className="relative flex mt-80 items-center align-middle">
        <InputModal/>
      </View>
    </View>
  );
}

function importCalender(data) {
  axios.post(baseUrl + "generate_timetable");
}

function onPressFunction() {
  const options = {
    method: "POST",
    url: baseUrl + "get_timetable",
    headers: {
      "content-type": "application/json",
    },
    data: {
      week: "2024-02-24",
    },
  };

  const gettingData = async () => {
    return await axios
      .request(options)
      .then((response) => {
        console.log("resposne", response.data);
        return response;
      })
      .catch((error) => {
        console.log("this is the error ", error);
      });
  };
  return gettingData();
}
