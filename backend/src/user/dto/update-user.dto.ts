import { IsOptional, IsString, IsEnum, IsBoolean, Matches, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';


export class UpdateUserDto {
  @IsOptional()
  @IsString()

  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/[a-z]/, { message: 'Password must contain a lowercase letter' })
  @Matches(/[A-Z]/, { message: 'Password must contain an uppercase letter' })
  @Matches(/[0-9]/, { message: 'Password must contain a number' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
