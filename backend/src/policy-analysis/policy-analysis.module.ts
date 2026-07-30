import { Module } from '@nestjs/common';
import { PolicyAnalysisController } from './policy-analysis.controller';
import { PolicyAnalysisService } from './policy-analysis.service';

@Module({
  controllers: [PolicyAnalysisController],
  providers: [PolicyAnalysisService],
})
export class PolicyAnalysisModule { }

