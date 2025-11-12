import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validar los datos
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 })
    }

    // Enviar email al propietario del portafolio
    const ownerEmail = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "fabiantrappf9@gmail.com",
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background-color: #f4f4f4; padding: 10px; border-left: 4px solid #007bff;">
            ${message.replace(/\n/g, "<br>")}
          </p>
        </div>
      `,
    })

    console.log("Owner Email Response:", ownerEmail)

    if (ownerEmail.error) {
      console.error("Error enviando correo al propietario:", ownerEmail.error)
      return NextResponse.json({ 
        error: `Error al enviar email al propietario: ${JSON.stringify(ownerEmail.error)}` 
      }, { status: 500 })
    }

    return NextResponse.json(
      { message: "Email enviado correctamente", success: true },
      { status: 200 }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
    console.error("Error al procesar la solicitud:", errorMessage)
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 })
  }
}
