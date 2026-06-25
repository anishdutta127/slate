// Phone normalization for Indian numbers.
// Canonical storage format: +91XXXXXXXXXX (13 chars total).
// CLAUDE.md engineering principle #7: phone numbers are stored normalized
// everywhere except the auth/OTP path. Display formatting is a render concern.

const INDIAN_PHONE_REGEX = /^\+91[6-9]\d{9}$/;

export function normalizeIndianPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  let candidate: string | null = null;

  if (digits.length === 10) candidate = `+91${digits}`;
  else if (digits.length === 12 && digits.startsWith("91")) candidate = `+${digits}`;
  else if (digits.length === 13 && digits.startsWith("091")) candidate = `+${digits.slice(1)}`;
  else if (digits.length === 11 && digits.startsWith("0")) candidate = `+91${digits.slice(1)}`;

  if (candidate && INDIAN_PHONE_REGEX.test(candidate)) return candidate;
  return null;
}

// Masked display: +91 98••• ••48 — first two and last two digits visible only.
// CLAUDE.md principle #8: never leak full phone numbers in tracking UI.
export function maskPhone(phone: string): string {
  if (!INDIAN_PHONE_REGEX.test(phone)) return phone;
  const last4 = phone.slice(-4);
  return `+91 •••••${last4}`;
}

// Display format for tap-to-call (own profile contact card):
// "+91 98765 43210"
export function displayPhone(phone: string): string {
  if (!INDIAN_PHONE_REGEX.test(phone)) return phone;
  return `+91 ${phone.slice(3, 8)} ${phone.slice(8)}`;
}
