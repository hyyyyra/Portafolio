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
            Hola, soy Fabián — desarrollador Full Stack ubicado en Santiago, Chile. Me dedico a construir soluciones digitales que se adaptan a lo que realmente necesita cada proyecto, sin importar la escala de tu negocio.
          </p>

          <p
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Parte importante de mi experiencia viene del sector público: como Desarrollador Analista en la División TI del Servicio de Evaluación Ambiental (SEA), en donde trabajo con sistemas críticos que manejan grandes volúmenes de datos sensibles, donde un error no es solo un bug — tiene consecuencias reales. Eso me formó con un estándar alto de responsabilidad, atención al detalle y criterio para tomar decisiones técnicas bajo presión.
          </p>
          
          <p
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
También gané una visión de gestión integral: coordinando equipos, administrando tiempos y recursos, y entregando dentro de estructuras complejas. Esa perspectiva de punta a punta — técnica y humana — es lo que traigo a cada proyecto que tomo.
          </p>

          <p
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Si tienes algo que construir o mejorar, cuéntame de qué se trata. Me interesa entender tu contexto antes de proponer cualquier solución.
          </p>
          
        </div>
      </div>
    </section >
  )
}
