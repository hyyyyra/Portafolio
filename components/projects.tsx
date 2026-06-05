"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "Lukas",
    description:
      "Controla tu dinero con claridad y toma mejores decisiones financieras de manera simple.",
    image: "/lukas_page.png",
    tags: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    github: "https://github.com/hyyyyra/Lukas",
    demo: "https://lukas-ecru.vercel.app/",
  },
  /*{
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas con funcionalidades de colaboración en tiempo real y sincronización entre dispositivos.",
    image: "/task-management-dashboard.png",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Weather Dashboard",
    description:
      "Dashboard meteorológico interactivo con visualizaciones de datos y pronósticos detallados para múltiples ubicaciones.",
    image: "/weather-dashboard-interface.png",
    tags: ["Vue.js", "Chart.js", "API REST"],
    github: "https://github.com",
    demo: "https://demo.com",
  },*/
]

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32" id="projects">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-sm uppercase tracking-wider text-muted-foreground mb-8 sm:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
        >
          Proyectos 
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card
                className={`overflow-hidden group hover:shadow-lg hover:scale-[1.02] transition-all duration-500 cursor-pointer h-full ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-balance">{project.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs sm:text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 sm:flex-none bg-transparent hover:scale-105 transition-transform"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Código
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 sm:flex-none bg-transparent hover:scale-105 transition-transform"
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
