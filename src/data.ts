/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Policy, ReportItem, ChatMessage } from './types';

export const POLICIES: Policy[] = [
  {
    id: 'hdfc-optima',
    code: 'POL-88293-XP',
    name: 'HDFC Ergo Optima Restore',
    company: 'HDFC ERGO General Insurance',
    logoColor: 'text-blue-600 bg-blue-100 dark:bg-blue-950/40',
    annualPremium: 12500,
    healthScore: 85,
    totalCoverage: 500000,
    riskLevel: 'Moderate',
    waitingPeriodDays: 15,
    waitingPeriodStatus: 'Pending Completion',
    trustScore: 78,
    claimSettlementRatio: 92,
    customerReviews: 4.2,
    complaintsLevel: 'Low',
    financialStability: 'A+',
    transparency: 85,
    benefits: {
      ayush: {
        title: 'AYUSH Treatment',
        value: 'Included',
        description: 'Up to 100% of Sum Insured'
      },
      dayCare: {
        title: 'Day Care Procedures',
        value: '527 items',
        description: 'All medical procedures included'
      },
      roadAmbulance: {
        title: 'Road Ambulance',
        value: 'Actuals',
        description: 'Within city limits'
      },
      restoration: {
        title: 'Restoration Benefit',
        value: '100%',
        description: 'Once per policy year'
      }
    },
    subLimits: [
      'Room Rent: No Sub-limits (Single Private Room)',
      'ICU Charges: No Sub-limits',
      'Cataract Surgery: Up to ₹75,000 per eye'
    ],
    addOns: [
      'Zero Depreciation Cover',
      'Engine Protect Cover',
      'Roadside Assistance Plus'
    ],
    criticalClauses: [
      {
        id: 'CLA-001',
        description: 'Grace period of 30 days for renewal premium payments.',
        status: 'Standard',
        extendedInfo: 'Standard grace period allowed by IRDAI guidelines before policy completely lapses.'
      },
      {
        id: 'CLA-042',
        description: 'Exclusion of cosmetic treatments unless due to accident.',
        status: 'Restrictive',
        extendedInfo: 'Cosmetic enhancement surgeries are excluded. Restorative surgeries post unforeseen accidents are covered.'
      },
      {
        id: 'CLA-118',
        description: 'Worldwide emergency coverage included with co-pay.',
        status: 'Premium',
        extendedInfo: 'Offers emergency medical support even during overseas travels, subject to a 10% co-pay.'
      },
      {
        id: 'CLA-209',
        description: 'Mandatory 24-hour hospitalization for most claims.',
        status: 'Notice',
        extendedInfo: 'Requires active admission in regular ward or ICU for at least 24 consecutive hours. Exceptions apply to day care procedures.'
      }
    ],
    mismatches: [
      {
        type: 'critical',
        title: 'CRITICAL MISMATCH',
        description: 'The hospital license attached has expired (Dec 2023). Claims might be rejected at this facility.'
      },
      {
        type: 'alert',
        title: 'ROOM RENT CAP',
        description: 'A daily cap of ₹10,000 applies. Current suite selection exceeds this by ₹4,500/day.'
      },
      {
        type: 'info',
        title: 'CO-PAY WAIVER',
        description: 'Policy allows for 0% co-payment for accidents. Full coverage confirmed.'
      },
      {
        type: 'info',
        title: 'WAITING PERIOD',
        description: '30-day initial waiting period for slow-growing ailments is currently active.'
      }
    ]
  },
  {
    id: 'icici-lombard',
    code: 'POL-39105-LK',
    name: 'ICICI Lombard Health Shield',
    company: 'ICICI Lombard General Insurance',
    logoColor: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-950/40',
    annualPremium: 10100,
    healthScore: 89,
    totalCoverage: 500000,
    riskLevel: 'Low',
    waitingPeriodDays: 30,
    waitingPeriodStatus: 'Active Waiting',
    trustScore: 85,
    claimSettlementRatio: 96,
    customerReviews: 4.5,
    complaintsLevel: 'Low',
    financialStability: 'AAA',
    transparency: 90,
    benefits: {
      ayush: {
        title: 'AYUSH Treatment',
        value: 'Up to 50%',
        description: 'Subject to government institutes'
      },
      dayCare: {
        title: 'Day Care Procedures',
        value: 'All Covered',
        description: 'Under standard list of 540 clauses'
      },
      roadAmbulance: {
        title: 'Road Ambulance',
        value: 'Capped',
        description: 'Up to ₹5,000 per hospitalization'
      },
      restoration: {
        title: 'Restoration Benefit',
        value: '100% Reload',
        description: 'Triggered upon exhaustion of Sum Insured'
      }
    },
    subLimits: [
      'Room Rent: Capped at 1% of Sum Insured per day',
      'ICU Charges: Capped at 2% of Sum Insured per day',
      'Mental Health: Covered under specialized sub-limits'
    ],
    addOns: [
      'No Claim Bonus Super Plus',
      'Maternity Cover Extended'
    ],
    criticalClauses: [
      {
        id: 'CLA-001',
        description: 'Grace period of 30 days for renewal premium payments.',
        status: 'Standard'
      },
      {
        id: 'CLA-085',
        description: 'No co-pay ratio applied for policyholders below 60 years.',
        status: 'Premium'
      },
      {
        id: 'CLA-129',
        description: 'Sub-limit of ₹20,000 on ambulance usage for out-of-state emergency.',
        status: 'Notice'
      }
    ],
    mismatches: [
      {
        type: 'critical',
        title: 'ROOM CAP EXCEEDED',
        description: 'Current ward is classified as Private Deluxe, violating the 1% premium sum insured allowance.'
      }
    ]
  },
  {
    id: 'niva-bupa',
    code: 'POL-55210-AB',
    name: 'Niva Bupa ReAssure',
    company: 'Niva Bupa Health Insurance',
    logoColor: 'text-green-600 bg-green-100 dark:bg-green-950/40',
    annualPremium: 13200,
    healthScore: 82,
    totalCoverage: 750000,
    riskLevel: 'Moderate',
    waitingPeriodDays: 45,
    waitingPeriodStatus: 'Active Waiting',
    trustScore: 72,
    claimSettlementRatio: 91.4,
    customerReviews: 4.1,
    complaintsLevel: 'Moderate',
    financialStability: 'AA',
    transparency: 82,
    benefits: {
      ayush: {
        title: 'AYUSH Treatment',
        value: 'Fully Covered',
        description: 'Without any restriction conditions'
      },
      dayCare: {
        title: 'Day Care Procedures',
        value: 'Fully Covered',
        description: 'No restriction list of surgeries'
      },
      roadAmbulance: {
        title: 'Road Ambulance',
        value: 'Actuals',
        description: 'Air ambulance covered up to ₹2.5L'
      },
      restoration: {
        title: 'Restoration Benefit',
        value: 'Unlimited',
        description: 'Triggers on subsequent claims'
      }
    },
    subLimits: [
      'Room Rent: No caps on room categories',
      'ICU Charges: No Sub-limits',
      'Pre-Post Hospitalization: 60 and 180 days respectively'
    ],
    addOns: [
      'Safeguard Add-on (for non-medical item coverage)',
      'Annual Health Check-up'
    ],
    criticalClauses: [
      {
        id: 'CLA-001',
        description: 'Grace period of 30 days for renewal premium payments.',
        status: 'Standard'
      },
      {
        id: 'CLA-188',
        description: 'Restoration triggers even for the exact same illness twice.',
        status: 'Premium'
      },
      {
        id: 'CLA-230',
        description: 'Initial 2-year exclusion period for specific slow-growing diseases.',
        status: 'Restrictive'
      }
    ],
    mismatches: [
      {
        type: 'alert',
        title: 'PRE-EXISTING CLARITY',
        description: 'Ensure thyroid diagnostic logs are updated to avoid future delay in claim evaluation.'
      }
    ]
  },
  {
    id: 'star-comprehensive',
    code: 'POL-47124-ST',
    name: 'Star Health Comprehensive',
    company: 'Star Health & Allied Insurance',
    logoColor: 'text-red-650 bg-red-100 dark:bg-red-950/40',
    annualPremium: 11800,
    healthScore: 81,
    totalCoverage: 500000,
    riskLevel: 'Moderate',
    waitingPeriodDays: 30,
    waitingPeriodStatus: 'Active Waiting',
    trustScore: 79,
    claimSettlementRatio: 89.9,
    customerReviews: 4.0,
    complaintsLevel: 'Moderate',
    financialStability: 'AA-',
    transparency: 80,
    benefits: {
      ayush: {
        title: 'AYUSH Treatment',
        value: 'Covered',
        description: 'Up to ₹25,000 per policy year'
      },
      dayCare: {
        title: 'Day Care Procedures',
        value: 'All covered',
        description: 'Covers major key day care surgeries'
      },
      roadAmbulance: {
        title: 'Road Ambulance',
        value: 'Actuals',
        description: 'Up to specified limits'
      },
      restoration: {
        title: 'Restoration Benefit',
        value: '100%',
        description: 'Once per year for unrelated illnesses'
      }
    },
    subLimits: [
      'Room Rent: Single standard AC room covered',
      'ICU Charges: Covered up to 2% sum insured',
      'Cataract Surgery: Up to ₹50,000 per eye limit'
    ],
    addOns: ['Outpatient Dental & Ophthalmic Treatment', 'Hospital Cash Cover'],
    criticalClauses: [
      { id: 'CLA-001', description: 'Grace period of 30 days for renewal.', status: 'Standard' },
      { id: 'CLA-302', description: 'Capped cataract treatment limits per claims.', status: 'Notice' }
    ],
    mismatches: [
      { type: 'info', title: 'CO-PAYMENT APPLIES', description: 'Co-payment of 10% applies if age is above 60.' }
    ]
  },
  {
    id: 'care-health',
    code: 'POL-33129-CA',
    name: 'Care Health Insurance',
    company: 'Care Health Insurance Company',
    logoColor: 'text-teal-600 bg-teal-100 dark:bg-teal-950/40',
    annualPremium: 9950,
    healthScore: 84,
    totalCoverage: 500000,
    riskLevel: 'Low',
    waitingPeriodDays: 30,
    waitingPeriodStatus: 'Active Waiting',
    trustScore: 82,
    claimSettlementRatio: 92.6,
    customerReviews: 4.1,
    complaintsLevel: 'Low',
    financialStability: 'AA',
    transparency: 86,
    benefits: {
      ayush: {
        title: 'AYUSH Treatment',
        value: 'Included',
        description: 'Full sum insured coverage'
      },
      dayCare: {
        title: 'Day Care Procedures',
        value: 'Comprehensive',
        description: 'Covers all specified day care items'
      },
      roadAmbulance: {
        title: 'Road Ambulance',
        value: 'Actuals',
        description: 'Within standard distance boundaries'
      },
      restoration: {
        title: 'Restoration Benefit',
        value: '100% Automatic',
        description: 'For both related and unrelated illnesses'
      }
    },
    subLimits: [
      'Room Rent: Up to ₹5,500 daily for Standard ward',
      'ICU Charges: Capped at ₹11,000 daily limit',
      'Cataract Surgery: Up to ₹60,000'
    ],
    addOns: ['No Claim Bonus Super', 'Global Charge Cover'],
    criticalClauses: [
      { id: 'CLA-001', description: 'Standard grace period guidelines.', status: 'Standard' }
    ],
    mismatches: [
      { type: 'alert', title: 'ROOM CAP WARNING', description: 'Daily room rent limits may require out-of-pocket top-ups.' }
    ]
  },
  {
    id: 'tata-medicare',
    code: 'POL-52119-TA',
    name: 'Tata AIG Medicare',
    company: 'Tata AIG General Insurance',
    logoColor: 'text-amber-600 bg-amber-100 dark:bg-amber-950/40',
    annualPremium: 12100,
    healthScore: 87,
    totalCoverage: 500000,
    riskLevel: 'Low',
    waitingPeriodDays: 15,
    waitingPeriodStatus: 'Pending',
    trustScore: 88,
    claimSettlementRatio: 94.2,
    customerReviews: 4.4,
    complaintsLevel: 'Low',
    financialStability: 'AAA',
    transparency: 89,
    benefits: {
      ayush: {
        title: 'AYUSH Treatment',
        value: 'Covered',
        description: 'Up to 100% of SI'
      },
      dayCare: {
        title: 'Day Care Procedures',
        value: 'Fully Covered',
        description: 'All 540 procedure types included'
      },
      roadAmbulance: {
        title: 'Road Ambulance',
        value: 'Actuals',
        description: 'Covered in full standard'
      },
      restoration: {
        title: 'Restoration Benefit',
        value: '100% Unlimited',
        description: 'Automatic recharge unlimited times'
      }
    },
    subLimits: [
      'Room Rent: No caps (Single Private AC Suite)',
      'ICU Charges: No Sub-limits',
      'Cataract Surgery: Up to actual bills'
    ],
    addOns: ['NCB Super Shield', 'Consumables Cover'],
    criticalClauses: [
      { id: 'CLA-001', description: 'Grace period has 30 days active.', status: 'Standard' },
      { id: 'CLA-109', description: 'Consumables cover can be added as custom dynamic rider.', status: 'Premium' }
    ],
    mismatches: []
  },
  {
    id: 'reliance-health',
    code: 'POL-19823-RE',
    name: 'Reliance General Health',
    company: 'Reliance General Insurance',
    logoColor: 'text-cyan-600 bg-cyan-100 dark:bg-cyan-950/40',
    annualPremium: 10500,
    healthScore: 78,
    totalCoverage: 500000,
    riskLevel: 'Moderate',
    waitingPeriodDays: 45,
    waitingPeriodStatus: 'Active Waiting',
    trustScore: 74,
    claimSettlementRatio: 91.2,
    customerReviews: 3.9,
    complaintsLevel: 'Moderate',
    financialStability: 'A',
    transparency: 79,
    benefits: {
      ayush: {
        title: 'AYUSH Treatment',
        value: 'Covered',
        description: 'Up to 60% of sum insured limit'
      },
      dayCare: {
        title: 'Day Care Procedures',
        value: '400+ Covered',
        description: 'Pre-specified procedural surgeries'
      },
      roadAmbulance: {
        title: 'Road Ambulance',
        value: 'Capped',
        description: 'Capped at ₹3,000 per admission'
      },
      restoration: {
        title: 'Restoration Benefit',
        value: '100%',
        description: 'Available once per policy year'
      }
    },
    subLimits: [
      'Room Rent: Standard single private AC room',
      'ICU Charges: Capped at 2% sum insured',
      'Cataract Surgery: Capped at ₹65,000 per claim'
    ],
    addOns: ['Maternity Rider', 'Critical Illness Cover'],
    criticalClauses: [
      { id: 'CLA-001', description: 'Grace period is 30 days.', status: 'Standard' }
    ],
    mismatches: [
      { type: 'alert', title: 'AMBULANCE SUB-LIMITS', description: 'Road Ambulance is capped at a strict ₹3,000 limit' }
    ]
  },
  {
    id: 'bajaj-health',
    code: 'POL-88223-BA',
    name: 'Bajaj Allianz Health Guard',
    company: 'Bajaj Allianz General Insurance',
    logoColor: 'text-orange-600 bg-orange-100 dark:bg-orange-950/40',
    annualPremium: 11400,
    healthScore: 80,
    totalCoverage: 500000,
    riskLevel: 'Moderate',
    waitingPeriodDays: 30,
    waitingPeriodStatus: 'Active Waiting',
    trustScore: 81,
    claimSettlementRatio: 92.2,
    customerReviews: 4.1,
    complaintsLevel: 'Low',
    financialStability: 'AA+',
    transparency: 82,
    benefits: {
      ayush: {
        title: 'AYUSH Treatment',
        value: 'Covered',
        description: 'Up to 100% of sum insured'
      },
      dayCare: {
        title: 'Day Care Procedures',
        value: 'Comprehensive',
        description: 'All state approved procedures covered'
      },
      roadAmbulance: {
        title: 'Road Ambulance',
        value: 'Actuals',
        description: 'Up to city limits boundary'
      },
      restoration: {
        title: 'Restoration Benefit',
        value: '100%',
        description: 'Replaced upon partial exhaustion'
      }
    },
    subLimits: [
      'Room Rent: Single private AC room (capped at 1% of SI)',
      'ICU Charges: No Sub-limits',
      'Cataract Surgery: Capped at ₹80,000'
    ],
    addOns: ['Daily Hospital Cash', 'Tax Benefit Shield'],
    criticalClauses: [
      { id: 'CLA-001', description: 'Standard grace period rule is 30 days.', status: 'Standard' }
    ],
    mismatches: []
  }
];

