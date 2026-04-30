import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Link,
  Hr,
} from "react-email"

interface ContactEmailProps {
  name: string
  email: string
  telefono?: string
  message: string
}

export function ContactEmail({ name, email, telefono, message }: ContactEmailProps) {
  const now = new Date()
  const fecha = now.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <Html lang="es">
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        `}</style>
      </Head>
      <Body style={styles.body}>
        <Container style={styles.wrap}>

          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.eyebrow}>Tienes un nuevo mensaje de:</Text>
            <Text style={styles.headerName}>{name}</Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Meta */}
          <Section style={styles.meta}>
            <Row style={styles.metaRow}>
              <Column style={styles.metaLabel}>
                <Text style={styles.label}>De</Text>
              </Column>
              <Column>
                <Link href={`mailto:${email}`} style={styles.metaValue}>
                  {email}
                </Link>
              </Column>
            </Row>
            {telefono && (
              <Row style={styles.metaRow}>
                <Column style={styles.metaLabel}>
                  <Text style={styles.label}>Tel</Text>
                </Column>
                <Column>
                  <Link href={`tel:${telefono}`} style={styles.metaValue}>
                    {telefono}
                  </Link>
                </Column>
              </Row>
            )}
            <Row style={styles.metaRow}>
              <Column style={styles.metaLabel}>
                <Text style={styles.label}>Fecha</Text>
              </Column>
              <Column>
                <Text style={styles.metaValuePlain}>{fecha}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={styles.divider} />

          {/* Message */}
          <Section style={styles.messageSection}>
            <Text style={styles.messageText}>{message}</Text>
          </Section>

          <Hr style={styles.divider} />

          {/* CTA */}
          <Section style={styles.ctaSection}>
            <Link href={`mailto:${email}`} style={styles.ctaButton}>
              Responder
            </Link>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    backgroundColor: "#f5f5f7",
    WebkitFontSmoothing: "antialiased",
    margin: 0,
    padding: "48px 0",
  },
  wrap: {
    maxWidth: "480px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    overflow: "hidden",
  },

  /* Header */
  header: {
    padding: "40px 40px 32px",
  },
  eyebrow: {
    fontSize: "13px",
    fontWeight: 400,
    color: "#6e6e73",
    margin: "0 0 6px 0",
    letterSpacing: "0",
  },
  headerName: {
    fontSize: "26px",
    fontWeight: 600,
    color: "#1d1d1f",
    letterSpacing: "-0.03em",
    lineHeight: "1.15",
    margin: 0,
  },

  divider: {
    borderColor: "#f2f2f2",
    margin: 0,
  },

  /* Meta */
  meta: {
    padding: "24px 40px",
  },
  metaRow: {
    marginBottom: "2px",
  },
  metaLabel: {
    width: "44px",
    verticalAlign: "middle",
  },
  label: {
    fontSize: "13px",
    fontWeight: 400,
    color: "#6e6e73",
    margin: "6px 0",
  },
  metaValue: {
    fontSize: "13px",
    fontWeight: 400,
    color: "#0066cc",
    textDecoration: "none",
    lineHeight: "1",
    display: "block",
    padding: "6px 0",
  },
  metaValuePlain: {
    fontSize: "13px",
    fontWeight: 400,
    color: "#1d1d1f",
    margin: "6px 0",
  },

  /* Message */
  messageSection: {
    padding: "28px 40px",
  },
  messageText: {
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: "1.7",
    color: "#1d1d1f",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    margin: 0,
  },

  /* CTA */
  ctaSection: {
    padding: "28px 40px",
  },
  ctaButton: {
    display: "inline-block",
    fontSize: "15px",
    fontWeight: 400,
    color: "#ffffff",
    backgroundColor: "#0066cc",
    padding: "11px 24px",
    borderRadius: "980px",
    textDecoration: "none",
    letterSpacing: "-0.01em",
  },

  /* Footer */
  footer: {
    padding: "0 40px 32px",
  },
  footerText: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#6e6e73",
    margin: 0,
    letterSpacing: "0",
  },
}