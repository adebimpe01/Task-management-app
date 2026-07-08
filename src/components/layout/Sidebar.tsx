'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CheckSquare, LayoutDashboard, ListTodo, Users, Settings, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'My Tasks', icon: ListTodo, href: '/dashboard/tasks' },
  { label: 'Team', icon: Users, href: '/dashboard/team' },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckSquare size={18} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">TaskFlow</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-slate-500 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link
            href="/dashboard/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Settings size={18} />
            Settings
          </Link>
        </div>
      </aside>
    </>
  )
}