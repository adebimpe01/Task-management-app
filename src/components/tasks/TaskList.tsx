'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Calendar, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { deleteTask } from '@/actions/tasks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import EditTaskDialog from './EditTaskDialog'

type Task = {
  id: string
  title: string
  description?: string | null
  status: string
  priority: string
  dueDate?: Date | null
  creator: { id: string; name: string | null; email: string }
  assignee?: { id: string; name: string | null; email: string } | null
}

const statusColors: Record<string, string> = {
  TODO: 'bg-slate-100 text-slate-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  IN_REVIEW: 'bg-purple-100 text-purple-700',
  DONE: 'bg-green-100 text-green-700',
}

const priorityColors: Record<string, string> = {
  LOW: 'bg-slate-100 text-slate-600',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HIGH: 'bg-orange-100 text-orange-700',
  URGENT: 'bg-red-100 text-red-700',
}

const statusLabels: Record<string, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
}

interface TaskListProps {
  tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  const router = useRouter()
  const [editTask, setEditTask] = useState<Task | null>(null)

  if (tasks.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-slate-400 text-sm">No tasks yet. Create your first task!</p>
      </Card>
    )
  }

  async function handleDelete(id: string) {
    await deleteTask(id)
    router.refresh()
  }

  return (
    <>
      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start sm:items-center gap-2 flex-wrap mb-1">
                  <h4 className="font-medium text-slate-900 truncate">
                    {task.title}
                  </h4>
                  <Badge className={statusColors[task.status]}>
                    {statusLabels[task.status]}
                  </Badge>
                  <Badge className={priorityColors[task.priority]}>
                    {task.priority}
                  </Badge>
                </div>

                {task.description && (
                  <p className="text-sm text-slate-500 truncate mt-1">
                    {task.description}
                  </p>
                )}

                <div className="flex items-center gap-4 mt-2">
                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar size={12} />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}
                  {task.assignee && (
                    <div className="flex items-center gap-1">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                          {task.assignee.name?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-slate-400">
                        {task.assignee.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditTask(task)}>
                    <Pencil size={14} className="mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash2 size={14} className="mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>

      {editTask && (
        <EditTaskDialog
          task={editTask}
          open={!!editTask}
          onClose={() => setEditTask(null)}
        />
      )}
    </>
  )
}