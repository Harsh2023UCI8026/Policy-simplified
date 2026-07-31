import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { MedicalProfileStatus } from '../enums/medical-profile-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalProfile } from '../entity/medical-profile.entity';
import { CreateMedicalProfileDto } from '../dto/create-medical-profile.dto';
import { UpdateMedicalProfileDto } from '../dto/update-medical-profile.dto';
import { User } from '../../user/user.entity';

@Injectable()
export class MedicalProfileService {
  constructor(
    @InjectRepository(MedicalProfile)
    private readonly profileRepo: Repository<MedicalProfile>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /** Create a new medical profile for a user */
  async create(userId: string, dto: CreateMedicalProfileDto): Promise<MedicalProfile> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const existing = await this.profileRepo.findOne({ where: { user: { id: userId } } });
    if (existing) {
      throw new ConflictException('Medical profile already exists for this user');
    }
    const profile = this.profileRepo.create({ ...dto, user });
    return this.profileRepo.save(profile);
  }

  /** Retrieve the authenticated user's active medical profile */
  async findMine(userId: string): Promise<MedicalProfile> {
    const profile = await this.profileRepo.findOne({ where: { user: { id: userId } } });
    if (!profile || profile.status === MedicalProfileStatus.INACTIVE) {
      throw new NotFoundException('Medical profile not found');
    }
    return profile;
  }

  /** Update the authenticated user's medical profile */
  async update(userId: string, dto: UpdateMedicalProfileDto): Promise<MedicalProfile> {
    const profile = await this.profileRepo.findOne({ where: { user: { id: userId } } });
    if (!profile) {
      throw new NotFoundException('Medical profile not found');
    }
    if (profile.status === MedicalProfileStatus.INACTIVE) {
      throw new BadRequestException('Cannot update an inactive medical profile');
    }
    Object.assign(profile, dto);
    return this.profileRepo.save(profile);
  }

  /** Soft‑delete (deactivate) the user's medical profile */
  async deactivate(userId: string): Promise<void> {
    const profile = await this.profileRepo.findOne({ where: { user: { id: userId } } });
    if (!profile) {
      throw new NotFoundException('Medical profile not found');
    }
    if (profile.status === MedicalProfileStatus.INACTIVE) {
      throw new BadRequestException('Medical profile is already inactive');
    }
    profile.status = MedicalProfileStatus.INACTIVE;
    await this.profileRepo.save(profile);
  }
}
