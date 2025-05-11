"use client"

import { useParams } from "next/navigation"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { projects } = useData()
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Find the project with the matching slug
    const foundProject = projects.find((p) => p.slug === slug)
    setProject(foundProject)
    setIsLoading(false)
  }, [slug, projects])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/projects">Browse All Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden mb-8">
              <Image
                src={project.imageUrl || "/placeholder.svg?height=600&width=1200"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags &&
                project.tags.split(",").map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="font-normal">
                    {tag.trim()}
                  </Badge>
                ))}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">{project.description}</p>

              {project.features && (
                <>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {project.features.split(",").map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{feature.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {project.projectUrl && (
                <Button asChild className="gap-2">
                  <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    Visit Project
                    <ExternalLink size={16} />
                  </Link>
                </Button>
              )}

              {project.githubUrl && (
                <Button asChild variant="outline" className="gap-2">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    View Code
                    <Github size={16} />
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Project Details</h3>

              <div className="space-y-4">
                {project.client && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Client</h4>
                    <p>{project.client}</p>
                  </div>
                )}

                {project.year && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Year</h4>
                    <p>{project.year}</p>
                  </div>
                )}

                {project.duration && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Duration</h4>
                    <p>{project.duration}</p>
                  </div>
                )}

                {project.tags && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.split(",").map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="font-normal">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border mt-6 pt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Share Project</h4>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <span className="sr-only">Share on Twitter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <span className="sr-only">Share on Facebook</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <span className="sr-only">Share on LinkedIn</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
