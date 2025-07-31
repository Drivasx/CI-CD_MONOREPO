interface TaskProps {
  id: number;
  taskTitle: string;
  description?: string;
  deadline: string;
  completed: boolean;
  onToggle: (id: number) => void;
}

export const Task = ({props}: {props: TaskProps}) => {
  return (
    <div className="flex gap-4 p-4 border-b border-gray-200">
    <div className="flex flex-col">

      <h1 className="text-lg font-semibold">{props.taskTitle}</h1>
      <span className="text-gray-500 text-sm">{props.description}</span>
    </div>
    </div>
  )
}