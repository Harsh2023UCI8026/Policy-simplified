import { IsInt, IsPositive, Min, Max, IsOptional, IsEnum } from 'class-validator';
import { MedicalProfileStatus } from '../enums/medical-profile-status.enum';

export class UpdateMedicalProfileDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(50)
  @Max(250)
  heightCm?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(20)
  @Max(300)
  weightKg?: number;

  @IsOptional()
  @IsEnum(MedicalProfileStatus)
  status?: MedicalProfileStatus;
}
