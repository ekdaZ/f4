import { useState } from "react";
import { View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const baseUrl = "http://localhost:3001/";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="relative">
      <View className="top-4">
        {/* add button on the right */}
        <Pressable
          className="absolute top-10 rounded-full p-4 border left-5"
          onPress={() => onPressFunction("download")}
        >
          <Icon name="download" size={20} />
        </Pressable>
        {/* export button on the left */}
        <Pressable
          className="absolute top-10 right-10 rounded-full p-4 border justify-end"
          onPress={() => onPressFunction("download")}
        >
          <View>
            <Icon name="plus" size={20} />
          </View>
        </Pressable>
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
