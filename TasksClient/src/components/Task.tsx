import { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";

interface TaskProps {
  id: number;
  taskTitle: string;
  description?: string;
  deadline: string;
  completed: boolean;
  onToggle: (id: number) => void;
}

export const Task = ({props}: {props: TaskProps}) => {
  const { editTask, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(props.taskTitle);
  const [editDescription, setEditDescription] = useState(props.description || '');
  const [editDeadline, setEditDeadline] = useState(
    new Date(props.deadline).toISOString().split('T')[0]
  );

  useEffect(() => {
    setEditTitle(props.taskTitle);
    setEditDescription(props.description || '');
    setEditDeadline(new Date(props.deadline).toISOString().split('T')[0]);
  }, [props.taskTitle, props.description, props.deadline]);

  const handleEdit = async () => {
    if (isEditing) {
      console.log('Valores a enviar para editar:', {
        id: props.id,
        title: editTitle,
        description: editDescription,
        deadline: editDeadline
      });
      await editTask(props.id, editTitle, editDescription, editDeadline);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditTitle(props.taskTitle);
    setEditDescription(props.description || '');
    setEditDeadline(new Date(props.deadline).toISOString().split('T')[0]);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      await deleteTask(props.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  return (
    <div className="flex justify-between items-start gap-4 p-4 border-b border-gray-200 bg-white hover:bg-gray-50">
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full text-lg font-semibold border border-gray-300 rounded px-2 py-1"
              placeholder="Título de la tarea"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full text-gray-500 text-sm border border-gray-300 rounded px-2 py-1 resize-none"
              placeholder="Descripción"
              rows={2}
            />
            <input
              type="date"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className={`text-lg font-semibold ${props.completed ? 'line-through text-gray-400' : ''}`}>
              {props.taskTitle}
            </h1>
            <span className="text-gray-500 text-sm">{props.description}</span>
            <span className="text-gray-400 text-xs mt-1">
              Fecha límite: {formatDate(props.deadline)}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={props.completed}
          onChange={() => props.onToggle(props.id)}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />

        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  )
}