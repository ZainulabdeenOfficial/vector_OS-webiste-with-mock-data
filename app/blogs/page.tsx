"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useData } from "@/context/data-context"
import { useAuth } from "@/context/auth-context"
import { CardActions } from "@/components/card-actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"

export default function BlogsPage() {
  const { blogs, deleteBlog } = useData()
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean)))]

  // Filter blogs by search query and category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
        <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredBlogs.map((blog) => (
            <motion.div key={blog.id} variants={item}>
              <Link href={`/blogs/${blog.slug}`} className="group">
                <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md relative">
                  {(isAuthenticated || isAdmin) && (
                    <CardActions
                      onEdit={() => router.push(`/dashboard/edit-blog/${blog.id}`)}
                      onDelete={() => deleteBlog(blog.id)}
                    />
                  )}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={"/placeholder.svg?height=200&width=400"}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      {blog.category}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground">
                    {new Date(blog.date).toLocaleDateString()}
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No blogs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <Button key={page} variant={page === 1 ? "default" : "outline"} size="icon" className="w-10 h-10">
                {page}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
