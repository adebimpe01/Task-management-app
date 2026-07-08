'use client'

import { signOut } from 'next-auth/react'
import { Bell, LogOut, User, Smile, Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  onMenuClick?: () => void
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 relative shrink-0">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-slate-500 hover:text-slate-700 p-1"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <Smile size={20} className="text-blue-600 hidden sm:block" />
          <h1 className="text-slate-900 font-semibold text-base sm:text-lg">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700">
          <Bell size={20} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full focus-visible:ring-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.image ?? ''} />
                <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} className="w-56 z-50 shadow-lg">
            <DropdownMenuLabel className="pb-2">
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500 font-normal">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User size={15} className="mr-2 text-slate-500" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              <LogOut size={15} className="mr-2" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}