'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

const statuses = [
  { label: 'All', value: '' },
  { label: 'To Do', value: 'TODO' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'In Review', value: 'IN_REVIEW' },
  { label: 'Done', value: 'DONE' },
]

const priorities = [
  { label: 'All', value: '' },
  { label: 'Low', value: 'LOW' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'High', value: 'HIGH' },
  { label: 'Urgent', value: 'URGENT' },
]

export default function TaskFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get('status') ?? ''
  const currentPriority = searchParams.get('priority') ?? ''

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/dashboard/tasks?${params.toString()}`)
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
          Status
        </p>
        <div className="flex flex-wrap gap-2">
          {statuses.map(({ label, value }) => (
            <Button
              key={value}
              size="sm"
              variant={currentStatus === value ? 'default' : 'outline'}
              className={
                currentStatus === value
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : ''
              }
              onClick={() => updateFilter('status', value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
          Priority
        </p>
        <div className="flex flex-wrap gap-2">
          {priorities.map(({ label, value }) => (
            <Button
              key={value}
              size="sm"
              variant={currentPriority === value ? 'default' : 'outline'}
              className={
                currentPriority === value
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : ''
              }
              onClick={() => updateFilter('priority', value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}