"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Sample data
const featuredProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with a sleek UI, shopping cart functionality, and payment integration.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A creative portfolio website for a photographer with image galleries and contact form.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Three.js", "GSAP"],
  },
]

const featuredBlogs = [
  {
    id: 1,
    title: "10 Tips for Modern Web Design",
    snippet: "Learn the essential principles that make websites stand out in 2023.",
    date: "May 2, 2023",
    category: "Design",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "The Future of React Development",
    snippet: "Exploring the latest features and best practices in React 18.",
    date: "April 15, 2023",
    category: "Development",
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Simplified animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export default function FeaturedSection() {
  // Optimize IntersectionObserver with larger rootMargin for earlier loading
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  })

  const [blogsRef, blogsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  })

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-center mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Check out some of our recent work that showcases our expertise in web development and design.
          </p>
        </motion.div>

        <motion.div
          ref={projectsRef}
          variants={container}
          initial="hidden"
          animate={projectsInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card className="group overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="secondary" size="sm" className="gap-2 rounded-full shadow-lg">
                        View Project
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mb-20">
          <Link href="/projects">
            <Button
              variant="outline"
              className="gap-2 rounded-full px-6 hover:bg-primary hover:text-white transition-colors duration-300"
            >
              View All Projects
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-center mb-4">
            <span className="gradient-text">Latest Articles</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Read our latest thoughts on design, development, and digital trends.
          </p>
        </motion.div>

        <motion.div
          ref={blogsRef}
          variants={container}
          initial="hidden"
          animate={blogsInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {featuredBlogs.map((blog) => (
            <motion.div key={blog.id} variants={item}>
              <Link href={`/blogs/${blog.id}`} className="group">
                <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md border-border hover:border-primary/50">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full shadow-md">
                      {blog.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{blog.snippet}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                      {blog.date}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link href="/blogs">
            <Button
              variant="outline"
              className="gap-2 rounded-full px-6 hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Read All Articles
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
