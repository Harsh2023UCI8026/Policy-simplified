import { Controller, Post, Get, Patch, Delete, Body, Headers, HttpCode, HttpStatus, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { InsurancePreferenceService } from './insurance-preference.service';
import { CreateInsurancePreferenceDto } from './dto/create-insurance-preference.dto';
import { UpdateInsurancePreferenceDto } from './dto/update-insurance-preference.dto';
import { InsurancePreferenceResponseDto } from './dto/insurance-preference-response.dto';
import { plainToClass } from 'class-transformer';

@Controller('preferences')
export class InsurancePreferenceController {
  constructor(private readonly prefService: InsurancePreferenceService) {}

  private getUserId(headers: Record<string, any>): string {
    const userId = headers['x-user-id'];
    if (!userId) {
      throw new BadRequestException('Missing x-user-id header');
    }
    return userId;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateInsurancePreferenceDto, @Headers() headers: Record<string, any>) {
    const userId = this.getUserId(headers);
    const pref = await this.prefService.create(userId, dto);
    return plainToClass(InsurancePreferenceResponseDto, pref);
  }

  @Get('me')
  async findMine(@Headers() headers: Record<string, any>) {
    const userId = this.getUserId(headers);
    const pref = await this.prefService.findMine(userId);
    return plainToClass(InsurancePreferenceResponseDto, pref);
  }

  @Patch()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Body() dto: UpdateInsurancePreferenceDto, @Headers() headers: Record<string, any>) {
    const userId = this.getUserId(headers);
    const pref = await this.prefService.update(userId, dto);
    return plainToClass(InsurancePreferenceResponseDto, pref);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Headers() headers: Record<string, any>) {
    const userId = this.getUserId(headers);
    await this.prefService.deactivate(userId);
  }
}
