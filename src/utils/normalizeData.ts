/**
 * Walk arbitrary objects and convert string-only percent values (e.g. "92%")
 * into numeric values using parsePercentString. Keeps other strings untouched.
 */
import { parsePercentString } from './parsePercent';
import type { Policy } from '../types';

function normalizeValue(val: any): any {
  if (val === null || val === undefined) return val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    // Match full-string percent values like "92%" or "92.5%"
    if (/^\d+(?:\.\d+)?%$/.test(trimmed)) {
      return parsePercentString(trimmed);
    }
    return val;
  }
  if (Array.isArray(val)) {
    return val.map(normalizeValue);
  }
  if (typeof val === 'object') {
    const out: any = {};
    for (const k of Object.keys(val)) {
      out[k] = normalizeValue(val[k]);
    }
    return out;
  }
  return val;
}

export function normalizePolicyObject(obj: any): Policy {
  return normalizeValue(obj) as Policy;
}

export function normalizePolicies(policies: any[]): Policy[] {
  return policies.map(normalizePolicyObject);
}
