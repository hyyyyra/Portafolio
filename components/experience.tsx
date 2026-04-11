"use client"

import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"

const experiences = [
  {
    period: "Septiembre 2024 — Presente",
    role: "Desarrollador Analista",
    company: "Servicio de Evaluación Ambiental",
    description:
      "Desarrollo de software web analizando necesidades. Gestión de incidentes contingentes mediante soluciones tecnológicas en Gran Santiago.",
    skills: ["PHP", "SQL", "JS", "TS", "React", "Linux"],
  },
  {
    period: "Enero 2022 — Junio 2022",
    role: "Asistente de Coordinador Logístico",
    company: "MARGOMZ",
    description:
      "Apoyo en procesos de logística operativa, análisis de capacidades y mejora de tiempos de respuesta en San Antonio, Región de Valparaíso.",
    skills: ["Gestión", "Logística", "Análisis"],
  },
]

const educations = [
  {
    period: "2025",
    role: "Licenciatura en Ingeniería Informática",
    company: "Universidad Andrés Bello",
  },
  {
    period: "2022 — 2024",
    role: "Técnico, Programación y Análisis de Sistemas",
    company: "Instituto Profesional AIEP",
  },
  {
    period: "2018 — 2021",
    role: "Técnico en Administración con mención Logística",
    company: "Instituto Comercial Marítimo Pacífico Sur",
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

                {exp.description && <p className="text-sm sm:text-base leading-relaxed">{exp.description}</p>}

                {exp.skills && (
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
                )}
              </div>
            </div>
          ))}
        </div>

        <h2
          className={`text-sm uppercase tracking-wider text-muted-foreground mt-16 sm:mt-24 mb-8 sm:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
        >
          Educación
        </h2>

        <div className="space-y-10 sm:space-y-12">
          {educations.map((edu, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-sm text-muted-foreground font-medium md:font-normal">{edu.period}</div>

              <div className="md:col-span-3 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">{edu.role}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{edu.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
