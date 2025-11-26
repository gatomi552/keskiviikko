// components/ListaTareas.tsx
import TareaItem from "./TareaItem";

type ListaProps = {
  tareas: {
    id: string;
    title: string;
    description: string;
  }[];
  onEditar: (tarea: any) => void;
  onEliminar: (id: string) => void;
};

export default function ListaTareas({ tareas, onEditar, onEliminar }: ListaProps) {
  return (
    <>
      {tareas.map((t) => (
        <TareaItem
          key={t.id}
          tarea={t}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </>
  );
}
