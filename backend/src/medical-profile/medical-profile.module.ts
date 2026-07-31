import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalProfile } from './entity/medical-profile.entity';
import { User } from '../user/user.entity';
import { MedicalProfileService } from './service/medical-profile.service';
import { MedicalProfileController } from './medical-profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalProfile, User]),
  ],
  providers: [MedicalProfileService],
  controllers: [MedicalProfileController],
})
export class MedicalProfileModule {}
