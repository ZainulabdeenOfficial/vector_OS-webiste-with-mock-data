"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard, BlogCard } from "@/components/admin-data-display"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

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

const mockBlogData = {
  title: "Understanding JavaScript Closures",
  content:
    "Closures are functions that have access to variables from another function's scope. This is often used to create private variables.",
  excerpt: "A quick guide to understanding closures in JavaScript.",
  published: true,
  slug: "understanding-javascript-closures",
  category: "Development",
  tags: "JavaScript, Web Development, Programming",
  date: new Date().toISOString().split("T")[0],
}

export default function PreviewPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [blogs, setBlogs] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("projects")

  // Load mock data on component mount
  useEffect(() => {
    // Initialize with mock data
    setProjects([
      mockProjectData,
      {
        ...mockProjectData,
        title: "Cloud Infrastructure",
        featured: false,
        tags: "AWS, Azure, DevOps",
        slug: "cloud-infrastructure",
      },
      {
        ...mockProjectData,
        title: "AI Assistant",
        featured: true,
        tags: "Python, TensorFlow, NLP",
        slug: "ai-assistant",
      },
    ])

    setBlogs([
      mockBlogData,
      { ...mockBlogData, title: "Mastering React Hooks", category: "React", slug: "mastering-react-hooks" },
      { ...mockBlogData, title: "CSS Grid Layout Guide", category: "Design", slug: "css-grid-layout-guide" },
    ])
  }, [])

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Content Preview</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activeTab === "projects" && (
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Preview how your projects will appear on the website</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/dashboard/add-project">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Project
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "blogs" && (
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Blog Posts</CardTitle>
                  <CardDescription>Preview how your blog posts will appear on the website</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/dashboard/add-blog">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Blog
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
