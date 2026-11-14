import { useState } from "react";
import { ChevronDown, CircleCheck, LoaderCircle, Mail, MessageCircle, Phone } from "lucide-react";
import { services } from "@/lib/site";
import { ButtonArrow, buttonClass, cx, Eyebrow } from "../ui";

const industries = [
  "Manufacturing and processing",
  "FMCG, food and distribution",
  "Retail and consumer",
  "Software and technology services",
  "Family-owned / promoter-led",
  "Start-up / growing SME",
  "Hospitality and services",
  "Other",
];

const methods = [
  { value: "email", label: "Email", icon: Mail },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
];

const errorText = {
  name: "Please enter your name.",
  company: "Please enter your company name.",
  email: "Please enter a valid email address.",
  challenge: "Please describe the challenge briefly.",
};

/** Text inputs, selects and the textarea: 48px tall, hairline border, bronze focus ring, brick-red when invalid. */
const control = cx(
  "w-full rounded-btn border border-border bg-background px-4 py-3 text-base text-foreground",
  "transition-[border-color,box-shadow,background-color] duration-280 ease-out-expo placeholder:text-muted-foreground/60",
  "hover:border-muted-foreground/40",
  "focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-none",
  "aria-invalid:border-destructive aria-invalid:bg-destructive/[0.03] aria-invalid:focus:ring-destructive/15",
);

/** Group heading inside the form: small label + hairline that fills the rest of the line. */
function GroupTitle({ children }) {
  return (
    <div className="flex items-center gap-4 sm:col-span-2">
      <h3 className="text-sm font-semibold tracking-wide whitespace-nowrap text-foreground">{children}</h3>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
  );
}

/**
 * Contact form card. Demo handler: validates and shows the success message, but sends nothing.
 * TODO: connect to Netlify Forms / Formspree / own backend before launch.
 */
