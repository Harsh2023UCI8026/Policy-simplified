/**
 * Utilities for parsing and normalizing percentage strings coming from external sources.
 * Keep data normalized in numeric form (0..100) across the app.
 */

import type { Policy } from '../types';

export function parsePercentString(s: unknown): number {
  if (s === null || s === undefined) return 0;
  if (typeof s === 'number') {
    // assume already normalized to 0..100
    return Math.max(0, Math.min(100, s));
  }
  if (typeof s !== 'string') {
    throw new Error('parsePercentString expects a string or number');
  }
  const cleaned = s.replace('%', '').trim();
  const n = Number(cleaned);
  if (Number.isNaN(n)) throw new Error('Invalid percent string: ' + s);
  return Math.max(0, Math.min(100, n));
}

export function normalizePolicyPercents(policy: any): Policy {
  // Create a shallow copy and normalize known percent fields
  const copy: any = { ...policy };
  try {
    if ('claimSettlementRatio' in copy) {
      copy.claimSettlementRatio = parsePercentString(copy.claimSettlementRatio);
    }
    if ('transparency' in copy) {
      copy.transparency = parsePercentString(copy.transparency);
    }
  } catch (e) {
    // If normalization fails, keep original values and rethrow for visibility
    // Caller can choose to handle this.
    throw e;
  }
  return copy as Policy;
}
