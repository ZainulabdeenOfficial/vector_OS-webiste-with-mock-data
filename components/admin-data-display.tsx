"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { CalendarIcon, Clock, Github, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Project display component
export function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.imageUrl || "/placeholder.svg?height=300&width=500"}
          alt={project.title}
          fill
          className="object-cover"
        />
        {project.featured && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags &&
            project.tags.split(",").map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {tag.trim()}
              </Badge>
            ))}
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="mr-2 h-4 w-4" />
          <span>{project.duration}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{project.year}</span>
        </div>

        <div className="flex gap-2">
          {project.projectUrl && (
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                Visit
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Code
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Blog display component
export function BlogCard({ blog }: { blog: any }) {
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline">{blog.category}</Badge>
          {blog.published ? (
            <Badge variant="default" className="bg-green-500">
              Published
            </Badge>
          ) : (
            <Badge variant="secondary">Draft</Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 mb-4">{blog.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags &&
            blog.tags.split(",").map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {tag.trim()}
              </Badge>
            ))}
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{new Date(blog.date).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
