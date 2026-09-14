# Contacto: configuración de Resend

El 403 «gmail.com domain is not verified» se debe al remitente (`from`), no al correo del visitante ni al destinatario. El antiguo código usaba `FROM_EMAIL` tanto para enviar como para recibir. Además pasaba `reply_to` al SDK Node, cuya propiedad es `replyTo`; esa dirección se perdía al serializar.

No es necesario crear otra cuenta de Resend por este error. El aviso de dimensiones de `logo.png` es independiente.

## Configuración local y del despliegue

Conservá tu `RESEND_API_KEY` en `.env.local`. No sobrescribas el archivo con `.env.example` si ya tiene una clave. Agregá o ajustá estas variables sólo en el servidor:

- `RESEND_API_KEY`: tu clave existente. Nunca usar prefijo `NEXT_PUBLIC_`.
- `FROM_EMAIL`: remitente autorizado por Resend, por ejemplo `Portfolio <contacto@tu-dominio-verificado.com>`.
- `TO_EMAIL`: casilla donde querés recibir los mensajes. Puede ser Gmail; es independiente del remitente.

Reiniciá el servidor local después de modificar las variables. En el hosting configurá las mismas variables como secretos de servidor y realizá un nuevo despliegue.

### Sin dominio propio: prueba

Usá `FROM_EMAIL=Portfolio <onboarding@resend.dev>`. `TO_EMAIL` debe ser exactamente la dirección asociada a tu cuenta de Resend. Este remitente está limitado a pruebas y no permite entregar a destinatarios arbitrarios.

### Producción con dominio propio

1. En Resend → Domains, agregá un dominio o subdominio que controles.
2. En el proveedor DNS, agregá exactamente los registros de envío SPF y DKIM que muestre Resend. No reemplaces registros de recepción de tu casilla; para este formulario no hace falta activar la recepción en Resend.
3. Esperá a que Resend indique que el dominio está verificado y usá una dirección de ese dominio en `FROM_EMAIL`.
4. En API Keys revisá que la clave tenga permiso de envío sobre ese dominio. Preferí `Sending access` limitado al dominio. Este error por sí solo no exige rotar la clave; reemplazala si fue expuesta o si necesitás ajustar sus permisos.
5. Configurá `TO_EMAIL` con tu casilla real, reiniciá/desplegá y probá manualmente el formulario. Revisá el estado de entrega en Resend y la bandeja de entrada/spam. Una respuesta 200 confirma aceptación por el proveedor, no garantiza entrega en bandeja de entrada.

## Diseño y seguridad

- La ruta compone dependencias dentro de un límite `server-only`. La configuración, validación, transporte HTTP y controlador tienen responsabilidades separadas. El controlador recibe una función de envío y el adaptador recibe `fetch`, permitiendo probarlos sin red ni credenciales reales.
- El adaptador usa la API REST oficial para evitar los logs automáticos con errores completos del SDK. Aquí `reply_to` sí es el nombre correcto de la propiedad HTTP.
- Remitente y destinatario provienen exclusivamente del entorno del servidor. Sólo se aceptan los campos previstos del formulario. El contenido se envía como texto plano, nunca como HTML del visitante.
- Se rechazan tipos inválidos, inyección de saltos de línea en cabeceras, honeypot, contenido no JSON, solicitudes de otro origen y cuerpos mayores a 24 KiB (también sin Content-Length).
- El proveedor tiene un timeout de 10 segundos y no se siguen redirecciones con la clave. No se exponen IDs, errores del proveedor, direcciones configuradas ni secretos al navegador. Los logs contienen únicamente códigos internos y estados HTTP.
- Hay un límite básico de cinco intentos válidos por minuto **por instancia**, sin almacenar IPs ni mensajes. Se reinicia con el proceso y no se comparte entre instancias serverless. No reemplaza una regla de rate limiting en el WAF del hosting o un almacenamiento compartido; el control de origen y honeypot tampoco detienen bots que llamen directamente a la API.
- `.env*` está ignorado por Git salvo `.env.example`, que contiene sólo ejemplos públicos.

## Verificación sin enviar correos

`npm test` ejecuta pruebas con transporte simulado (sin cargar `.env.local`). Incluye separación de direcciones, respuesta del visitante, entradas hostiles, errores del proveedor sin filtraciones y límites de solicitudes. `npm run lint` y `npm run build` verifican el proyecto.

Fuentes oficiales: [error con dominio de prueba](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain), [dominios](https://resend.com/docs/dashboard/domains/introduction), [claves y permisos](https://resend.com/docs/dashboard/api-keys/introduction), [API de envío](https://resend.com/docs/api-reference/emails/send-email).
