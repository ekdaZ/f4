import { View, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
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

function onPressFunction(icon){
  console.log("pressing", icon)
}

