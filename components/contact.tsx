"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, User, MessageSquare, Send } from "lucide-react"
import { useState } from "react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefono: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje")
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", telefono:"", message: "" })

      // Resetear estado después de 5 segundos
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      console.error("[v0] Error al enviar mensaje:", error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 bg-muted/30" id="contact">
      <div className="max-w-2xl mx-auto space-y-8 sm:space-y-12">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            ¿Listo para llevar tu proyecto al siguiente nivel?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty px-4 sm:px-0">
            Transforma tu visión en realidad. Hablemos sobre cómo puedo ayudarte a crear una solución digital que
            impulse tu negocio y supere las expectativas de tus clientes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Nombre
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-background/50 border-border/50 focus:border-foreground/20 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background/50 border-border/50 focus:border-foreground/20 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="telefono" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Telefono
              </label>
              <Input
                id="telefono"
                name="telefono"
                type="telefono"
                placeholder="+569..."
                value={formData.telefono}
                onChange={handleChange}
                required
                className="bg-background/50 border-border/50 focus:border-foreground/20 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                Mensaje
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Cuéntame sobre tu proyecto, objetivos y cómo puedo ayudarte..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="bg-background/50 border-border/50 focus:border-foreground/20 transition-colors resize-none"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="h-5 w-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Enviando...
              </>
            ) : submitStatus === "success" ? (
              <>
                <Mail className="h-5 w-5 mr-2" />
                ¡Mensaje enviado!
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Conversemos sobre tu proyecto
              </>
            )}
          </Button>

          {submitStatus === "success" && (
            <p className="text-sm text-green-600 dark:text-green-400 text-center sm:text-left">
              ¡Gracias por contactarme! Te responderé pronto.
            </p>
          )}

          {submitStatus === "error" && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center sm:text-left">
              Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
