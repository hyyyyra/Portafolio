"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, User, MessageSquare, Send, Phone } from 'lucide-react'
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
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

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
      setFormData({ name: "", email: "", telefono: "", message: "" })

      if (data.testMode) {
        console.log("✅ Mensaje enviado en modo prueba. Revisa los logs del servidor para ver los detalles.")
      }

      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      console.error("Error al enviar mensaje:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido")
      setTimeout(() => {
        setSubmitStatus("idle")
        setErrorMessage("")
      }, 5000)
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
            Trabajemos juntos
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty px-4 sm:px-0">
            Envíame un mensaje y conversemos sobre tu proyecto
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
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-background/50 border-border/50 focus:border-foreground/20 transition-all duration-200 hover:border-foreground/30"
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
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background/50 border-border/50 focus:border-foreground/20 transition-all duration-200 hover:border-foreground/30"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="telefono" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Teléfono
              </label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="+56 9 1234 5678"
                value={formData.telefono}
                onChange={handleChange}
                className="bg-background/50 border-border/50 focus:border-foreground/20 transition-all duration-200 hover:border-foreground/30"
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
                placeholder="Cuéntame sobre tu proyecto..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-background/50 border-border/50 focus:border-foreground/20 transition-all duration-200 resize-none hover:border-foreground/30"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : submitStatus === "success" ? (
                <>
                  <Mail className="h-5 w-5 mr-2" />
                  ¡Enviado!
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2 transition-transform group-hover:translate-x-1" />
                  Enviar mensaje
                </>
              )}
            </span>
          </Button>

          {submitStatus === "success" && (
            <p className="text-sm text-green-600 dark:text-green-400 text-center sm:text-left animate-in fade-in duration-300">
              ¡Mensaje enviado! Te responderé pronto.
            </p>
          )}

          {submitStatus === "error" && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <p className="text-sm text-red-600 dark:text-red-400 text-center sm:text-left">{errorMessage}</p>
              <p className="text-xs text-muted-foreground text-center sm:text-left">
                Configura RESEND_API_KEY y YOUR_EMAIL en la sección Vars para habilitar el envío de emails.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
