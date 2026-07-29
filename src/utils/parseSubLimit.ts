import type { SubLimit } from '../types';

function toKey(label: string): string {
  return label.trim().toLowerCase().replace(/[^a-z0-9]+([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/[^a-z0-9]/g, '');
}

export function parseSubLimit(raw: string | any): SubLimit {
  if (!raw) return { key: 'other', label: String(raw) };
  if (typeof raw === 'object') return raw as SubLimit;

  const parts = raw.split(':');
  let label = parts[0].trim();
  let rest = parts.slice(1).join(':').trim();
  if (!rest) {
    rest = label;
  }

  // Try to find percentage
  const percentMatch = rest.match(/(\d+(?:\.\d+)?)%/);
  const capPercent = percentMatch ? Number(percentMatch[1]) : undefined;

  // Try to find rupee amount like ₹12,345 or 12345
  const rupeeMatch = rest.match(/₹\s*([\d,]+(?:\.\d+)?)/);
  const capAmount = rupeeMatch ? Number(rupeeMatch[1].replace(/,/g, '')) : undefined;

  // Unit detection
  const unit = /per day|daily/i.test(rest) ? 'perDay'
    : /per claim|per admission|per instance|per claim/i.test(rest) ? 'perClaim'
    : /per eye|per eye/i.test(rest) ? 'perEye'
    : undefined;

  const key = toKey(label);

  const sl: SubLimit = {
    key,
    label,
    description: rest || undefined,
    capPercent,
    capAmount,
    unit
  };

  return sl;
}
