import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsurancePreference } from './entity/insurance-preference.entity';
import { CreateInsurancePreferenceDto } from './dto/create-insurance-preference.dto';
import { UpdateInsurancePreferenceDto } from './dto/update-insurance-preference.dto';
import { User } from '../user/user.entity';

@Injectable()
export class InsurancePreferenceService {
  constructor(
    @InjectRepository(InsurancePreference)
    private readonly preferenceRepo: Repository<InsurancePreference>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userId: string, dto: CreateInsurancePreferenceDto): Promise<InsurancePreference> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const existing = await this.preferenceRepo.findOne({ where: { user: { id: userId }, isActive: true } });
    if (existing) {
      throw new ConflictException('Active insurance preference already exists for this user');
    }
    const pref = this.preferenceRepo.create({ ...dto, user });
    return this.preferenceRepo.save(pref);
  }

  async findMine(userId: string): Promise<InsurancePreference> {
    const pref = await this.preferenceRepo.findOne({ where: { user: { id: userId }, isActive: true } });
    if (!pref) {
      throw new NotFoundException('Insurance preference not found');
    }
    return pref;
  }

  async update(userId: string, dto: UpdateInsurancePreferenceDto): Promise<InsurancePreference> {
    const pref = await this.preferenceRepo.findOne({ where: { user: { id: userId }, isActive: true } });
    if (!pref) {
      throw new NotFoundException('Insurance preference not found');
    }
    Object.assign(pref, dto);
    return this.preferenceRepo.save(pref);
  }

  async deactivate(userId: string): Promise<void> {
    const pref = await this.preferenceRepo.findOne({ where: { user: { id: userId }, isActive: true } });
    if (!pref) {
      throw new NotFoundException('Insurance preference not found');
    }
    pref.isActive = false;
    await this.preferenceRepo.save(pref);
  }
}
