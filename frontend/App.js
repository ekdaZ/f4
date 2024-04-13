import { useState, useEffect } from "react";
import { View, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import InputModal from "./src/Input.js";
import { EventRegister } from "react-native-event-listeners";
import Input from "./src/Input.js";

const baseUrl = "http://localhost:3001/";

export default function App() {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);

  useEffect(() => {
    const modalCloseListener = EventRegister.addEventListener(
      "closeModal",
      (data) => {
        if (data === "Input") {
          setInputModalVisible(false);
        } else if (data === "Export") {
          setExportModalVisible(false);
        }
        console.log(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(modalCloseListener);
    };
  }, []);

  const renderInput = () => {
    if (inputModalVisible) {
      return (
        <View className="relative flex mt-80 items-center align-middle">
          <InputModal />
        </View>
      );
    }
    return;
  };

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
          onPress={() => setInputModalVisible(true)}
        >
          <View>
            <Icon name="plus" size={20} />
          </View>
        </Pressable>
      </View>
      {renderInput()}
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
