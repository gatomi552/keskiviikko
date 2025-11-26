// components/FormTarea.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";

type FormProps = {//propiedades
  titulo: string;
  descripcion: string;
  setTitulo: (text: string) => void;
  setDescripcion: (text: string) => void;
  editandoId: string | null;
  agregarTarea: () => void;
  editarTarea: () => void;
};

export default function FormTarea({
  titulo,
  descripcion,
  setTitulo,
  setDescripcion,
  editandoId,
  agregarTarea,
  editarTarea,
}: FormProps) {
  return (
    <View className="bg-cyan-700 p-4 rounded-xl shadow">
      <Text className="text-lg font-semibold">Título de la tarea</Text>
      <TextInput
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ej: Comprar comida"
        className="border border-sky-500 rounded-lg p-2 mt-2"
      />

      <Text className="text-lg font-semibold mt-3">Descripción</Text>
      <TextInput
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Detalles..."
        className="border border-sky-500 rounded-lg p-2 mt-2"
      />

      <View className="mt-4">
      {editandoId ? (
      <TouchableOpacity onPress={editarTarea}
        className="bg-green-600 py-3 rounded-xl mt-4 active:bg-green-700" >
        <Text className="text-white text-center font-semibold text-lg">
          Guardar cambios
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={agregarTarea}
        className="bg-blue-600 py-3 rounded-xl mt-4 active:bg-blue-700" >
        <Text className="text-white text-center font-semibold text-lg">
          Agregar tarea
        </Text>
      </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
