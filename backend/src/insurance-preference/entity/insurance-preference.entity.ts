import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { InsuranceType } from '../enums/insurance-type.enum';
import { CoverageFor } from '../enums/coverage-for.enum';
import { PreferredLanguage } from '../enums/preferred-language.enum';
import { PreferredCommunication } from '../enums/preferred-communication.enum';

@Entity('insurance_preferences')
export class InsurancePreference {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'enum', enum: InsuranceType })
  insuranceType!: InsuranceType;

  @Column({ type: 'enum', enum: CoverageFor })
  coverageFor!: CoverageFor;

  @Column({ type: 'int', nullable: true })
  monthlyBudget?: number;

  @Column({ type: 'int', nullable: true })
  preferredCoverageAmount?: number;

  @Column({ type: 'boolean', default: false })
  currentlyInsured: boolean = false;

  @Column({ type: 'varchar', length: 100, nullable: true })
  existingInsuranceProvider?: string;

  @Column({ type: 'boolean', default: true })
  wantsCashlessHospital: boolean = true;

  @Column({ type: 'boolean', default: false })
  wantsCriticalIllnessCover: boolean = false;

  @Column({ type: 'boolean', default: false })
  wantsMaternityCover: boolean = false;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  preferredClaimSettlementRatio?: number;

  @Column({ type: 'enum', enum: PreferredLanguage, default: PreferredLanguage.ENGLISH })
  preferredLanguage: PreferredLanguage = PreferredLanguage.ENGLISH;

  @Column({ type: 'enum', enum: PreferredCommunication, default: PreferredCommunication.EMAIL })
  preferredCommunication: PreferredCommunication = PreferredCommunication.EMAIL;

  @Column({ type: 'boolean', default: true })
  isActive: boolean = true;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
