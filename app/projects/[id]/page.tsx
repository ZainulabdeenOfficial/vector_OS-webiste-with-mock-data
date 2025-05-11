import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform with a sleek UI, shopping cart functionality, and payment integration. This project was built for a client in the fashion industry who needed a robust online store to showcase their products and handle transactions securely.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    features: [
      "Responsive product catalog with filtering and sorting",
      "User authentication and account management",
      "Shopping cart with persistent storage",
      "Secure checkout with Stripe integration",
      "Order history and tracking",
      "Admin dashboard for inventory management",
    ],
    client: "Fashion Boutique",
    duration: "3 months",
    year: "2023",
    link: "#",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "A creative portfolio website for a photographer with image galleries and contact form. The site features smooth animations, a masonry layout for the gallery, and a custom lightbox for viewing images.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React", "Three.js", "GSAP", "Tailwind CSS"],
    features: [
      "Interactive 3D elements using Three.js",
      "Smooth page transitions with GSAP",
      "Responsive masonry gallery layout",
      "Custom image lightbox with gestures",
      "Contact form with validation",
      "Integration with Instagram API",
    ],
    client: "Professional Photographer",
    duration: "2 months",
    year: "2023",
    link: "#",
  },
  {
    id: 3,
    title: "Dashboard UI",
    description:
      "An admin dashboard with data visualization, user management, and analytics features. Built for a SaaS company to help them monitor their application performance and user engagement.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React", "Chart.js", "Tailwind CSS", "TypeScript"],
    features: [
      "Real-time data visualization with Chart.js",
      "User management interface",
      "Analytics dashboard with customizable widgets",
      "Dark and light mode support",
      "Role-based access control",
      "Export data to CSV/PDF",
    ],
    client: "SaaS Company",
    duration: "4 months",
    year: "2022",
    link: "#",
  },
  {
    id: 4,
    title: "Mobile App",
    description:
      "A cross-platform mobile app for task management with real-time synchronization. The app allows users to create tasks, set reminders, and collaborate with team members.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    features: [
      "Cross-platform compatibility (iOS and Android)",
      "Real-time data synchronization with Firebase",
      "Push notifications for reminders",
      "Offline support with local storage",
      "Team collaboration features",
      "Integration with calendar apps",
    ],
    client: "Productivity Startup",
    duration: "5 months",
    year: "2022",
    link: "#",
  },
  {
    id: 5,
    title: "Blog Platform",
    description:
      "A content management system for bloggers with markdown support and SEO optimization. The platform includes a custom editor, category management, and analytics dashboard.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    features: [
      "Custom markdown editor with preview",
      "SEO optimization tools",
      "Category and tag management",
      "Reader analytics dashboard",
      "Comment system with moderation",
      "Newsletter integration",
    ],
    client: "Digital Publisher",
    duration: "3 months",
    year: "2023",
    link: "#",
  },
  {
    id: 6,
    title: "Landing Page",
    description:
      "A high-converting landing page with animations and subscription form. Designed to showcase a new product launch and capture leads through an email subscription form.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React", "GSAP", "Tailwind CSS", "Framer Motion"],
    features: [
      "Animated product showcase",
      "Parallax scrolling effects",
      "Email subscription form with validation",
      "A/B testing setup",
      "Analytics integration",
      "Mobile-first responsive design",
    ],
    client: "Tech Startup",
    duration: "1 month",
    year: "2023",
    link: "#",
  },
]

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = Number.parseInt(params.id)
  const project = projects.find((p) => p.id === projectId) || projects[0]

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose prose-sm max-w-none dark:prose-invert mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">{project.description}</p>

              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild className="gap-2">
              <Link href={project.link}>
                Visit Project
                <ExternalLink size={16} />
              </Link>
            </Button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Project Details</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Client</h4>
                  <p>{project.client}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Year</h4>
                  <p>{project.year}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Duration</h4>
                  <p>{project.duration}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
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
          </div>
        </div>
      </div>
    </main>
  )
}
