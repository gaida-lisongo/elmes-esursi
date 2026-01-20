"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData, attachments: { name: string, url: string }[] = []) {
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

    const now = new Date();
    const formattedDate = now.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const attachmentsHtml = attachments.length > 0
        ? `
      <div style="margin-top: 40px; border-top: 1px dashed #ccc; padding-top: 20px;">
        <h4 style="text-transform: uppercase; font-size: 14px; color: #3c50e0; margin-bottom: 15px;">Annexes / Pièces Jointes :</h4>
        <ul style="list-style: none; padding: 0;">
          ${attachments.map(att => `
            <li style="margin-bottom: 8px;">
              <a href="${att.url}" target="_blank" style="color: #1a1a1a; text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: bold;">
                <span style="color: #3c50e0;">📎</span> ${att.name} (Cliquez pour visualiser)
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    ` : '';

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Times New Roman', serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .letter-container { max-width: 800px; margin: 20px auto; background-color: #ffffff; padding: 60px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 5px solid #3c50e0; }
        
        /* Section 1: Top Headers */
        .section-header { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        .header-item { width: 50%; vertical-align: top; }
        .date-box { text-align: right; font-style: italic; }
        
        /* Section 2: Subject & Recipient */
        .section-subject { width: 100%; border-collapse: collapse; margin-bottom: 50px; font-weight: bold; }
        .subject-val { width: 60%; vertical-align: top; text-decoration: underline; }
        .recipient-val { width: 40%; vertical-align: top; text-align: right; }
        
        /* Section 3: Content */
        .content-body { text-align: justify; margin-bottom: 40px; white-space: pre-wrap; font-size: 16px; border-top: 1px solid #eee; padding-top: 30px; }
        
        /* Section 4: Footer */
        .footer { border-top: 2px double #e2e8f0; padding-top: 20px; text-align: center; font-size: 11px; color: #64748b; font-family: Arial, sans-serif; }
        
        .label { font-weight: bold; color: #333; }
        .info-value { margin-bottom: 5px; }
      </style>
    </head>
    <body>
      <div class="letter-container">
        <!-- Section 1 -->
        <table class="section-header">
          <tr>
            <td class="header-item">
              <div class="info-value"><span class="label">Expéditeur :</span> ${name}</div>
              <div class="info-value"><span class="label">Email :</span> ${email}</div>
              <div class="info-value"><span class="label">Téléphone :</span> ${phone || "N/A"}</div>
            </td>
            <td class="header-item date-box">
              Fait à Kinshasa, le ${formattedDate}
            </td>
          </tr>
        </table>

        <!-- Section 2 -->
        <table class="section-subject">
          <tr>
            <td class="subject-val">
              OBJET : ${subject || "Requête / Message de contact"}
            </td>
            <td class="recipient-val">
              À Madame la Ministre de l'ESURSI
            </td>
          </tr>
        </table>

        <!-- Section 3 -->
        <div class="content-body">${message}</div>

        <!-- Annexes Section -->
        ${attachmentsHtml}

        <!-- Section 4 -->
        <div class="footer">
          <p>Ce message a été envoyé depuis le formulaire de contact du site officiel ESURSI-APP.</p>
          <p>&copy; ${now.getFullYear()} Ministère de l'Enseignement Supérieur, Universitaire et Recherche Scientifique Innovante - RDC.</p>
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
