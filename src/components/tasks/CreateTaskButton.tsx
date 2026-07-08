'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import CreateTaskDialog from './CreateTaskDialog'

export default function CreateTaskButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus size={16} className="mr-2" />
        New Task
      </Button>
      <CreateTaskDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}