import { useState } from "react";
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle, Mail, MessageCircle, Phone } from "lucide-react";
import { services, site } from "@/lib/site";
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

/** Netlify Forms: the static copy of this form Netlify detects at deploy (keep its field names in sync). */
const FORM_NAME = "contact";
const FORM_ENDPOINT = "/__forms.html";

/** Lead fields in the order they appear in the WhatsApp message (empty ones are left out). */
const whatsappFields = [
  ["name", "Name"],
  ["company", "Company"],
  ["designation", "Designation"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["industry", "Industry"],
  ["service", "Service of interest"],
];

/** wa.me link to the site's WhatsApp number with the enquiry already typed in. */
function whatsappLink(data) {
  const lines = whatsappFields
    .map(([name, label]) => [label, String(data.get(name) ?? "").trim()])
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);
  const text = [
    "Hello AHED, I would like to request an initial discussion.",
    "",
    ...lines,
    "",
    "Challenge:",
    String(data.get("challenge") ?? "").trim(),
  ].join("\n");
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * Contact form card. Validates in the browser, then posts to Netlify Forms (see public/__forms.html), which stores
 * each lead and emails it to the address set under Forms → notifications in the Netlify UI (ceo@ahed.in).
 * Spam: a hidden honeypot field ("bot-field") that people never fill in.
 * Preferred contact method "WhatsApp": the same click also opens WhatsApp (wa.me) to the site's number with the
 * enquiry typed in, so the visitor only taps Send. Opened right away, inside the click, because browsers block
 * pop-ups opened later; the email lead is still sent as a backup, and the success message links to WhatsApp again.
 * In `npm run dev` there is no Netlify, so the post is skipped and the success message shows (payload logged).
 */
export function ContactForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  // Set when the visitor chose WhatsApp: the link shown again in the success message
  const [whatsappUrl, setWhatsappUrl] = useState(null);

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
    const data = new FormData(form);
    const body = new URLSearchParams(data).toString();

    if (data.get("method") === "whatsapp") {
      const url = whatsappLink(data);
      setWhatsappUrl(url);
      const win = window.open(url, "_blank");
      if (win) win.opener = null;
    } else {
      setWhatsappUrl(null);
    }

    const send = import.meta.env.DEV
      ? new Promise((resolve) => {
          console.info("[contact form] dev mode, not sent:", Object.fromEntries(data));
          setTimeout(() => resolve({ ok: true }), 600);
        })
      : fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });
    send
      .then((res) => {
        if (!res.ok) throw new Error(`Form post failed: ${res.status}`);
        form.reset();
        setStatus("sent");
      })
      .catch(() => setStatus("error"));
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
      {/* Netlify Forms: which form this is, the notification email's subject, and the spam honeypot */}
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="subject" value="New enquiry from the Ahed website" />
      <p hidden>
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

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
            placeholder="+91 00000 00000"
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

        <p role="status" aria-live="polite" className={cx("sm:col-span-2", status !== "sent" && status !== "error" && "sr-only")}>
          {status === "error" && (
            <span className="flex animate-fade-up items-start gap-3 rounded-card border border-destructive/30 bg-destructive/[0.04] px-5 py-4 text-foreground">
              <CircleAlert aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-destructive" />
              <span>
                <span className="block font-semibold">Sorry, your request could not be sent.</span>
                <span className="text-sm text-muted-foreground">
                  Please try again, or contact us directly at{" "}
                  <a className="font-semibold text-primary underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>{" "}
                  or{" "}
                  <a className="font-semibold whitespace-nowrap text-primary underline-offset-4 hover:underline" href={site.phoneHref}>
                    {site.phone}
                  </a>
                  .
                </span>
              </span>
            </span>
          )}
          {status === "sent" && (
            <span
              data-inverse
              className="flex animate-fade-up items-start gap-3 rounded-card bg-inverse px-5 py-4 text-inverse-foreground"
            >
              <CircleCheck aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-inverse-accent" />
              <span>
                <span className="block font-semibold">Thank you, your request has been received.</span>
                {whatsappUrl ? (
                  <span className="text-sm text-inverse-muted">
                    WhatsApp has opened with your message ready: just tap Send. If it did not open,{" "}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-inverse-accent underline-offset-4 hover:underline"
                    >
                      continue on WhatsApp
                    </a>
                    .
                  </span>
                ) : (
                  <span className="text-sm text-inverse-muted">
                    We will be in touch shortly to arrange an initial discussion.
                  </span>
                )}
              </span>
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
