/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Clause {
  id: string; // e.g. CLA-001
  description: string;
  status: 'Standard' | 'Restrictive' | 'Premium' | 'Notice';
  extendedInfo?: string;
  // optional severity score (0-10) to help ranking clauses in UI
  severityScore?: number;
}

export interface Benefit {
  // Optional id helps tracking benefits programmatically
  id?: string;
  title: string;
  value: string;
  description: string;
  // optional coverage percent (0..100)
  coveragePercent?: number;
}

export interface Mismatch {
  type: 'critical' | 'alert' | 'info';
  title: string;
  description: string;
  // Optional suggested remediation or action for the mismatch
  suggestedAction?: string;
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
  /**
   * claimSettlementRatio stored as a NUMBER representing percent (0..100).
   * Example: 92 means "92%". Keep data numeric; append '%' in the UI.
   */
  claimSettlementRatio: number; // e.g. 92 -> displayed as "92%"
  customerReviews: number; // e.g. 4.2
  complaintsLevel: 'Low' | 'Moderate' | 'High';
  financialStability: string; // e.g. A+
  /**
   * transparency stored as a NUMBER representing percent (0..100).
   * Example: 85 means "85%" transparency.
   */
  transparency: number; // e.g. 85 -> displayed as "85%"
  
  benefits: {
    ayush: Benefit;
    dayCare: Benefit;
    roadAmbulance: Benefit;
    restoration: Benefit;
  };
  subLimits: string[];
  addOns: string[];
  criticalClauses: Clause[];
  mismatches: Mismatch[];
  
  // Optional metadata for production use
  lastUpdated?: string; // ISO date string, e.g. 2026-06-14T12:00:00Z
  verified?: boolean;
  dataSource?: 'Manual' | 'API' | 'Document';
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
  // Added 'system' for automated system messages (not user or assistant)
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  meta?: {
    topic?: string;
    clauseId?: string;
    // Store monetary amounts as numbers for easy calculations (INR)
    scenarioMoney?: number;
  };
}
