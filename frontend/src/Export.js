
import { useState } from "react";
import { View, Pressable, Text, Button, TextInput, StyleSheet } from "react-native";
import { EventRegister } from "react-native-event-listeners";

const baseUrl = "http://localhost:3001/";

export default function Export() {
  const closeModal = () => {
    EventRegister.emit("closeModal", "Export");
  };

  return (
    <View className="bg-gray-50 trans absolute -mt-[600px]" style={{width:"70%"}}>
      <View className="border rounded p-4 shadow-xl">
        <View className="grid grid-cols-2 grid-rows-4 gap-2">
        <View>
      <Text style={{fontWeight:"bold",fontSize:20}}>Export</Text>
      
      <View style={{width:"90%",backgroundColor:"#d8d8d8",alignSelf:"center",marginVertical:20,padding:10}}>
        <Text style={{fontSize:15}}>https://example.com/mycalendar.ics</Text>
      </View>
      
      </View>
        </View>

          <View className="border border-gray-300 rounded shadow-2xl  ">
            <Button
              className=""
              title="copy"
              onPress={() => closeModal()}
            ></Button>
          </View>
        </View>
      </View>
  );
}

