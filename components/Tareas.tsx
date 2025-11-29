// AppTareas.tsx
import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import axios from "axios";

import FormTarea from "@/components/ui/FormTarea";
import ListaTareas from "@/components/ui/ListaTareas";

// URL CORRECTA (sin /tasks al final)
const API_URL = "http://192.168.18.162:3000/Tasks";

type Tarea = {
  id: string;
  title: string;
  description: string;
};

export default function AppTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const obtenerTareas = async () => {
    try {
      const res = await axios.get(API_URL);
      setTareas(res.data);
    } catch (err) {
      console.log("❌ Error obteniendo tareas:", err);
    }
  };

  const agregarTarea = async () => {
    try {
      await axios.post(API_URL, {
        title: titulo,
        description: descripcion
      });

      setTitulo("");
      setDescripcion("");
      obtenerTareas();
    } catch (err) {
      console.log("❌ Error agregando:", err);
    }
  };

  const editarTarea = async () => {
    try {
      await axios.put(`${API_URL}/${editandoId}`, {
        title: titulo,
        description: descripcion
      });

      setTitulo("");
      setDescripcion("");
      setEditandoId(null);
      obtenerTareas();
    } catch (err) {
      console.log("❌ Error editando:", err);
    }
  };

  const eliminarTarea = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      obtenerTareas();
    } catch (err) {
      console.log("❌ Error eliminando:", err);
    }
  };

  const seleccionarParaEditar = (t: Tarea) => {
    setTitulo(t.title);
    setDescripcion(t.description);
    setEditandoId(t.id);
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <ScrollView className="flex-1 bg-emerald-800/25 p-4">
      <Text className="text-3xl font-bold text-center text-rose-400 mb-4">
        Administrar Tareas
      </Text>

      <FormTarea
        titulo={titulo}
        descripcion={descripcion}
        setTitulo={setTitulo}
        setDescripcion={setDescripcion}
        editandoId={editandoId}
        agregarTarea={agregarTarea}
        editarTarea={editarTarea}
      />

      <Text className="text-2xl font-semibold mt-6 mb-2">
        Mis tareas:
      </Text>

      <ListaTareas
        tareas={tareas}
        onEditar={seleccionarParaEditar}
        onEliminar={eliminarTarea}
      />
    </ScrollView>
  );
}
