"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import Link from "next/link"

export function VectorLogo({ size = "default" }: { size?: "default" | "large" | "small" }) {
  const logoVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  const textVariants = {
    initial: { x: -8, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.05,
        ease: "easeOut",
      },
    },
  }

  const sizes = {
    small: {
      container: "h-7 w-7",
      icon: "h-3.5 w-3.5",
      text: "text-lg",
    },
    default: {
      container: "h-9 w-9",
      icon: "h-5 w-5",
      text: "text-xl",
    },
    large: {
      container: "h-12 w-12",
      icon: "h-6 w-6",
      text: "text-2xl",
    },
  }

  const currentSize = sizes[size]

  return (
    <Link href="/" className="flex items-center gap-2">
      <motion.div
        variants={logoVariants}
        initial="initial"
        animate="animate"
        className={`${currentSize.container} rounded-full gradient-bg flex items-center justify-center text-white shadow-lg`}
        style={{ willChange: "transform, opacity" }}
      >
        <Zap className={currentSize.icon} />
      </motion.div>
      <motion.span
        variants={textVariants}
        initial="initial"
        animate="animate"
        className={`font-bold ${currentSize.text}`}
        style={{ willChange: "transform, opacity" }}
      >
        Vector OS
      </motion.span>
    </Link>
  )
}
