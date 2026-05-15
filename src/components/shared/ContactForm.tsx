"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ContactFeedbackDialogContent,
  ContactFormActionState,
  ContactFormField,
  ContactSelectField,
  ContactTextareaField,
} from "@/types/site";
import { ContactFeedbackDialog } from "@/components/shared/ContactFeedbackDialog";
import {
  InputField,
  SelectField,
  TextareaField,
  WideArrowButton,
} from "@/components/shared/FormFields";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  action: (
    state: ContactFormActionState,
    formData: FormData
  ) => Promise<ContactFormActionState>;
  formFields: ContactFormField[];
  formSelect: ContactSelectField;
  formTextarea: ContactTextareaField;
  submitLabel: string;
  submitLoadingLabel: string;
  validationMessage: string;
  feedbackDialog: ContactFeedbackDialogContent;
  selectIconSrc: string;
  selectIconAlt: string;
  submitIconSrc: string;
  submitIconHoverSrc?: string;
  submitIconAlt: string;
}

type FormValues = Record<string, string>;

type FieldErrors = Record<string, string>;

type DialogVariant = "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIALOG_EXIT_ANIMATION_MS = 220;

const initialActionState: ContactFormActionState = {
  status: "idle",
  message: null,
};

const invalidFieldClassName =
  "border-(--color-contact-invalid-border) bg-(--color-contact-invalid-bg) ring-1 ring-(--color-contact-invalid-ring)";

const getInitialValues = (
  formFields: ContactFormField[],
  formSelect: ContactSelectField,
  formTextarea: ContactTextareaField
): FormValues => {
  const baseValues: FormValues = {};

  formFields.forEach((field) => {
    baseValues[field.id] = "";
  });

  baseValues[formSelect.id] = "";
  baseValues[formTextarea.id] = "";

  return baseValues;
};

const buildFieldErrorMap = (
  formFields: ContactFormField[],
  formSelect: ContactSelectField,
  formTextarea: ContactTextareaField
) => {
  const map: Record<string, string> = {};

  formFields.forEach((field) => {
    map[field.id] = field.errorMessage;
  });

  map[formSelect.id] = formSelect.errorMessage;
  map[formTextarea.id] = formTextarea.errorMessage;

  return map;
};

