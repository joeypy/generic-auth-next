"use server";

import { emailService } from "../email-config";

export async function sendPasswordResetEmail({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
}) {
  const result = await emailService.send({
    to: user.email,
    subject: "Restablecer tu contraseña",
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px 0;">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                      🔐 Restablecer contraseña
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px;">
                      Hola <strong style="color: #667eea;">${user.name}</strong>,
                    </p>
                    
                    <p style="margin: 0 0 24px 0; color: #666666; font-size: 15px; line-height: 1.7;">
                      Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para crear una nueva contraseña segura.
                    </p>
                    
                    <!-- Button -->
                    <table role="presentation" style="width: 100%; margin: 32px 0;">
                      <tr>
                        <td align="center" style="padding: 0;">
                          <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; text-align: center; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                            Restablecer contraseña
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Alternative link -->
                    <p style="margin: 24px 0 0 0; color: #999999; font-size: 13px; text-align: center; word-break: break-all;">
                      O copia y pega este enlace en tu navegador:<br>
                      <a href="${url}" style="color: #667eea; text-decoration: none;">${url}</a>
                    </p>
                    
                    <!-- Warning -->
                    <div style="margin: 32px 0 0 0; padding: 16px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                      <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                        <strong>⚠️ Importante:</strong> Si no solicitaste este cambio, por favor ignora este correo. Tu contraseña actual seguirá siendo válida.
                      </p>
                    </div>
                    
                    <!-- Expiration notice -->
                    <p style="margin: 24px 0 0 0; color: #999999; font-size: 13px; text-align: center;">
                      ⏰ Este enlace expirará en <strong>24 horas</strong> por seguridad.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0 0 12px 0; color: #666666; font-size: 14px;">
                      Saludos,<br>
                      <strong style="color: #333333;">El equipo de la aplicación</strong>
                    </p>
                    <p style="margin: 12px 0 0 0; color: #999999; font-size: 12px;">
                      Este es un correo automático, por favor no respondas a este mensaje.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `Hola ${user.name},\n\nHas solicitado restablecer tu contraseña. Haz clic en este enlace para restablecerla:\n\n${url}\n\nSi no solicitaste esto, por favor ignora este correo.\n\nEste enlace expirará en 24 horas.\n\nSaludos,\nEl equipo de la aplicación`,
  });

  if (!result.success) {
    throw new Error(
      result.error ||
        "No se pudo enviar el correo de restablecimiento de contraseña"
    );
  }
}
