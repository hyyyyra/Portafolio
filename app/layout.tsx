import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fabián Trapp Rodríguez",
  description: "Desarollador FullStack | Soluciones tecnologicas a desafíos complejos",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon_01.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon_01.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon_01",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
