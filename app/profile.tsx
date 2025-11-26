import { Text, View } from "react-native";
import TextField from "@/components/Singup/Textfield";
import Textname from "@/components/Singup/Textname";
import TextContra from "@/components/Singup/TextContra";
import "@/global.css"

export default function Tab() {
  return (
    <View className="flex-1 justify-center items-center bg-red-100 h-screen">
      <Text className="text-xl font-bold text-gray-900 mb-2">Escribe tu nombre</Text>
      <Textname></Textname>
      <Text className="text-xl font-bold text-gray-900 mb-2">Escribe tu email</Text>
      <TextField></TextField>
      <Text className="text-xl font-bold text-gray-900 mb-2">Escribe tu contraseña</Text>
      <TextContra></TextContra>
    </View>
  );
}