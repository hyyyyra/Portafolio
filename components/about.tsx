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
          <p className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Hola, soy Fabián — desarrollador de software y analista de sistemas ubicado en Santiago, Chile. Me dedico a construir soluciones que ayudan a empresas y emprendedores a transformar necesidades reales en herramientas digitales que sean útiles, confiables y sostenibles en el tiempo.
          </p>

          <p className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Mi experiencia profesional se ha desarrollado trabajando con sistemas críticos dentro del Servicio de Evaluación Ambiental (SEA). Allí colaboro en plataformas que gestionan grandes volúmenes de información y procesos donde la precisión no es opcional. Ese entorno me enseñó a trabajar con responsabilidad, prestar atención a los detalles y tomar decisiones técnicas considerando siempre el impacto que tendrán en las personas y organizaciones que utilizan el sistema.
          </p>
          
          <p className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Con el tiempo también he asumido responsabilidades que van más allá del desarrollo: coordinación de equipos, planificación de tareas, gestión de recursos y seguimiento de proyectos. Gracias a ello, puedo comprender tanto los desafíos técnicos como las necesidades operativas y de negocio detrás de cada iniciativa.
          </p>

          <p className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Mi forma de trabajar es simple: primero entender el problema, luego proponer la solución. Antes de escribir una línea de código, me interesa conocer el contexto, los objetivos y las expectativas del proyecto para asegurar que la tecnología aporte valor real y no se convierta en una complejidad adicional.
          </p>

          <p className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Si tienes una idea que desarrollar, un proceso que optimizar o una plataforma que mejorar, estaré encantado de conocer tu proyecto y explorar cómo puedo ayudarte.
          </p>
          
        </div>
      </div>
    </section >
  )
}
