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
  return (
    <Html lang="es">
      <Head />
      <Body style={styles.body}>
        <Container style={styles.wrap}>

          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.headerLabel}>Nuevo contacto</Text>
            <Text style={styles.headerName}>{name}</Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Meta */}
          <Section style={styles.meta}>
            <Row>
              <Column style={styles.labelCell}>
                <Text style={styles.label}>Email</Text>
              </Column>
              <Column style={styles.valueCell}>
                <Link href={`mailto:${email}`} style={styles.link}>
                  {email}
                </Link>
              </Column>
            </Row>
            {telefono && (
              <Row>
                <Column style={styles.labelCell}>
                  <Text style={styles.label}>Teléfono</Text>
                </Column>
                <Column style={styles.valueCell}>
                  <Link href={`tel:${telefono}`} style={styles.link}>
                    {telefono}
                  </Link>
                </Column>
              </Row>
            )}
          </Section>

          <Hr style={styles.divider} />

          {/* Mensaje */}
          <Section style={styles.messageSection}>
            <Text style={styles.label}>Mensaje</Text>
            <Text style={styles.messageText}>{message}</Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>Enviado desde tu portafolio</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    backgroundColor: "#f5f5f3",
    WebkitFontSmoothing: "antialiased",
    margin: 0,
    padding: 0,
  },
  wrap: {
    maxWidth: "520px",
    margin: "40px auto",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  header: {
    padding: "32px 36px 24px",
  },
  headerLabel: {
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#999",
    margin: "0 0 4px 0",
  },
  headerName: {
    fontSize: "20px",
    fontWeight: 500,
    color: "#111",
    letterSpacing: "-0.02em",
    margin: 0,
  },
  divider: {
    borderColor: "#e8e8e8",
    margin: 0,
  },
  meta: {
    padding: "28px 36px",
  },
  labelCell: {
    width: "80px",
    verticalAlign: "top",
  },
  valueCell: {
    verticalAlign: "top",
  },
  label: {
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#aaa",
    margin: "8px 0",
  },
  link: {
    fontSize: "14px",
    color: "#2563eb",
    textDecoration: "none",
  },
  messageSection: {
    padding: "28px 36px",
  },
  messageText: {
    fontSize: "14px",
    lineHeight: "1.75",
    color: "#333",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    margin: "12px 0 0 0",
  },
  footer: {
    padding: "16px 36px 20px",
  },
  footerText: {
    fontSize: "11px",
    color: "#bbb",
    margin: 0,
  },
}
