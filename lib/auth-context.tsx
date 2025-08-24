"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "PATIENT" | "DOCTOR" | "ADMIN"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: () => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem("healthcare-user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch {
          localStorage.removeItem("healthcare-user")
        }
      }
      setIsLoading(false)
    }
  }, [])

  const login = async (): Promise<boolean> => {
    // Simulate authentication for demo purposes
    const demoUser: User = {
      id: "demo-user",
      name: "Demo User",
      email: "demo@example.com",
      role: "PATIENT"
    }
    setUser(demoUser)
    if (typeof window !== 'undefined') {
      localStorage.setItem("healthcare-user", JSON.stringify(demoUser))
    }
    return true
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("healthcare-user")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
