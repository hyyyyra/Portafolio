import { NextResponse } from "next/server"
import { Resend } from "resend"
import { render } from "react-email"
import { ContactEmail } from "@/emails/contact-email"

export async function POST(request: Request) {
  try {
    const { name, email, telefono, message } = await request.json()

    // Validar los datos
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    const NEXT_PUBLIC_RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY
    const YOUR_EMAIL = process.env.NEXT_PUBLIC_MAIL

    if (!NEXT_PUBLIC_RESEND_API_KEY || !YOUR_EMAIL) {
      console.log("=".repeat(60))
      console.log("📧 NUEVO MENSAJE DE CONTACTO (MODO PRUEBA)")
      console.log("=".repeat(60))
      console.log(`👤 Nombre: ${name}`)
      console.log(`📨 Email: ${email}`)
      console.log(`📱 Teléfono: ${telefono || "No proporcionado"}`)
      console.log(`💬 Mensaje: ${message}`)
      console.log("=".repeat(60))
      console.log("⚠️  Para recibir emails reales, configura:")
      console.log("   1. RESEND_API_KEY (obtén una en resend.com)")
      console.log("   2. MAIL_PERSONAL (tu correo de destino)")
      console.log("=".repeat(60))

      return NextResponse.json(
        {
          success: true,
          message: "Mensaje recibido en modo prueba. Los detalles se muestran en la consola.",
          testMode: true,
        },
        { status: 200 },
      )
    }

    // Renderizar el template con React Email 6.0
    const html = await render(
      ContactEmail({ name, email, telefono, message })
    )

    // Enviar email con el SDK de Resend
    const resend = new Resend(NEXT_PUBLIC_RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: "Portafolio <onboarding@resend.dev>",
      to: [YOUR_EMAIL],
      replyTo: email,
      subject: `💼 Nuevo contacto de ${name}`,
      html,
    })

    if (error) {
      console.error("[contact] Error de Resend:", error)
      return NextResponse.json(
        { error: `Error al enviar el email: ${error.message}` },
        { status: 500 },
      )
    }

    console.log("[contact] Email enviado exitosamente, id:", data?.id)
    return NextResponse.json({
      success: true,
      message: "Mensaje enviado correctamente",
    })

  } catch (error) {
    console.error("[contact] Error en /api/contact:", error)
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 },
    )
  }
}