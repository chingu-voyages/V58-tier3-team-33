import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { loginSchema, type LoginSchema } from "../schema";

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    console.info("Login Form Submitted:", data);
  };

  return (
    <form
      onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      className="w-full space-y-6 text-base md:text-base "
    >
      <FieldGroup>
        {/* Placeholder for informational message */}
        <div className="border-[0.5px] border-gold/30 bg-gold/10 rounded-xl md:mb-5">
          <p className="p-3 text-sm text-gold md:p-4 md:text-base">
            Welcome back! Enter your credentials to access your account.
          </p>
        </div>

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
                className="w-full rounded-lg bg-background p-3 text-white"
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
                className="w-full rounded-lg bg-background p-3 text-white"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <button
        type="submit"
        className="w-full rounded bg-gold p-3 pt-2 font-semibold text-black transition-colors duration-200 hover:bg-amber-500 md:text-base"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
