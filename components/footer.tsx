"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {

  const URL_GIT = process.env.NEXT_PUBLIC_URL_GIT
  const URL_LINKEDIN = process.env.NEXT_PUBLIC_URL_LINKEDIN
  const URL_TWITTER = process.env.NEXT_PUBLIC_URL_TWITTER
  const URL_MAIL = process.env.NEXT_PUBLIC_MAIL

  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fabián Trapp Rodríguez.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:scale-110 transition-transform">
              <a href={URL_GIT} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:scale-110 transition-transform">
              <a href={URL_LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:scale-110 transition-transform">
              <a href={URL_TWITTER} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:scale-110 transition-transform">
              <a href={`mailto:${URL_MAIL}`} aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
