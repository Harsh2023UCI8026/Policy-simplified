import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(private readonly userRepo: UserRepository) {}

  async createUser(createDto: CreateUserDto): Promise<Omit<User, 'passwordHash'>> {
    const exists = await this.userRepo.exists(createDto.email);
    if (exists) {
      throw new ConflictException('Email already in use');
    }
    const passwordHash = await bcrypt.hash(createDto.password, this.saltRounds);
    const user = await this.userRepo.create({
      name: createDto.name,
      email: createDto.email,
      passwordHash,
    });
    const { passwordHash: _, ...result } = user;
    return result;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, updateDto: UpdateUserDto): Promise<User> {
    const existing = await this.userRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('User not found');
    }
    const updateData: Partial<User> = {};
    if (updateDto.name !== undefined) updateData.name = updateDto.name;
    if (updateDto.role !== undefined) updateData.role = updateDto.role;
    if (updateDto.isActive !== undefined) updateData.isActive = updateDto.isActive;
    if (updateDto.password !== undefined) {
      updateData.passwordHash = await bcrypt.hash(updateDto.password, this.saltRounds);
    }
    return this.userRepo.update(id, updateData);
  }

  async deactivateUser(id: string): Promise<User> {
    return this.updateUser(id, { isActive: false } as any);
  }

  async deleteUser(id: string): Promise<void> {
    const existing = await this.userRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('User not found');
    }
    await this.userRepo.delete(id);
  }
}
