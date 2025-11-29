import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authClient } from "../auth-client";
import { registerSchema, type RegisterSchema } from "../schema";
import SegmentedControl from "./SegmentedControl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/Field";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      userType: "freelancer",
      termsAgreement: false,
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      return await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onRequest: () => {
            setLoading(true);
            setError("");
          },
          onSuccess: async () => {
            setLoading(false);
            if (data.userType === "client") {
              await navigate("/client");
            }
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
      className="space-y-4 md:space-y-5 text-base md:text-base"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="userType"
          render={({ field }) => (
            <Field>
              <SegmentedControl
                selected={field.value}
                setSelected={field.onChange}
                options={[
                  { label: "I'm a Freelancer", value: "freelancer" },
                  { label: "I'm a Client", value: "client" },
                ]}
              />
            </Field>
          )}
        />

        <div className="border-[0.5px] border-gold/30 bg-gold/10 rounded-xl my-4 md:my-8">
          <p className="text-gold p-3 md:p-4 text-sm md:text-base">
            Want to be both? Switch modes anytime after sign up - just start
            with what's most important to you right now
          </p>
        </div>

        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Display Name</FieldLabel>
              <input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="Enter your display name"
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
              <input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="email"
                placeholder="you@example.com"
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white"
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
                placeholder="Create a strong password"
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="termsAgreement"
          render={({ field: { value, ...fieldProps }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center my-2 md:my-3 space-x-2 text-xs md:text-sm">
                <input
                  {...fieldProps}
                  id={fieldProps.name}
                  aria-invalid={fieldState.invalid}
                  type="checkbox"
                  checked={value}
                  className="rounded bg-background text-gold"
                />
                <FieldLabel htmlFor={fieldProps.name}>
                  I agree to the{" "}
                  <a href="#" className="text-gold hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-gold hover:underline">
                    Privacy Policy
                  </a>
                  .
                </FieldLabel>
              </div>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Signup failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <button
        type="submit"
        className="text-center w-full bg-gold text-black p-2 rounded text-base md:text-base"
        // className='w-full bg-gold text-black p-2 rounded text-base md:text-base'
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            Signing up <Spinner className="inline size-6" />
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}
