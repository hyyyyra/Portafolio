    # Configuración de Email para Portafolio

Para que el formulario de contacto funcione correctamente, sigue estos pasos:

## 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita (incluye 100 emails/día y 3,000/mes)
3. Verifica tu email

## 2. Obtener tu API Key

1. Una vez en el dashboard de Resend, ve a **API Keys**
2. Haz clic en **Create API Key**
3. Dale un nombre (ej: "Portafolio")
4. Copia la API Key (se muestra una sola vez)

## 3. Configurar Variables de Entorno

En v0, ve a la sección **Vars** en el sidebar izquierdo y agrega:

\`\`\`
RESEND_API_KEY=tu_api_key_aquí
YOUR_EMAIL=tucorreo@ejemplo.com
\`\`\`

**Importante:**
- `RESEND_API_KEY`: La API key que copiaste de Resend
- `YOUR_EMAIL`: El correo donde quieres recibir los mensajes

## 4. Verificar Dominio (Opcional pero Recomendado)

Para usar tu propio dominio en el campo "from":

1. En Resend, ve a **Domains**
2. Haz clic en **Add Domain**
3. Ingresa tu dominio (ej: tudominio.com)
4. Agrega los registros DNS que te proporciona Resend
5. Espera la verificación (puede tomar unos minutos)

Una vez verificado, actualiza la línea del código:
\`\`\`typescript
from: "Portafolio <contacto@tudominio.com>",
\`\`\`

## 5. Probar el Formulario

1. Ve a tu portafolio
2. Llena el formulario de contacto
3. Envía un mensaje de prueba
4. Revisa tu correo (puede tardar 1-2 minutos)
5. Revisa también la carpeta de spam por si acaso

## Solución de Problemas

Si el email no llega:

1. Verifica que las variables de entorno estén configuradas correctamente en Vars
2. Abre la consola del navegador (F12) para ver logs de errores
3. Revisa que tu API Key de Resend sea válida
4. Verifica que el email en YOUR_EMAIL sea correcto
5. Si usas dominio personalizado, verifica que esté verificado en Resend

## Límites del Plan Gratuito

- 100 emails por día
- 3,000 emails por mes
- Perfecto para portafolios personales

Si necesitas más, Resend tiene planes de pago muy accesibles.
