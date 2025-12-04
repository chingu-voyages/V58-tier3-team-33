import React from "react";

export const Field = ({
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  return <div ref={ref} {...props} className="flex flex-col space-y-2" />;
};
Field.displayName = "Field";

export const FieldGroup = ({
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  return <div ref={ref} {...props} className="space-y-4" />;
};
FieldGroup.displayName = "FieldGroup";

export const FieldLabel = ({
  ref,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  ref?: React.RefObject<HTMLLabelElement | null>;
}) => {
  return <label ref={ref} {...props} className="block text-white" />;
};
FieldLabel.displayName = "FieldLabel";

interface FieldErrorProps {
  error?: unknown;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error }) => {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
  }
  return null;
};
FieldError.displayName = "FieldError";
