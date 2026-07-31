import { IsEnum, IsInt, IsOptional, IsPositive, IsString, MaxLength, IsNumber, Min, Max, IsBoolean } from 'class-validator';
import { InsuranceType } from '../enums/insurance-type.enum';
import { CoverageFor } from '../enums/coverage-for.enum';
import { PreferredLanguage } from '../enums/preferred-language.enum';
import { PreferredCommunication } from '../enums/preferred-communication.enum';

export class UpdateInsurancePreferenceDto {
  @IsOptional()
  @IsEnum(InsuranceType)
  insuranceType?: InsuranceType;

  @IsOptional()
  @IsEnum(CoverageFor)
  coverageFor?: CoverageFor;

  @IsOptional()
  @IsInt()
  @IsPositive()
  monthlyBudget?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
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
  @Min(0)
  @Max(100)
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
}
