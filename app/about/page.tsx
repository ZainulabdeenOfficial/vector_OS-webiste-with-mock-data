"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Github, Linkedin, Twitter, Zap, Code, Shield, GitBranch, Database, Brain, Cloud } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Sample team data
const team = [
  {
    name: "Alex Johnson",
    role: "Lead Developer",
    bio: "Python and C specialist focused on system-level performance optimization and security architecture.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Sarah Williams",
    role: "UX Designer",
    bio: "Creating intuitive interfaces that make complex technology accessible to everyone.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Michael Chen",
    role: "AI Engineer",
    bio: "Developing responsible AI solutions that enhance productivity while maintaining ethical standards.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Emily Rodriguez",
    role: "DevOps Specialist",
    bio: "Building the infrastructure that powers our high-performance environments and deployment pipelines.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]

// Optimized animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

export default function AboutPage() {
  // Optimize IntersectionObserver with better rootMargin for earlier loading
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  })

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  })

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  })

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  })

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="gradient-text mb-6"
              style={{ willChange: "transform, opacity" }}
            >
              About Vector OS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="text-xl text-muted-foreground"
              style={{ willChange: "transform, opacity" }}
            >
              We're a collective of creators — engineers, designers, and visionaries — united by a mission to build
              open-source software that changes the game.
            </motion.p>
          </div>

          <motion.div
            ref={missionRef}
            variants={container}
            initial="hidden"
            animate={missionInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={item} style={{ willChange: "transform, opacity" }}>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our mission"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>
            <motion.div variants={item} style={{ willChange: "transform, opacity" }}>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At Vector OS, we're dedicated to creating innovative open source software across multiple domains. Our
                projects range from operating systems and developer tools to AI solutions and cloud platforms.
              </p>
              <p className="text-muted-foreground mb-6">
                Founded with a vision to innovate, empower, and disrupt, we're crafting next-gen tech that's open,
                beautiful, and built for impact. We don't follow trends — we define them.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2 text-primary">
                    <GitBranch size={24} />
                  </div>
                  <div className="text-sm font-medium">Open Source</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2 text-primary">
                    <Code size={24} />
                  </div>
                  <div className="text-sm font-medium">Developer-Focused</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2 text-primary">
                    <Zap size={24} />
                  </div>
                  <div className="text-sm font-medium">Performance-Driven</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section ref={projectsRef} className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: projectsInView ? 1 : 0, y: projectsInView ? 0 : 15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-3xl font-bold text-center mb-4"
            style={{ willChange: "transform, opacity" }}
          >
            Our <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: projectsInView ? 1 : 0, y: projectsInView ? 0 : 15 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
            style={{ willChange: "transform, opacity" }}
          >
            We develop a diverse range of open source projects, each designed to solve real-world problems and push the
            boundaries of what's possible.
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            animate={projectsInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Vector OS",
                description: "A lightweight, fast, and secure operating system built for performance and stability.",
                icon: Zap,
              },
              {
                title: "Developer Tools",
                description: "Productivity tools that streamline workflows and eliminate bottlenecks.",
                icon: Code,
              },
              {
                title: "AI Solutions",
                description: "Practical machine learning applications with responsible engineering practices.",
                icon: Brain,
              },
              {
                title: "Database Systems",
                description: "High-performance data storage and retrieval solutions for modern applications.",
                icon: Database,
              },
              {
                title: "System Software",
                description: "Low-level utilities and libraries for high-performance computing environments.",
                icon: Shield,
              },
              {
                title: "Cloud Infrastructure",
                description: "Scalable, reliable cloud solutions for modern web applications.",
                icon: Cloud,
              },
            ].map((project, index) => (
              <motion.div key={index} variants={item} style={{ willChange: "transform, opacity" }}>
                <Card className="h-full hover:shadow-md transition-all duration-300 hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <project.icon size={20} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section ref={statsRef} className="mb-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate={statsInView ? "show" : "hidden"}
            className="bg-muted/30 rounded-2xl p-8 md:p-12"
          >
            <motion.h2
              variants={item}
              className="text-3xl font-bold text-center mb-12"
              style={{ willChange: "transform, opacity" }}
            >
              Our <span className="gradient-text">Impact</span>
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div variants={item} className="text-center" style={{ willChange: "transform, opacity" }}>
                <div className="text-4xl font-bold gradient-text mb-2">24+</div>
                <div className="text-sm text-muted-foreground">GitHub Followers</div>
              </motion.div>
              <motion.div variants={item} className="text-center" style={{ willChange: "transform, opacity" }}>
                <div className="text-4xl font-bold gradient-text mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Repositories</div>
              </motion.div>
              <motion.div variants={item} className="text-center" style={{ willChange: "transform, opacity" }}>
                <div className="text-4xl font-bold gradient-text mb-2">7+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </motion.div>
              <motion.div variants={item} className="text-center" style={{ willChange: "transform, opacity" }}>
                <div className="text-4xl font-bold gradient-text mb-2">2</div>
                <div className="text-sm text-muted-foreground">Programming Languages</div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-3xl font-bold text-center mb-4"
            style={{ willChange: "transform, opacity" }}
          >
            Meet Our <span className="gradient-text">Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
            style={{ willChange: "transform, opacity" }}
          >
            We're a diverse group of engineers, designers, and visionaries working together to build the future of
            technology.
          </motion.p>

          <motion.div
            ref={teamRef}
            variants={container}
            initial="hidden"
            animate={teamInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={item} style={{ willChange: "transform, opacity" }}>
                <Card className="overflow-hidden group h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                    <div className="flex gap-3">
                      <Link
                        href={member.social.twitter}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter size={18} />
                        <span className="sr-only">Twitter</span>
                      </Link>
                      <Link
                        href={member.social.linkedin}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin size={18} />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                      <Link
                        href={member.social.github}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github size={18} />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mt-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-3xl font-bold mb-6"
            style={{ willChange: "transform, opacity" }}
          >
            Join Our <span className="gradient-text">Community</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-muted-foreground max-w-2xl mx-auto mb-8"
            style={{ willChange: "transform, opacity" }}
          >
            Connect with us on GitHub, follow our progress, and contribute to our open source projects.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center gap-4"
            style={{ willChange: "transform, opacity" }}
          >
            <Link
              href="https://github.com/Vector-OS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Link>
            <Link
              href="https://vectoros.dpdns.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <Zap className="mr-2 h-4 w-4" /> Website
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
