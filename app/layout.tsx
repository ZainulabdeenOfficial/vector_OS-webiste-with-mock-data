import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { DataProvider } from "@/context/data-context"
import { Toaster } from "@/components/ui/toaster"

// Optimize font loading with display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Vector OS - Open Source Software Collective",
  description: "A collective of creators building innovative open source projects across multiple domains",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Add description for accessibility */}
        <meta
          name="description"
          content="Vector OS - A collective of creators building innovative open source projects"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <DataProvider>
            <ThemeProvider>
              <div className="min-h-screen flex flex-col transition-colors duration-300">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </ThemeProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
