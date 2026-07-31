import { MedicalProfileStatus } from '../enums/medical-profile-status.enum';

export class MedicalProfileResponseDto {
  id!: string;
  heightCm!: number;
  weightKg!: number;
  status!: MedicalProfileStatus;
  createdAt!: Date;
  updatedAt!: Date;
}

