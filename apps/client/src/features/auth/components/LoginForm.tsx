import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "../auth-client";
import { loginSchema, type LoginSchema } from "../schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/Field";
import { Spinner } from "@/components/ui/spinner";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      return await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onRequest: () => {
            setLoading(true);
            setError("");
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error == "string") {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      className="w-full space-y-6 text-base md:text-base "
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="email"
                placeholder="Enter your email address"
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white focus-visible:outline-2 focus-visible:outline-accent-gold"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="password"
                placeholder="Enter your password"
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white focus-visible:outline-2 focus-visible:outline-accent-gold"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Login failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <button
        type="submit"
        className="w-full bg-accent-gold text-background p-2 rounded text-base md:text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            Signing in <Spinner className="inline size-6" />
          </>
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
}
