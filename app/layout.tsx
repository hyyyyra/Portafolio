import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const SITE_URL = "https://www.fabiantrappr.site"
const SITE_TITLE = "Fabián Trapp Rodríguez | Desarrollador Full Stack en Santiago, Chile"
const SITE_DESCRIPTION =
  "Desarrollador Full Stack en Santiago, Chile. Construyo soluciones web y productos digitales escalables que generan resultados medibles para empresas y emprendedores."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Desarrollador Full Stack Chile",
    "Desarrollador Web Santiago",
    "Programador Full Stack Santiago",
    "Analista de Sistemas Chile",
    "React Next.js Chile",
    "Fabián Trapp",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: SITE_URL }],
  creator: PERSONAL_INFO.name,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: PERSONAL_INFO.name,
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL_INFO.name,
  jobTitle: PERSONAL_INFO.role,
  description: PERSONAL_INFO.description,
  url: SITE_URL,
  email: PERSONAL_INFO.email,
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
  worksFor: {
    "@type": "GovernmentOrganization",
    name: "Servicio de Evaluación Ambiental (SEA)",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Andrés Bello",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CL">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
