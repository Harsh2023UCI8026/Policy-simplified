import { describe, it, expect } from 'vitest';
import { parseSubLimit } from '../utils/parseSubLimit';

describe('parseSubLimit', () => {
  it('parses percent per day', () => {
    const s = 'Room Rent: Capped at 1% of Sum Insured per day';
    const res = parseSubLimit(s);
    expect(res.label).toBe('Room Rent');
    expect(res.capPercent).toBe(1);
    expect(res.unit).toBe('perDay');
  });

  it('parses rupee amount daily', () => {
    const s = 'ICU Charges: Capped at ₹11,000 daily limit';
    const res = parseSubLimit(s);
    expect(res.label).toBe('ICU Charges');
    expect(res.capAmount).toBe(11000);
    expect(res.unit).toBe('perDay');
  });

  it('parses per eye amounts', () => {
    const s = 'Cataract Surgery: Up to ₹75,000 per eye';
    const res = parseSubLimit(s);
    expect(res.label).toBe('Cataract Surgery');
    expect(res.capAmount).toBe(75000);
    expect(res.unit).toBe('perEye');
  });

  it('handles unknown strings', () => {
    const s = 'Some weird cap text';
    const res = parseSubLimit(s);
    expect(res.label).toBe('Some weird cap text');
    expect(res.capPercent).toBeUndefined();
  });
});
