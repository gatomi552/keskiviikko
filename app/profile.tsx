import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import TextField from "@/components/Singup/Textfield";
import Textname from "@/components/Singup/Textname";
import TextContra from "@/components/Singup/TextContra";
import "@/global.css";

export default function Tab() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center bg-rose-400/15 px-4 py-8">
          <Text className="text-xl font-bold text-gray-900 mb-2">
            Escribe tu nombre
          </Text>
          <Textname />

          <Text className="text-xl font-bold text-gray-900 mb-2">
            Escribe tu email
          </Text>
          <TextField />

          <Text className="text-xl font-bold text-gray-900 mb-2">
            Escribe tu contraseña
          </Text>
          <TextContra />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}