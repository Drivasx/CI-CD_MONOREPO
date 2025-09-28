import { Task } from "./Task"
import { useTaskContext } from "../context/TaskContext"

export const TaskList = () => {
  const { tasks, toggleTask, loading } = useTaskContext()

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-lg">Cargando tareas...</div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No hay tareas disponibles. ¡Agrega tu primera tarea!
      </div>
    )
  }

  return (
    <div>
        {tasks.map((task) => {
            return (
                <Task 
                    key={task.id} 
                    props={{
                        id: task.id,
                        taskTitle: task.taskTitle,
                        description: task.description,
                        deadline: new Date(task.deadline).toISOString(),
                        completed: task.completed,
                        onToggle: toggleTask
                    }} 
                />
            )
        })}
    </div>
  )
}
