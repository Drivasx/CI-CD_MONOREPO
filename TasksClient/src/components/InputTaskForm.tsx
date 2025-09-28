import React, { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'

export const InputTaskForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const { addTask } = useTaskContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      await addTask(title, description, deadline || undefined)
      setTitle('')
      setDescription('')
      setDeadline('')
    }
  }

  return (
    <div className='flex items-center gap-4'>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='flex gap-2'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Título de la tarea'
                className='border p-2 rounded flex-1'
                required
              />
              <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Descripción (opcional)'
                className='border p-2 rounded flex-1'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-600'>
                Fecha límite (opcional):
              </label>
              <input
                type='date'
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className='border p-2 rounded w-full'
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Agregar Tarea
            </button>
        </form>
    </div>
  )
}
