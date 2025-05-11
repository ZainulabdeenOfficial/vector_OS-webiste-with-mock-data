"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useData } from "@/context/data-context"
import { useAuth } from "@/context/auth-context"
import { CardActions } from "@/components/card-actions"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export default function ProjectsPage() {
  const { projects, deleteProject } = useData()
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories from project tags
  const categories = Array.from(
    new Set(projects.flatMap((project) => project.tags?.split(",").map((tag) => tag.trim()) || []).filter(Boolean)),
  )

  // Filter projects by category if selected
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.tags?.includes(selectedCategory))
    : projects

  // Handle edit project
  const handleEditProject = (projectId: string) => {
    router.push(`/dashboard/edit-project/${projectId}`)
  }

  // Handle delete project
  const handleDeleteProject = (projectId: string) => {
    deleteProject(projectId)
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted.",
    })
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Projects</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Explore our portfolio of web applications, websites, and digital experiences that showcase our expertise in
          design and development.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 px-2 overflow-x-auto">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full whitespace-nowrap"
          >
            All Projects
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <div className="relative group h-full">
                {(isAuthenticated || isAdmin) && (
                  <CardActions
                    onEdit={() => handleEditProject(project.id)}
                    onDelete={() => handleDeleteProject(project.id)}
                    itemType="project"
                  />
                )}
                <Card className="group overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={project.imageUrl || "/placeholder.svg?height=300&width=500"}
                      alt={project.title || "Project"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Link href={`/projects/${project.slug}`}>
                        <Button variant="secondary" size="sm" className="gap-2">
                          <Eye size={16} />
                          View Project
                        </Button>
                      </Link>
                    </div>
                    {project.featured && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm sm:text-base">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.split(",").map((tag, index) => (
                        <Badge key={index} variant="secondary" className="font-normal text-xs">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
