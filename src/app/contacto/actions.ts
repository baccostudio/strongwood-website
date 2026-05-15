"use server";

import { siteConfig } from "@/content/site";
import { sendContactFormEmail } from "@/lib/contact-mailer";
import type { ContactFormActionState } from "@/types/site";

const contactContent = siteConfig.pages.contact;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getFormValue = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

const hasExceededMaxLength = (value: string, maxLength: number) =>
  value.length > maxLength;

const getFieldMaxLength = (fieldId: string) =>
  contactContent.formFields.find((field) => field.id === fieldId)?.maxLength ?? 0;

export async function sendContactFormAction(
  _prevState: ContactFormActionState,
  formData: FormData
): Promise<ContactFormActionState> {
  const fullName = getFormValue(formData, "fullName");
  const email = getFormValue(formData, "email");
  const phone = getFormValue(formData, "phone");
  const serviceType = getFormValue(formData, "serviceType");
  const message = getFormValue(formData, "message");

  const requiredValues = [
    fullName,
    email,
    serviceType,
    message,
  ];

  if (requiredValues.some((value) => !value)) {
    return {
      status: "validation",
      message: contactContent.validationMessage,
    };
  }

  if (
    hasExceededMaxLength(fullName, getFieldMaxLength("fullName")) ||
    hasExceededMaxLength(email, getFieldMaxLength("email")) ||
    hasExceededMaxLength(phone, getFieldMaxLength("phone")) ||
    hasExceededMaxLength(message, contactContent.formTextarea.maxLength)
  ) {
    return {
      status: "validation",
      message: contactContent.validationMessage,
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      status: "validation",
      message: contactContent.validationMessage,
    };
  }

  if (!contactContent.formSelect.options.includes(serviceType)) {
    return {
      status: "validation",
      message: contactContent.validationMessage,
    };
  }

  const didSend = await sendContactFormEmail({
    fullName,
    email,
    phone,
    serviceType,
    message,
  });

  if (!didSend) {
    return {
      status: "error",
      message: contactContent.feedbackDialog.error.description,
    };
  }

  return {
    status: "success",
    message: contactContent.feedbackDialog.success.description,
  };
}
