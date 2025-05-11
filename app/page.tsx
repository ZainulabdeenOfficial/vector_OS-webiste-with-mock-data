"use client"

import FeaturedSection from "@/components/featured-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Code, Cpu, Cloud, Brain, GitBranch, Database } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import HeroSection from "@/components/hero-section"

// Simplified animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      duration: 0.2,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeIn}
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full">
            Open Source • Community-Driven • Innovative
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Building <span className="gradient-text">Open Source Software</span> That Changes The Game
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vector OS is a collective of creators developing innovative open source projects across multiple domains. We
            don't follow trends. We define them.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerContainer}
        >
          {[
            {
              title: "Developer-Friendly",
              description:
                "Tools and platforms designed with developers in mind, enhancing productivity and creativity.",
              icon: Code,
            },
            {
              title: "Advanced Security",
              description: "Security-first architecture across all our projects to protect data and systems.",
              icon: Shield,
            },
            {
              title: "Performance Focused",
              description: "Optimized for speed and efficiency, minimizing resource usage while maximizing output.",
              icon: Zap,
            },
            {
              title: "Open Source",
              description: "Fully transparent, community-driven development that anyone can contribute to.",
              icon: GitBranch,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-card p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-primary/50"
            >
              <div className="text-primary mb-4">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We ship bold, future-ready products with obsessive attention to detail and quality across multiple
              domains.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Vector OS",
                description: "A lightweight, fast, and secure operating system built for performance and stability.",
                icon: Cpu,
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Developer Tools",
                description:
                  "Boost productivity, streamline workflows, and eliminate bottlenecks in your development process.",
                icon: Code,
                color: "from-green-500 to-emerald-500",
              },
              {
                title: "AI & Machine Learning",
                description: "Practical intelligence solutions, responsibly engineered for real-world applications.",
                icon: Brain,
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Database Solutions",
                description: "High-performance, scalable database systems designed for modern applications.",
                icon: Database,
                color: "from-amber-500 to-orange-500",
              },
              {
                title: "System Software",
                description: "Low-level magic for high-performance environments and critical infrastructure.",
                icon: Cpu,
                color: "from-red-500 to-rose-500",
              },
              {
                title: "Web & Cloud Solutions",
                description: "Beautifully crafted full-stack experiences for the modern web.",
                icon: Cloud,
                color: "from-emerald-500 to-teal-500",
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <div className="p-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <product.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{product.title}</h3>
                  <p className="mb-4 text-muted-foreground">{product.description}</p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FeaturedSection />

      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Innovating. Empowering. Disrupting.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              We're a collective of creators — engineers, designers, and visionaries — united by a mission: Build
              open-source software that changes the game.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about">
                <Button size="lg" className="group rounded-full shadow-lg">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="rounded-full">
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to join the revolution?</h3>
              <p className="text-muted-foreground">
                Contribute to our open source projects and be part of the next generation of technology.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="rounded-full" asChild>
                <Link href="mailto:support@vectoros.dpdns.org">Contact Us</Link>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="https://vectoros.dpdns.org" target="_blank" rel="noopener noreferrer">
                  Visit Website
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
