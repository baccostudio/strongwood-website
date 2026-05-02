"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BaseFieldProps {
  id: string;
  name?: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  ariaInvalid?: boolean;
  errorId?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "tel";
  maxLength?: number;
}

interface SelectFieldProps extends Omit<BaseFieldProps, "value" | "onChange"> {
  options: string[];
  iconSrc?: string;
  iconAlt?: string;
  value?: string | null;
  onChange?: (value: string) => void;
}

interface TextareaFieldProps extends BaseFieldProps {
  rows?: number;
  maxLength?: number;
}

interface WideArrowButtonProps {
  label: string;
  iconSrc: string;
  hoverIconSrc?: string;
  iconAlt: string;
  className?: string;
  disabled?: boolean;
}

const baseInputStyles =
  "w-full bg-(--color-paper) font-[Switzer] text-[18px] font-semibold leading-none tracking-[-0.04em] text-foreground placeholder:text-(--color-footer-text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)";

export function InputField({
  id,
  name,
  placeholder,
  type = "text",
  className,
  value,
  onChange,
  disabled,
  required,
  maxLength,
}: InputFieldProps) {
  return (
    <input
      id={id}
      name={name ?? id}
      type={type}
      placeholder={placeholder}
      aria-label={placeholder}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      disabled={disabled}
      required={required}
      maxLength={maxLength}
      className={cn(baseInputStyles, "h-15 px-5", className)}
    />
  );
}

export function SelectField({
  id,
  name,
  placeholder,
  options,
  iconSrc,
  iconAlt,
  className,
  value,
  onChange,
  disabled,
  required,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const listboxId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const normalizedValue =
    typeof value === "string" && value.trim().length === 0 ? null : value;
  const resolvedValue =
    normalizedValue ?? (internalValue?.trim().length ? internalValue : null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !buttonRef.current?.contains(target) &&
        !listRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange?.(option);
    if (!onChange) {
      setInternalValue(option);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="hidden"
        name={name ?? id}
        value={resolvedValue ?? ""}
        required={required}
      />
      <button
        id={id}
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={cn(
          baseInputStyles,
          "h-15 flex items-center justify-between px-5 text-left",
          resolvedValue ? "text-foreground" : "text-(--color-footer-text)",
          
          className
        )}
      >
        <span className="truncate">{resolvedValue ?? placeholder}</span>
        {iconSrc && iconAlt ? (
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={22}
            height={23}
            className={cn(
              "h-3 w-auto transition",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        ) : null}
      </button>

      {isOpen ? (
        <ul
          id={listboxId}
          ref={listRef}
          role="listbox"
          className="absolute z-10 mt-2 w-full border border-(--color-footer-divider) bg-(--color-paper)"
        >
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={resolvedValue === option}
              onClick={() => handleSelect(option)}
              className={cn(
                "flex h-12 cursor-pointer items-center px-5 text-[18px] font-semibold tracking-[-0.04em] text-foreground transition hover:bg-(--color-surface)",
                resolvedValue === option && "bg-(--color-surface)"
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function TextareaField({
  id,
  name,
  placeholder,
  rows = 5,
  className,
  value,
  onChange,
  disabled,
  required,
  maxLength,
}: TextareaFieldProps) {
  return (
    <textarea
      id={id}
      name={name ?? id}
      rows={rows}
      placeholder={placeholder}
      aria-label={placeholder}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      disabled={disabled}
      required={required}
      maxLength={maxLength}
      className={cn(
        baseInputStyles,
        "min-h-30 px-5 py-5 resize-none",
        className
      )}
    />
  );
}

export function WideArrowButton({
  label,
  iconSrc,
  hoverIconSrc,
  iconAlt,
  className,
  disabled,
}: WideArrowButtonProps) {
  return (
    <button
      type="submit"
      aria-label={iconAlt}
      disabled={disabled}
      className={cn(
        "group flex h-15 w-full items-center justify-between bg-(--color-paper) px-5 text-[18px] font-semibold uppercase tracking-[-0.02em] text-foreground transition-colors cursor-pointer hover:bg-(--color-foreground) hover:text-(--color-paper) disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
    >
      <span>{label}</span>
      <span className="relative h-4.5 w-4.5 overflow-visible">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={18}
          height={18}
          className={cn(
            "transition-opacity duration-200",
            hoverIconSrc ? "opacity-100 group-hover:opacity-0" : "opacity-100"
          )}
        />
        {hoverIconSrc ? (
          <Image
            src={hoverIconSrc}
            alt="img"
            aria-hidden="true"
            width={18}
            height={18}
            className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        ) : null}
      </span>
    </button>
  );
}

