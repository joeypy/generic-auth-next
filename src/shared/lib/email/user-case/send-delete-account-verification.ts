"use server";

import { emailService } from "../email-config";

interface EmailVerificationData {
  user: {
    name: string;
    email: string;
  };
  url: string;
}

export async function sendDeleteAccountVerificationEmail({
  user,
  url,
}: EmailVerificationData) {
  const result = await emailService.send({
    to: user.email,
    subject: "Confirmar eliminación de cuenta",
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
                  <td style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                      🗑️ Eliminar cuenta
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px;">
                      Hola <strong style="color: #dc3545;">${user.name}</strong>,
                    </p>
                    
                    <p style="margin: 0 0 24px 0; color: #666666; font-size: 15px; line-height: 1.7;">
                      Lamentamos verte partir. Has solicitado eliminar tu cuenta. Por favor confirma la eliminación haciendo clic en el botón de abajo.
                    </p>
                    
                    <!-- Warning -->
                    <div style="margin: 0 0 32px 0; padding: 16px; background-color: #f8d7da; border-left: 4px solid #dc3545; border-radius: 4px;">
                      <p style="margin: 0; color: #721c24; font-size: 14px; line-height: 1.6;">
                        <strong>⚠️ Advertencia:</strong> Esta acción es permanente e irreversible. Todos tus datos serán eliminados permanentemente.
                      </p>
                    </div>
                    
                    <!-- Button -->
                    <table role="presentation" style="width: 100%; margin: 32px 0;">
                      <tr>
                        <td align="center" style="padding: 0;">
                          <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; text-align: center; box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4); transition: all 0.3s ease;">
                            Confirmar eliminación
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Alternative link -->
                    <p style="margin: 24px 0 0 0; color: #999999; font-size: 13px; text-align: center; word-break: break-all;">
                      O copia y pega este enlace en tu navegador:<br>
                      <a href="${url}" style="color: #dc3545; text-decoration: none;">${url}</a>
                    </p>
                    
                    <!-- Info -->
                    <div style="margin: 32px 0 0 0; padding: 16px; background-color: #d1ecf1; border-left: 4px solid #17a2b8; border-radius: 4px;">
                      <p style="margin: 0; color: #0c5460; font-size: 14px; line-height: 1.6;">
                        <strong>ℹ️ Importante:</strong> Si no solicitaste esta acción, por favor ignora este correo. Tu cuenta seguirá siendo válida.
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
    text: `Hola ${user.name},\n\nLamentamos verte partir. Has solicitado eliminar tu cuenta. Por favor confirma la eliminación haciendo clic en este enlace:\n\n${url}\n\n⚠️ Advertencia: Esta acción es permanente e irreversible.\n\nSi no solicitaste esta acción, por favor ignora este correo.\n\nEste enlace expirará en 24 horas.\n\nSaludos,\nEl equipo de la aplicación`,
  });

  if (!result.success) {
    throw new Error(
      result.error ||
        "No se pudo enviar el correo de verificación de eliminación de cuenta"
    );
  }
}
