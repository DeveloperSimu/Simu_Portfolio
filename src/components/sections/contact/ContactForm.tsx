import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/cn';
import { buttonStyles } from '@/components/ui/buttonStyles';

type Field = 'name' | 'email' | 'subject' | 'message';
type FormValues = Record<Field, string>;
type FormErrors = Partial<Record<Field, string>>;
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_VALUES: FormValues = { name: '', email: '', subject: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length > 100) errors.name = 'Name must be 100 characters or fewer.';

  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim()) || values.email.trim().length > 255)
    errors.email = 'Please enter a valid email address.';

  if (!values.subject.trim()) errors.subject = 'Please add a subject.';
  else if (values.subject.trim().length > 150) errors.subject = 'Subject must be 150 characters or fewer.';

  if (!values.message.trim()) errors.message = 'Please write a short message.';
  else if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  else if (values.message.trim().length > 3000) errors.message = 'Message must be 3000 characters or fewer.';

  return errors;
}

const fieldBase =
  'w-full rounded-2xl border bg-ink/70 px-4 py-3.5 text-sm text-fg placeholder:text-fg-muted/60 transition-colors duration-300 focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/20';

interface FieldProps {
  id: Field;
  label: string;
  error?: string;
  children: ReactNode;
}

function FieldWrapper({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-fg-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-rose-glow">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const updateField = (field: Field) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
      if (error) throw error;
      setValues(EMPTY_VALUES);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center py-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-glow/15 text-emerald-glow">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-fg">Message sent. Thank you!</h3>
        <p className="mt-3 max-w-sm text-sm leading-[1.5] text-fg-muted">
          Your message has been received. I will get back to you as soon as I can.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className={buttonStyles('secondary', 'mt-8')}>
          Send another message
        </button>
      </div>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            value={values.name}
            onChange={updateField('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder="Your name"
            className={cn(fieldBase, errors.name ? 'border-rose-glow/60' : 'border-white/10')}
          />
        </FieldWrapper>
        <FieldWrapper id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={255}
            value={values.email}
            onChange={updateField('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="you@example.com"
            className={cn(fieldBase, errors.email ? 'border-rose-glow/60' : 'border-white/10')}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper id="subject" label="Subject" error={errors.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={150}
          value={values.subject}
          onChange={updateField('subject')}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          placeholder="What would you like to build?"
          className={cn(fieldBase, errors.subject ? 'border-rose-glow/60' : 'border-white/10')}
        />
      </FieldWrapper>

      <FieldWrapper id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={3000}
          value={values.message}
          onChange={updateField('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="Tell me about your idea, goals and timeline."
          className={cn(fieldBase, 'resize-y', errors.message ? 'border-rose-glow/60' : 'border-white/10')}
        />
      </FieldWrapper>

      {status === 'error' && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-glow/30 bg-rose-glow/10 p-4 text-sm text-rose-glow">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>
            Your message could not be sent right now. Please try again in a moment, or reach out through the social
            links on this page.
          </p>
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className={buttonStyles('primary', 'w-full sm:w-auto')}>
        {isSubmitting ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
            Sending
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
