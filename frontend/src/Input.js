import { useState, useEffect } from "react";
import {
  View,
  Pressable,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { EventRegister } from "react-native-event-listeners";

const baseUrl = "http://localhost:3001/";

export default function Input() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [perWeek, setPerWeek] = useState('');
  const [submitted] = useState(false)
  const closeModal = () => {
    EventRegister.emit("closeModal", "Input");
  };

  const styles = StyleSheet.create({
    container: {
      padding: 8,
    },
    row: {
      flexDirection: "row", // Set direction of inner items to row
      justifyContent: "space-between", // Space items uniformly
      alignItems: "center", // Align items vertically
      marginTop: 10, // Add top margin for spacing between rows
    },
    textInput: {
      flex: 1, // Take up all available space
      borderColor: "gray",
      borderWidth: 1,
      padding: 8,
    },
    fullWidth: {
      flex: 1, // Ensure this element takes the full width
    },
    label: {
      marginRight: 10,
    },
  });

  useEffect(() => {
    const options = {
      method: "POST",
      url: baseUrl + "user_input",
      headers: {
        "content-type": "application/json",
      },
      data: {
        startDate: '',
        endDate: '',
        duration: '',
        perWeek: '',
        submitted: '',
      },
    };
    const gettingData = async () => {
      return await axios
        .request(options)
        .then((response) => {
          const jsonData = JSON.parse(response.data);
          const dataList = [];
          // for (let i = 0; i < jsonData.length; i++) {
          //   dataList.push({
          //     name: String(jsonData[i].name),
          //     begin: String(jsonData[i].begin.substring(11, 16)),
          //     end: String(jsonData[i].end.substring(11, 16)),
          //   });
          // }
          // setDateData(dataList);
        })
        .catch((error) => {
          console.log("this is the error ", error);
        });
    };
    gettingData();
  }, [submitted]);

  

  return (
    <View className="bg-gray-50 -mt-[600px]" style={{ width: "70%" }}>
      <View className="border rounded p-4 shadow-xl">
        <View className="grid grid-cols-2 grid-rows-4 gap-2">
          <View style={styles.container}>
            <Text className='text-center -mt-2 mb-3 text-2xl font-bold'>
              Create Event
            </Text>
            <TextInput
              placeholder="Event Name"
              placeholderTextColor="gray"
              width="auto"
              fontWeight="bold"
              fontSize="20"
            />

            <View style={styles.row}>
              <Text style={styles.label}>Start Date:</Text>
              <TextInput style={styles.textInput} placeholder="yyyy-mm-dd"  onChangeText={newText => setStartDate(newText)} />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>End Date:</Text>
              <TextInput style={styles.textInput} placeholder="yyyy-mm-dd" onChangeText={newText => setEndDate(newText)} />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Duration:</Text>
              <TextInput style={styles.textInput} placeholder="num of hrs" onChangeText={newText => setDuration(newText)} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Per Week</Text>
              <TextInput style={styles.textInput} placeholder="num of days"  onChangeText={newText => setPerWeek(newText)}/>
            </View>
          </View>
        </View>

        <View className="border border-gray-300 rounded shadow-2xl  ">
          <Button
            className=""
            title="submit"
            onPress={() => closeModal()}
          ></Button>
        </View>
      </View>
    </View>
  );
}
