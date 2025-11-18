"use server";

import { emailService } from "../email-config";

interface OrganizationInviteEmailData {
  invitation: { id: string };
  inviter: { name: string };
  organization: { name: string };
  email: string;
}

export async function sendOrganizationInviteEmail({
  invitation,
  inviter,
  organization,
  email,
}: OrganizationInviteEmailData) {
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000"}/organizations/invites/${invitation.id}`;

  const result = await emailService.send({
    to: email,
    subject: `Invitación para unirte a ${organization.name}`,
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
                  <td style="background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                      👥 Invitación a organización
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px;">
                      Hola,
                    </p>
                    
                    <p style="margin: 0 0 24px 0; color: #666666; font-size: 15px; line-height: 1.7;">
                      <strong style="color: #17a2b8;">${inviter.name}</strong> te ha invitado a unirte a la organización <strong style="color: #333333;">${organization.name}</strong>.
                    </p>
                    
                    <p style="margin: 0 0 24px 0; color: #666666; font-size: 15px; line-height: 1.7;">
                      Haz clic en el botón de abajo para aceptar o rechazar la invitación.
                    </p>
                    
                    <!-- Button -->
                    <table role="presentation" style="width: 100%; margin: 32px 0;">
                      <tr>
                        <td align="center" style="padding: 0;">
                          <a href="${inviteUrl}" style="display: inline-block; background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; text-align: center; box-shadow: 0 4px 12px rgba(23, 162, 184, 0.4); transition: all 0.3s ease;">
                            Gestionar invitación
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Alternative link -->
                    <p style="margin: 24px 0 0 0; color: #999999; font-size: 13px; text-align: center; word-break: break-all;">
                      O copia y pega este enlace en tu navegador:<br>
                      <a href="${inviteUrl}" style="color: #17a2b8; text-decoration: none;">${inviteUrl}</a>
                    </p>
                    
                    <!-- Info Box -->
                    <div style="margin: 32px 0 0 0; padding: 16px; background-color: #d1ecf1; border-left: 4px solid #17a2b8; border-radius: 4px;">
                      <p style="margin: 0; color: #0c5460; font-size: 14px; line-height: 1.6;">
                        <strong>ℹ️ Información:</strong> Al aceptar la invitación, formarás parte de la organización y tendrás acceso a sus recursos y funcionalidades.
                      </p>
                    </div>
                    
                    <!-- Expiration notice -->
                    <p style="margin: 24px 0 0 0; color: #999999; font-size: 13px; text-align: center;">
                      ⏰ Esta invitación puede tener una fecha de expiración. Te recomendamos responder pronto.
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
    text: `Invitación para unirte a ${organization.name}\n\nHola,\n\n${inviter.name} te ha invitado a unirte a la organización ${organization.name}.\n\nHaz clic en el siguiente enlace para aceptar o rechazar la invitación:\n\n${inviteUrl}\n\nAl aceptar la invitación, formarás parte de la organización y tendrás acceso a sus recursos y funcionalidades.\n\nSaludos,\nEl equipo de la aplicación`,
  });

  if (!result.success) {
    throw new Error(
      result.error || "No se pudo enviar el correo de invitación a la organización"
    );
  }
}

