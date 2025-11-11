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
            Soy un desarrollador apasionado por crear interfaces de usuario accesibles y pixel-perfect que combinan
            diseño reflexivo con ingeniería robusta. Mi trabajo favorito se encuentra en la intersección del diseño y el
            desarrollo.
          </p>

          <p
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Actualmente trabajo como Senior Front-End Engineer, especializándome en crear componentes de UI que
            potencian experiencias digitales excepcionales. Me enfoco en escribir código limpio, mantenible y accesible.
          </p>

          <p
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Cuando no estoy programando, me gusta explorar nuevas tecnologías, contribuir a proyectos de código abierto,
            y compartir conocimiento con la comunidad de desarrolladores.
          </p>
        </div>
      </div>
    </section>
  )
}
