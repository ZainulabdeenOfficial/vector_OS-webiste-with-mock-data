"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for our data
type Project = {
  id: string
  title: string
  description: string
  imageUrl: string
  projectUrl?: string
  githubUrl?: string
  featured: boolean
  order: number
  slug: string
  client?: string
  year?: string
  duration?: string
  tags?: string
}

type Blog = {
  id: string
  title: string
  content: string
  excerpt: string
  published: boolean
  slug: string
  category?: string
  tags?: string
  date: string
}

type DataContextType = {
  projects: Project[]
  blogs: Blog[]
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  addBlog: (blog: Omit<Blog, "id">) => void
  updateBlog: (id: string, blog: Partial<Blog>) => void
  deleteBlog: (id: string) => void
}

// Mock data
const initialProjects: Project[] = [
  {
    id: "1",
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
  },
  {
    id: "2",
    title: "Cloud Infrastructure",
    description: "A scalable cloud infrastructure solution for modern web applications.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    projectUrl: "https://cloud.example.com",
    githubUrl: "https://github.com/yourname/cloud-infra",
    featured: false,
    order: 2,
    slug: "cloud-infrastructure",
    client: "Tech Startup",
    year: "2022",
    duration: "4 months",
    tags: "AWS, Azure, DevOps, Terraform",
  },
  {
    id: "3",
    title: "AI Assistant",
    description: "An intelligent assistant powered by machine learning algorithms.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    projectUrl: "https://ai.example.com",
    githubUrl: "https://github.com/yourname/ai-assistant",
    featured: true,
    order: 3,
    slug: "ai-assistant",
    client: "AI Research Lab",
    year: "2023",
    duration: "8 months",
    tags: "Python, TensorFlow, NLP, Machine Learning",
  },
]

const initialBlogs: Blog[] = [
  {
    id: "1",
    title: "Understanding JavaScript Closures",
    content:
      "Closures are functions that have access to variables from another function's scope. This is often used to create private variables.",
    excerpt: "A quick guide to understanding closures in JavaScript.",
    published: true,
    slug: "understanding-javascript-closures",
    category: "Development",
    tags: "JavaScript, Web Development, Programming",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "2",
    title: "Mastering React Hooks",
    content:
      "React Hooks are a powerful feature that allows you to use state and other React features without writing a class.",
    excerpt: "Learn how to use React Hooks effectively in your projects.",
    published: true,
    slug: "mastering-react-hooks",
    category: "React",
    tags: "React, Hooks, JavaScript, Frontend",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "3",
    title: "CSS Grid Layout Guide",
    content:
      "CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you lay content out in rows and columns.",
    excerpt: "A comprehensive guide to CSS Grid Layout.",
    published: true,
    slug: "css-grid-layout-guide",
    category: "Design",
    tags: "CSS, Web Design, Layout, Frontend",
    date: new Date().toISOString().split("T")[0],
  },
]

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    // Load data from localStorage or use initial data
    const storedProjects = localStorage.getItem("projects")
    const storedBlogs = localStorage.getItem("blogs")

    setProjects(storedProjects ? JSON.parse(storedProjects) : initialProjects)
    setBlogs(storedBlogs ? JSON.parse(storedBlogs) : initialBlogs)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projects))
    }
    if (blogs.length > 0) {
      localStorage.setItem("blogs", JSON.stringify(blogs))
    }
  }, [projects, blogs])

  const addProject = (project: Omit<Project, "id">) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    }
    setProjects((prev) => [...prev, newProject])
  }

  const updateProject = (id: string, project: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...project } : p)))
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const addBlog = (blog: Omit<Blog, "id">) => {
    const newBlog = {
      ...blog,
      id: Date.now().toString(),
    }
    setBlogs((prev) => [...prev, newBlog])
  }

  const updateBlog = (id: string, blog: Partial<Blog>) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...blog } : b)))
  }

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <DataContext.Provider
      value={{
        projects,
        blogs,
        addProject,
        updateProject,
        deleteProject,
        addBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
