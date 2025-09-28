import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface TaskType {
  id: number;
  taskTitle: string;
  description?: string;
  deadline: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: TaskType[];
  addTask: (taskTitle: string, description?: string, deadline?: string) => Promise<void>;
  editTask: (id: number, taskTitle: string, description?: string, deadline?: string) => Promise<void>;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => Promise<void>;
  loading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext debe ser usado dentro de un TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/v1/tasks');
        if (!response.ok) {
          throw new Error('Error al cargar las tareas');
        }
        const data = await response.json();
        const tasksWithCompleted = data.map((task: any) => ({
          ...task,
          completed: task.completed || false
        }));
        setTasks(tasksWithCompleted);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (taskTitle: string, description?: string, deadline?: string) => {
    try {
      let formattedDeadline: string;
      if (deadline) {
        const date = new Date(deadline);
        formattedDeadline = date.toISOString().split('T')[0];
      } else {
        formattedDeadline = new Date().toISOString().split('T')[0];
      }

      const newTask = {
        taskTitle,
        description: description || '',
        deadline: formattedDeadline,
        completed: false
      };

      console.log('Enviando tarea:', newTask);

      const response = await fetch('http://localhost:8080/api/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      console.log('Respuesta del servidor:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        throw new Error(`Error al crear la tarea: ${response.status} - ${errorText}`);
      }

      if (response.status === 201) {
        console.log('Tarea creada exitosamente, recargando lista...');
        
        const tasksResponse = await fetch('http://localhost:8080/api/v1/tasks');
        if (tasksResponse.ok) {
          const updatedTasks = await tasksResponse.json();
          setTasks(updatedTasks);
          console.log('Lista de tareas actualizada:', updatedTasks);
        } else {
          const tempTask = { 
            ...newTask, 
            id: Date.now(), 
          };
          setTasks(prevTasks => [...prevTasks, tempTask]);
          console.log('Usando tarea temporal:', tempTask);
        }
      }
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Detalle del error:', errorMessage);
      
    }
  };

  const editTask = async (id: number, taskTitle: string, description?: string, deadline?: string) => {
    try {
      let formattedDeadline: string;
      if (deadline) {
        const date = new Date(deadline);
        formattedDeadline = date.toISOString().split('T')[0];
      } else {
        formattedDeadline = new Date().toISOString().split('T')[0];
      }

      const updatedTask = {
        taskTitle,
        description: description || '',
        deadline: formattedDeadline,
      };

      console.log('Actualizando tarea:', id, updatedTask);

      const response = await fetch(`http://localhost:8080/api/v1/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      console.log('Respuesta de actualización:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        throw new Error(`Error al actualizar la tarea: ${response.status} - ${errorText}`);
      }

      const updatedTaskFromServer = await response.json();
      console.log('Tarea actualizada recibida del servidor:', updatedTaskFromServer);

      setTasks(prevTasks =>
        prevTasks.map(task => {
          if (task.id === id) {
            return { ...updatedTaskFromServer, completed: task.completed };
          }
          return task;
        })
      );

      console.log('Estado local actualizado con la tarea editada');
    } catch (error) {
      console.error('Error al editar la tarea:', error);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = async (id: number) => {
    try {
      console.log('Eliminando tarea:', id);

      const response = await fetch(`http://localhost:8080/api/v1/tasks/${id}`, {
        method: 'DELETE',
      });

      console.log('Respuesta de eliminación:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        throw new Error(`Error al eliminar la tarea: ${response.status} - ${errorText}`);
      }

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      console.log('Tarea eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const value: TaskContextType = {
    tasks,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
    loading
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};