import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function Contact() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 bg-muted/30" id="contact">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance">Trabajemos Juntos</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty px-4 sm:px-0">
            Si tienes un proyecto en mente o simplemente quieres charlar, siempre estoy abierto a nuevas oportunidades y
            colaboraciones.
          </p>
        </div>

        <Button size="lg" asChild className="w-full sm:w-auto">
          <a href="mailto:tu@email.com">
            <Mail className="h-5 w-5 mr-2" />
            Enviar Mensaje
          </a>
        </Button>
      </div>
    </section>
  )
}
