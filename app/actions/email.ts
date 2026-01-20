"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!email || !message || !name) {
        return { success: false, message: "Veuillez remplir tous les champs obligatoires." };
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #3c50e0 0%, #1c2b9a 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background-color: #ffffff; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #1e293b; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; margin-bottom: 5px; display: block; }
        .value { background-color: #f1f5f9; padding: 12px; border-radius: 6px; border-left: 4px solid #3c50e0; }
        .message-box { background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-top: 10px; border: 1px inset #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0; font-size: 24px;">Nouveau Message de Contact</h1>
          <p style="margin:10px 0 0; opacity: 0.8;">ESURSI-APP Portal</p>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Expéditeur</span>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <span class="label">Email</span>
            <div class="value">${email}</div>
          </div>
          <div class="field">
            <span class="label">Téléphone</span>
            <div class="value">${phone || "Non renseigné"}</div>
          </div>
          <div class="field">
            <span class="label">Objet</span>
            <div class="value">${subject || "Pas d'objet"}</div>
          </div>
          <div class="field">
            <span class="label">Message</span>
            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          Ce message a été envoyé depuis le formulaire de contact du site ESURSI-APP.<br>
          &copy; ${new Date().getFullYear()} Ministère de l'ESURSI - RDC.
        </div>
      </div>
    </body>
    </html>
  `;

    try {
        await transporter.sendMail({
            from: `"ESURSI Contact Form" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // Admin email
            replyTo: email,
            subject: `[Contact ESURSI] ${subject || "Nouveau message"}`,
            html: htmlContent,
        });

        return { success: true, message: "Votre message a été envoyé avec succès !" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Une erreur est survenue lors de l'envoi du message." };
    }
}
