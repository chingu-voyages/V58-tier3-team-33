import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../../../components/ui/Field'
import {
  freelancerProfileSchema,
  type FreelancerProfileSchema,
} from '../schema'
import { useNavigate, Link } from 'react-router-dom'

const ProfileForm = () => {
  const navigate = useNavigate()
  const form = useForm<FreelancerProfileSchema>({
    resolver: zodResolver(freelancerProfileSchema),
    defaultValues: {
      title: '',
      experienceLevel: 'Entry-level',
      servicesOffered: [],
      rate: 0,
      availability: 'Full-time',
      keySkills: [],
      portfolioUrl: '',
    },
  })

  const onSubmit = (data: FreelancerProfileSchema) => {
    console.info('Freelancer Profile Form Submitted:', data)
    // TODO: Add logic to save the freelancer profile, then navigate
    void navigate('/freelancer')
  }

  const handleCancelClick = () => {
    void navigate('/freelancer')
  }

  return (
    <>
      <main className='flex flex-col min-h-dvh w-screen bg-background-alt'>
        <nav className='flex justify-between bg-background items-center py-4 px-4 sm:px-8 md:px-16 '>
          <div className=''>
            <h2 className='text-2xl md:text-3xl text-accent-gold font-bold'>
              Worksy
            </h2>
            <p className='text-xs md:text-sm text-gray-mid'>
              Digital talent meets opportunity
            </p>
          </div>
          <aside className='flex gap-4 md:gap-8 items-center text-gray-light'>
            <div className='hidden md:block'>
              <Link to='/client'>Browse Gigs</Link>{' '}
              {/* Link to client gigs for now */}
            </div>
            <div className='space-x-2'>
              <span className='size-40 bg-accent-gold text-background font-bold p-1 text-lg rounded-full'>
                EJ
              </span>
              <span className='hidden md:inline'>Emily Jones</span>
            </div>
          </aside>
        </nav>
        <article className='bg-background-alt py-8 md:py-12 px-4 sm:px-8 flex flex-col md:w-4/5 mx-auto'>
          <h2 className='text-gray-light text-3xl font-bold mb-4'>
            Complete Your Profile
          </h2>
          <p className='text-gray-mid text-base mb-8'>
            Fill out your profile to showcase your skills and experience to
            potential clients.
          </p>
          <form
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            className='space-y-4 md:space-y-5 text-base md:text-base w-full'
          >
            <FieldGroup>
              <Controller
                control={form.control}
                name='title'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type='text'
                      placeholder='e.g., Senior React Developer, UI/UX Designer'
                      className='w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-gray-light'
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name='experienceLevel'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Experience Level
                    </FieldLabel>
                    <select
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-gray-light'
                    >
                      <option value='Entry-level'>Entry-level</option>
                      <option value='Intermediate'>Intermediate</option>
                      <option value='Expert'>Expert</option>
                    </select>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name='servicesOffered'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Services Offered (comma separated)
                    </FieldLabel>
                    <textarea
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='e.g., Web Development, Mobile App Design, SEO'
                      className='w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-gray-light h-32'
                      onChange={(e) => {
                        const services = e.target.value
                          .split(',')
                          .map((service) => service.trim())
                          .filter(Boolean)
                        field.onChange(services)
                      }}
                      value={
                        Array.isArray(field.value) ? field.value.join(', ') : ''
                      }
                      maxLength={500}
                    />
                    <div className='text-right text-xs text-gray-mid mt-1'>
                      {(
                        (Array.isArray(field.value)
                          ? field.value.join(', ')
                          : '') || ''
                      ).length || 0}
                      /500
                    </div>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name='rate'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Hourly Rate ($)
                    </FieldLabel>
                    <input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type='number'
                      placeholder='e.g., 50'
                      className='w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-gray-light'
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ''
                            ? undefined
                            : e.target.valueAsNumber,
                        )
                      }
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name='availability'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Availability</FieldLabel>
                    <select
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-gray-light'
                    >
                      <option value='Full-time'>Full-time</option>
                      <option value='Part-time'>Part-time</option>
                      <option value='As needed'>As needed</option>
                    </select>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name='keySkills'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Key Skills (comma separated)
                    </FieldLabel>
                    <input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type='text'
                      placeholder='e.g., React, Node.js, TypeScript, AWS'
                      className='w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-gray-light'
                      onChange={(e) => {
                        const skills = e.target.value
                          .split(',')
                          .map((skill) => skill.trim())
                          .filter(Boolean)
                        field.onChange(skills)
                      }}
                      value={
                        Array.isArray(field.value) ? field.value.join(', ') : ''
                      }
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name='portfolioUrl'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Portfolio URL (Optional)
                    </FieldLabel>
                    <input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type='text'
                      placeholder='e.g., https://yourportfolio.com'
                      className='w-full py-2 px-3 md:py-3 md:px-5 rounded-lg bg-background text-gray-light'
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className='flex gap-4 mt-8'>
              <button
                type='button' // Changed to type='button' to prevent form submission
                className='outline-1 outline-gray-mid text-gray-light px-3 py-1 rounded-lg text-sm sm:w-auto'
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-accent-gold text-background p-2 rounded text-base md:text-base'
              >
                Save Profile
              </button>
            </div>
          </form>
        </article>
      </main>
    </>
  )
}

export default ProfileForm
