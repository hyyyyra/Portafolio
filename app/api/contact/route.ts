import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validar los datos
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const YOUR_EMAIL = process.env.YOUR_EMAIL

    console.log("[v0] Configuración:", {
      hasApiKey: !!RESEND_API_KEY,
      yourEmail: YOUR_EMAIL,
      env: process.env.NODE_ENV,
    })

    if (!RESEND_API_KEY) {
      console.error("[v0] RESEND_API_KEY no está configurada")
      return NextResponse.json(
        {
          error: "Servicio de email no configurado. Por favor contacta al administrador.",
        },
        { status: 500 },
      )
    }

    if (!YOUR_EMAIL) {
      console.error("[v0] YOUR_EMAIL no está configurada")
      return NextResponse.json(
        {
          error: "Email de destino no configurado. Por favor contacta al administrador.",
        },
        { status: 500 },
      )
    }

    // Enviar email con Resend
    console.log("[v0] Intentando enviar email...")
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portafolio <onboarding@resend.dev>",
        to: [YOUR_EMAIL],
        reply_to: email,
        subject: `Nuevo mensaje de ${name} - Portafolio`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
              Nuevo mensaje desde tu portafolio
            </h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Mensaje:</strong></p>
              <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Este mensaje fue enviado desde tu portafolio web.
            </p>
          </div>
        `,
      }),
    })

    const responseData = await response.json()
    console.log("[v0] Respuesta de Resend:", responseData)

    if (!response.ok) {
      console.error("[v0] Error de Resend:", responseData)
      return NextResponse.json(
        {
          error: `Error al enviar el email: ${responseData.message || "Error desconocido"}`,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Email enviado exitosamente")
    return NextResponse.json({
      success: true,
      message: "Mensaje enviado correctamente",
    })
  } catch (error) {
    console.error("[v0] Error en /api/contact:", error)
    return NextResponse.json(
      {
        error: "Error al procesar la solicitud",
      },
      { status: 500 },
    )
  }
}
