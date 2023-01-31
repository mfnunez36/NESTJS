import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 25, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: false }) // select: false sirve para no mostrar en una busqueda
  password: string;

  @Column({ type: 'uuid', name: 'secret_code', unique: true, select: false })
  secretCode: string;

  @Column({ type: 'simple-array' })
  roles: string[];

  @Column({ type: 'bool', default: false })
  active: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashSecretCode(): Promise<void> {
    if (!this.secretCode) return;
    this.secretCode = await uuidv4();
  }
}
