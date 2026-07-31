import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { MedicalProfileStatus } from '../enums/medical-profile-status.enum';

@Entity('medical_profiles')
export class MedicalProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'int', nullable: false })
  heightCm!: number;

  @Column({ type: 'int', nullable: false })
  weightKg!: number;

  @Column({ type: 'enum', enum: MedicalProfileStatus, default: MedicalProfileStatus.ACTIVE })
  status!: MedicalProfileStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
