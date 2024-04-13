import { useState } from "react";
import { View, Modal, Pressable, Text, Button } from "react-native";
import { EventRegister } from "react-native-event-listeners";
// import Modal from "react-native-modal";

const baseUrl = "http://localhost:3001/";

export default function Input() {
  const closeModal = () => {
    EventRegister.emit("closeModal", "Input");
  };

  return (
    <View className="mt-20 relative justify-center align-bottom">
      <View className="border rounded p-4 shadow-xl">
        <View>
          <Text>Write you code in here</Text>
          <View className='border border-gray-300 rounded shadow-2xl	'>
          <Button className='' title='submit'>
          </Button>
          </View>
        </View>
      </View>

    </View>
  );
}
