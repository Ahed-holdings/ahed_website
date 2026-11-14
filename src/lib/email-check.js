/**
 * Email checks for the contact form, beyond the browser's format check:
 * - suggestEmail: "Did you mean …@gmail.com?" for typos of common providers (gmial.com, yahoo.con …). Advice only.
 * - checkEmailDomain: does the part after @ exist and accept email (MX record, or an A record as fallback)?
 *   Asks Google Public DNS over HTTPS; only the domain leaves the site, never the full address.
 *   If the DNS service can't be reached the address is allowed, so a DNS hiccup never blocks a real lead.
 * Neither can prove a mailbox exists or belongs to the visitor (that needs a confirmation email).
 */

/** Popular providers that typos are matched against. */
const POPULAR = [
  "gmail.com",
  "yahoo.com",
  "yahoo.co.in",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "rediffmail.com",
  "protonmail.com",
  "zoho.com",
  "aol.com",
];

/** Real domains that look like typos of the ones above: never "corrected". */
const KNOWN = new Set([
  ...POPULAR,
  "mail.com",
  "gmx.com",
  "ymail.com",
  "yahoo.in",
  "live.in",
  "outlook.in",
  "hotmail.co.uk",
  "me.com",
  "msn.com",
  "proton.me",
  "zohomail.in",
]);

/** Levenshtein edit distance (small strings only). */
function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = temp;
    }
  }
  return row[b.length];
}

/** The corrected address when the domain looks like a typo of a popular provider, else null. */
export function suggestEmail(email) {
  const value = email.trim();
  const at = value.lastIndexOf("@");
  if (at < 1) return null;
  const domain = value.slice(at + 1).toLowerCase();
  if (domain.length < 4 || KNOWN.has(domain)) return null;
  let best = null;
  let bestDistance = 3;
  for (const candidate of POPULAR) {
    const d = distance(domain, candidate);
    if (d < bestDistance) {
      best = candidate;
      bestDistance = d;
    }
  }
  return best && bestDistance <= 2 ? `${value.slice(0, at + 1)}${best}` : null;
}

export const emailDomain = (email) => email.trim().slice(email.trim().lastIndexOf("@") + 1).toLowerCase();

/** domain → true | false once known, or the pending Promise<boolean> */
const results = new Map();

async function lookup(domain) {
  const ask = async (type) => {
    const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`, {
      signal: AbortSignal.timeout(3500),
    });
    if (!res.ok) throw new Error(`DNS ${res.status}`);
    return res.json();
  };
  try {
    const mx = await ask("MX");
    if (mx.Status === 3) return false; // NXDOMAIN: the domain doesn't exist
    const mxRecords = (mx.Answer ?? []).filter((r) => r.type === 15);
    if (mxRecords.length) return !mxRecords.every((r) => /^0\s+\.?$/.test(r.data)); // "0 ." = accepts no mail
    const a = await ask("A"); // no MX: mail falls back to the domain's own address
    return (a.Answer ?? []).some((r) => r.type === 1);
  } catch {
    return true; // DNS service unreachable or slow: don't block the visitor
  }
}

/**
 * Whether the email's domain can receive mail. Returns the answer straight away (true/false) when it is already
 * known for this domain, otherwise a Promise<boolean>. Results are cached for the page visit.
 */
export function checkEmailDomain(email) {
  const domain = emailDomain(email);
  if (!domain || !domain.includes(".")) return false;
  if (results.has(domain)) return results.get(domain);
  const pending = lookup(domain).then((ok) => {
    results.set(domain, ok);
    return ok;
  });
  results.set(domain, pending);
  return pending;
}
