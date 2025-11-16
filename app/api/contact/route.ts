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
    const YOUR_EMAIL = process.env.YOUR_EMAIL

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
                body {
                  margin: 0;
                  padding: 0;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                  background-color: #f8f9fa;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                }
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                }
                .header {
                  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                  padding: 40px 32px;
                  text-align: center;
                }
                .header h1 {
                  margin: 0;
                  color: #ffffff;
                  font-size: 24px;
                  font-weight: 600;
                  letter-spacing: -0.025em;
                }
                .header p {
                  margin: 8px 0 0;
                  color: rgba(255, 255, 255, 0.7);
                  font-size: 14px;
                }
                .content {
                  padding: 32px;
                }
                .info-card {
                  background: #f8fafc;
                  border-radius: 8px;
                  padding: 24px;
                  margin-bottom: 24px;
                  border-left: 4px solid #3b82f6;
                }
                .info-row {
                  display: flex;
                  align-items: flex-start;
                  margin-bottom: 16px;
                }
                .info-row:last-child {
                  margin-bottom: 0;
                }
                .info-label {
                  font-size: 12px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                  color: #64748b;
                  min-width: 90px;
                  margin-top: 2px;
                }
                .info-value {
                  font-size: 15px;
                  color: #0f172a;
                  flex: 1;
                }
                .info-value a {
                  color: #3b82f6;
                  text-decoration: none;
                  transition: color 0.2s;
                }
                .info-value a:hover {
                  color: #2563eb;
                }
                .message-box {
                  background: #ffffff;
                  border: 2px solid #e2e8f0;
                  border-radius: 8px;
                  padding: 24px;
                  margin-top: 24px;
                }
                .message-label {
                  font-size: 12px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                  color: #64748b;
                  margin-bottom: 12px;
                }
                .message-text {
                  font-size: 15px;
                  line-height: 1.6;
                  color: #334155;
                  white-space: pre-wrap;
                  word-wrap: break-word;
                }
                .footer {
                  background: #f8fafc;
                  padding: 24px 32px;
                  text-align: center;
                  border-top: 1px solid #e2e8f0;
                }
                .badge {
                  display: inline-block;
                  background: #dbeafe;
                  color: #1e40af;
                  padding: 4px 12px;
                  border-radius: 12px;
                  font-size: 12px;
                  font-weight: 600;
                  margin-top: 8px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Nuevo mensaje recibido</h1>
                  <p>Alguien te contactó desde tu portafolio</p>
                </div>
                
                <div class="content">
                  <div class="info-card">
                    <div class="info-row">
                      <div class="info-label">Nombre</div>
                      <div class="info-value">${name}</div>
                    </div>
                    
                    <div class="info-row">
                      <div class="info-label">Email</div>
                      <div class="info-value">
                        <a href="mailto:${email}">${email}</a>
                      </div>
                    </div>
                    
                    ${telefono ? `
                    <div class="info-row">
                      <div class="info-label">Teléfono</div>
                      <div class="info-value">
                        <a href="tel:${telefono}">${telefono}</a>
                      </div>
                    </div>
                    ` : ''}
                  </div>
                  
                  <div class="message-box">
                    <div class="message-label">Mensaje</div>
                    <div class="message-text">${message}</div>
                  </div>
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
