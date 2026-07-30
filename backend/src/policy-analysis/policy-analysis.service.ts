import { Injectable } from '@nestjs/common';

@Injectable()
export class PolicyAnalysisService {
  analyzePolicy(policyId: string) {
    return {
      success: true,
      message: 'Policy analysis completed (mock)',
      policyId,
      sections: [
        {
          title: 'Coverage',
          summary: 'Mock coverage summary.',
        },
        {
          title: 'Exclusions',
          summary: 'Mock exclusions summary.',
        },
      ],
    };
  }
}
