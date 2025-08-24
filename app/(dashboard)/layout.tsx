import type React from "react"
import { Navbar } from "@/components/navigation/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto">{children}</main>
    </div>
  )
}
