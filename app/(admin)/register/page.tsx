"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Loader2 } from "lucide-react"

// Mock data
const mockRegisterData = {
  username: "john",
  email: "random@hm.com",
  password: "ldodkdk",
  secretcode: "lol",
}

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    secretcode: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Registration data submitted:", formData)
      setIsLoading(false)
      window.location.href = "/login"
    }, 1000)
  }

  const fillWithMockData = () => {
    setFormData(mockRegisterData)
  }

  return (
    <ThemeProvider>
      <main className="min-h-screen flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-border shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Admin Registration</CardTitle>
            <CardDescription>Create a new admin account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secretcode">Admin Secret Code</Label>
                <Input
                  id="secretcode"
                  name="secretcode"
                  type="password"
                  value={formData.secretcode}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">You need a secret code to register as an admin</p>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
              <Button type="button" variant="outline" className="w-full mt-2" onClick={fillWithMockData}>
                Fill with Mock Data
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </ThemeProvider>
  )
}
