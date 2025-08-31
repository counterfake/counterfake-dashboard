"use server";

import { emailTransporter } from "../email-transporter";

const EMAIL_CONFIG = {
  EMAIL_FROM: "Counterfake <info@counterfake.ai>",
};

interface SendEmailProps {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async (emailOptions: SendEmailProps) => {
  try {
    const to = Array.isArray(emailOptions.to)
      ? emailOptions.to.join(",")
      : emailOptions.to;

    await emailTransporter.sendMail({
      from: EMAIL_CONFIG.EMAIL_FROM,
      to,
      ...emailOptions,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      success: false,
    };
  }
};
