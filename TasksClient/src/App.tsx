import './App.css'
import { InputTaskForm } from './components/InputTaskForm'
import { TaskList } from './components/TaskList'

function App() {

  return (
    <main className='m-6'>
      <h1 className='text-2xl font-bold pb-6'>Tasks List</h1>
      <InputTaskForm />
      <hr className='my-4 border-t border-gray-300' />
      <TaskList />
    </main>
  )
}

export default App
