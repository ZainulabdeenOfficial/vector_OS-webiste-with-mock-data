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

export default function AddBlogPage() {
  const router = useRouter()
  const { addBlog } = useData()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    date: new Date().toISOString().split("T")[0],
    published: false,
    slug: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Add blog to data context
    addBlog(formData)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/preview")
    }, 500)
  }

  const fillWithMockData = () => {
    setFormData(mockBlogData)
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
          <h2 className="text-3xl font-bold tracking-tight">Add New Blog Post</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blog Post Details</CardTitle>
            <CardDescription>Fill in the information below to create a new blog post</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Blog Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={handleSelectChange}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Design", "Development", "Performance", "Accessibility", "Animation"].map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Publication Date</Label>
                  <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Enter a short description of the blog post"
                  className="min-h-20"
                  value={formData.excerpt}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">A brief summary that will appear in blog listings</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog post content here..."
                  className="min-h-64"
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="react, design, tutorial"
                  value={formData.tags}
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
                <Input
                  id="slug"
                  name="slug"
                  placeholder="blog-post-title"
                  value={formData.slug}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">This will be used in the URL: /blogs/your-slug</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="published" checked={formData.published} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="published">Publish immediately</Label>
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
                      Publishing...
                    </>
                  ) : (
                    "Publish"
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
