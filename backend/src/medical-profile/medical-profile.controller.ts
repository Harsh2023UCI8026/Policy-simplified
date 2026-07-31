import { Controller, Post, Get, Patch, Delete, Body, Headers, HttpCode, HttpStatus, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { MedicalProfileService } from './service/medical-profile.service';
import { MedicalProfileMapper } from './mapper/medical-profile.mapper';
import { CreateMedicalProfileDto } from './dto/create-medical-profile.dto';
import { UpdateMedicalProfileDto } from './dto/update-medical-profile.dto';
// Removed unused imports
// Removed class-transformer import

@Controller('medical-profile')
export class MedicalProfileController {
  constructor(private readonly profileService: MedicalProfileService) {}

  private getUserId(headers: Record<string, any>): string {
    const userId = headers['x-user-id'];
    if (!userId) {
      throw new BadRequestException('Missing x-user-id header');
    }
    return userId;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateMedicalProfileDto, @Headers() headers: Record<string, any>) {
    const userId = this.getUserId(headers);
    const profile = await this.profileService.create(userId, dto);
    return MedicalProfileMapper.toResponseDto(profile);
  }

  @Get('me')
  async findMine(@Headers() headers: Record<string, any>) {
    const userId = this.getUserId(headers);
    const profile = await this.profileService.findMine(userId);
    return MedicalProfileMapper.toResponseDto(profile);
  }

  @Patch()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Body() dto: UpdateMedicalProfileDto, @Headers() headers: Record<string, any>) {
    const userId = this.getUserId(headers);
    const profile = await this.profileService.update(userId, dto);
    return MedicalProfileMapper.toResponseDto(profile);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Headers() headers: Record<string, any>) {
    const userId = this.getUserId(headers);
    await this.profileService.deactivate(userId);
  }
}
