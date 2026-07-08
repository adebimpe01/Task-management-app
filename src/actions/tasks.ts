'use server'

import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { taskSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function createTask(data: {
  title: string
  description?: string
  status?: string
  priority?: string
  dueDate?: string
  assigneeId?: string
}) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const parsed = taskSchema.safeParse(data)
  if (!parsed.success) return { error: 'Invalid input' }

  const task = await db.task.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      status: parsed.data.status,
      priority: parsed.data.priority,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
      assigneeId: parsed.data.assigneeId || null,
      creatorId: session.user.id,
    },
  })

  revalidatePath('/dashboard')
  return { success: true, task }
}

export async function updateTask(
  id: string,
  data: {
    title?: string
    description?: string
    status?: string
    priority?: string
    dueDate?: string
    assigneeId?: string
  }
) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const task = await db.task.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.status && { status: data.status as any }),
      ...(data.priority && { priority: data.priority as any }),
      ...(data.dueDate ? { dueDate: new Date(data.dueDate) } : { dueDate: null }),
      ...(data.assigneeId !== undefined && { assigneeId: data.assigneeId || null }),
    },
  })

  revalidatePath('/dashboard')
  return { success: true, task }
}

export async function deleteTask(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  await db.task.delete({ where: { id } })

  revalidatePath('/dashboard')
  return { success: true }
}

export async function getTasks(filters?: {
  status?: string
  priority?: string
  assigneeId?: string
}) {
  const session = await auth()
  if (!session?.user?.id) return []

  const tasks = await db.task.findMany({
    where: {
      OR: [
        { creatorId: session.user.id },
        { assigneeId: session.user.id },
      ],
      ...(filters?.status && { status: filters.status as any }),
      ...(filters?.priority && { priority: filters.priority as any }),
      ...(filters?.assigneeId && { assigneeId: filters.assigneeId }),
    },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return tasks
}

export async function getUsers() {
  const session = await auth()
  if (!session?.user?.id) return []

  const users = await db.user.findMany({
    select: { id: true, name: true, email: true },
  })

  return users
}