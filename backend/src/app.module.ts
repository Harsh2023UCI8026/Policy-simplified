import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PoliciesModule } from './policies/policies.module';
import { OCRModule } from './ocr/ocr.module';
import { PolicyAnalysisModule } from './policy-analysis/policy-analysis.module';

@Module({
  imports: [AuthModule, PoliciesModule, OCRModule, PolicyAnalysisModule],
})
export class AppModule {}
