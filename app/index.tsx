import { Text, View } from "react-native";
import AppTareas from "@/components/Tareas";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-emerald-900/25 h-screen text-center">
      <AppTareas></AppTareas>
    </View>
  );
}
