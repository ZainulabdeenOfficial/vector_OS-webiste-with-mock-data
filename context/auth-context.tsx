"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock authentication logic
      if (email === "admin@example.com" && password === "admin") {
        const adminUser = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin" as const,
        }
        setUser(adminUser)
        localStorage.setItem("user", JSON.stringify(adminUser))
      } else if (email === "user@example.com" && password === "user") {
        const regularUser = {
          id: "2",
          name: "Regular User",
          email: "user@example.com",
          role: "user" as const,
        }
        setUser(regularUser)
        localStorage.setItem("user", JSON.stringify(regularUser))
      } else if (email === "random@hm.com" && password === "ldodkdk") {
        // Mock data login
        const adminUser = {
          id: "3",
          name: "John",
          email: "random@hm.com",
          role: "admin" as const,
        }
        setUser(adminUser)
        localStorage.setItem("user", JSON.stringify(adminUser))
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === "admin",
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
