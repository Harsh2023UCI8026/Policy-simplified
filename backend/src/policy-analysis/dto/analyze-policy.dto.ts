import { IsString, IsNotEmpty } from 'class-validator';

export class AnalyzePolicyDto {
  @IsString()
  @IsNotEmpty()
  policyId!: string;
}
