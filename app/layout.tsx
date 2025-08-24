import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HealthCare Pro - Modern Healthcare Management System",
  description: "A comprehensive healthcare management system for patients, doctors, and healthcare providers. Manage appointments, patient records, pharmacy, laboratory results, and billing in one integrated platform.",
  keywords: [
    "healthcare",
    "medical management",
    "patient records",
    "appointments",
    "pharmacy",
    "laboratory",
    "billing",
    "healthcare software",
    "medical practice management",
    "patient care"
  ],
  authors: [{ name: "HealthCare Pro Team" }],
  creator: "HealthCare Pro",
  publisher: "HealthCare Pro",
  generator: "Next.js",
  applicationName: "HealthCare Pro",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://healthcare-pro.com",
    title: "HealthCare Pro - Modern Healthcare Management System",
    description: "A comprehensive healthcare management system for patients, doctors, and healthcare providers.",
    siteName: "HealthCare Pro",
    images: [
      {
        url: "/healthcare-og-image.svg",
        width: 1200,
        height: 630,
        alt: "HealthCare Pro - Modern Healthcare Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthCare Pro - Modern Healthcare Management System",
    description: "A comprehensive healthcare management system for patients, doctors, and healthcare providers.",
    images: ["/healthcare-og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
  },
  category: "healthcare",
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
