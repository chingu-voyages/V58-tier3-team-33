import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import SegmentedControl from "./SegmentedControl";
import { registerSchema, type RegisterSchema } from "../schema";

const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      userType: "freelancer",
      termsAgreement: false,
    },
  });

  const onSubmit = (data: RegisterSchema) => {
    console.info("Register Form Submitted:", data);
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
          name="fullname"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="Enter your full name"
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

      <button
        type="submit"
        className="w-full bg-gold text-black p-2 rounded text-base md:text-base"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
