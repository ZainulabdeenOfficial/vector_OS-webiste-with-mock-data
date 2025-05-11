"use client"

import type React from "react"

import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useData } from "@/context/data-context"
import { useRouter } from "next/navigation"

// Mock data
const mockProjectData = {
  title: "VectorOS Launchpad",
  description: "An innovative platform that streamlines Linux app deployments using containerized micro-services.",
  imageUrl: "https://example.com/images/vectoros.png",
  projectUrl: "https://vectoros.example.com",
  githubUrl: "https://github.com/yourname/vectoros",
  featured: true,
  order: 1,
  slug: "vectoros-launchpad",
  client: "Vector Technologies",
  year: "2023",
  duration: "6 months",
  tags: "React, Docker, Linux, Microservices",
}

export default function AddProjectPage() {
  const router = useRouter()
  const { addProject } = useData()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    year: "",
    duration: "",
    projectUrl: "",
    githubUrl: "",
    imageUrl: "",
    tags: "",
    featured: false,
    order: 1,
    slug: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, year: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Add project to data context
    addProject(formData)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/preview")
    }, 500)
  }

  const fillWithMockData = () => {
    setFormData(mockProjectData)
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    setFormData((prev) => ({ ...prev, slug }))
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Add New Project</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Fill in the information below to create a new project</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                  className="min-h-32"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    name="client"
                    placeholder="Client name"
                    value={formData.client}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={formData.year} onValueChange={handleSelectChange}>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[2023, 2022, 2021, 2020, 2019].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g. 3 months"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    name="order"
                    type="number"
                    placeholder="1"
                    value={formData.order}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectUrl">Project URL</Label>
                  <Input
                    id="projectUrl"
                    name="projectUrl"
                    placeholder="https://example.com"
                    value={formData.projectUrl}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    placeholder="https://github.com/username/repo"
                    value={formData.githubUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="React, Next.js, Tailwind CSS"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Project Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Button type="button" variant="outline" size="sm" onClick={generateSlug}>
                    Generate from Title
                  </Button>
                </div>
                <Input id="slug" name="slug" placeholder="project-name" value={formData.slug} onChange={handleChange} />
                <p className="text-xs text-muted-foreground">This will be used in the URL: /projects/your-slug</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="featured" checked={formData.featured} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <div className="flex flex-wrap justify-end gap-4">
                <Button type="button" variant="outline" onClick={fillWithMockData}>
                  Fill with Mock Data
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Project"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
