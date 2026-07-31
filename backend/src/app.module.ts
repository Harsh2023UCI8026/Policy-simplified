import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PoliciesModule } from './policies/policies.module';
import { OCRModule } from './ocr/ocr.module';
import { PolicyAnalysisModule } from './policy-analysis/policy-analysis.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { InsurancePreferenceModule } from './insurance-preference/insurance-preference.module';
import { MedicalProfileModule } from './medical-profile/medical-profile.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    PoliciesModule,
    OCRModule,
    PolicyAnalysisModule,
    UserModule,
    InsurancePreferenceModule,
    MedicalProfileModule,
  ],
})
export class AppModule {}
