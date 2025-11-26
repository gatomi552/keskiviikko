// components/FormTarea.tsx
import { View, Text, TextInput, Button } from "react-native";

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
    <View className="bg-white p-4 rounded-xl shadow">
      <Text className="text-lg font-semibold">Título de la tarea</Text>
      <TextInput
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ej: Comprar comida"
        className="border border-gray-400 rounded-lg p-2 mt-2"
      />

      <Text className="text-lg font-semibold mt-3">Descripción</Text>
      <TextInput
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Detalles..."
        className="border border-gray-400 rounded-lg p-2 mt-2"
      />

      <View className="mt-4">
        {editandoId ? (
          <Button title="Guardar cambios" color="green" onPress={editarTarea} />
        ) : (
          <Button title="Agregar tarea" onPress={agregarTarea} />
        )}
      </View>
    </View>
  );
}
