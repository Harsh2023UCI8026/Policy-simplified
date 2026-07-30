import { Injectable } from '@nestjs/common';

@Injectable()
export class OCRService {
  analyze(policyId: string) {
    return {
      success: true,
      message: 'OCR analysis completed (mock)',
      policyId,
      status: 'completed',
      documentType: 'Insurance Policy',
      pages: 5,
      extractedText: '[Mock OCR text]',
    };
  }
}
