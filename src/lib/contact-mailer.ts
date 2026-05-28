import nodemailer from "nodemailer";
import { siteConfig } from "@/content/site";

const contactContent = siteConfig.pages.contact;

export interface ContactEmailPayload {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
}

const DEFAULT_CONTACT_FROM_NAME = "STRONG WEBSITE";
const TRUE_VALUES = new Set(["1", "true", "yes"]);
const FALSE_VALUES = new Set(["0", "false", "no"]);

const getEnvValue = (key: string) => {
  const value = process.env[key];
  return value && value.trim() ? value.trim() : null;
};

const parseSecureValue = (value: string) => {
  const normalizedValue = value.trim().toLowerCase();

  if (TRUE_VALUES.has(normalizedValue)) {
    return true;
  }

  if (FALSE_VALUES.has(normalizedValue)) {
    return false;
  }

  return null;
};

const extractEmailAddress = (value: string) =>
  value.replace(/^.*</, "").replace(/>.*$/, "").replaceAll('"', "").trim();

const formatFromAddress = (value: string | null, fallbackUser: string) => {
  const rawValue = value?.trim() ?? "";
  const address = rawValue ? extractEmailAddress(rawValue) : fallbackUser;
  const explicitName = rawValue.includes("<")
    ? rawValue.slice(0, rawValue.indexOf("<")).replaceAll('"', "").trim()
    : "";
  const displayName = explicitName || DEFAULT_CONTACT_FROM_NAME;

  return `${displayName} <${address}>`;
};

const getSmtpConfig = (): SmtpConfig | null => {
  const host = getEnvValue("SMTP_HOST");
  const portValue = getEnvValue("SMTP_PORT");
  const secureValue = getEnvValue("SMTP_SECURE");
  const user = getEnvValue("SMTP_USER");
  const pass = getEnvValue("SMTP_PASS");

  if (!host || !portValue || !secureValue || !user || !pass) {
    console.error("Configuración SMTP incompleta para el formulario de contacto.");
    return null;
  }

  const from = formatFromAddress(getEnvValue("SMTP_FROM"), user);
  const to = getEnvValue("SMTP_TO") ?? user;

  const port = Number(portValue);
  const secure = parseSecureValue(secureValue);

  if (Number.isNaN(port) || secure === null) {
    return null;
  }

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    to,
  };
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildSubject = (fullName: string) => {
  const baseSubject = contactContent.notificationEmail.subject;

  return fullName
    ? `${baseSubject}: ${fullName}`
    : baseSubject;
};

const buildMailText = ({
  fullName,
  email,
  phone,
  serviceType,
  message,
}: ContactEmailPayload) => {
  const notificationEmail = contactContent.notificationEmail;
  const safePhone = phone || notificationEmail.emptyPhoneValue;

  return [
    notificationEmail.intro,
    "",
    `${notificationEmail.fullNameLabel}: ${fullName}`,
    `${notificationEmail.emailLabel}: ${email}`,
    `${notificationEmail.phoneLabel}: ${safePhone}`,
    `${notificationEmail.serviceTypeLabel}: ${serviceType}`,
    "",
    `${notificationEmail.messageLabel}:`,
    message,
  ].join("\n");
};

const buildMailHtml = ({
  fullName,
  email,
  phone,
  serviceType,
  message,
}: ContactEmailPayload) => {
  const notificationEmail = contactContent.notificationEmail;
  const safePhone = phone || notificationEmail.emptyPhoneValue;

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(buildSubject(fullName))}</title>
  </head>
  <body style="margin:0;padding:24px;background-color:#f7f5f0;font-family:Arial,sans-serif;color:#1f1f1f;">
    <div style="max-width:640px;margin:0 auto;background-color:#ffffff;padding:24px;">
      <p style="margin:0 0 20px;font-size:16px;line-height:1.5;">${escapeHtml(notificationEmail.intro)}</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.5;"><strong>${escapeHtml(notificationEmail.fullNameLabel)}:</strong> ${escapeHtml(fullName)}</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.5;"><strong>${escapeHtml(notificationEmail.emailLabel)}:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.5;"><strong>${escapeHtml(notificationEmail.phoneLabel)}:</strong> ${escapeHtml(safePhone)}</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.5;"><strong>${escapeHtml(notificationEmail.serviceTypeLabel)}:</strong> ${escapeHtml(serviceType)}</p>
      <p style="margin:20px 0 8px;font-size:15px;line-height:1.5;"><strong>${escapeHtml(notificationEmail.messageLabel)}:</strong></p>
      <p style="margin:0;font-size:15px;line-height:1.7;">${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    </div>
  </body>
</html>`;
};

export async function sendContactFormEmail(
  payload: ContactEmailPayload
): Promise<boolean> {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    return false;
  }

  const mailer = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  try {
    if (process.env.NODE_ENV !== "production") {
      await mailer.verify();
      console.log("SMTP verificado para:", smtpConfig.user);
    }

    await mailer.sendMail({
      from: smtpConfig.from,
      to: smtpConfig.to,
      replyTo: payload.email,
      subject: buildSubject(payload.fullName),
      text: buildMailText(payload),
      html: buildMailHtml(payload),
    });

    if (process.env.NODE_ENV !== "production") {
      console.log("Email enviado a:", smtpConfig.to);
    }

    return true;
  } catch (error) {
    console.error("Error enviando email de contacto:", error);
    return false;
  }
}
