import { useNavigate } from "react-router-dom";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "../../../components/ui/Field";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  freelancerProfileSchema,
  type FreelancerProfileSchema,
} from "../schema";
import { calculateProgress } from "../../../utils/form";
import ProgressStepper from "../../auth/components/ProgressStepper"; // Import the stepper
import { useEffect, useState } from "react";

const FreelancerProfilePage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0); // State for step 2 progress
  const form = useForm<FreelancerProfileSchema>({
    resolver: zodResolver(freelancerProfileSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      experienceLevel: "Developing",
      keySkills: [],
      portfolioUrl: "",
      bio: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedFields = form.watch([
    "title",
    "experienceLevel",
    "keySkills",
    "portfolioUrl",
    "bio",
  ]);

  useEffect(() => {
    const values = form.getValues();
    const newProgress = calculateProgress(values, freelancerProfileSchema);
    setProgress(newProgress);
  }, [form, watchedFields]);

  const onSubmit = (data: FreelancerProfileSchema) => {
    console.info("Freelancer Profile Submitted:", data);
    // Here you would typically send this data to your backend
    // After successful submission, navigate to the freelancer dashboard
    void navigate("/freelancer");
  };

  return (
    <div className="min-h-screen bg-background-alt text-gray-light">
      <main className="p-4 md:p-10 max-w-2xl mx-auto">
        <nav className="text-center mb-6">
          <h2 className="md:text-5xl text-3xl font-bold text-accent-gold">
            Worksy
          </h2>
          <h2 className="text-lg">Digital talent meets opportunity</h2>
        </nav>
        {/* Progress Stepper for Step 2 */}
        <ProgressStepper
          progress1={100} // Step 1 is complete
          progress2={progress}
          currentStep={2}
          step1Label="Create Account"
          step2Label="Complete Profile"
        />
        <h2 className="text-2xl font-bold mt-8">Tell us about yourself</h2>
        <p className="text-start text-gray-mid mb-8">
          Help clients understand your skills and experience. You can always
          update this later.
        </p>
        <form
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Job Title</FieldLabel>
                  <input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., Senior Frontend Developer"
                    className="w-full py-2 px-3 rounded-lg bg-background text-white border border-gray-700 focus:ring-accent-gold focus:border-accent-gold"
                  />
                  {fieldState.error && <FieldError error={fieldState.error} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="experienceLevel"
              render={({ field }) => {
                const experienceLevels = [
                  {
                    title: "Emerging",
                    description:
                      "Just starting out — Less than 1 year of hands-on experience.",
                  },
                  {
                    title: "Developing",
                    description:
                      "Building foundations — 6 months to 2 years of experience.",
                  },
                  {
                    title: "Proficient",
                    description:
                      "Confident and capable — 1.5 years to 4 years of experience.",
                  },
                  {
                    title: "Advanced",
                    description:
                      "Leading projects independently — 3 to 7 years of experience.",
                  },
                  {
                    title: "Expert",
                    description:
                      "Deep specialist or generalist — 6+ years of proven experience.",
                  },
                ];

                return (
                  <Field>
                    <FieldLabel>Experience Level</FieldLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {experienceLevels.map((level) => (
                        <div
                          key={level.title}
                          className={`p-4 border bg-background rounded-lg cursor-pointer transition-colors duration-200 ${
                            field.value === level.title
                              ? "border-accent-gold ring-2 ring-accent-gold bg-accent-gold/5"
                              : "border-gray-700 hover:border-gray-500"
                          }`}
                          onClick={() => field.onChange(level.title)}
                        >
                          <h3 className="font-semibold text-gray-light">
                            {level.title}
                          </h3>
                          <p className="text-sm text-gray-mid">
                            {level.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Field>
                );
              }}
            />

            {/* Portfolio URL */}
            <Controller
              control={form.control}
              name="portfolioUrl"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Portfolio URL{" "}
                    <span className="text-gray-mid">(Optional)</span>
                  </FieldLabel>
                  <input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="url"
                    placeholder="e.g., https://yourportfolio.com"
                    className="w-full py-2 px-3 rounded-lg bg-background text-white border border-gray-700 focus:ring-accent-gold focus:border-accent-gold"
                  />
                  {fieldState.error && <FieldError error={fieldState.error} />}
                </Field>
              )}
            />

            {/* Key Skills */}
            <Controller
              control={form.control}
              name="keySkills"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Key Skills</FieldLabel>
                  <input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., Figma, React, Branding, User Research"
                    className="w-full py-2 px-3 rounded-lg bg-background text-white border border-gray-700 focus:ring-accent-gold focus:border-accent-gold"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((s) => s.trim()),
                      )
                    }
                    value={
                      Array.isArray(field.value) ? field.value.join(", ") : ""
                    }
                  />
                  {fieldState.error && <FieldError error={fieldState.error} />}
                </Field>
              )}
            />

            {/* Brief Bio */}
            <Controller
              control={form.control}
              name="bio"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Brief Bio <span className="text-gray-mid">(Optional)</span>
                  </FieldLabel>
                  <textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Tell clients a bit about yourself and what you do best..."
                    rows={4}
                    className="w-full py-2 px-3 rounded-lg bg-background text-white border border-gray-700 focus:ring-accent-gold focus:border-accent-gold"
                  />
                  <p className="text-sm text-gray-mid text-right">
                    {field.value?.length ?? 0} / 500
                  </p>
                  {fieldState.error && <FieldError error={fieldState.error} />}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex gap-4 my-8">
            <button
              type="button" // Changed to type='button' to prevent form submission
              className="outline-1 outline-gray-mid text-gray-light px-3 py-1 rounded-lg text-sm sm:w-auto"
              // onClick={handleCancelClick}
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="bg-accent-gold text-background flex-1 p-2 rounded text-base md:text-base"
            >
              Complete Profile
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default FreelancerProfilePage;
