import { ArrowUpRight, Award, ShieldCheck } from 'lucide-react';
import { certifications, type Certification } from '@/data/credentials';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { cn } from '@/lib/cn';

function CertificatePreview({ certification }: { certification: Certification }) {
  if (certification.certificateImage) {
    const isPdf = certification.certificateImage.toLowerCase().endsWith('.pdf');

    if (isPdf) {
      return (
        <iframe
          src={certification.certificateImage}
          title={`${certification.title} certificate preview`}
          loading="lazy"
          className="h-full w-full border-0 bg-white"
        />
      );
    }

    return (
      <img
        src={certification.certificateImage}
        alt={`${certification.title} certificate`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-violet-deep/40 via-ink-raised to-ink" aria-hidden>
      <div className="absolute inset-4 rounded-xl border border-dashed border-violet/25" />
      <Award className="relative h-10 w-10 text-violet-highlight transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-110" strokeWidth={1.25} />
      <span className="relative mt-4 font-heading text-[10px] uppercase tracking-[0.3em] text-fg-muted">Certificate preview</span>
    </div>
  );
}

function CertificateCard({ certification }: { certification: Certification }) {
  const hasVerifyLink = certification.verifyUrl !== null;

  return (
    <TiltCard maxTilt={5} className="h-full rounded-3xl">
      <article className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-500 hover:border-violet/40">
        <div className="aspect-[4/3] overflow-hidden border-b border-white/10">
          <CertificatePreview certification={certification} />
        </div>
        <div className="flex flex-1 flex-col p-6">
          {certification.issuer && (
            <p className="font-heading text-xs uppercase tracking-[0.2em] text-violet-highlight">{certification.issuer}</p>
          )}
          <h3 className={cn('font-heading text-base font-semibold leading-snug text-fg', certification.issuer && 'mt-2')}>
            {certification.title}
          </h3>
          <div className="mt-auto pt-6">
            {hasVerifyLink ? (
              <a
                href={certification.verifyUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-violet-highlight transition-colors hover:text-fg"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Verify credential
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-xs text-fg-muted" aria-disabled="true">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Verification link coming soon
              </span>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Certifications & Achievements"
            title="Credentials that back up the craft."
            description="Certifications across cloud, AI, analytics and programming that have shaped how I approach building software."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification, index) => (
            <Reveal key={certification.id} delay={(index % 3) * 0.08}>
              <CertificateCard certification={certification} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
