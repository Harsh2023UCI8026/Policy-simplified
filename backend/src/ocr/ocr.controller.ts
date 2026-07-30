import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { OCRService } from './ocr.service';

@Controller('ocr')
export class OCRController {
  constructor(private readonly ocrService: OCRService) {}

  @Post('analyze')
  async analyze(@Body() body: any) {
    const { policyId } = body || {};
    if (!policyId) {
      throw new HttpException({ success: false, message: 'policyId is required.' }, HttpStatus.BAD_REQUEST);
    }
    return this.ocrService.analyze(policyId);
  }
}
