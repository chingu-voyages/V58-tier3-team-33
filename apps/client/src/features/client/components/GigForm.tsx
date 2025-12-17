import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/Field";
import { gigSchema, type GigSchema } from "../schema";
import { useNavigate } from "react-router-dom";

const GigForm = () => {
  const navigate = useNavigate();
  const form = useForm<GigSchema>({
    resolver: zodResolver(gigSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      budgetRange: "",
      timelineDeadline: "",
      requiredSkills: [],
    },
  });

  const onSubmit = (data: GigSchema) => {
    console.info("Gig Form Submitted:", data);
    // TODO: Add logic to save the gig, then navigate
    void navigate("/client");
  };

  return (
    <form
      onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      className="space-y-4 md:space-y-5 text-base md:text-base w-full md:w-4/5 mx-auto"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="e.g., Senior Product Designer for SaaD Platforms"
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="category"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Category</FieldLabel>
              <select
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white"
              >
                <option value="">Select a category</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="design">Design</option>
                <option value="writing">Writing</option>
                <option value="marketing">Marketing</option>
                <option value="other">Other</option>
              </select>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Describe the project, deliverables, and what success looks like."
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white h-32"
                maxLength={2000}
              />
              <div className="text-right text-xs text-gray-mid mt-1">
                {field.value?.length || 0}/2000
              </div>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="budgetRange"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Budget Range</FieldLabel>
              <input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder='e.g., "$3000 - $5000"'
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="timelineDeadline"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Timeline/Deadline</FieldLabel>
              <input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="e.g., 2-4 weeks, End of January"
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="requiredSkills"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Required Skills (Optional)
              </FieldLabel>
              <input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="e.g., Figma, React, Node JS, User Research(comma separated)"
                className="w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-white"
                onChange={(e) => {
                  const skills = e.target.value
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean);
                  field.onChange(skills);
                }}
                value={Array.isArray(field.value) ? field.value.join(", ") : ""}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex gap-4 mt-8">
        <button
          type="button" // Changed to type='button' to prevent form submission
          className="outline-2 outline-gray-mid text-gray-light px-3 py-1 rounded-lg text-sm sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gold text-black p-2 rounded text-base md:text-base"
        >
          Submit for review
        </button>
      </div>
    </form>
  );
};

export default GigForm;