export function ContactForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = {};
    for (const el of Array.from(form.elements)) {
      if (el.name && !el.validity.valid) next[el.name] = errorText[el.name] ?? "Please check this field.";
    }
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      form.elements.namedItem(firstInvalid)?.focus();
      return;
    }
    setStatus("submitting");
    setTimeout(() => {
      form.reset();
      setStatus("sent");
    }, 600);
  }

  const clearError = (name) => errors[name] && setErrors(({ [name]: _removed, ...rest }) => rest);

  const field = (name, label, input, opts = {}) => (
    <div className={cx("grid content-start gap-2", opts.full && "sm:col-span-2")}>
      <label htmlFor={name} className="text-sm font-semibold text-foreground">
        {label}
        {opts.required ? (
          <span aria-hidden className="ml-0.5 text-primary">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-muted-foreground">(optional)</span>
        )}
      </label>
      {input}
      {errors[name] ? (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {errors[name]}
        </p>
      ) : opts.hint ? (
        <p id={`${name}-hint`} className="text-sm text-muted-foreground">
          {opts.hint}
        </p>
      ) : null}
    </div>
  );

  const a11y = (name, hint) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : hint ? `${name}-hint` : undefined,
    onInput: () => clearError(name),
  });

  /** Native select with the browser arrow replaced by a Lucide chevron. */
  const select = (name, placeholder, options) => (
    <div className="relative">
      <select {...a11y(name)} defaultValue="" className={cx(control, "cursor-pointer appearance-none pr-11")}>
        <option value="">{placeholder}</option>
        {options}
      </select>
      <ChevronDown
        aria-hidden
        strokeWidth={1.5}
        className="pointer-events-none absolute top-1/2 right-4 size-[18px] -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      data-reveal
      className="rounded-media border border-border bg-card p-6 shadow-[0_24px_60px_-40px_rgb(11_31_59/0.35)] sm:p-10"
    >
      <div className="mb-8 grid gap-3 border-b border-border pb-7">
        <Eyebrow>Request an initial discussion</Eyebrow>
        <h2 className="text-h3">Tell us about your business</h2>
        <p className="text-muted-foreground">
          A few details are enough to start. Fields marked <span className="text-primary">*</span> are required.
        </p>
      </div>

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <GroupTitle>About you</GroupTitle>
        {field(
          "name",
          "Name",
          <input {...a11y("name")} required autoComplete="name" placeholder="Your full name" className={control} />,
          { required: true },
        )}
        {field(
          "company",
          "Company",
          <input
            {...a11y("company")}
            required
            autoComplete="organization"
            placeholder="Company name"
            className={control}
          />,
          { required: true },
        )}
        {field(
          "designation",
          "Designation",
          <input
            {...a11y("designation")}
            autoComplete="organization-title"
            placeholder="Your role"
            className={control}
          />,
        )}
        {field(
          "email",
          "Email",
          <input
            {...a11y("email")}
            type="email"
            required
            autoComplete="email"
            placeholder="name@company.com"
            className={control}
          />,
          { required: true },
        )}
        {field(
          "phone",
          "Phone",
          <input
            {...a11y("phone", true)}
            type="tel"
            autoComplete="tel"
            placeholder="+000 00 000 0000"
            className={control}
          />,
          { hint: "Include your country code.", full: true },
        )}

        <div className="pt-2 sm:col-span-2">
          <GroupTitle>Your enquiry</GroupTitle>
        </div>
        {field(
          "industry",
          "Industry",
          select(
            "industry",
            "Select an industry",
            industries.map((i) => <option key={i}>{i}</option>),
          ),
        )}
        {field(
          "service",
          "Service of interest",
          select("service", "Select a service", [
            ...services.map((s) => <option key={s.slug}>{s.title}</option>),
            <option key="unsure">Not sure yet</option>,
          ]),
        )}
        {field(
          "challenge",
          "Brief description of the challenge",
          <textarea
            {...a11y("challenge")}
            required
            rows={5}
            placeholder="What is happening in the business, and what would you like to change?"
            className={cx(control, "min-h-[150px] resize-y leading-relaxed")}
          />,
          { full: true, required: true },
        )}

        <fieldset className="grid gap-3 sm:col-span-2">
          <legend className="mb-3 text-sm font-semibold text-foreground">Preferred contact method</legend>
          {/* stacked on phones: three side by side are too narrow for "WhatsApp" */}
          <div className="grid gap-2.5 sm:grid-cols-3">
            {methods.map(({ value, label, icon: Icon }, i) => (
              <label
                key={value}
                className={cx(
                  "relative flex cursor-pointer items-center justify-center gap-2 rounded-btn border border-border bg-background px-3 py-3 text-sm font-semibold",
                  "transition-colors duration-280 ease-out-expo hover:border-primary",
                  "has-checked:border-inverse has-checked:bg-inverse has-checked:text-inverse-foreground",
                  "has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2",
                )}
              >
                <input type="radio" name="method" value={value} defaultChecked={i === 0} className="sr-only" />
                <Icon aria-hidden strokeWidth={1.5} className="size-[18px] shrink-0" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 border-t border-border pt-6 sm:col-span-2 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground sm:max-w-[34ch]">
            Your details are used only to respond to this enquiry.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className={cx(buttonClass("primary"), "justify-center")}
          >
            {status === "submitting" ? (
              <>
                Sending <LoaderCircle aria-hidden className="size-4 animate-spin" />
              </>
            ) : (
              <>
                Request an Initial Discussion <ButtonArrow />
              </>
            )}
          </button>
        </div>

        <p role="status" aria-live="polite" className={cx("sm:col-span-2", status !== "sent" && "sr-only")}>
          {status === "sent" && (
            <span
              data-inverse
              className="flex animate-fade-up items-start gap-3 rounded-card bg-inverse px-5 py-4 text-inverse-foreground"
            >
              <CircleCheck aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-inverse-accent" />
              <span>
                <span className="block font-semibold">Thank you, your request has been received.</span>
                <span className="text-sm text-inverse-muted">
                  We will be in touch shortly to arrange an initial discussion.
                </span>
              </span>
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
