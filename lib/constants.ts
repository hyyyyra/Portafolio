// Información personal
export const PERSONAL_INFO = {
  name: "Tu Nombre",
  role: "Desarrollador Full Stack",
  description:
    "Creo soluciones web de alto impacto que convierten visitantes en clientes. Especializado en transformar ideas en productos digitales escalables que generan resultados medibles para tu negocio.",
  email: "tu@email.com",
}

// Links de navegación
export const NAV_ITEMS = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "experiencia", label: "Experiencia" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
] as const

// Links de redes sociales
export const SOCIAL_LINKS = {
  github: "https://github.com/tuusuario",
  linkedin: "https://linkedin.com/in/tuusuario",
  twitter: "https://twitter.com/tuusuario",
  email: "mailto:tu@email.com",
} as const

// IDs de secciones para navegación
export const SECTION_IDS = {
  hero: "inicio",
  about: "sobre-mi",
  experience: "experiencia",
  projects: "proyectos",
  contact: "contacto",
} as const

// Tipo para los items de navegación
export type NavItem = typeof NAV_ITEMS[number]
