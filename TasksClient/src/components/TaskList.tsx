import { useEffect, useState } from "react"
import { Task } from "./Task"

interface TaskType {
  id: number;
  taskTitle: string;
  description?: string;
  deadline: string;
  completed: boolean;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/tasks')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setTasks(data)
        console.log(data)
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    }
    fetchTasks()
  }, [])
  return (
    <div>
        {tasks.map((task) => {
            return (
                <Task 
                    key={task.id as number} 
                    props={{
                        id: task.id,
                        taskTitle: task.taskTitle,
                        description: task.description,
                        deadline: new Date(task.deadline).toISOString(),
                        completed: task.completed,
                        onToggle: (id) => {
                            // Handle toggle logic here
                            console.log(`Toggled task with id: ${id}`)
                        }
                    }} 
                />
            )
        })}
    </div>
  )
}