const getFormDataValue = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export function ContactForm({
  action,
  formFields,
  formSelect,
  formTextarea,
  submitLabel,
  submitLoadingLabel,
  validationMessage,
  feedbackDialog,
  selectIconSrc,
  selectIconAlt,
  submitIconSrc,
  submitIconHoverSrc,
  submitIconAlt,
}: ContactFormProps) {
  const initialValues = useMemo(
    () => getInitialValues(formFields, formSelect, formTextarea),
    [formFields, formSelect, formTextarea]
  );
  const fieldErrorMap = useMemo(
    () => buildFieldErrorMap(formFields, formSelect, formTextarea),
    [formFields, formSelect, formTextarea]
  );
  const fieldMetaMap = useMemo(() => {
    const map: Record<string, ContactFormField> = {};

    formFields.forEach((field) => {
      map[field.id] = field;
    });

    return map;
  }, [formFields]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const dialogCloseTimeoutRef = useRef<number | null>(null);
  const [actionState, dispatchFormAction, isPending] = useActionState(
    action,
    initialActionState
  );
  const [values, setValues] = useState<FormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [dialogVariant, setDialogVariant] = useState<DialogVariant | null>(null);
  const [isDialogClosing, setIsDialogClosing] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isLoading = isPending;

  const resetFormState = useEffectEvent(() => {
    setValues(initialValues);
    setFieldErrors({});
    setHasSubmitted(false);
    formRef.current?.reset();
  });

  const focusFirstInvalidField = () => {
    const firstInvalidField =
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");

    if (!firstInvalidField) {
      return;
    }

    firstInvalidField.focus({ preventScroll: true });
  };

  const handleDialogClose = () => {
    if (!dialogVariant || isDialogClosing) {
      return;
    }

    if (dialogCloseTimeoutRef.current !== null) {
      window.clearTimeout(dialogCloseTimeoutRef.current);
      dialogCloseTimeoutRef.current = null;
    }

    setIsDialogClosing(true);

    dialogCloseTimeoutRef.current = window.setTimeout(() => {
      setDialogVariant(null);
      setIsDialogClosing(false);
      dialogCloseTimeoutRef.current = null;
    }, DIALOG_EXIT_ANIMATION_MS);
  };

  const fieldMaxLengths = useMemo(() => {
    const map: Record<string, number> = {};

    formFields.forEach((field) => {
      map[field.id] = field.maxLength;
    });

    map[formTextarea.id] = formTextarea.maxLength;

    return map;
  }, [formFields, formTextarea]);

  const requiredKeys = useMemo(
    () => [
      ...formFields.filter((field) => field.isRequired).map((field) => field.id),
      ...(formSelect.isRequired ? [formSelect.id] : []),
      ...(formTextarea.isRequired ? [formTextarea.id] : []),
    ],
    [formFields, formSelect, formTextarea]
  );

  const validateFieldValue = (key: string, rawValue: string) => {
    const value = rawValue.trim();
    const meta = fieldMetaMap[key];

    if (meta) {
      if (meta.isRequired && !value) {
        return fieldErrorMap[key] ?? validationMessage;
      }

      if (meta.type === "email" && value && !EMAIL_REGEX.test(value)) {
        return fieldErrorMap[key] ?? validationMessage;
      }

      const maxLength = fieldMaxLengths[key];

      if (maxLength && value.length > maxLength) {
        return fieldErrorMap[key] ?? validationMessage;
      }

      return "";
    }

    if (key === formSelect.id) {
      if (formSelect.isRequired && !value) {
        return fieldErrorMap[key] ?? validationMessage;
      }

      return "";
    }

    if (key === formTextarea.id) {
      if (formTextarea.isRequired && !value) {
        return fieldErrorMap[key] ?? validationMessage;
      }

      const maxLength = fieldMaxLengths[key];

      if (maxLength && value.length > maxLength) {
        return fieldErrorMap[key] ?? validationMessage;
      }

      return "";
    }

    return "";
  };

  const handleChange = (key: string, nextValue: string) => {
    const maxLength = fieldMaxLengths[key];
    const safeValue = maxLength ? nextValue.slice(0, maxLength) : nextValue;

    setValues((prev) => ({ ...prev, [key]: safeValue }));

    if (!hasSubmitted) {
      return;
    }

    setFieldErrors((prev) => {
      if (!prev[key]) {
        return prev;
      }

      const next = { ...prev };

      delete next[key];

      return next;
    });
  };

  const getValuesFromFormData = (formData: FormData): FormValues => {
    const nextValues: FormValues = {};

    Object.keys(initialValues).forEach((key) => {
      nextValues[key] = getFormDataValue(formData, key);
    });

    return nextValues;
  };

  const validateSubmittedValues = (submittedValues: FormValues) => {
    const nextErrors: FieldErrors = {};

    Object.keys(submittedValues).forEach((key) => {
      const error = validateFieldValue(key, submittedValues[key] ?? "");

      if (error) {
        nextErrors[key] = error;
      }
    });

    requiredKeys.forEach((key) => {
      if (!submittedValues[key]?.trim()) {
        nextErrors[key] = fieldErrorMap[key] ?? validationMessage;
      }
    });

    setFieldErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDialogVariant(null);
    setHasSubmitted(true);

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const submittedValues = getValuesFromFormData(formData);

    setValues(submittedValues);

    if (!validateSubmittedValues(submittedValues)) {
      window.requestAnimationFrame(() => {
        focusFirstInvalidField();
      });
      return;
    }

    startTransition(() => {
      dispatchFormAction(formData);
    });
  };

  const handleServerValidation = useEffectEvent(() => {
    setHasSubmitted(true);

    const isValid = validateSubmittedValues(values);

    if (isValid) {
      return;
    }

    window.requestAnimationFrame(() => {
      focusFirstInvalidField();
    });
  });

  const openFeedbackDialog = useEffectEvent((variant: DialogVariant) => {
    if (dialogCloseTimeoutRef.current !== null) {
      window.clearTimeout(dialogCloseTimeoutRef.current);
      dialogCloseTimeoutRef.current = null;
    }

    if (variant === "success" || variant === "error") {
      resetFormState();
    }

    setIsDialogClosing(false);
    setDialogVariant(variant);
  });

  useEffect(() => {
    return () => {
      if (dialogCloseTimeoutRef.current !== null) {
        window.clearTimeout(dialogCloseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (actionState.status === "idle") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      if (actionState.status === "validation") {
        handleServerValidation();
        return;
      }

      if (actionState.status === "success" || actionState.status === "error") {
        openFeedbackDialog(actionState.status);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [actionState]);

  const renderCornerError = (fieldId: string) => {
    const error = fieldErrors[fieldId];

    if (!error || !hasSubmitted) {
      return null;
    }

    return (
      <div
        id={`${fieldId}-error`}
        className={cn(
          "pointer-events-none absolute -right-5 -top-0.5 -translate-y-1/2 rounded-full border border-(--color-contact-invalid-border) bg-(--color-contact-invalid-bg) px-3 py-1 text-[11px] font-semibold uppercase tracking-[-0.02em] text-(--color-contact-invalid-text)",
          "shadow-sm"
        )}
      >
        {error}
      </div>
    );
  };

  return (
    <div className="relative">
      <form
        ref={formRef}
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        {formFields.map((field) => {
          const hasError = Boolean(fieldErrors[field.id]) && hasSubmitted;

          return (
            <div key={field.id} className={cn("relative", "pb-2")}>
              <InputField
                id={field.id}
                placeholder={field.placeholder}
                type={field.type}
                value={values[field.id]}
                onChange={(nextValue) => handleChange(field.id, nextValue)}
                disabled={isLoading}
                required={field.isRequired}
                maxLength={field.maxLength}
                ariaInvalid={hasError}
                errorId={hasError ? `${field.id}-error` : undefined}
                className={cn(hasError && invalidFieldClassName)}
              />
              {renderCornerError(field.id)}
            </div>
          );
        })}

        <div className="relative pb-2">
          <SelectField
            id={formSelect.id}
            placeholder={formSelect.placeholder}
            options={formSelect.options}
            iconSrc={selectIconSrc}
            iconAlt={selectIconAlt}
            value={values[formSelect.id]}
            onChange={(nextValue) => handleChange(formSelect.id, nextValue)}
            disabled={isLoading}
            required={formSelect.isRequired}
            ariaInvalid={Boolean(fieldErrors[formSelect.id]) && hasSubmitted}
            errorId={
              fieldErrors[formSelect.id] && hasSubmitted
                ? `${formSelect.id}-error`
                : undefined
            }
            className={cn(
              fieldErrors[formSelect.id] && hasSubmitted && invalidFieldClassName
            )}
          />
          {renderCornerError(formSelect.id)}
        </div>

        <div className="relative pb-2">
          <TextareaField
            id={formTextarea.id}
            placeholder={formTextarea.placeholder}
            rows={formTextarea.rows}
            value={values[formTextarea.id]}
            onChange={(nextValue) => handleChange(formTextarea.id, nextValue)}
            disabled={isLoading}
            required={formTextarea.isRequired}
            maxLength={formTextarea.maxLength}
            ariaInvalid={Boolean(fieldErrors[formTextarea.id]) && hasSubmitted}
            errorId={
              fieldErrors[formTextarea.id] && hasSubmitted
                ? `${formTextarea.id}-error`
                : undefined
            }
            className={cn(
              fieldErrors[formTextarea.id] && hasSubmitted && invalidFieldClassName
            )}
          />
          {renderCornerError(formTextarea.id)}
        </div>

        <WideArrowButton
          label={isLoading ? submitLoadingLabel : submitLabel}
          iconSrc={submitIconSrc}
          hoverIconSrc={submitIconHoverSrc}
          iconAlt={submitIconAlt}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </form>

      <ContactFeedbackDialog
        isOpen={Boolean(dialogVariant)}
        isClosing={isDialogClosing}
        variant={dialogVariant ?? "success"}
        content={feedbackDialog}
        onClose={handleDialogClose}
      />
    </div>
  );
}
