import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/cn';
import { buttonStyles } from '@/components/ui/buttonStyles';
import { Reveal } from '@/components/ui/Reveal';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254;
const UNIQUE_VIOLATION_CODE = '23505';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Newsletter() {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const isSubmitting = status === 'submitting';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setValidationError(null);
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const normalized = email.trim().toLowerCase();
    if (normalized.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(normalized)) {
      setValidationError('Enter a valid email address, for example name@example.com.');
      return;
    }

    setStatus('submitting');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email: normalized });

    if (error && error.code !== UNIQUE_VIOLATION_CODE) {
      setStatus('error');
      return;
    }

    setEmail('');
    setStatus('success');
  };

  return (
    <section id="newsletter" className="relative px-5 pb-24 sm:px-8 lg:pb-32">
      <Reveal className="mx-auto max-w-6xl">
        <div className="glass relative overflow-hidden rounded-[32px] p-8 sm:p-12 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/15 text-violet-highlight">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <p className="eyebrow mt-6">Newsletter</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] text-fg sm:text-4xl">
                Get new articles in your inbox.
              </h2>
              <p className="mt-4 max-w-md text-base leading-[1.5] text-fg-muted">
                Leave your email to be notified when I publish a new article on full stack development and emerging tech.
              </p>
            </div>

            <div className="lg:col-span-6">
              {status === 'success' ? (
                <div role="status" className="flex flex-col items-start gap-4 rounded-2xl border border-emerald-glow/30 bg-emerald-glow/10 p-6">
                  <CheckCircle2 className="h-7 w-7 text-emerald-glow" aria-hidden />
                  <p className="font-heading text-lg font-medium text-fg">Thanks, you are on the list.</p>
                  <p className="text-sm text-fg-muted">Your email is saved. Nothing else is required from you.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Newsletter signup" className="space-y-4">
                  <div>
                    <label htmlFor={inputId} className="mb-2 block font-heading text-xs uppercase tracking-[0.18em] text-fg-muted">
                      Email address
                    </label>
                    <input
                      id={inputId}
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={validationError !== null}
                      aria-describedby={validationError ? errorId : undefined}
                      className={cn(
                        'w-full rounded-2xl border bg-ink/60 px-5 py-4 text-sm text-fg placeholder:text-fg-muted/60 transition-colors duration-300 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/30 disabled:opacity-60',
                        validationError ? 'border-rose-glow/60' : 'border-white/10',
                      )}
                    />
                    {validationError && (
                      <p id={errorId} className="mt-2 text-xs text-rose-glow">
                        {validationError}
                      </p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-glow/30 bg-rose-glow/10 p-4 text-sm text-rose-glow">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>Your email could not be saved right now. Please try again in a moment.</span>
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className={buttonStyles('primary', 'w-full sm:w-auto')}>
                    {isSubmitting ? 'Subscribing...' : 'Notify me of new articles'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
