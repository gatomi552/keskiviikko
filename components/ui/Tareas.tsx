import React, { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, TextInput, ScrollView, TouchableOpacity,
} from "react-native";
import axios from "axios";

// 🔹 1) Cambia el tipo de datos según tu API  
// 👇 EJEMPLO DE FORMATO (modifícalo a tu necesidad)
type Item = {
  name: string;
  image?: string;
  category?: string;
  stats?: { name: string; value: number }[];
};

export default function MiApp() {
  const [item, setItem] = useState<Item | null>(null);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActual, setCategoriaActual] = useState<string | null>(null);
  const [listaCategoria, setListaCategoria] = useState<string[]>([]);
  const [indexCategoria, setIndexCategoria] = useState<number>(0);

  // ⭐ 2) FUNCIÓN PRINCIPAL PARA OBTENER UN ITEM  
  //    Aquí pones tu endpoint principal
  const obtenerItem = async (input: string | number) => {
    setCargando(true);
    try {

      const respuesta = await axios.get(
        // 👇 AQUÍ PON TU ENDPOINT PRINCIPAL
        `https://TU_API.com/items/${input}`
      );

      const data = respuesta.data;

      // 👇 ADAPTA ESTO SEGÚN TU API
      setItem({
        name: data.name,                   // Nombre del item
        image: data.image_url,             // Imagen (si existe)
        category: data.category,           // Categoría
        stats: data.stats?.map((s: any) => ({
          name: s.name,
          value: s.value,
        })),
      });

      setCategoriaActual(data.category);
    } catch (error) {
      console.error("❌ Error al obtener item:", error);
      setItem(null);
    } finally {
      setCargando(false);
    }
  };

  // ⭐ 3) Buscar por nombre o ID
  const buscar = () => {
    if (busqueda.trim() === "") return;
    obtenerItem(busqueda);
  };

  // ⭐ 4) Buscar lista filtrada por categoría  
  //    — Cambia la ruta del filtro por categoría
  const buscarPorCategoria = async (cat: string) => {
    setCargando(true);
    try {
      const respuesta = await axios.get(
        // 👇 AQUÍ PONES EL ENDPOINT QUE LISTA POR CATEGORÍA
        `https://TU_API.com/category/${cat}`
      );

      // 👇 Adáptalo según cómo devuelva tu API
      const lista = respuesta.data.items.map((i: any) => i.name);

      setListaCategoria(lista);
      setIndexCategoria(0);
      setCategoriaActual(cat);

      await obtenerItem(lista[0]);
    } catch (error) {
      console.error("❌ Error al filtrar:", error);
      setItem(null);
    } finally {
      setCargando(false);
    }
  };

  // ⭐ 5) Función ejemplo: buscar un item destacado  
  //     Puedes cambiar el criterio a lo que quieras
  const buscarDestacado = async () => {
    setCargando(true);
    try {
      const respuesta = await axios.get(
        // 👇 AQUÍ TU ENDPOINT DE ITEMS ALEATORIOS O DESTACADOS
        "https://TU_API.com/random"
      );

      const data = respuesta.data;

      setItem({
        name: data.name,
        image: data.image_url,
        category: data.category,
        stats: data.stats?.map((s: any) => ({
          name: s.name,
          value: s.value,
        })),
      });
    } catch (error) {
      console.error("❌ Error en destacado:", error);
    } finally {
      setCargando(false);
    }
  };

  // ⭐ 6) Siguiente en la categoría
  const siguienteItem = async () => {
    if (listaCategoria.length > 0 && indexCategoria < listaCategoria.length - 1) {
      const nuevoIndex = indexCategoria + 1;
      setIndexCategoria(nuevoIndex);
      await obtenerItem(listaCategoria[nuevoIndex]);
    }
  };

  // ⭐ 7) Anterior en la categoría
  const anteriorItem = async () => {
    if (listaCategoria.length > 0 && indexCategoria > 0) {
      const nuevoIndex = indexCategoria - 1;
      setIndexCategoria(nuevoIndex);
      await obtenerItem(listaCategoria[nuevoIndex]);
    }
  };

  // ⭐ 8) Cargar algo inicial al entrar
  useEffect(() => {
    obtenerItem(1); // 👈 Cambia esto si quieres que cargue otro ID
  }, []);

  // ⭐ 9) Loading
  if (cargando) {
    return (
      <View className="flex-1 justify-center items-center bg-pink-200">
        <ActivityIndicator size="large" color="red" />
        <Text className="mt-2 text-lg font-medium">Cargando...</Text>
      </View>
    );
  }

  // ⭐ 10) Render
  return (
    <ScrollView className="flex-1 bg-pink-200">
      <View className="justify-center items-center p-4">

        <Text className="text-3xl font-bold mb-4 text-red-500">Mi App</Text>
        <Text className="text-lg font-medium text-blue-500 text-center mb-4">
          Busca por nombre, número o usa los filtros:
        </Text>

        {/* 🔍 Buscar */}
        <View className="flex-row items-center mb-4 w-72">
          <TextInput
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar ID o nombre"
            className="flex-1 border border-gray-400 rounded-lg px-3 py-2 text-base"
          />
          <Button title="Buscar" onPress={buscar} />
        </View>

        {/* 🎯 Filtros (cámbialos según tu API) */}
        <View className="flex-row flex-wrap justify-center mb-5 gap-2">
          {["categoria1", "categoria2", "categoria3"].map((cat) => (
            <TouchableOpacity
              key={cat}
              className="bg-orange-400 px-3 py-2 rounded-xl"
              onPress={() => buscarPorCategoria(cat)}
            >
              <Text className="text-white font-semibold capitalize">
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className="bg-purple-500 px-3 py-2 rounded-xl"
            onPress={buscarDestacado}
          >
            <Text className="text-white font-semibold">Destacado ⭐</Text>
          </TouchableOpacity>
        </View>

        {/* 🎨 Mostrar Item */}
        {item ? (
          <View className="justify-center items-center bg-rose-400 p-4 rounded-2xl shadow-md">

            {/* NOMBRE */}
            <Text className="text-2xl font-semibold mt-4">
              {item.name.toUpperCase()}
            </Text>

            {/* CATEGORÍA */}
            {item.category && (
              <Text className="text-lg text-purple-700 mt-2">
                Categoría: {item.category.toUpperCase()}
              </Text>
            )}

          </View>
        ) : (
          <Text className="text-lg text-red-500 mt-4">No encontrado</Text>
        )}

        {/* Navegación */}
        <View className="flex-row mt-6 space-x-4">
          <Button title="Anterior" onPress={anteriorItem} />
          <Button title="Siguiente" onPress={siguienteItem} />
        </View>
      </View>
    </ScrollView>
  );
}
