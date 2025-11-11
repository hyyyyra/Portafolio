"use client"

import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"

const experiences = [
  {
    period: "2024 — Presente",
    role: "Senior Frontend Engineer",
    company: "Tech Company",
    description:
      "Liderando el desarrollo de componentes UI críticos para la plataforma. Trabajo estrechamente con equipos multifuncionales para implementar mejores prácticas en accesibilidad web.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    period: "2022 — 2024",
    role: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Desarrollo de aplicaciones web modernas para diversos clientes. Implementación de interfaces responsivas y optimizadas para rendimiento.",
    skills: ["JavaScript", "React", "Vue.js", "CSS"],
  },
  {
    period: "2020 — 2022",
    role: "Junior Developer",
    company: "Startup Inc",
    description:
      "Contribuí al desarrollo de productos digitales desde la fase inicial. Aprendizaje continuo de tecnologías modernas y metodologías ágiles.",
    skills: ["HTML", "CSS", "JavaScript", "Git"],
  },
]

export function Experience() {
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
    <section
      ref={sectionRef}
      className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 bg-muted/30"
      id="experience"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-sm uppercase tracking-wider text-muted-foreground mb-8 sm:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
        >
          Experiencia
        </h2>

        <div className="space-y-10 sm:space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-sm text-muted-foreground font-medium md:font-normal">{exp.period}</div>

              <div className="md:col-span-3 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">{exp.role}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{exp.company}</p>
                </div>

                <p className="text-sm sm:text-base leading-relaxed">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs sm:text-sm hover:scale-105 transition-transform"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
