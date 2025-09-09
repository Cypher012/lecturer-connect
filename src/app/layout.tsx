import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth"
import { Suspense } from "react"
import {DepartmentsProvider} from "~/src/components/department-provider"

import "./globals.css"
import { getDepartmentsCached } from "../lib/actions/departments"

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
  const departments = await getDepartmentsCached()
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col`}>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
          <DepartmentsProvider departments={departments}>
            <Header departments={departments} />
            <main className="flex-1">{children}</main>
        </DepartmentsProvider>
            <Footer />
          </Suspense> 
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
