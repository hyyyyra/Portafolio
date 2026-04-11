"use client"

import { useEffect, useRef, useState } from "react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
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
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32" id="about">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-sm uppercase tracking-wider text-muted-foreground mb-6 sm:mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
        >
          Sobre mí
        </h2>

        <div className="space-y-5 sm:space-y-6 text-base sm:text-lg leading-relaxed">
          <p
            className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Soy Programador y Analista de Sistemas basado en Gran Santiago, Chile. Me apasiona el desarrollo de software web y cuento con sólida experiencia en manejo de bases de datos relacionales, metodologías Scrum y gestión de proyectos correctivos y evolutivos.
          </p>

          <p
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            A lo largo de mi carrera he liderado y colaborado en la gestión de equipos de desarrollo, así como en la resolución de incidentes contingentes mediante eficaces soluciones tecnológicas utilizando un stack moderno y versátil (PHP, SQL, JS, TS, React, CronTab, Linux).
          </p>

          <p
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Destaco por mi gran <strong>capacidad de análisis</strong>, habilidad en la <strong>gestión de proyectos</strong> y enfoque en la <strong>integración de equipos</strong> para lograr resultados sobresalientes y adaptables a las diferentes necesidades del entorno.
          </p>
        </div>
      </div>
    </section>
  )
}
