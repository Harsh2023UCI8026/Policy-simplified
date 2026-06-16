/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Clause {
  id: string; // e.g. CLA-001
  description: string;
  status: 'Standard' | 'Restrictive' | 'Premium' | 'Notice';
  extendedInfo?: string;
}

export interface Benefit {
  title: string;
  value: string;
  description: string;
}

export interface Policy {
  id: string;
  code: string; // e.g. POL-88293-XP
  name: string;
  company: string;
  logoColor: string;
  annualPremium: number;
  healthScore: number;
  totalCoverage: number; // e.g. 500000
  riskLevel: 'Low' | 'Moderate' | 'High';
  waitingPeriodDays: number;
  waitingPeriodStatus: string;
  trustScore: number;
  claimSettlementRatio: string; // e.g. 92%
  customerReviews: number; // e.g. 4.2
  complaintsLevel: 'Low' | 'Moderate' | 'High';
  financialStability: string; // e.g. A+
  transparency: string; // e.g. 85%
  
  benefits: {
    ayush: Benefit;
    dayCare: Benefit;
    roadAmbulance: Benefit;
    restoration: Benefit;
  };
  subLimits: string[];
  addOns: string[];
  criticalClauses: Clause[];
  mismatches: Array<{
    type: 'critical' | 'alert' | 'info';
    title: string;
    description: string;
  }>;
}

export interface Scenario {
  claimType: 'Motor' | 'Health';
  incidentType: string;
  damageAmount: number;
  garageType: 'Network' | 'Non-Network';
  fault: 'My Fault' | 'Third Party' | 'No Fault';
  addons: {
    zeroDep: boolean;
    engineProtect: boolean;
    roadsideAsst: boolean;
    personalAccident: boolean;
  };
}

export interface ReportItem {
  id: string;
  name: string;
  type: string;
  policyId: string;
  date: string;
  size: string;
  status: 'Ready' | 'Generating';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  meta?: {
    topic?: string;
    clauseId?: string;
    scenarioMoney?: string;
  };
}
