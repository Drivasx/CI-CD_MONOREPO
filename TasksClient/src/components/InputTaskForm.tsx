import React, { useState } from 'react'

export const InputTaskForm = () => {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className='flex items-center gap-4'>
        <form onSubmit={handleSubmit} className='flex gap-2'>
            <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter task title'
            className='border p-2 rounded'
            />
            <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
            Add Task
            </button>
        </form>
    </div>
  )
}
