
import { useState } from "react";
import { View, Pressable, Text, Button, TextInput, StyleSheet } from "react-native";
import { EventRegister } from "react-native-event-listeners";

const baseUrl = "http://localhost:3001/";

export default function Input() {
  const closeModal = () => {
    EventRegister.emit("closeModal", "Input");
  };

  const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    row: {
      flexDirection: 'row', // Set direction of inner items to row
      justifyContent: 'space-between', // Space items uniformly
      alignItems: 'center', // Align items vertically
      marginTop: 10 // Add top margin for spacing between rows
    },
    textInput: {
      flex: 1, // Take up all available space
      borderColor: 'gray',
      borderWidth: 1,
      padding: 8,
    },
    fullWidth: {
      flex: 1, // Ensure this element takes the full width
    },
    label: {
      marginRight: 10
    }
  });

  return (
    <View className="bg-gray-50 trans absolute -mt-[600px]" style={{width:"70%"}}>
      <View className="border rounded p-4 shadow-xl">
        <View className="grid grid-cols-2 grid-rows-4 gap-2">
        <View style={styles.container}>
      <TextInput
        placeholder="Event Name"
        placeholderTextColor="gray"
        width = "auto"
        fontWeight = "bold"
        fontSize = "20"
      />
      
      
      <View style={styles.row}>
        <Text style={styles.label}>Start Date:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="yyyy-mm-dd"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>End Date:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="yyyy-mm-dd"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Duration:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="num of hrs"
        />
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

