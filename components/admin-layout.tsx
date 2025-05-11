"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Home, LogOut, Menu, PlusCircle, User, Users, UserPlus, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle"
import { VectorLogo } from "./vector-logo"
import { motion, AnimatePresence } from "framer-motion"

// Cleaned up sidebar items - removed unnecessary tabs
const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Content",
    items: [
      {
        title: "Add Project",
        href: "/dashboard/add-project",
        icon: PlusCircle,
      },
      {
        title: "Add Blog",
        href: "/dashboard/add-blog",
        icon: FileText,
      },
      {
        title: "Add Team Member",
        href: "/dashboard/add-team",
        icon: Users,
      },
    ],
  },
  {
    title: "Admin Management",
    items: [
      {
        title: "Add Admin",
        href: "/dashboard/add-admin",
        icon: UserPlus,
      },
    ],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Ensure sidebar is open on page navigation
    setIsSidebarOpen(true)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: 0 }}
          animate={{ x: isSidebarOpen ? 0 : -320 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 25,
            mass: 1,
            velocity: 0,
          }}
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background shadow-lg lg:shadow-none transition-all lg:static",
            !isSidebarOpen && "transform -translate-x-full lg:translate-x-0",
          )}
        >
          <div className="flex h-14 items-center border-b px-4">
            <VectorLogo size="small" />
            <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X size={18} />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <nav className="flex-1 overflow-auto py-4 custom-scrollbar">
            <ul className="grid gap-1 px-2">
              {sidebarItems.map((item, i) => (
                <li key={i}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                        pathname === item.href ? "bg-muted" : "transparent",
                      )}
                    >
                      {item.icon && <item.icon size={16} />}
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <div className="px-3 py-2">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.title}
                      </div>
                      {item.items?.map((subItem, j) => (
                        <Link
                          key={j}
                          href={subItem.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                            pathname === subItem.href ? "bg-muted" : "transparent",
                          )}
                        >
                          {subItem.icon && <subItem.icon size={16} />}
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-3 px-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Admin User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={18} />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="search"
                  placeholder="Search..."
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8"
                />
              </div>
            </form>
          </div>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
