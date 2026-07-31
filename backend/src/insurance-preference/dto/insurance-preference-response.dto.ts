import { InsuranceType } from '../enums/insurance-type.enum';
import { CoverageFor } from '../enums/coverage-for.enum';
import { PreferredLanguage } from '../enums/preferred-language.enum';
import { PreferredCommunication } from '../enums/preferred-communication.enum';
import { IsEnum, IsInt, IsOptional, IsBoolean, IsNumber, IsString, MaxLength } from 'class-validator';

export class InsurancePreferenceResponseDto {
  id!: string;
  insuranceType!: InsuranceType;
  coverageFor!: CoverageFor;
  @IsOptional()
  @IsInt()
  monthlyBudget?: number;
  @IsOptional()
  @IsInt()
  preferredCoverageAmount?: number;
  @IsOptional()
  @IsBoolean()
  currentlyInsured?: boolean;
  @IsOptional()
  @IsString()
  @MaxLength(100)
  existingInsuranceProvider?: string;
  @IsOptional()
  @IsBoolean()
  wantsCashlessHospital?: boolean;
  @IsOptional()
  @IsBoolean()
  wantsCriticalIllnessCover?: boolean;
  @IsOptional()
  @IsBoolean()
  wantsMaternityCover?: boolean;
  @IsOptional()
  @IsNumber()
  preferredClaimSettlementRatio?: number;
  @IsOptional()
  @IsEnum(PreferredLanguage)
  preferredLanguage?: PreferredLanguage;
  @IsOptional()
  @IsEnum(PreferredCommunication)
  preferredCommunication?: PreferredCommunication;
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
