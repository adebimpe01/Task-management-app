import { getTasks } from '@/actions/tasks'
import TaskList from '@/components/tasks/TaskList'
import CreateTaskButton from '@/components/tasks/CreateTaskButton'
import TaskFilters from '@/components/tasks/TaskFilters'

interface TasksPageProps {
  searchParams: { status?: string; priority?: string }
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const tasks = await getTasks({
    status: searchParams.status,
    priority: searchParams.priority,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Tasks</h2>
          <p className="text-slate-500 text-sm mt-1">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <CreateTaskButton />
      </div>

      <TaskFilters />
      <TaskList tasks={tasks} />
    </div>
  )
}