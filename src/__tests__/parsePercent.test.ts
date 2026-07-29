import { describe, it, expect } from 'vitest';
import { parsePercentString, normalizePolicyPercents } from '../utils/parsePercent';
import { normalizePolicies } from '../utils/normalizeData';
import { createPolicy } from '../data';

describe('parsePercentString', () => {
  it('parses numeric percent strings', () => {
    expect(parsePercentString('92%')).toBe(92);
    expect(parsePercentString('  92.5%  ')).toBe(92.5);
  });

  it('returns numbers unchanged', () => {
    expect(parsePercentString(85)).toBe(85);
  });

  it('clamps values to 0..100', () => {
    expect(parsePercentString('120%')).toBe(100);
    expect(parsePercentString('-5%')).toBe(0);
  });

  it('throws for invalid strings', () => {
    expect(() => parsePercentString('abc%')).toThrow();
  });
});

describe('normalizePolicyPercents', () => {
  it('converts claimSettlementRatio and transparency from strings to numbers', () => {
    const raw = { claimSettlementRatio: '92%', transparency: '85%', id: 'x' };
    const normalized = normalizePolicyPercents(raw as any);
    expect(normalized.claimSettlementRatio).toBe(92);
    expect(normalized.transparency).toBe(85);
  });
});

describe('createPolicy factory', () => {
  it('normalizes percent fields and applies defaults', () => {
    const raw = {
      id: 't1',
      code: 'POL-000',
      name: 'Test Policy',
      company: 'TestCo',
      logoColor: 'text-blue-600',
      annualPremium: 1000,
      healthScore: 75,
      totalCoverage: 100000,
      riskLevel: 'Low',
      waitingPeriodDays: 30,
      waitingPeriodStatus: 'Active',
      trustScore: 70,
      claimSettlementRatio: '88%',
      customerReviews: 4.0,
      complaintsLevel: 'Low',
      financialStability: 'A',
      transparency: '80%',
      benefits: {
        ayush: { title: 'A', value: '100%', description: 'x' },
        dayCare: { title: 'D', value: 'All', description: 'x' },
        roadAmbulance: { title: 'R', value: 'Actuals', description: 'x' },
        restoration: { title: 'Rest', value: '100%', description: 'x' }
      },
      subLimits: ['Room Rent: Capped at 1% of Sum Insured per day'],
      addOns: [],
      criticalClauses: [],
      mismatches: []
    };

    const p = createPolicy({ ...raw });
    expect(p.claimSettlementRatio).toBe(88);
    expect(p.transparency).toBe(80);
    expect(p.lastUpdated).toBeDefined();
    expect(p.verified).toBe(false);
  });
});
