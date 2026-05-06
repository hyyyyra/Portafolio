"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

const TERMINAL_LINES = [
  { prefix: "$", command: "node greeting.js", delay: 400 },
  { prefix: ">", command: "", delay: 900, isOutput: true },
  { prefix: "$", command: "■", delay: 0, isCursor: true },
]

const OUTPUT_TEXT = 'Greeting: "Hola, mi nombre es Fabián, y me especializo en crear soluciones digitales frente a desafíos complejos."'
const TYPING_SPEED = 40

export function Hero() {

  const URL_GIT = process.env.NEXT_PUBLIC_URL_GIT;
  const URL_LINKEDIN = process.env.NEXT_PUBLIC_URL_LINKEDIN
  const URL_MAIL = process.env.NEXT_PUBLIC_MAIL_PERSONAL

  const [isVisible, setIsVisible] = useState(false)
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [typedText, setTypedText] = useState("")
  const [typingDone, setTypingDone] = useState(false)
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

  useEffect(() => {
    if (!isVisible) return

    setTimeout(() => setVisibleLines([0]), 400)

    setTimeout(() => {
      setVisibleLines((prev) => [...prev, 1])
      let i = 0
      const interval = setInterval(() => {
        i++
        setTypedText(OUTPUT_TEXT.slice(0, i))
        if (i >= OUTPUT_TEXT.length) {
          clearInterval(interval)
          setTypingDone(true)
        }
      }, TYPING_SPEED)
    }, 900)
  }, [isVisible])

  useEffect(() => {
    if (typingDone) {
      setVisibleLines((prev) => [...prev, 2])
    }
  }, [typingDone])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden bg-muted/30"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        <div
          className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Fabián Trapp Rodríguez
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">Desarrollador de Sistemas Full Stack</p>
          </div>

          <div className="flex gap-2 sm:gap-1 pt-1 sm:pt-1">
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform duration-300 hover:text-white">
              <a href={URL_GIT} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-8 w-8" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform duration-300 hover:text-white">
              <a href={URL_LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-8 w-8" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform duration-300 hover:text-white">
              <a href={`mailto:${URL_MAIL}`} aria-label="Email">
                <Mail className="h-8 w-8" />
              </a>
            </Button>
          </div>
        </div>

        {/* Terminal Window */}
        <div
          className={`transition-all duration-1000 delay-300 w-full max-w-lg mx-auto lg:mx-0 lg:justify-self-end ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
        >
          <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-muted-foreground/80">fabian@dev ~ zsh</span>
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-sm sm:text-base space-y-2 min-h-[220px]">
              {TERMINAL_LINES.map((line, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 ${visibleLines.includes(index) ? "opacity-100" : "opacity-0"}`}
                >
                  {line.isCursor ? (
                    <span className="flex items-center gap-2">
                      <span className="text-primary font-semibold">$</span>
                      <span className="w-2.5 h-5 bg-primary animate-pulse inline-block" />
                    </span>
                  ) : line.isOutput ? (
                    <p className="text-muted-foreground text-sm pl-4 leading-relaxed">
                      {typedText}
                    </p>
                  ) : (
                    <p>
                      <span className="text-primary font-semibold">{line.prefix} </span>
                      <span className="text-foreground">{line.command}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}