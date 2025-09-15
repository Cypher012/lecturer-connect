import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lecturer Connect - Faculty of Computing",
  description:
    "Connect with lecturers in the Faculty of Computing. Explore profiles, research areas, and chat with our AI assistant.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col`}>
          <Suspense fallback={<div>Loading...</div>}>
            <Header/>
            <main className="flex-1">{children}</main>
            <Footer />
          </Suspense> 
        <Analytics />
      </body>
    </html>
  )
}
