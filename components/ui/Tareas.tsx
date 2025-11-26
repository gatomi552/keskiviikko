import React, { useState, useEffect } from "react";
import {View,Text,Image,Button,ActivityIndicator,
  TextInput,ScrollView,TouchableOpacity,} from "react-native";
import axios from "axios";

type  Tarea = {
  name: string;
  types: string;
  stats: { name: string; base: number }[];
};

export default function Pokedex() {
  const [pokemon, setPokemon] = useState<Tarea | null>(null);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [tipoActual, setTipoActual] = useState<string | null>(null);
  const [listaTipo, setListaTipo] = useState<string[]>([]);
  const [indexTipo, setIndexTipo] = useState<number>(0);

  // 🔥 Obtiene datos del Pokémon por nombre o id
  const obtenerPokemon = async (input: string | number) => {
    setCargando(true);
    try {
      const respuesta = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${input.toString().toLowerCase()}`
      );
      const data = respuesta.data;

      const tipos = data.types.map((t: any) => t.type.name);

      setPokemon({
        name: data.name,
        types: tipos,
        stats: data.stats.map((s: any) => ({
          name: s.stat.name,
          base: s.base_stat,
        })),
      });

      // Si tiene tipo, actualizamos tipoActual (para recorrer luego)
      if (tipos.length > 0) setTipoActual(tipos[0]);
    } catch (error) {
      console.error("❌ Error al obtener Pokémon:", error);
      setPokemon(null);
    } finally {
      setCargando(false);
    }
  };

  // 🔍 Buscar por nombre o número
  const buscar = () => {
    if (busqueda.trim() === "") return;
    obtenerPokemon(busqueda);
  };

  // 🎯 Buscar por tipo (guarda lista para avanzar luego)
  const buscarPorTipo = async (tipo: string) => {
    setCargando(true);
    try {
      const respuesta = await axios.get(
        `https://pokeapi.co/api/v2/type/${tipo.toLowerCase()}`
      );

      const lista = respuesta.data.pokemon.map(
        (p: any) => p.pokemon.name
      ) as string[];

      setListaTipo(lista);
      setIndexTipo(0);
      setTipoActual(tipo);
      await obtenerPokemon(lista[0]);
    } catch (error) {
      console.error("❌ Error al filtrar por tipo:", error);
      setPokemon(null);
    } finally {
      setCargando(false);
    }
  };

  // 💪 Buscar Pokémon con HP alto
  const buscarHpAlto = async () => {
    setCargando(true);
    try {
      let encontrado = false;
      while (!encontrado) {
        const idPrueba = Math.floor(Math.random() * 600) + 1;
        const respuesta = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${idPrueba}`
        );
        const data = respuesta.data;
        const hp = data.stats[0].base_stat;
        if (hp > 100) {
          setPokemon({
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map((t: any) => t.type.name),
            hp,
            stats: data.stats.map((s: any) => ({
              name: s.stat.name,
              base: s.base_stat,
            })),
          });
          setTipoActual(data.types[0].type.name);
          encontrado = true;
        }
      }
    } catch (error) {
      console.error("❌ Error al buscar Pokémon con HP alto:", error);
    } finally {
      setCargando(false);
    }
  };

  // ➡️ Avanzar al siguiente del mismo tipo
  const siguientePokemon = async () => {
    if (listaTipo.length > 0 && indexTipo < listaTipo.length - 1) {
      const nuevoIndex = indexTipo + 1;
      setIndexTipo(nuevoIndex);
      await obtenerPokemon(listaTipo[nuevoIndex]);
    }
  };

  // ⬅️ Retroceder al anterior del mismo tipo
  const anteriorPokemon = async () => {
    if (listaTipo.length > 0 && indexTipo > 0) {
      const nuevoIndex = indexTipo - 1;
      setIndexTipo(nuevoIndex);
      await obtenerPokemon(listaTipo[nuevoIndex]);
    }
  };

  // ⚙️ Cargar inicial
  useEffect(() => {
    obtenerPokemon(1);
  }, []);

  if (cargando) {
    return (
      <View className="flex-1 justify-center items-center bg-pink-200">
        <ActivityIndicator size="large" color="red" />
        <Text className="mt-2 text-lg font-medium">Cargando Pokémon...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-pink-200">
      <View className="justify-center items-center p-4">
        <Text>              </Text>
        <Text className="text-3xl font-bold mb-6 text-red-500">Pokédex</Text>
        <Text className="text-2xl font-medium mr-2 text-blue-500 text-center">
          Busca por nombre, número o usa los filtros:
        </Text>

        {/* 🔍 Input de búsqueda */}
        <View className="flex-row items-center mb-4 w-72">
          <TextInput
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar por nombre o número"
            className="flex-1 border border-gray-400 rounded-lg px-3 py-2 text-base"
          />
          <Button title="Buscar" onPress={buscar} />
        </View>

        {/* 🎯 Botones de filtro */}
        <View className="flex-row flex-wrap justify-center mb-5 gap-2">
          {["fire", "water", "grass", "electric"].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              className="bg-orange-400 px-3 py-2 rounded-xl"
              onPress={() => buscarPorTipo(tipo)}
            >
              <Text className="text-white font-semibold capitalize">
                {tipo}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className="bg-purple-500 px-3 py-2 rounded-xl"
            onPress={buscarHpAlto}
          >
            <Text className="text-white font-semibold">HP &gt; 100</Text>
          </TouchableOpacity>
        </View>

        {/* 🎨 Mostrar Pokémon */}
        {pokemon ? (
          <View className="justify-center items-center bg-rose-400 p-4 rounded-2xl shadow-md">
            <Image source={{ uri: pokemon.image }} className="w-40 h-40" />
            <Text className="text-2xl font-semibold mt-4">
              {pokemon.name.toUpperCase()}
            </Text>

            <Text className="text-lg text-purple-700 mt-2">
              Tipo: {pokemon.types.join(", ").toUpperCase()}
            </Text>

            <View className="mt-3">
              {pokemon.stats.map((s, index) => (
                <Text key={index} className="text-base text-blue-700">
                  {s.name.toUpperCase()}: {s.base}
                </Text>
              ))}
            </View>
          </View>
        ) : (
          <Text className="text-lg text-red-500 mt-4">
            Pokémon no encontrado
          </Text>
        )}

        {/* ⬅️➡️ Botones de navegación */}
        <View className="flex-row mt-6 space-x-4">
          <Button title="Anterior" onPress={anteriorPokemon} />
          <Button title="Siguiente" onPress={siguientePokemon} />
        </View>
      </View>
    </ScrollView>
  );
}