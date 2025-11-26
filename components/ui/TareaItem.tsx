// components/TareaItem.tsx
import { View, Text, TouchableOpacity } from "react-native";

type TareaProps = {
  tarea: { id: string; title: string; description: string };
  onEditar: (tarea: any) => void;
  onEliminar: (id: string) => void;
};

export default function TareaItem({ tarea, onEditar, onEliminar }: TareaProps) {
  return (
    <View className="bg-white p-4 rounded-xl shadow mb-3 border border-gray-300">
      <Text className="text-xl font-bold text-blue-700">{tarea.title}</Text>
      <Text className="text-base text-gray-600">{tarea.description}</Text>

      <View className="flex-row mt-3 gap-4">
        <TouchableOpacity
          className="bg-yellow-500 px-4 py-2 rounded-xl"
          onPress={() => onEditar(tarea)}
        >
          <Text className="text-white font-bold">Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded-xl"
          onPress={() => onEliminar(tarea.id)}
        >
          <Text className="text-white font-bold">Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}