export const REPLAY_REPORTS: ReportItem[] = [
  {
    id: 'REP-001',
    name: 'Corporate Term Life v.2 (Active) - Risk Audit',
    type: 'Risk Assessment Analysis',
    policyId: 'hdfc-optima',
    date: 'Jun 14, 2026',
    size: '14.2 MB',
    status: 'Ready'
  },
  {
    id: 'REP-002',
    name: 'HDFC Optima Restore - Comprehensive Scan',
    type: 'Clause Coverage Breakdown',
    policyId: 'hdfc-optima',
    date: 'Jun 10, 2026',
    size: '8.7 MB',
    status: 'Ready'
  },
  {
    id: 'REP-003',
    name: 'Niva Bupa ReAssure - Full Disclosure Analysis',
    type: 'Regulatory Compliance Checklist',
    policyId: 'niva-bupa',
    date: 'May 28, 2026',
    size: '22.1 MB',
    status: 'Ready'
  }
];

export const DEFAULT_CHATS: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'assistant',
    text: "Hello! I've analyzed your HDFC Ergo Optima Restore policy. You asked about the \"Subrogation\" clause on page 14.",
    timestamp: '10:42 AM'
  },
  {
    id: 'm2',
    sender: 'assistant',
    text: "Subrogation essentially means that if someone else causes you a loss and the insurance company pays you for it, the company earns the right to sue that third party to get their money back.\n\nREAL-WORLD SCENARIO (INR)\nImagine a car hits your boundary wall, causing ₹50,000 in damage.\n1. You claim ₹50,000 from your policy.\n2. PoliShield pays you the full amount.\n3. Under Subrogation, your insurer can now legally recover that ₹50,000 from the person who hit your wall.\n\nDoes this make sense, or would you like me to explain how this affects your \"No Claim Bonus\"?",
    timestamp: '10:43 AM'
  },
  {
    id: 'm3',
    sender: 'user',
    text: "That's clear. Does this apply to health insurance claims as well, or just property?",
    timestamp: '10:44 AM'
  },
  {
    id: 'm4',
    sender: 'assistant',
    text: "Great question! Technically, subrogation applies to indemnity policies (like motor and home insurance) where the goal is to compensate you exactly for your financial losses.\n\nFor health insurance, it depends:\n- For standard hospitalization bills (where the insurer repays direct hospital bills), subrogation theoretically exists but is rarely enforced because finding a third party solely liable for disease is difficult.\n- For personal accident or critical illness lump-sum benefit policies, subrogation DOES NOT apply because these are benefit-trigger policies, not direct indemnity bills.",
    timestamp: '10:45 AM'
  }
];

export const HEATMAP_CLAUSES = [
  {
    section: 'Section 4.1',
    text: 'The Insured shall be covered for inpatient hospitalization expenses including room rent, boarding and nursing expenses up to 2% of the sum insured per day.',
    type: 'High Risk'
  },
  {
    section: 'Exclusion 2.b',
    text: 'Any pre-existing disease mentioned in the proposal form will not be covered for the first 48 months of continuous coverage from the date of inception.',
    type: 'Medium Risk'
  },
  {
    section: 'Clause 12',
    text: 'Modern treatment methods including robotic surgeries are covered up to 50% of the sum insured, subject to pre-authorization requirements.',
    type: 'Safe Bonus'
  },
  {
    section: 'Benefit 9',
    text: 'Annual health check-up is provided free of cost once every policy year for all insured members above 18 years of age at network providers.',
    type: 'Safe Bonus'
  }
];
