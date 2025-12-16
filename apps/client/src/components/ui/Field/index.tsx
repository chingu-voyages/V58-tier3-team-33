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
  errors: { message?: string }[];
}

export const FieldError: React.FC<FieldErrorProps> = ({ errors }) => {
  if (!errors || errors.length === 0 || !errors[0].message) {
    return null;
  }
  return <p className="text-red-500 text-sm mt-1">{errors[0].message}</p>;
};
FieldError.displayName = "FieldError";
