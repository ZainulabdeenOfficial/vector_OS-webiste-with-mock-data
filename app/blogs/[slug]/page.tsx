"use client"

import { useParams } from "next/navigation"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function BlogDetailPage() {
  const { slug } = useParams()
  const { blogs } = useData()
  const [blog, setBlog] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Find the blog with the matching slug
    const foundBlog = blogs.find((b) => b.slug === slug)
    setBlog(foundBlog)
    setIsLoading(false)
  }, [slug, blogs])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Link href="/blogs" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blogs
          </Link>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/blogs">Browse All Blogs</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link href="/blogs" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Blogs
        </Link>

        <article className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">{blog.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">{blog.title}</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              {blog.content.split("\n").map((paragraph: string, index: number) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {blog.tags && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.split(",").map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="font-normal">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </article>
      </div>
    </main>
  )
}
