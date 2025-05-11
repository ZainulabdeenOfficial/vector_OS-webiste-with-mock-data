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
  features?: string
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
    imageUrl: "/placeholder.svg?height=600&width=1200",
    projectUrl: "https://vectoros.example.com",
    githubUrl: "https://github.com/yourname/vectoros",
    featured: true,
    order: 1,
    slug: "vectoros-launchpad",
    client: "Vector Technologies",
    year: "2023",
    duration: "6 months",
    tags: "React, Docker, Linux, Microservices",
    features: "Responsive design, Containerized deployment, Real-time monitoring, Automated scaling",
  },
  {
    id: "2",
    title: "Cloud Infrastructure",
    description: "A scalable cloud infrastructure solution for modern web applications.",
    imageUrl: "/placeholder.svg?height=600&width=1200",
    projectUrl: "https://cloud.example.com",
    githubUrl: "https://github.com/yourname/cloud-infra",
    featured: false,
    order: 2,
    slug: "cloud-infrastructure",
    client: "Tech Startup",
    year: "2022",
    duration: "4 months",
    tags: "AWS, Azure, DevOps, Terraform",
    features: "Multi-cloud support, Infrastructure as code, CI/CD integration, Cost optimization",
  },
  {
    id: "3",
    title: "AI Assistant",
    description: "An intelligent assistant powered by machine learning algorithms.",
    imageUrl: "/placeholder.svg?height=600&width=1200",
    projectUrl: "https://ai.example.com",
    githubUrl: "https://github.com/yourname/ai-assistant",
    featured: true,
    order: 3,
    slug: "ai-assistant",
    client: "AI Research Lab",
    year: "2023",
    duration: "8 months",
    tags: "Python, TensorFlow, NLP, Machine Learning",
    features: "Natural language processing, Voice recognition, Contextual understanding, Continuous learning",
  },
]

const initialBlogs: Blog[] = [
  {
    id: "1",
    title: "Understanding JavaScript Closures",
    content:
      "Closures are functions that have access to variables from another function's scope. This is often used to create private variables.\n\nA closure is created when a function is defined inside another function, allowing the inner function to access variables from the outer function even after the outer function has finished executing.\n\nClosures are a powerful feature of JavaScript that enable data encapsulation and private state. They are commonly used in module patterns, callback functions, and event handlers.\n\nHere's a simple example of a closure:\n\n```javascript\nfunction createCounter() {\n  let count = 0;\n  \n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\n```\n\nIn this example, the inner function maintains access to the `count` variable even after `createCounter` has finished executing. This is the essence of a closure.",
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
      "React Hooks are a powerful feature that allows you to use state and other React features without writing a class.\n\nIntroduced in React 16.8, hooks let you 'hook into' React state and lifecycle features from function components. This means you can write more concise and readable code without the complexity of classes.\n\nThe most commonly used hooks are:\n\n- useState: For managing state in function components\n- useEffect: For handling side effects like data fetching\n- useContext: For consuming context in a component\n- useRef: For creating mutable references\n- useCallback and useMemo: For optimizing performance\n\nHooks follow two important rules:\n\n1. Only call hooks at the top level of your component\n2. Only call hooks from React function components or custom hooks\n\nBy following these rules, you ensure that hooks maintain their state correctly between renders.",
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
      "CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you lay content out in rows and columns.\n\nUnlike Flexbox which is primarily designed for one-dimensional layouts, Grid is designed for two-dimensional layouts - meaning it can handle both columns and rows.\n\nTo create a grid container, you set the display property to 'grid' or 'inline-grid'. Then you can define the columns and rows using the grid-template-columns and grid-template-rows properties.\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  grid-template-rows: auto;\n  gap: 20px;\n}\n```\n\nThe 'fr' unit represents a fraction of the available space. In the example above, we're creating three equal columns.\n\nGrid also introduces powerful features like:\n\n- Grid areas for naming sections of your layout\n- Auto-placement algorithms for automatically positioning items\n- Alignment control for both the grid itself and individual items\n- The ability to overlap items\n\nWith CSS Grid, complex layouts that were once difficult to achieve with CSS are now much simpler to implement.",
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
