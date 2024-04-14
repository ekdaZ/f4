import { useState, useEffect } from "react";
import { View, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { EventRegister } from "react-native-event-listeners";
import InputModal from "./src/Input.js";
import ExportModal from "./src/Export.js";
import CalenderView from "./src/CalenderView.js";

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
      }
    );
    return () => {
      EventRegister.removeEventListener(modalCloseListener);
    };
  }, []);

  const renderInput = () => {
    if (inputModalVisible) {
      return (
        <View className="relative flex top-[450px] items-center align-middle">
          <InputModal />
        </View>
      );
    }
    return;
  };
  const renderExport = () => {
    if (exportModalVisible) {
      return (
        <View className="relative flex top-[450px] items-center align-middle">
          <ExportModal />
        </View>
      );
    }
    return;
  };

  return (
    <View className="flex">
      <View className="flex top-4 z-10">
        <Pressable
          className="absolute top-10 rounded-full p-4 border left-5"
          onPress={() => {
            setExportModalVisible(true);
            setInputModalVisible(false);
          }}
        >
          <Icon name="download" size={20} />
        </Pressable>
        <Pressable
          className="absolute top-10 right-5 rounded-full p-4 border justify-end"
          onPress={() => {
            setInputModalVisible(true);
            setExportModalVisible(false);
          }}
        >
          <View>
            <Icon name="plus" size={20} />
          </View>
        </Pressable>
      </View>
      <View className="flex mt-[120px]">
        <CalenderView />
      </View>
      {renderInput()}
      {renderExport()}
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
