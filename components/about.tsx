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
            Hola, soy Fabián — desarrollador Full-Stack con base en Santiago, Chile.
            Construyo software que funciona, escala y resuelve problemas reales.
          </p>

          <p
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Me especializo en el desarrollo de aplicaciones web de punta a punta: desde el diseño
            de bases de datos relacionales hasta interfaces modernas y reactivas. Trabajo con un
            stack versátil — <strong>PHP, TypeScript, React, SQL y Linux</strong> — eligiendo siempre
            la herramienta que mejor se adapta a la necesidad.
          </p>

          <p
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            A lo largo de mi carrera he participado en proyectos de distintas escalas y sectores,
            enfrentando desafíos técnicos complejos con metodologías ágiles y un fuerte criterio analítico.
            Me interesa entender el negocio detrás del código: eso me permite tomar mejores decisiones
            técnicas y entregar soluciones que realmente aportan valor.
          </p>
        </div>
      </div>
    </section >
  )
}
