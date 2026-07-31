import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsurancePreference } from './entity/insurance-preference.entity';
import { User } from '../user/user.entity';
import { InsurancePreferenceService } from './insurance-preference.service';
import { InsurancePreferenceController } from './insurance-preference.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([InsurancePreference, User]),
  ],
  providers: [InsurancePreferenceService],
  controllers: [InsurancePreferenceController],
})
export class InsurancePreferenceModule {}
