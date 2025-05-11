"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, GitBranch } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HeroSection() {
  // State to track window size for responsive adjustments
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
  })

  // Update window size when component mounts and on resize
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      })
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate orbit sizes based on screen width
  const getOrbitSizes = () => {
    const width = windowSize.width

    if (width >= 1280) {
      // xl
      return {
        orbit1: 200,
        orbit2: 250,
        dot1Size: 4,
        dot2Size: 6,
      }
    } else if (width >= 1024) {
      // lg
      return {
        orbit1: 180,
        orbit2: 230,
        dot1Size: 4,
        dot2Size: 6,
      }
    } else if (width >= 768) {
      // md
      return {
        orbit1: 160,
        orbit2: 200,
        dot1Size: 4,
        dot2Size: 5,
      }
    } else if (width >= 640) {
      // sm
      return {
        orbit1: 140,
        orbit2: 170,
        dot1Size: 3,
        dot2Size: 4,
      }
    } else if (width >= 480) {
      // xs
      return {
        orbit1: 120,
        orbit2: 150,
        dot1Size: 3,
        dot2Size: 4,
      }
    } else {
      // xxs
      return {
        orbit1: 100,
        orbit2: 130,
        dot1Size: 2,
        dot2Size: 3,
      }
    }
  }

  const orbitSizes = getOrbitSizes()

  return (
    <section className="relative w-full min-h-[100vh] py-12 md:py-16 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0"></div>

      {/* Background particles */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 12 + 5,
              height: Math.random() * 12 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -60 - 30],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                <span className="gradient-text">Crafting Next-Gen Tech</span> — Open, Beautiful, and Built for Impact
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
            >
              We build innovative open source projects across multiple domains, from operating systems to developer
              tools, AI solutions, and more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="group rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 w-full sm:w-auto"
                asChild
              >
                <Link href="/projects">
                  Explore Our Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-primary/20 hover:border-primary/50 transition-all duration-300 w-full sm:w-auto"
                asChild
              >
                <Link href="https://github.com/Vector-OS" target="_blank" rel="noopener noreferrer">
                  <GitBranch className="mr-2 h-4 w-4" /> Contribute
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Replacing 3D animation with CSS-based visual element - now responsive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 h-[250px] xs:h-[280px] sm:h-[320px] md:h-[400px] lg:h-[450px] relative mt-4 lg:mt-0"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main circle - responsive sizes */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-500 blur-xl opacity-30 animate-pulse-slow"></div>
                <div className="w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center relative z-10">
                  <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full bg-background flex items-center justify-center">
                    <div className="w-[75%] h-[75%] rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 flex items-center justify-center">
                      <div className="w-[65%] h-[65%] rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">
                        Vector OS
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting elements - responsive sizes */}
              <div className="absolute inset-0">
                {/* Orbit rings - responsive */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[200px] h-[200px] xs:w-[220px] xs:h-[220px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] rounded-full border border-primary/20 animate-spin-slow"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[240px] h-[240px] xs:w-[260px] xs:h-[260px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px] rounded-full border border-purple-500/20 animate-spin-reverse-slow"></div>
                </div>

                {/* Orbiting dots - using dynamic values based on screen size */}
                <motion.div
                  className="absolute top-1/2 left-1/2 rounded-full bg-primary shadow-lg shadow-primary/30"
                  style={{
                    width: orbitSizes.dot1Size,
                    height: orbitSizes.dot1Size,
                    marginLeft: -orbitSizes.dot1Size / 2,
                    marginTop: -orbitSizes.dot1Size / 2,
                    transformOrigin: `calc(${orbitSizes.orbit1}px + ${orbitSizes.dot1Size / 2}px) ${orbitSizes.dot1Size / 2}px`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                ></motion.div>

                <motion.div
                  className="absolute top-1/2 left-1/2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/30"
                  style={{
                    width: orbitSizes.dot2Size,
                    height: orbitSizes.dot2Size,
                    marginLeft: -orbitSizes.dot2Size / 2,
                    marginTop: -orbitSizes.dot2Size / 2,
                    transformOrigin: `calc(${orbitSizes.orbit2}px + ${orbitSizes.dot2Size / 2}px) ${orbitSizes.dot2Size / 2}px`,
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs sm:text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
