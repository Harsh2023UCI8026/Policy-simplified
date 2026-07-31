import { MedicalProfile } from '../entity/medical-profile.entity';
import { MedicalProfileResponseDto } from '../dto/medical-profile-response.dto';

export class MedicalProfileMapper {
  static toResponseDto(profile: MedicalProfile): MedicalProfileResponseDto {
    const dto = new MedicalProfileResponseDto();
    dto.id = profile.id;
    dto.heightCm = profile.heightCm;
    dto.weightKg = profile.weightKg;
    dto.status = profile.status;
    dto.createdAt = profile.createdAt;
    dto.updatedAt = profile.updatedAt;
    return dto;
  }
}
