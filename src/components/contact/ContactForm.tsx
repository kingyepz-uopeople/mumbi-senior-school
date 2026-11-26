'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Check, Loader2 } from '@/components/icons';
import { fill } from '@/i18n/fill';
import { useLocale } from '@/i18n/locale-context';
import { formatDateKE } from '@/lib/utils';
import type { ContactInquiry } from '@/types';

const INQUIRY_CATEGORY_VALUES = [
  'Admissions & Placement',
  'Fee & Finance Inquiry',
  'Academic & Results',
  'Boarding & Student Welfare',
  'General Administration',
] as const;

const MIN_MESSAGE_LENGTH = 15;
const MAX_MESSAGE_LENGTH = 1500;

type FieldName = keyof ContactInquiry;
type FormErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s()-]{9,20}$/;

function validateField(
  field: FieldName,
  rawValue: string,
  contact: ReturnType<typeof useLocale>['dict']['contact']
): string | undefined {
  const value = rawValue.trim();

  switch (field) {
    case 'name':
      if (!value) return contact.validationName;
      if (value.length < 3)
        return 'Full name must be at least 3 characters long.';
      if (value.length > 100)
        return 'Full name must be 100 characters or fewer.';
      return undefined;

    case 'phone': {
      if (!value) return contact.validationPhone;
      const digitCount = value.replace(/\D/g, '').length;
      if (!PHONE_PATTERN.test(value) || digitCount < 9 || digitCount > 15) {
        return 'Enter a valid phone number (for example, +254 712 345 678 or 0712 345 678).';
      }
      return undefined;
    }

    case 'email':
      if (!value) return contact.validationEmail;
      if (!EMAIL_PATTERN.test(value) || value.length > 254) {
        return 'Enter a valid email address (for example, parent@example.com).';
      }
      return undefined;

    case 'category':
      if (
        !INQUIRY_CATEGORY_VALUES.includes(
          value as (typeof INQUIRY_CATEGORY_VALUES)[number]
        )
      ) {
        return contact.validationSubject;
      }
      return undefined;

    case 'message':
      if (!value) return contact.validationMessage;
      if (value.length < MIN_MESSAGE_LENGTH) {
        return `Please provide at least ${MIN_MESSAGE_LENGTH} characters so the office can respond clearly.`;
      }
      if (value.length > MAX_MESSAGE_LENGTH) {
        return `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
      }
      return undefined;
  }
}

function validateInquiry(
  form: ContactInquiry,
  contact: ReturnType<typeof useLocale>['dict']['contact']
): FormErrors {
  const errors: FormErrors = {};
  const fields: FieldName[] = ['name', 'phone', 'email', 'category', 'message'];

  for (const field of fields) {
    const error = validateField(field, form[field], contact);
    if (error) errors[field] = error;
  }

  return errors;
}

const INITIAL_FORM: ContactInquiry = {
  name: '',
  phone: '',
  email: '',
  category: INQUIRY_CATEGORY_VALUES[0],
  message: '',
};

interface SubmissionReceipt {
  name: string;
  category: string;
  email: string;
  submittedDate: string; // DD/MM/YYYY
}

export default function ContactForm() {
  const { dict } = useLocale();
  const c = dict.contact;
  const inquiryCategories = [
    { value: INQUIRY_CATEGORY_VALUES[0], label: c.catAdmissions },
    { value: INQUIRY_CATEGORY_VALUES[1], label: c.catFees },
    { value: INQUIRY_CATEGORY_VALUES[2], label: c.catAcademic },
    { value: INQUIRY_CATEGORY_VALUES[3], label: c.catBoarding },
    { value: INQUIRY_CATEGORY_VALUES[4], label: c.catGeneral },
  ] as const;

  const [form, setForm] = useState<ContactInquiry>(INITIAL_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (receipt) {
      successRef.current?.focus();
    }
  }, [receipt]);

  const handleChange = (field: FieldName, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value, c),
      }));
    }
  };

  const handleBlur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, form[field], c),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (honeypot.trim() !== '') {
      return;
    }

    const nextErrors = validateInquiry(form, c);
    setErrors(nextErrors);
    setTouched({
      name: true,
      phone: true,
      email: true,
      category: true,
      message: true,
    });

    const orderedFields: FieldName[] = [
      'name',
      'phone',
      'email',
      'category',
      'message',
    ];
    const firstInvalid = orderedFields.find((field) => nextErrors[field]);

    if (firstInvalid) {
      const target = formRef.current?.querySelector<HTMLElement>(
        `#contact-${firstInvalid}`
      );
      target?.focus();
      return;
    }

    setIsSubmitting(true);

    const sanitizedPayload: ContactInquiry = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      category: form.category,
      message: form.message.trim(),
    };

    await new Promise((resolve) => setTimeout(resolve, 300));

    // TODO(database-phase): Persist `sanitizedPayload` to Supabase `contact_inquiries`
    // table via a validated Server Action with RLS insert policy and rate limiting.
    // Intentionally mock/log-only during the public website phase (no Supabase writes).
    console.info('[Mumbi Contact Form — Mock Submission]', {
      ...sanitizedPayload,
      submittedOn: formatDateKE(new Date()),
    });

    setReceipt({
      name: sanitizedPayload.name,
      category: sanitizedPayload.category,
      email: sanitizedPayload.email,
      submittedDate: formatDateKE(new Date()),
    });
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  const activeErrorCount = Object.values(errors).filter(Boolean).length;

  if (receipt) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="p-6 sm:p-7 rounded-sm bg-slate-bg border border-slate-300 border-l-4 border-l-primary space-y-4"
      >
        <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-[0.12em]">
          <Check className="w-4 h-4 stroke-[2]" aria-hidden="true" />
          <span>{c.recorded}</span>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-serif font-bold text-xl text-slate-900">
            {fill(c.thankYou, { name: receipt.name })}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Your <strong>{receipt.category}</strong> message was recorded on{' '}
            <strong className="tabular-nums">{receipt.submittedDate}</strong>{' '}
            under <strong>{receipt.email}</strong>.
          </p>
        </div>

        <p className="text-xs text-slate-600 pt-3 border-t border-slate-200 leading-relaxed">
          <strong>Preview notice:</strong> Direct online filing will be
          activated alongside the school portal database. For time-sensitive
          matters, please contact the administration office during weekday hours
          (08:00 – 17:00) or write to P.O. Box 115 - 10200, Murang&apos;a.
        </p>

        <div className="pt-1">
          <button
            type="button"
            onClick={() => setReceipt(null)}
            className="min-h-11 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors"
          >
            {c.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  const inputClassName = (hasError: boolean) =>
    `w-full min-h-12 px-3.5 py-2.5 rounded-sm border text-sm text-slate-900 placeholder:text-slate-500 transition-colors ${
      hasError
        ? 'border-accent bg-accent/5 focus:bg-white focus:border-accent'
        : 'border-slate-300 bg-slate-bg focus:bg-white focus:border-primary'
    }`;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-describedby="contact-form-note"
    >
      <p id="contact-form-note" className="text-xs text-slate-600">
        {c.requiredNote}
      </p>

      {activeErrorCount > 0 && (
        <div
          role="alert"
          className="p-4 rounded-sm bg-accent/5 border border-accent/40 border-l-4 border-l-accent text-slate-900 flex items-start gap-2.5 text-xs sm:text-sm"
        >
          <AlertCircle
            strokeWidth={1.75}
            className="w-4 h-4 text-accent shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold">
              Please check {activeErrorCount}{' '}
              {activeErrorCount === 1 ? 'field' : 'fields'} before sending.
            </p>
            <p className="text-slate-700 mt-0.5">
              See the notes directly beneath each highlighted field.
            </p>
          </div>
        </div>
      )}

      {/* Anti-spam honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Full Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-800 mb-1.5"
          >
            {c.fullName} <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={100}
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            placeholder="e.g. Jane Wanjiku Kamau"
            className={inputClassName(Boolean(errors.name))}
          />
          {errors.name && (
            <p
              id="contact-name-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-accent flex items-start gap-1.5"
            >
              <AlertCircle
                strokeWidth={1.75}
                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-800 mb-1.5"
          >
            {c.phoneNumber}{' '}
            <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            placeholder="+254 712 345 678"
            className={inputClassName(Boolean(errors.phone))}
          />
          {errors.phone && (
            <p
              id="contact-phone-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-accent flex items-start gap-1.5"
            >
              <AlertCircle
                strokeWidth={1.75}
                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* Email & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-800 mb-1.5"
          >
            {c.emailAddress}{' '}
            <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="parent@example.com"
            className={inputClassName(Boolean(errors.email))}
          />
          {errors.email && (
            <p
              id="contact-email-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-accent flex items-start gap-1.5"
            >
              <AlertCircle
                strokeWidth={1.75}
                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-category"
            className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-800 mb-1.5"
          >
            {c.subject} <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <select
            id="contact-category"
            name="category"
            required
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            onBlur={() => handleBlur('category')}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={
              errors.category ? 'contact-category-error' : undefined
            }
            className={inputClassName(Boolean(errors.category))}
          >
            {inquiryCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p
              id="contact-category-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-accent flex items-start gap-1.5"
            >
              <AlertCircle
                strokeWidth={1.75}
                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{errors.category}</span>
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-800"
          >
            {c.message} <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <span
            id="contact-message-hint"
            className="text-xs text-slate-600 tabular-nums"
          >
            {form.message.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={MAX_MESSAGE_LENGTH}
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message
              ? 'contact-message-error contact-message-hint'
              : 'contact-message-hint'
          }
          placeholder="State your question clearly (e.g. Grade 10 reporting documents, fee structure query, or examination slip collection)."
          className={`${inputClassName(Boolean(errors.message))} resize-y`}
        />
        {errors.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="mt-1.5 text-xs font-semibold text-accent flex items-start gap-1.5"
          >
            <AlertCircle
              strokeWidth={1.75}
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto min-h-12 py-3 px-7 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>{c.sending}</span>
          </>
        ) : (
          <span>{c.sendEnquiry}</span>
        )}
      </button>
    </form>
  );
}
