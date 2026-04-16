import { NextResponse } from "next/server"

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

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const YOUR_EMAIL = process.env.MAIL_PERSONAL

    console.log(YOUR_EMAIL);
    console.log(RESEND_API_KEY);

    if (!RESEND_API_KEY || !YOUR_EMAIL) {
      console.log("=".repeat(60))
      console.log("📧 NUEVO MENSAJE DE CONTACTO (MODO PRUEBA)")
      console.log("=".repeat(60))
      console.log(`👤 Nombre: ${name}`)
      console.log(`📨 Email: ${email}`)
      console.log(`📱 Teléfono: ${telefono || 'No proporcionado'}`)
      console.log(`💬 Mensaje: ${message}`)
      console.log("=".repeat(60))
      console.log("⚠️  Para recibir emails reales, configura:")
      console.log("   1. RESEND_API_KEY (obtén una en resend.com)")
      console.log("   2. YOUR_EMAIL (tu correo de destino)")
      console.log("   3. Ve a la sección 'Vars' en el sidebar izquierdo")
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
        subject: `💼 Nuevo contacto de ${name}`,
        html: `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { box-sizing: border-box; margin: 0; padding: 0; }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                background-color: #f5f5f3;
                -webkit-font-smoothing: antialiased;
              }
              .wrap {
                max-width: 520px;
                margin: 40px auto;
                background: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                overflow: hidden;
              }
              .header {
                padding: 32px 36px 24px;
                border-bottom: 1px solid #e8e8e8;
              }
              .header-label {
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: #999;
                margin-bottom: 4px;
              }
              .header-name {
                font-size: 20px;
                font-weight: 500;
                color: #111;
                letter-spacing: -0.02em;
              }
              .meta {
                padding: 28px 36px;
                border-bottom: 1px solid #e8e8e8;
              }
              table { width: 100%; border-collapse: collapse; }
              .label-cell {
                padding: 8px 0;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: #aaa;
                width: 80px;
                vertical-align: top;
              }
              .value-cell {
                padding: 8px 0;
                font-size: 14px;
                color: #333;
              }
              .value-cell a { color: #2563eb; text-decoration: none; }
              .message-section { padding: 28px 36px; }
              .message-label {
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: #aaa;
                margin-bottom: 12px;
              }
              .message-text {
                font-size: 14px;
                line-height: 1.75;
                color: #333;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                padding: 16px 36px 20px;
                border-top: 1px solid #e8e8e8;
              }
              .footer-text {
                font-size: 11px;
                color: #bbb;
              }
            </style>
          </head>
          <body>
            <div class="wrap">
              <div class="header">
                <p class="header-label">Nuevo contacto</p>
                <p class="header-name">${name}</p>
              </div>
              <div class="meta">
                <table>
                  <tr>
                    <td class="label-cell">Email</td>
                    <td class="value-cell"><a href="mailto:${email}">${email}</a></td>
                  </tr>
                  ${telefono ? `
                  <tr>
                    <td class="label-cell">Teléfono</td>
                    <td class="value-cell"><a href="tel:${telefono}">${telefono}</a></td>
                  </tr>` : ''}
                </table>
              </div>
              <div class="message-section">
                <p class="message-label">Mensaje</p>
                <p class="message-text">${message}</p>
              </div>
              <div class="footer">
                <p class="footer-text">Enviado desde tu portafolio</p>
              </div>
            </div>
          </body>
        </html>
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
