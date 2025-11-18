"use server";

import { emailService } from "../email-config";

interface WelcomeEmailData {
  user: {
    name: string;
    email: string;
  };
}

export async function sendWelcomeEmail({ user }: WelcomeEmailData) {
  const result = await emailService.send({
    to: user.email,
    subject: "¡Bienvenido a nuestra aplicación!",
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
                      🎉 ¡Bienvenido!
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
                      ¡Gracias por registrarte en nuestra aplicación! Estamos emocionados de tenerte a bordo.
                    </p>
                    
                    <p style="margin: 0 0 24px 0; color: #666666; font-size: 15px; line-height: 1.7;">
                      Estamos aquí para ayudarte a sacar el máximo provecho de nuestra plataforma. Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
                    </p>
                    
                    <!-- Info Box -->
                    <div style="margin: 32px 0; padding: 20px; background-color: #e7f3ff; border-left: 4px solid #667eea; border-radius: 4px;">
                      <p style="margin: 0; color: #004085; font-size: 14px; line-height: 1.6;">
                        <strong>💡 Consejo:</strong> Explora todas las funcionalidades disponibles y personaliza tu experiencia según tus necesidades.
                      </p>
                    </div>
                    
                    <!-- CTA Section -->
                    <table role="presentation" style="width: 100%; margin: 32px 0;">
                      <tr>
                        <td align="center" style="padding: 0;">
                          <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; text-align: center; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                            Comenzar ahora
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 24px 0 0 0; color: #666666; font-size: 15px; line-height: 1.7;">
                      ¡Esperamos que disfrutes de tu experiencia con nosotros!
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
    text: `Hola ${user.name},\n\n¡Gracias por registrarte en nuestra aplicación! Estamos emocionados de tenerte a bordo.\n\nEstamos aquí para ayudarte a sacar el máximo provecho de nuestra plataforma. Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.\n\n¡Esperamos que disfrutes de tu experiencia con nosotros!\n\nSaludos,\nEl equipo de la aplicación`,
  });

  if (!result.success) {
    throw new Error(
      result.error || "No se pudo enviar el correo de bienvenida"
    );
  }
}
