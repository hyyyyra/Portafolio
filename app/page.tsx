import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div id="inicio">
          <Hero />
        </div>
        <div id="sobre-mi">
          <About />
        </div>
        <div id="experiencia">
          <Experience />
        </div>
        <div id="proyectos">
          <Projects />
        </div>
        <div id="contacto">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}
