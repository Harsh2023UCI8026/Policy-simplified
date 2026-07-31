import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PolicyAnalysisService } from './policy-analysis.service';
import { AnalyzePolicyDto } from './dto/analyze-policy.dto';

@Controller('analysis')
export class PolicyAnalysisController {
  constructor(private readonly policyAnalysisService: PolicyAnalysisService) {}

  @Post('policy')
  async analyze(@Body() dto: AnalyzePolicyDto) {
    const result = this.policyAnalysisService.analyzePolicy(dto.policyId);
    return result;
  }
}
